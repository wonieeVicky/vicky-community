import { getPost } from "@/api/post";
import { queryKeys } from "@/constants";
import { useQuery } from "@tanstack/react-query";

function useGetPost(id: number) {
  return useQuery({
    queryFn: () => getPost(id),
    queryKey: [queryKeys.POST, queryKeys.GET_POST, id],
    enabled: Boolean(id) // 아이디가 존재할 때만 쿼리 호출
  });
}

export default useGetPost;
