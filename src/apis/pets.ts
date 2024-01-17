import { ApiPetDetailPage } from '@/configs/types';
import axios from '../configs/axios';
export const petDetail: ApiPetDetailPage = async (id: string) => {
    const res = await axios({
        method: 'GET',
        url: '/pets/' + id,
    });

    if (!res) return null;

    return res?.data;
};