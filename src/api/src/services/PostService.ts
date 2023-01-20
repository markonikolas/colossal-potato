import * as PostRepository from '../repository/PostRepository';

import { PostType } from '../types/post';

export const getAllPosts = async () => await PostRepository.getAllPosts();

export const getPostById = async (id: number) => await PostRepository.getPostById(id);

export const createPost = async (data: PostType) => await PostRepository.createPost(data);

export const deletePost = async (id: number) => await PostRepository.deletePost(id);

export const updatePost = async (id: number, data: PostType) => await PostRepository.updatePost(id, data);