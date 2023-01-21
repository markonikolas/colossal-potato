import { Request, Response } from 'express';
import dayjs from 'dayjs';
import bcrypt from 'bcrypt';

import HTTP_STATUS from '../enum/HttpStatus';
import ExtError from '../util/errors/ExtError';
import { isCredentialEmpty } from '../util/validation/fields';
import {
    validateUserPassword,
    generateUserPassword,
    authenticateRefreshToken,
    generateAccessToken,
    generateRefreshToken
} from '../util/authentication/authenticationFunctions';

import * as redisService from './RedisService';
import * as hashesService from '../http/services/hashesService';
import * as saltsService from '../http/services/saltsService';
import * as userRepository from "../repository/UserRepository";

export const signin = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await userRepository.getUserByUsername(username);

    const badRequestIfFieldEmpty = isCredentialEmpty(HTTP_STATUS.BAD_REQUEST);
    const throwErrorIfUsernameEmpty = badRequestIfFieldEmpty('Username');
    const throwErrorIfPasswordEmpty = badRequestIfFieldEmpty('Password');

    throwErrorIfUsernameEmpty(username);
    throwErrorIfPasswordEmpty(password);

    if (!user) {
        throw new ExtError(HTTP_STATUS.NOT_FOUND, 'The user with the given username doesn\'t exist.')
    }

    const hash = await hashesService.getHash(username);
    const salt = await saltsService.getSalt(username);

    const isPasswordValid = validateUserPassword(password, hash, salt);

    if (!isPasswordValid) {
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

    const passwordSalt = await bcrypt.genSalt();
    const passwordHash = generateUserPassword(password, passwordSalt);

    await hashesService.setHash(username, passwordHash);
    await saltsService.setSalt(username, passwordSalt);

    const user = await userRepository.createUser({ username, email });

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