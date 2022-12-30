import { createClient } from 'redis';
import HTTP_STATUS from '../enum/HttpStatus';
import ExtError from '../util/errors/ExtError';

const { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } = process.env;

const redisClient = createClient({
    url: `redis://default:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}`
});

await redisClient.connect();

export const cacheSet = async (key: string, value: string) => await redisClient.set(key, value);
export const cacheGet = async (key: string) => await redisClient.get(key);
export const cacheDestroy = async (key: string) => await redisClient.del(key);

export const validateRefreshToken = async (username: string, currentToken: string) => {
    try {
        const token = await cacheGet(username);

        return currentToken === token;
    } catch (error) {
        throw new ExtError(HTTP_STATUS.UNAUTHORIZED, 'Unauthorized, please log in.');
    }
}

export const saveRefreshToken = async (username: string, refreshToken: string) => {
    try {
        const token = await cacheSet(username, refreshToken);

        return token;
    } catch (error) {
        throw new ExtError(HTTP_STATUS.UNAUTHORIZED, 'Unauthorized, please log in.');
    }
}
