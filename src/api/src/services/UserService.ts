import { IUserSigninDetails, IUserType } from '../types/user';
import { generatePasswordHash } from "../util/authentication/authenticationFunctions";

import * as userRepository from "../repository/UserRepository";

export const getAllUsers = async () => {
    return await userRepository.getAllUsers();
}

export const getUserById = async (id: number) => {
    return await userRepository.getUserById(id);
}

export const deleteUser = async (id: number) => {
    return await userRepository.deleteUser(id);
}

export const createUser = async (data: IUserSigninDetails) => {
    const { username, email, password } = data;

    return await userRepository.createUser({ username, email, password: generatePasswordHash(password) });
}

export const updateUser = async (id: number, userData: IUserType) => {
    const { password, ...data } = userData;

    return await userRepository.updateUser(id, { ...data, password: generatePasswordHash(password) });
}