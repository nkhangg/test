import axios from '@/configs/axios';
import { ApiAllUser, ApiDelete } from '@/configs/types';

export const usersManage: ApiAllUser = async (page: number | undefined) => {
    const res = await axios({
        method: 'GET',
        url: 'admin/users',
        params: {
            page,
        },
    });

    if (!res) return null;

    return res?.data;
};

export const deleteUser: ApiDelete = async (id: string) => {
    const res = await axios({
        method: 'DELETE',
        url: 'admin/users/' + id,
    });

    if (!res) return null;

    return res?.data;
};
