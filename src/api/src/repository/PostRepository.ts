import { PrismaClient } from '../prisma';
import ExtError from '../util/errors/ExtError';

import HTTP_STATUS from '../enum/HttpStatus';

import { ICreatePostDto } from '../types/post';

const prisma = new PrismaClient();
const posts = prisma.post;

export const getAllPosts = async () => await posts.findMany();

export const getPostById = async (id: number) => {
	const post = await posts.findUnique({
		where: {
			id,
		},
	});

	if (!post) {
		throw new ExtError(HTTP_STATUS.NOT_FOUND, 'Post with the given ID was not found.');
	}

	return post;
};

export const createPost = async (data: ICreatePostDto) => {

	const post = await posts.create({ data });

	if (!post) {
		throw new ExtError(HTTP_STATUS.BAD_REQUEST, 'An error occured, post body not valid.');
	}

	return post;
};

export const deletePost = async (id: number) => {
	const postExists = await getPostById(id);

	if (!postExists) {
		throw new ExtError(HTTP_STATUS.NOT_FOUND, 'Post with the given ID was not found.');
	}

	const post = await posts.delete({
		where: {
			id,
		},
	});

	return post;
};

export const updatePost = async (id: number, data: ICreatePostDto) => {
	const postExists = await getPostById(id);

	if (!postExists) {
		throw new ExtError(HTTP_STATUS.NOT_FOUND, 'Post with the given ID was not found.');
	}

	const post = await posts.update({
		where: {
			id,
		},
		data,
	});

	return post;
};
