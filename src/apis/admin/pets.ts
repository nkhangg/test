import { ApiFilterPets, ApiFilterPetsAdmin } from '@/configs/types';
import axios from '../../configs/axios';
import { IRequestFilterPetAdmin } from '@/configs/interface';

export const filterPetsAdmin: ApiFilterPetsAdmin = async (params: IRequestFilterPetAdmin) => {
    if (params.name && params.name.length <= 0) {
        delete params.name;
    }

    if (params.status && params.status.toLocaleLowerCase() == 'all') {
        delete params.status;
    }

    const res = await axios({
        method: 'GET',
        url: '/admin/pets',
        params,
    });

    if (!res) return null;

    return res?.data;
};
