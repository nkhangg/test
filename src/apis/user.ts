import { ApiLogin, ApiRegister } from '@/configs/types';
import axios from '../configs/axios';
import { setTokenToCookie } from '@/utils/cookie';

export const login: ApiLogin = async (data) => {
    const res = await axios({
        method: 'POST',
        url: 'login',
        data,
    });

    if (!res) return null;

    setTokenToCookie(res?.data.token);
    return res?.data;
};
export const register: ApiRegister = async (data) => {
    const res = await axios({
        method: 'POST',
        url: 'register',
        data,
    });

    if (!res) return null;

    return res?.data;
};
