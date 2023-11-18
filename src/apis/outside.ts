import { IDistrict, IProvinces } from '@/configs/interface';
import { ApiGetShippingFee, DataFormShippingFee } from '@/configs/type-ousite';
import { ApiProvinces } from '@/configs/types';
import { contants } from '@/utils/contants';
import axios from 'axios';

// address

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

// // shiping
// export const getShippingFee: ApiGetShippingFee = async (data: DataFormShippingFee) => {
//     const res = await axios({
//         method: 'GET',
//         url: 'https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee',

//         // params: {
//         //     pick_province: data.info.address.province,
//         //     pick_district: data.info.address.district,
//         //     province: data.info.address.province,
//         //     district: data.info.address.district,
//         //     address: data.info.address.address,
//         //     weight: data.weight,
//         //     value: data.value,
//         //     transport: 'fly',
//         //     deliver_option: 'xteam',
//         // },
//     });

//     if (!res) return null;

//     return res?.data;
// };
