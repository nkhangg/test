import axios from '@/configs/axios';
import axioss from 'axios';
import { DataProductType } from '@/configs/interface';
import { ApiCreateProduct, ApiDelete, ApiDetailProductManaege, ApiProductsManage, ApiUpdateProduct } from '@/configs/types';

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

export const deleteProduct: ApiDelete = async (id: string) => {
    const res = await axios({
        method: 'DELETE',
        url: 'admin/product/' + id,
    });

    if (!res) return null;

    return res?.data;
};

export const updateProduct: ApiUpdateProduct = async (data: DataProductType) => {
    const res = await axios({
        method: 'POST',
        url: 'admin/product/' + data.id,
        data: {
            name: data.name,
            desc: data.description,
            productType: data.type,
            brand: data.brand,
            productsRepo: data.repo,
        },
    });

    if (!res) return null;

    return res?.data;
};

export const createProduct: ApiCreateProduct = async (data: DataProductType) => {
    const res = await axios({
        method: 'POST',
        url: 'admin/product/',
        data: {
            name: data.name,
            desc: data.description,
            productType: data.type,
            brand: data.brand,
            productsRepo: data.repo.map((item) => {
                return {
                    ...item,
                    inStock: true,
                };
            }),
        },
    });

    if (!res) return null;

    return res?.data;
};
