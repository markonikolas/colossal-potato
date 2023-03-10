import * as PostService from '../services/PostService';

import { Request, Response } from 'express';

import { processError } from '../util/errors/ProcessError';

export const getAllPosts = async (req: Request, res: Response) => {
    try {
        const { limit } = req.query;
        let result = await PostService.getAllPosts();

        if (limit) {
            result = result.slice(0, ~~limit);
        }

        res.send(result);
    } catch (error) {
        processError(error, res);
    }
}

export const getPostById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await PostService.getPostById(~~id);

        res.send(result);
    } catch (error) {
        processError(error, res);
    }
}

export const createPost = async (req: Request, res: Response) => {
    try {
        const result = await PostService.createPost(req.body);

        res.send(result)
    } catch (error) {
        processError(error, res);
    }
}

export const deletePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await PostService.deletePost(~~id);

        res.send(result)
    } catch (error) {
        processError(error, res);
    }
}

export const updatePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, content, img, author_id } = req.body;

        const result = await PostService.updatePost(~~id, { title, content, img, author_id });

        res.send(result)
    } catch (error) {
        processError(error, res);
    }
}