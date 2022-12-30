import { Request, Response, NextFunction } from 'express';

import { processError } from '../util/errors/ProcessError';

import { authenticateAccessToken, authenticateRefreshToken } from '../util/authentication/authenticationFunctions';
import ExtError from '../util/errors/ExtError';
import HTTP_STATUS from '../enum/HttpStatus';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const refreshToken = req.cookies['refreshToken'] as string;
        const accessToken = req.headers['authorization']?.split(' ')[1] as string;

        if (!accessToken) throw new ExtError(HTTP_STATUS.FORBIDDEN, 'The given access token is invalid.');
        if (!refreshToken) throw new ExtError(HTTP_STATUS.UNAUTHORIZED, 'The given refresh token is invalid.');

        await authenticateRefreshToken(refreshToken);
        await authenticateAccessToken(accessToken);

        next();

    } catch (error) {
        processError(error, res);
    }
}