import * as hashingClient from '../client/hashesClient';

export const getHash = async (username: string) => {
    const data = await hashingClient.getHashByUsername(username);

    return data.hash;
};

export const setHash = async (username: string, hash: string) => {
    const data = await hashingClient.setHashByUsername(username, hash);

    return data.hash;
};