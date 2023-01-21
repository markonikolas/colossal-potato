import { saltingInstance } from '../instance';

export const getSaltByUsername = async (username: string) => {
    const response = await saltingInstance.get(`/salts/${username}`)

    return response.data;
};

export const setSaltByUsername = async (username: string, hash: string) => {
    const response = await saltingInstance.post('/salts', { username, hash })

    return response.data;
};