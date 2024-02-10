import { ApiGetTransaction } from '@/configs/types';
import axios from 'axios';

export const getTransaction: ApiGetTransaction = async (page?: string) => {
    const res = await axios({
        method: 'GET',
        url: process.env.NEXT_PUBLIC_API_BASE_CASSO + 'transactions',
        headers: {
            Authorization: process.env.NEXT_PUBLIC_API_KEY,
            'Content-Type': 'application/json',
        },
        params: {
            page,
        },
    });

    if (!res) return null;

    return res?.data;
};
