import { Request, Response } from 'express';
import dayjs from 'dayjs';

import HTTP_STATUS from '../enum/HttpStatus';
import ExtError from '../util/errors/ExtError';
import { authenticateRefreshToken, comparePasswordHash, generateAccessToken, generatePasswordHash, generateRefreshToken } from '../util/authentication/authenticationFunctions';
import { isCredentialEmpty } from '../util/validation/fields';

import * as userRepository from "../repository/UserRepository";
import * as redisService from './RedisService';
import * as tokenService from './AvailabilityService';

const validateUserPassword = (userID: number) => {
    return async (passwordHash: string) => {
        const { username } = await userRepository.getUserById(userID);
        const password = await userRepository.getUserPassword(username);

        return await comparePasswordHash(password, passwordHash);
    }
}

export const signin = async (req: Request, res: Response) => {
    const body = req.body;
    const { username, password } = body;

    const badRequestIfFieldEmpty = isCredentialEmpty(HTTP_STATUS.BAD_REQUEST);
    const throwErrorIfUsernameEmpty = badRequestIfFieldEmpty('Username');
    const throwErrorIfPasswordEmpty = badRequestIfFieldEmpty('Password');

    throwErrorIfUsernameEmpty(username);
    throwErrorIfPasswordEmpty(password);

    const user = await userRepository.getUserByUsername(username);

    if (!user) {
        throw new ExtError(HTTP_STATUS.NOT_FOUND, 'The user with the given username doesn\'t exist.')
    }

    const userID = user.id;
    const validatePassword = validateUserPassword(userID);
    const passwordValid = await validatePassword(password);

    if (!passwordValid) {
        throw new ExtError(HTTP_STATUS.UNAUTHORIZED, 'The given password is invalid.')
    }

    const accessToken = await generateAccessToken(username, { expiresIn: '15m' });
    const refreshToken = await generateRefreshToken(username, { expiresIn: '7d' });

    await redisService.saveRefreshToken(username, refreshToken);

    await serveRefreshTokenAsCookie(res, refreshToken);

    res.json({ accessToken });
}

export const signout = async (req: Request, res: Response) => {
    res.clearCookie('refreshToken');

    return { message: 'Successfuly logged out.' }
}

export const signup = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    const badRequestIfFieldEmpty = isCredentialEmpty(HTTP_STATUS.BAD_REQUEST);
    const throwErrorIfUsernameEmpty = badRequestIfFieldEmpty('Username');
    const throwErrorIfEmailEmpty = badRequestIfFieldEmpty('Email');
    const throwErrorIfPasswordEmpty = badRequestIfFieldEmpty('Password');

    throwErrorIfUsernameEmpty(username);
    throwErrorIfPasswordEmpty(password);
    throwErrorIfEmailEmpty(email);

    const usernameExists = await userRepository.getUserByUsername(username);
    const emailExists = await userRepository.getUserByEmail(email);

    if (usernameExists || emailExists) {
        throw new ExtError(HTTP_STATUS.BAD_REQUEST, 'Username or email aready exists.');
    }

    const passwordHash = generatePasswordHash(password);
    const user = await userRepository.createUser({ username, email, password: passwordHash });

    if (!user) {
        throw new ExtError(HTTP_STATUS.BAD_REQUEST, 'An error occured during user creation.');
    }

    return { message: 'Successfuly signed up.' }
}

export const refreshToken = async (req: Request, res: Response) => {
    try {
        const { refreshToken } = req.cookies;
        res.clearCookie('refreshToken');

        const user = await authenticateRefreshToken(refreshToken);

        if (user && typeof user !== 'string') {
            const { username } = user;

            const newRefreshToken = await generateRefreshToken(username, { expiresIn: '7d' });

            const tokenValid = await redisService.validateRefreshToken(username, refreshToken);

            if (!tokenValid) {
                throw new ExtError(HTTP_STATUS.UNAUTHORIZED, 'The given token is invalid, please log in.');
            }

            await redisService.saveRefreshToken(username, newRefreshToken);
            await serveRefreshTokenAsCookie(res, newRefreshToken);

            const accessToken = await generateAccessToken(username, { expiresIn: '30m' });
            res.json({ accessToken });
        }

    } catch (error) {
        throw new ExtError(HTTP_STATUS.UNAUTHORIZED, 'The given token is invalid, please log in.');
    }
}

export const serveRefreshTokenAsCookie = async (res: Response, refreshToken: string) => {
    res.cookie('refreshToken', refreshToken, {
        secure: process.env.ENVIRONMENT !== 'development',
        httpOnly: true,
        expires: dayjs().add(7, "days").toDate()
    });
}

export const availability = async () => {
    const hashes = await tokenService.isHashingServiceAlive();
    const salts = await tokenService.isSaltingServiceAlive();

    return {
        hashes: hashes.data,
        salts: salts.data
    }
}