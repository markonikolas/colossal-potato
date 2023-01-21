import * as userService from "../services/UserService";

import { Request, Response } from "express";
import { processError } from "../util/errors/ProcessError";
import HTTP_STATUS from '../enum/HttpStatus';

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await userService.getAllUsers();

        res.send(result);
    } catch (error) {
        processError(error, res);
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await userService.getUserById(~~id);

        res.send(result);
    } catch (error) {
        processError(error, res);
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const { id, ...data } = req.body;
        const result = await userService.createUser(data);

        res.status(HTTP_STATUS.CREATED).send(result);
    } catch (error) {
        processError(error, res);
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await userService.deleteUser(~~id);

        res.send(result);
    } catch (error) {
        processError(error, res);
    }
}

// export const updateUser = async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;
//         const result = await userService.updateUser(~~id, req.body);

//         res.send(result);
//     } catch (error) {
//         processError(error, res);
//     }
// }