import { IDistrict, IProvinces } from '@/configs/interface';
import { ApiProvinces } from '@/configs/types';
import { contants } from '@/utils/contants';
import axios from 'axios';

export const getProvinces: ApiProvinces<IProvinces[]> = async (data?: string | number) => {
    const res = await axios({
        method: 'GET',
        url: contants.apis.provinces,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!res) return null;

    return res?.data;
};

export const getDistrichts: ApiProvinces<IProvinces> = async (data?: string | number) => {
    const res = await axios({
        method: 'GET',
        url: contants.apis.districts(data || 0),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!res) return null;

    return res?.data;
};

export const getWards: ApiProvinces<IDistrict> = async (data?: string | number) => {
    const res = await axios({
        method: 'GET',
        url: contants.apis.wards(data || 0),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!res) return null;

    return res?.data;
};
