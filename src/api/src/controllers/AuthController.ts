import { Request, Response, NextFunction } from 'express';

import { processError } from '../util/errors/ProcessError';

import * as authService from '../services/AuthService';

export const signin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await authService.signin(req, res);

        res.send(result);
    } catch (error) {
        processError(error, res);
    }
}

export const signout = async (req: Request, res: Response) => {
    try {
        const result = await authService.signout(req, res);

        res.send(result);
    } catch (error) {
        processError(error, res);
    }
}

export const signup = async (req: Request, res: Response) => {
    try {
        const result = await authService.signup(req, res);

        res.send(result);
    } catch (error) {
        processError(error, res);
    }
}

export const refresh = async (req: Request, res: Response) => {
    try {
        const result = await authService.refreshToken(req, res);

        res.send(result);
    } catch (error) {
        processError(error, res);
    }
}

export const availability = async (req: Request, res: Response) => {
    try {
        const result = await authService.availability();

        res.send(result);
    } catch (error) {
        processError(error, res);
    }
}