import { getHashByUsername } from '../client/hashesClient';

export const getHash = async (username: string) => {
    return await getHashByUsername(username);
};