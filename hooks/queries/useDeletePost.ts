import { deletePost } from "@/api/post";
import queryClient from "@/api/queryClient";
import { queryKeys } from "@/constants";
import { useMutation } from "@tanstack/react-query";

function useDeletePost() {
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      // 삭제 시 포스트 목록 갱신
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS]
      });
    }
  });
}

export default useDeletePost;
