import * as PostRepository from '../repository/PostRepository';

import { ICreatePostDto } from '../types/post';

export const getAllPosts = async () => await PostRepository.getAllPosts();

export const getPostById = async (id: number) => await PostRepository.getPostById(id);

export const createPost = async (data: ICreatePostDto) => await PostRepository.createPost(data);

export const deletePost = async (id: number) => await PostRepository.deletePost(id);

export const updatePost = async (id: number, data: ICreatePostDto) => await PostRepository.updatePost(id, data);