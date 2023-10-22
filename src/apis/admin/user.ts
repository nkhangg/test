import axios from '@/configs/axios';
import { IUserManage } from '@/configs/interface';
import { ApiAllUser, ApiCreateUserManage, ApiDelete, ApiGetUserManage, ApiUpdateUserManage } from '@/configs/types';
import { dataURLtoFile } from '@/utils/format';

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

export const getUserManage: ApiGetUserManage = async (id: string) => {
    const res = await axios({
        method: 'GET',
        url: 'admin/users/' + id,
    });

    if (!res) return null;

    return res?.data;
};

export const updateUserManage: ApiUpdateUserManage = async (data: IUserManage) => {
    const res = await axios({
        method: 'PUT',
        url: 'admin/users',
        headers: {
            'Content-type': 'multipart/form-data',
        },
        data: {
            id: data.id,
            fullname: data.fullname,
            birthday: data.birthday,
            gender: data.gender,
            phone: data.phone,
            address: data.address,
            avatar: data.avatar ? dataURLtoFile(data.avatar) : null,
        },
    });

    if (!res) return null;

    return res?.data;
};

export const createUserManage: ApiCreateUserManage = async (data: IUserManage) => {
    const res = await axios({
        method: 'POST',
        url: 'admin/users',
        headers: {
            'Content-type': 'multipart/form-data',
        },
        data: {
            username: data.username,
            fullname: data.fullname,
            birthday: data.birthday,
            gender: data.gender,
            phone: data.phone,
            email: data.email,
            address: data.address,
            role: data.role,
            password: data.password,
            avatar: data.avatar ? dataURLtoFile(data.avatar) : null,
        },
    });

    if (!res) return null;

    return res?.data;
};