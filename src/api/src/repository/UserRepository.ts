import { PrismaClient } from '../prisma';

import ExtError from '../util/errors/ExtError';
import HTTP_STATUS from '../enum/HttpStatus.js';

import { ICreateUserDto, IUserType } from '../types/user';

const prisma = new PrismaClient();
const users = prisma.user;

function exclude<User, Key extends keyof User>(
    user: User,
    ...keys: Key[]
): Omit<User, Key> {
    for (let key of keys) {
        delete user[key]
    }
    return user;
}

export const getAllUsers = async () => {
    const allUsers = await users.findMany();

    return allUsers;
}

export const getUserById = async (id: number) => {
    const user = await users.findUnique({
        where: {
            id
        },
    });

    if (!user)
        throw new ExtError(HTTP_STATUS.NOT_FOUND, "User with the given ID was not found.");

    return user;
}

export const getUserByEmail = async (email: string) => {
    const user = await users.findUnique({
        where: {
            email
        }
    });

    if (user) {
        return user;
    }
}

const checkIfTaken = (userId: number) => async (type: string, field: string) => {
    const where = {
        NOT: [
            {
                id: {
                    equals: userId
                }

            }
        ],
        OR: [
            {
                [type]: {
                    equals: field
                }
            }
        ]
    }

    const fieldTaken = await users.findMany({ where });

    return !!fieldTaken.length;
}

export const getUserByUsername = async (username: string) => {
    const user = await users.findUnique({
        where: {
            username
        }
    });

    if (user) {
        return user;
    }
}

export const createUser = async (data: ICreateUserDto) => {
    const { email, username } = data;
    const emailExists = await getUserByEmail(email);
    const usernameExists = await getUserByUsername(username);

    if (emailExists)
        throw new ExtError(HTTP_STATUS.BAD_REQUEST, "The user with the given email already exists.");

    if (usernameExists)
        throw new ExtError(HTTP_STATUS.BAD_REQUEST, "The user with the given username already exists.");

    const user = await users.create({ data });

    if (!user)
        throw new ExtError(HTTP_STATUS.BAD_REQUEST, "The data you provided is invalid.");

    return user;
}

export const deleteUser = async (id: number) => {
    const userExists = await getUserById(id);

    if (!userExists)
        throw new ExtError(HTTP_STATUS.NOT_FOUND, "User with the given ID was not found.");

    const user = await users.delete({
        where: {
            id
        }
    })

    if (user) {
        return user;
    }
}

export const updateUser = async (id: number, data: IUserType) => {
    const { username, email } = data;
    const userExists = await getUserById(id);
    const checkIfFieldTaken = checkIfTaken(id);
    const isEmailTaken = await checkIfFieldTaken('email', email);
    const isUsernameTaken = await checkIfFieldTaken('username', username);

    if (!userExists)
        throw new ExtError(HTTP_STATUS.NOT_FOUND, "User with the given ID was not found.");

    if (isEmailTaken) {
        throw new ExtError(HTTP_STATUS.BAD_REQUEST, 'The given email address is already in use.');
    }

    if (isUsernameTaken) {
        throw new ExtError(HTTP_STATUS.BAD_REQUEST, 'The given username is already in use.');
    }

    const user = await users.update({
        where: {
            id
        },
        data,
    })

    if (user) {
        return user;
    }
}
