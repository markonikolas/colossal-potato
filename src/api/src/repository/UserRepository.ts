import { PrismaClient } from '../prisma';

import ExtError from '../util/errors/ExtError';
import HTTP_STATUS from '../enum/HttpStatus.js';

import { IUserSigninDetails, IUserType } from '../types/user';

const prisma = new PrismaClient();
const prismaUser = prisma.user;

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
    const users = await prismaUser.findMany();

    return users.map(user => exclude(user, 'password'));
}

export const getUserById = async (id: number) => {
    const user = await prismaUser.findUnique({
        where: {
            id
        },
    });

    if (!user)
        throw new ExtError(HTTP_STATUS.NOT_FOUND, "User with the given ID was not found.");

    return exclude(user, 'password');
}

export const getUserByEmail = async (email: string) => {
    const user = await prismaUser.findUnique({
        where: {
            email
        }
    });

    if (user) {
        return exclude(user, 'password');
    }
}

const checkIfTaken = (id: number) => async (type: string, field: string) => {
    const where = {
        NOT: [
            {
                id: {
                    equals: id
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

    const fieldTaken = await prismaUser.findMany({ where });

    return !!fieldTaken.length;
}

export const getUserByUsername = async (username: string) => {
    const user = await prismaUser.findUnique({
        where: {
            username
        }
    });

    if (user) {
        return exclude(user, 'password');
    }
}

export const createUser = async (data: IUserSigninDetails) => {
    const userEmailExists = await getUserByEmail(data.email);
    const userUsernameExists = await getUserByUsername(data.username);

    if (userEmailExists)
        throw new ExtError(HTTP_STATUS.BAD_REQUEST, "The user with the given email already exists.");

    if (userUsernameExists)
        throw new ExtError(HTTP_STATUS.BAD_REQUEST, "The user with the given username already exists.");

    const user = await prismaUser.create({ data })

    if (!user)
        throw new ExtError(HTTP_STATUS.BAD_REQUEST, "The data you provided is invalid.");

    return exclude(user, 'password');
}

export const deleteUser = async (id: number) => {
    const userFound = await getUserById(id);

    if (!userFound)
        throw new ExtError(HTTP_STATUS.NOT_FOUND, "User with the given ID was not found.");

    const user = await prismaUser.delete({
        where: {
            id
        }
    })

    if (user) {
        return exclude(user, 'password');
    }
}

export const updateUser = async (id: number, data: IUserType) => {
    const userFound = await getUserById(id);

    if (!userFound)
        throw new ExtError(HTTP_STATUS.NOT_FOUND, "User with the given ID was not found.");

    const checkIfFieldTaken = checkIfTaken(id);
    const emailTaken = await checkIfFieldTaken('email', data.email);
    const usernameTaken = await checkIfFieldTaken('username', data.username);

    if (emailTaken) {
        throw new ExtError(HTTP_STATUS.BAD_REQUEST, 'The given email address is already in use.');
    }

    if (usernameTaken) {
        throw new ExtError(HTTP_STATUS.BAD_REQUEST, 'The given username is already in use.');
    }

    const user = await prismaUser.update({
        where: {
            id
        },
        data,
    })

    if (user) {
        return exclude(user, 'password');
    }
}

export const getUserPassword = async (username: string) => {
    const user = await prismaUser.findUnique({
        where: {
            username
        }
    });

    return user?.password!;
}