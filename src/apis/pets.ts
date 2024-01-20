import { ApiFilterPets, ApiPetAttributes, ApiPetDetailPage, ApiPetFavorite } from '@/configs/types';
import axios from '../configs/axios';
import { IRequestFilterPet } from '@/configs/interface';

export const petDetail: ApiPetDetailPage = async (id: string) => {
    const res = await axios({
        method: 'GET',
        url: '/pets/' + id,
    });

    if (!res) return null;

    return res?.data;
};

export const favorite: ApiPetFavorite = async (id: string) => {
    const res = await axios({
        method: 'PUT',
        url: '/user/pets/favorite/' + id,
    });

    if (!res) return null;

    return res?.data;
};

export const filterPets: ApiFilterPets = async (params: IRequestFilterPet) => {
    const res = await axios({
        method: 'GET',
        url: '/pets',
        params,
    });

    if (!res) return null;

    return res?.data;
};

export const getPetAttibutes: ApiPetAttributes = async () => {
    const res = await axios({
        method: 'GET',
        url: '/pets/attributes',
    });

    if (!res) return null;

    return res?.data;
};
