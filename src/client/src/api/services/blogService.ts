import * as blogClient from '../client/blogClient';

export const getAllPosts = async () => await blogClient.getAllPosts();

export const getSinglePost = async (id: string) => await blogClient.getSinglePost(id);

export const getLatestPosts = async (amount: number) => await blogClient.getLatestPosts(amount);