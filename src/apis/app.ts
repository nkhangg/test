import { ApiBestSellerType, ApiGetUsers, ApiHistory, ApiLogin, ApiTakeActionType } from '@/configs/types';
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

export const takeAction: ApiTakeActionType = async () => {
    const res = await axios({
        method: 'GET',
        url: 'take-action',
    });

    if (!res) return null;

    return res?.data;
};

export const bestSellers: ApiBestSellerType = async (page: number | undefined) => {
    const res = await axios({
        method: 'GET',
        url: 'take-action/best-sellers',
        params: {
            page: page || 0,
        },
    });

    if (!res) return null;

    return res?.data;
};

export const otherHistory: ApiHistory = async (page: number | undefined) => {
    const res = await axios({
        method: 'GET',
        url: 'user/order/history',
        params: {
            page: page || 0,
        },
    });

    if (!res) return null;

    return res?.data;
};
