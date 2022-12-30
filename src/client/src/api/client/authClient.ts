import axiosInstance from '../instance/axiosInstance';

export const signin = async (username: string, password: string) => {
    const response = await axiosInstance.post('/auth/signin', {
        username,
        password
    });

    return response.data;
}

export const signout = async () => {
    const response = await axiosInstance.post('/auth/signout');

    return response.data;
}

export const signup = async (username: string, email: string, password: string) => {
    const response = await axiosInstance.post('/auth/signup', {
        username,
        email,
        password
    });

    return response.data;
}