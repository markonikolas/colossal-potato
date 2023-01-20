import * as userRepository from "../repository/UserRepository";
import { IUserSigninDetails, IUserType } from '../types/user';

import { generatePasswordHash } from "../util/authentication/authenticationFunctions";

export const getAllUsers = async () => await userRepository.getAllUsers();

export const getUserById = async (id: number) => await userRepository.getUserById(id);

export const deleteUser = async (id: number) => await userRepository.deleteUser(id);

export const createUser = async (data: IUserSigninDetails) => {
    const { username, email, password } = data;

    return await userRepository.createUser({ username, email, password: generateUserPassword(password) });
}

export const updateUser = async (id: number, data: IUserType) => {
    const protectedData = { ...data, password: generateUserPassword(data.password) }

    return await userRepository.updateUser(id, protectedData);
}

export const generateUserPassword = (password: string) => {
    const passwordHash: string = generatePasswordHash(password);

    return passwordHash;
}