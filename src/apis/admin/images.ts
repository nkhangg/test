import axios from '@/configs/axios';
import { ApiCreateImagesByProduct, ApiDeleteImagesByProduct, ApiProductsManage } from '@/configs/types';

export const addImagesByIdProduct: ApiCreateImagesByProduct = async (id: string, files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => {
        formData.append('images', file);
    });

    const res = await axios({
        method: 'POST',
        url: 'admin/images/' + id,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        data: formData,
    });

    if (!res) return null;

    return res?.data;
};
export const deleteImagesByIdProduct: ApiDeleteImagesByProduct = async (data: { id: string; idImage: number }) => {
    const { id, idImage } = data;
    const res = await axios({
        method: 'DELETE',
        url: `admin/images/${id}/${idImage}`,
    });

    if (!res) return null;

    return res?.data;
};