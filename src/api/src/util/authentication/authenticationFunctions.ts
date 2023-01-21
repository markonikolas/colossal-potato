import 'dotenv/config';
import bcrypt from "bcrypt";
import jwt, { SignOptions } from 'jsonwebtoken';

import HTTP_STATUS from '../../enum/HttpStatus';
import { isCredentialEmpty } from '../validation/fields';
import { ACCESS, REFRESH } from '../../config/keys';
import ExtError from '../errors/ExtError';

const isSecretEmpty = isCredentialEmpty(HTTP_STATUS.BAD_REQUEST);
const throwErrorIfSecretEmpty = isSecretEmpty('Secret');

export const validateUserPassword = async (password: string, savedHash: string, salt: string) => {
    const passwordHash = await bcrypt.hash(password, salt);

    const isPasswordValid = passwordHash === savedHash;

    if (!isPasswordValid) {
        throw new ExtError(HTTP_STATUS.UNAUTHORIZED, 'The provided password is invalid.');
    }

    return passwordHash;
}

export const generateUserPassword = (password: string, salt: string) => {
    const passwordHash = bcrypt.hashSync(password, salt);

    return passwordHash;
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