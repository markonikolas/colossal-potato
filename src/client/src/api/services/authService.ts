import * as authClient from '../client/authClient';

export const signin = async (username: string, password: string) => {
    const token = await authClient.signin(username, password)

    localStorage.setItem('token', JSON.stringify(token.accessToken));
    localStorage.setItem('loggedIn', 'true');

    return token;
};

export const signout = async () => {
    localStorage.setItem('token', '');
    localStorage.setItem('loggedIn', 'false');

    await authClient.signout();
};

export const signup = async (username: string, email: string, password: string) => {
    await authClient.signup(username, email, password);
};