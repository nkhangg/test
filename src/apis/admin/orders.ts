import axios from '@/configs/axios';
import { ApiGetOrders } from '@/configs/types';

export const getOrdersAdmin: ApiGetOrders = async () => {
    const res = await axios({
        method: 'GET',
        url: 'admin/orders',
    });

    if (!res) return null;

    return res?.data;
};
