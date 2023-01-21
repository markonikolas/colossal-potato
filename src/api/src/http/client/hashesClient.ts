import { hashingInstance } from '../instance';

export const getHashByUsername = async (username: string) => {
    const response = await hashingInstance.get(`/hashes/${username}`)

    return response.data;
};

export const setHashByUsername = async (username: string, hash: string) => {
    const response = await hashingInstance.post('/hashes', { username, hash })

    return response.data;
};