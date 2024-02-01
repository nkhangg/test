import { ApiAdoption, ApiAdoptions, ApiCancelAdoption, ApiFilterPets, ApiPetAttributes, ApiPetDetailPage, ApiPetFavorite } from '@/configs/types';
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

export const getAdoptions: ApiAdoptions = async () => {
    const res = await axios({
        method: 'GET',
        url: '/user/adopts',
    });

    if (!res) return null;

    return res?.data;
};

export const adoptionPet: ApiAdoption = async (data: { userId: string; petId: string }) => {
    const res = await axios({
        method: 'POST',
        url: '/user/adopts',
        data,
    });

    if (!res) return null;

    return res?.data;
};

export const cancelAdoptionPet: ApiCancelAdoption = async (petId: string) => {
    const res = await axios({
        method: 'PUT',
        url: '/user/adopts' + `/${petId}`,
        data: {
            cancelReason: 'Personal reason',
        },
    });

    if (!res) return null;

    return res?.data;
};
