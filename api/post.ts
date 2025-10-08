import { CreatePostDto } from "@/types";
import axiosInstance from "./axios";

async function createPost(post: CreatePostDto) {
  const { data } = await axiosInstance.post("/posts", post);
  return data;
}

export { createPost };
