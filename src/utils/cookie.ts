import { RoleType } from '@/configs/types';
import Cookies from 'js-cookie';

export const setTokenToCookie = (token: string) => {
    Cookies.set('token', token, { path: '' });
};

export const setRoleToCookie = (role: RoleType) => {
    Cookies.set('role', role, { path: '/' });
};

export const getTokenFromCookie = () => {
    const token = Cookies.get('token');

    return token;
};

export const clearToken = () => {
    Cookies.remove('token', { path: '' });
    Cookies.remove('role', { path: '/' });
};
