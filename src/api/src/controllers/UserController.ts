import * as userService from "../services/UserService";

import { Request, Response } from "express";
import { processError } from "../util/errors/ProcessError";

export const getAllUsers = async (req: Request, res: Response) => {
    try{
        const result = await userService.getAllUsers();
        
        res.send(result);
    } catch(error){
        processError(error, res);
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const result = await userService.getUserById(~~id);
        
        res.send(result);
    } catch(error){
        processError(error, res);
    }
}

export const createUser = async (req: Request, res: Response) => {
    try{
        const { username, email, password } = req.body;
        const result = await userService.createUser({ username, email, password });
        
        res.send(result);
    } catch(error){
        processError(error, res);
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const result = await userService.deleteUser(~~id);
        
        res.send(result);
    } catch(error){
        processError(error, res);
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const { username, email, password } = req.body;
        const defaultRole = 'subscriber';

        const user = { 
            id: ~~id, 
            role: defaultRole, 
            username, 
            email, 
            password 
        }

        const result = await userService.updateUser(~~id, user);
        
        res.send(result);
    } catch(error){
        processError(error, res);
    }
}