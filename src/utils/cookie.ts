import Cookies from 'js-cookie';

export const setTokenToCookie = (token: string) => {
    Cookies.set('token', token, { path: '' });
};

export const getTokenFromCookie = () => {
    const token = Cookies.get('token');

    return token;
};

export const clearToken = () => {
    Cookies.remove('token', { path: '' });
};
