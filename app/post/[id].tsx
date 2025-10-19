import AuthRoute from "@/components/AuthRoute";
import CommentItem from "@/components/CommentItem";
import FeedItem from "@/components/FeedItem";
import InputField from "@/components/InputField";
import { colors } from "@/constants";
import useCreateComment from "@/hooks/queries/useCreateComment";
import useGetPost from "@/hooks/queries/useGetPost";
import usePlatformKeyboardContainer from "@/hooks/usePlatformKeyboardContainer";
import { useLocalSearchParams } from "expo-router";
import { Fragment, useRef, useState } from "react";
import {
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams();
  const { data: post, isPending, isError } = useGetPost(Number(id));
  const createComment = useCreateComment();
  const [content, setContent] = useState("");
  const scrollRef = useRef<ScrollView | null>(null);
  const [parentCommentId, setParentCommentId] = useState<number | null>(null);
  const inputRef = useRef<TextInput | null>(null);

  const { Container, containerProps } = usePlatformKeyboardContainer({
    contentContainerStyle: styles.awareScrollViewContainer,
    behavior: "height",
    androidOffsetWhenVisible: 100
  });

  if (isPending || isError) {
    return <></>;
  }

  const handleReply = (commentId: number) => {
    setParentCommentId(commentId);
    inputRef.current?.focus();
  };

  const handleCancelReply = () => {
    setParentCommentId(null);
    Keyboard.dismiss(); // 키보드 닫기
  };

  const handleSubmitComment = () => {
    const commentData = {
      postId: post.id,
      content
    };

    if (parentCommentId) {
      createComment.mutate({
        ...commentData,
        parentCommentId
      });
      setContent("");
      handleCancelReply();
      return;
    }

    createComment.mutate(commentData);
    setContent("");
  };

  return (
    <AuthRoute>
      <SafeAreaView style={styles.container}>
        <Container {...containerProps}>
          <ScrollView
            ref={scrollRef}
            contentContainerStyle={styles.scrollViewContainer}
            style={{ marginBottom: 75 }}
          >
            <View style={{ marginTop: 12 }}>
              <FeedItem post={post} isDetail />
              <Text style={styles.commentCount}>
                댓글 {post.commentCount}개
              </Text>
            </View>
            {post.comments?.map((comment) => (
              <Fragment key={comment.id}>
                <CommentItem
                  parentCommentId={parentCommentId}
                  onReply={() => handleReply(comment.id)}
                  onCancelReply={handleCancelReply}
                  comment={comment}
                />
                {comment.replies.map((reply) => (
                  <CommentItem key={reply.id} comment={reply} isReply={true} />
                ))}
              </Fragment>
            ))}
          </ScrollView>
          <View style={styles.commentInputContainer}>
            <InputField
              ref={inputRef}
              value={content}
              returnKeyType="send"
              onSubmitEditing={handleSubmitComment}
              placeholder={
                parentCommentId ? "답글 남기는 중..." : "댓글을 입력해주세요."
              }
              onChangeText={setContent}
              rightChild={
                <Pressable
                  style={styles.inputButtonContainer}
                  onPress={handleSubmitComment}
                  disabled={!content}
                >
                  <Text style={styles.inputButtonText}>등록</Text>
                </Pressable>
              }
            />
          </View>
        </Container>
      </SafeAreaView>
    </AuthRoute>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE
  },
  scrollViewContainer: {
    backgroundColor: colors.GRAY_200
  },
  commentCount: {
    fontSize: 16,
    marginTop: 12,
    backgroundColor: colors.WHITE,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontWeight: "bold"
  },
  commentInputContainer: {
    position: "absolute",
    bottom: 0,
    padding: 16,
    backgroundColor: colors.WHITE,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.GRAY_200,
    width: "100%"
  },
  awareScrollViewContainer: {
    flex: 1,
    backgroundColor: colors.GRAY_200
  },
  inputButtonContainer: {
    backgroundColor: colors.ORANGE_600,
    padding: 8,
    borderRadius: 5,
    height: 32
  },
  inputButtonText: {
    color: colors.WHITE,
    fontWeight: "bold"
  }
});
