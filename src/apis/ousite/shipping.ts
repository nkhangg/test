import axios from 'axios';
import { ApiGetShippingFee, DataFormShippingFee } from '@/configs/type-ousite';
import { contants } from '@/utils/contants';

// shiping
export const getShippingFee: ApiGetShippingFee = async (data: DataFormShippingFee) => {
    const res = await axios({
        method: 'GET',
        url: contants.apis.ghtk.shippingFee,
        headers: {
            token: '92c871bb-84d1-11ee-b394-8ac29577e80e',
        },
        params: {
            pick_province: data.info.address.province,
            pick_district: data.info.address.district,
            province: data.info.address.province,
            district: data.info.address.district,
            address: data.info.address.address,
            weight: data.weight,
            value: data.value,
            transport: 'fly',
            deliver_option: 'xteam',
        },
    });

    if (!res) return null;

    return res?.data;
};
