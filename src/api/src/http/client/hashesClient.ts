import { hashingInstance } from '../instance';

export const getHashByUsername = async (username: string) => {
    const response = await hashingInstance.get(`/${username}`)

    return response.data;
};