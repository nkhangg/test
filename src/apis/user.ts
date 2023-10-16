import { ApiGetCurUser, ApiLogin, ApiRegister, ApiResetPassword, ApiUpdateCurUser, DataRequestUpdateUser } from '@/configs/types';
import axios from '../configs/axios';
import { setTokenToCookie } from '@/utils/cookie';
import { IProfile } from '@/configs/interface';
import { dataURLtoFile } from '@/utils/format';
import moment from 'moment';

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

export const curUser: ApiGetCurUser = async () => {
    const res = await axios({
        method: 'GET',
        url: 'user/profile',
    });

    if (!res) return null;

    return res?.data;
};

export const updateUser: ApiUpdateCurUser = async (data: DataRequestUpdateUser) => {
    console.log(data, { ...data, gender: data.gender === 'Male', avartar: data.avatar ? dataURLtoFile(data.avatar) : null, birthday: moment(data.birthday).format('D/MM/yyyy') });
    const res = await axios({
        method: 'POST',
        url: 'user/profile',
        headers: {
            'content-type': 'multipart/form-data',
        },
        data: {
            ...data,
            gender: data.gender === 'Male',
            avartar: data.avatar ? dataURLtoFile(data.avatar) : null,
            birthday: moment(data.birthday).format('D/MM/yyyy'),
        },
    });

    if (!res) return null;

    return res?.data;
};

export const resetPassword: ApiResetPassword = async (email: string) => {
    const res = await axios({
        method: 'POST',
        url: 'forgot-password',
        data: {
            email,
        },
    });

    if (!res) return null;

    return res?.data;
};
