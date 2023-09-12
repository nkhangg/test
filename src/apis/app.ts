import { ApiGetUsers } from '@/configs/types';
import axios from '../configs/axios';

export const getUsers: ApiGetUsers = async () => {
    const res = await axios({
        method: 'GET',
        url: 'https://jsonplaceholder.typicode.com/users',
    });

    if (!res) return null;

    return res?.data;
};
