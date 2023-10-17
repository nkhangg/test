import axios from '@/configs/axios';
import { ApiAllUser } from '@/configs/types';

export const usersManage: ApiAllUser = async (page: number | undefined) => {
    const res = await axios({
        method: 'GET',
        url: 'admin/users',
    });

    if (!res) return null;

    return res?.data;
};
