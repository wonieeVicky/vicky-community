import AuthRoute from "@/components/AuthRoute";
import CommentItem from "@/components/CommentItem";
import FeedItem from "@/components/FeedItem";
import InputField from "@/components/InputField";
import { colors } from "@/constants";
import useCreateComment from "@/hooks/queries/useCreateComment";
import useGetPost from "@/hooks/queries/useGetPost";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useRef, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const { data: post, isPending, isError } = useGetPost(Number(id));
  const createComment = useCreateComment();
  const [content, setContent] = useState("");
  const scrollRef = useRef<ScrollView | null>(null);

  if (isPending || isError) {
    return <></>;
  }

  const handleSubmitComment = () => {
    const comment = {
      postId: post.id,
      content
    };
    createComment.mutate(comment);
    setContent("");
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 500);
  };

  return (
    <AuthRoute>
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.awareScrollViewContainer}
        >
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
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </ScrollView>
          <View style={styles.commentInputContainer}>
            <InputField
              value={content}
              returnKeyType="send"
              onSubmitEditing={handleSubmitComment}
              placeholder="댓글을 입력해주세요."
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
        </KeyboardAwareScrollView>
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
    height: 30
  },
  inputButtonText: {
    color: colors.WHITE,
    fontWeight: "bold"
  }
});
