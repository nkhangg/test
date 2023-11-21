import axios from '@/configs/axios';
import { IReviewAdminFillterForm } from '@/configs/interface';
import { ApiGetReview, ApiGetReviews } from '@/configs/types';

export const getReviews: ApiGetReviews = async (data: IReviewAdminFillterForm) => {
    let search = {};

    if (data.search.length > 0) {
        search = {
            productName: data.search,
        };
    }

    const res = await axios({
        method: 'GET',
        url: 'admin/reviews',
        params: {
            maxStar: data.maxStar,
            minStar: data.minStar,
            sort: data.sort,
            ...search,
        },
    });

    if (!res) return null;

    return res?.data;
};

export const getReview: ApiGetReview = async (id: string) => {
    let search = {};

    const res = await axios({
        method: 'GET',
        url: 'admin/reviews/' + id,
    });

    if (!res) return null;

    return res?.data;
};
