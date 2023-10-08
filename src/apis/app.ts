import { ApiGetUsers, ApiLogin } from '@/configs/types';
import axios from '../configs/axios';
import { setTokenToCookie } from '@/utils/cookie';

export const getUsers: ApiGetUsers = async () => {
    const res = await axios({
        method: 'GET',
        url: 'login',
    });

    if (!res) return null;

    return res?.data;
};
