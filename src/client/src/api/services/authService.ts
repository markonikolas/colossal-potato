import * as authClient from '../client/authClient';

export const signin = async (username: string, password: string) => {
    const token = await authClient.signin(username, password);

    localStorage.setItem('colossal-potato-at', JSON.stringify(token.accessToken));
    localStorage.setItem('isAuthenticated', 'true');

    return token;
};

export const signout = async () => {
    localStorage.removeItem('token');
    localStorage.setItem('isAuthenticated', 'false');

    await authClient.signout();
};

export const signup = async (username: string, email: string, password: string) => {
    await authClient.signup(username, email, password);
};