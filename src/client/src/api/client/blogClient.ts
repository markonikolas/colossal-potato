import axiosInstance from '../instance/axiosInstance';

export const getAllPosts = async () => {
    const response = await axiosInstance.get('/api/posts');

    return response.data;
}

export const getSinglePost = async (id: string) => {
    const response = await axiosInstance.get(`/api/posts/${id}`);

    return response.data
}