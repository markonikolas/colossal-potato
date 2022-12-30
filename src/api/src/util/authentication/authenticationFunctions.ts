import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import 'dotenv/config';

import HTTP_STATUS from '../../enum/HttpStatus';
import { isCredentialEmpty } from '../validation/fields';

const { JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_SECRET } = process.env;
const isSecretEmpty = isCredentialEmpty(HTTP_STATUS.BAD_REQUEST);
const throwErrorIfSecretEmpty = isSecretEmpty('Secret');

export const generatePasswordHash = (password: string) => {
    const password_salt = bcrypt.genSaltSync();
    const password_hash = bcrypt.hashSync(password, password_salt);

    return password_hash;
}

export const comparePasswords = async (passwordHash: string, plainTextPassword: string) => {
    const isPasswordEmpty = isCredentialEmpty(HTTP_STATUS.BAD_REQUEST);
    const throwErrorIfPasswordEmpty = isPasswordEmpty('Password');

    throwErrorIfPasswordEmpty(plainTextPassword);

    return await bcrypt.compare(plainTextPassword, passwordHash);
}

export const generateToken = (JWT_SECRET: string) => async (username: string, opts?: Object) => {
    throwErrorIfSecretEmpty(JWT_SECRET);

    const token = jwt.sign({ username }, JWT_SECRET, opts);

    return token;
}

export const authenticateToken = (JWT_SECRET: string) => async (token: string) => {
    throwErrorIfSecretEmpty(JWT_SECRET);

    return jwt.verify(token, JWT_SECRET);
}

export const generateAccessToken = generateToken(JWT_ACCESS_TOKEN_SECRET!);
export const generateRefreshToken = generateToken(JWT_REFRESH_TOKEN_SECRET!);
export const authenticateAccessToken = authenticateToken(JWT_ACCESS_TOKEN_SECRET!);
export const authenticateRefreshToken = authenticateToken(JWT_ACCESS_TOKEN_SECRET!);
