import 'dotenv/config';
import bcrypt from "bcrypt";
import jwt, { SignOptions } from 'jsonwebtoken';

import HTTP_STATUS from '../../enum/HttpStatus';
import { isCredentialEmpty } from '../validation/fields';
import { ACCESS, REFRESH } from '../../config/keys';

const isSecretEmpty = isCredentialEmpty(HTTP_STATUS.BAD_REQUEST);
const throwErrorIfSecretEmpty = isSecretEmpty('Secret');

export const generatePasswordHash = (password: string) => {
    const password_salt = bcrypt.genSaltSync();
    const password_hash = bcrypt.hashSync(password, password_salt);

    return password_hash;
}

export const comparePasswordHash = async (passwordHash: string, plainTextPassword: string) => {
    const isPasswordEmpty = isCredentialEmpty(HTTP_STATUS.BAD_REQUEST);
    const throwErrorIfPasswordEmpty = isPasswordEmpty('Password');

    throwErrorIfPasswordEmpty(plainTextPassword);

    return await bcrypt.compare(plainTextPassword, passwordHash);
}

export const generateToken = (secretOrKey: string | Buffer, options?: SignOptions) => async (username: string, additionalOpts?: SignOptions) => {
    throwErrorIfSecretEmpty(secretOrKey);

    const token = jwt.sign({ username }, secretOrKey, Object.assign({}, options, additionalOpts));

    return token;
}

export const authenticateToken = (secretOrKey: string | Buffer, options?: SignOptions) => async (token: string) => {
    throwErrorIfSecretEmpty(secretOrKey);

    return jwt.verify(token, secretOrKey, options);
}

const generateES384AccessToken = generateToken(ACCESS.PRIVATE, { algorithm: 'ES384' });
const generateES384RefreshToken = generateToken(REFRESH.PRIVATE, { algorithm: 'ES384' });
const authenticateES384AccessToken = authenticateToken(ACCESS.PUBLIC, { algorithm: 'ES384' })
const authenticateES384RefreshToken = authenticateToken(REFRESH.PUBLIC, { algorithm: 'ES384' })

export const generateAccessToken = generateES384AccessToken;
export const generateRefreshToken = generateES384RefreshToken;
export const authenticateAccessToken = authenticateES384AccessToken;
export const authenticateRefreshToken = authenticateES384RefreshToken;