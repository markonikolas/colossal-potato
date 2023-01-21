import { IUserSigninDetails } from '../types/user';
import { generateUserPassword } from "../util/authentication/authenticationFunctions";

import bcrypt from 'bcrypt';

import * as hashingService from '../http/services/hashesService';
import * as saltingService from '../http/services/saltsService';

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
    const { username, email, password: plainTextPassword } = data;
    const salt = bcrypt.genSaltSync();
    const password = generateUserPassword(plainTextPassword, salt);

    const isHashSaved = await hashingService.setHash(username, password);
    const isSaltSaved = await saltingService.setSalt(username, salt);

    if (isHashSaved && isSaltSaved) {
        return await userRepository.createUser({ username, email });
    }
}

// export const updateUser = async (id: number, userData: IUserType) => {
//     const { password, ...data } = userData;

//     return await userRepository.updateUser(id, { ...data, password: generatePasswordHash(password) });
// }