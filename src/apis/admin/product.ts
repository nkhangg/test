import axios from '@/configs/axios';
import { ApiDeleteProduct, ApiDetailProductManaege, ApiProductsManage } from '@/configs/types';

export const productManage: ApiProductsManage = async (page: number | undefined) => {
    const res = await axios({
        method: 'GET',
        url: 'admin/product/',
        params: {
            page: page || 0,
        },
    });

    if (!res) return null;

    return res?.data;
};

export const detailProductManage: ApiDetailProductManaege = async (id: string) => {
    const res = await axios({
        method: 'GET',
        url: 'admin/product/' + id,
    });

    if (!res) return null;

    return res?.data;
};

export const deleteProduct: ApiDeleteProduct = async (id: string) => {
    const res = await axios({
        method: 'DELETE',
        url: 'admin/product/' + id,
    });

    if (!res) return null;

    return res?.data;
};
