import axios from '@/configs/axios';
import { IReviewAdminFillterForm } from '@/configs/interface';
import { ApiGetReviews } from '@/configs/types';

export const getReviews: ApiGetReviews = async (data: IReviewAdminFillterForm) => {
    const res = await axios({
        method: 'GET',
        url: 'admin/reviews',
        params: {
            maxStar: data.maxStar,
            minStar: data.minStar,
            productName: data.search,
            sort: data.sort,
        },
    });

    if (!res) return null;

    return res?.data;
};
