import { CreatePostDto, Post } from "@/types";
import axiosInstance from "./axios";

async function createPost(post: CreatePostDto) {
  const { data } = await axiosInstance.post("/posts", post);
  return data;
}

async function getPosts(page = 1): Promise<Post[]> {
  const { data } = await axiosInstance.get(`/posts?page=${page}`);
  return data;
}

export { createPost, getPosts };
