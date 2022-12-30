import { PrismaClient } from '../prisma';
import ExtError from '../util/errors/ExtError';

import HTTP_STATUS from '../enum/HttpStatus';

import { PostType } from '../types/post';

const prisma = new PrismaClient();
const postsTable = prisma.post;

export const getAllPosts = async () => {
    const posts = await postsTable.findMany();

    return posts;
}

export const getPostById = async (id: number) => {
    const post = await postsTable.findUnique({
        where: {
            id
        }
    });

    if (!post) {
        throw new ExtError(HTTP_STATUS.NOT_FOUND, "Post with the given ID was not found.")
    }

    return post;
}

export const createPost = async ({ title, content, img, author_id }: PostType) => {
    const post = await postsTable.create({
        data: {
            title,
            content,
            img,
            author_id
        }
    })

    if (!post) {
        throw new ExtError(HTTP_STATUS.BAD_REQUEST, "An error occured, post body not valid.")
    }

    return post;
}

export const deletePost = async (id: number) => {
    const postExists = await getPostById(id);

    if (!postExists) {
        throw new ExtError(HTTP_STATUS.NOT_FOUND, "Post with the given ID was not found.")
    }

    const post = await postsTable.delete({
        where: {
            id
        }
    })

    return post;
}

export const updatePost = async (id: number, data: PostType) => {
    const postExists = await getPostById(id);

    if (!postExists) {
        throw new ExtError(HTTP_STATUS.NOT_FOUND, "Post with the given ID was not found.")
    }

    const post = await postsTable.update({
        where: {
            id
        },
        data
    })

    return post;
}