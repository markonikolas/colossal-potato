import * as saltingClient from '../client/saltsClient';

export const getSalt = async (username: string) => {
    const data = await saltingClient.getSaltByUsername(username);

    return data.hash;
};

export const setSalt = async (username: string, hash: string) => {
    const data = await saltingClient.setSaltByUsername(username, hash);

    return data.hash;
};