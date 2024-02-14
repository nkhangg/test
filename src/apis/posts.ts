import { ApiDetailPost, ApiHightlightPostPage, ApiPostPage } from '@/configs/types';
import axios from '../configs/axios';
import { IParamsApiPostPage } from '@/configs/interface';
import Validate from '@/utils/validate';

export const hightlightPost: ApiHightlightPostPage = async () => {
    const res = await axios({
        method: 'GET',
        url: 'posts/hightlight',
    });

    if (!res) return null;

    return res?.data;
};

export const hightlightOfUserPost: ApiHightlightPostPage = async (data: IParamsApiPostPage) => {
    if (!data.username) return null;

    const res = await axios({
        method: 'GET',
        url: 'posts/hightlight/' + data.username,
    });

    if (!res) return null;

    return res?.data;
};

export const getPosts: ApiPostPage = async (prevParams: IParamsApiPostPage) => {
    const params: { page?: number; search?: string } = {};

    if ((prevParams.page && Validate.isNumber(prevParams.page + '')) || (prevParams.search && Validate.isBlank(prevParams.search))) {
        params.page = Number(prevParams.page) - 1;
        params.search = prevParams.search;
    } else {
        if (params.page || params.search) {
            delete params.page;
            delete params.search;
        }
    }

    const res = await axios({
        method: 'GET',
        url: 'posts',
        params,
    });

    if (!res) return null;

    return res?.data;
};

export const getPostsOfUser: ApiPostPage = async (prevParams: IParamsApiPostPage) => {
    if (!prevParams.username) return null;

    const params: { page?: number; type?: string } = {};

    if (prevParams.page && Validate.isNumber(prevParams.page + '')) {
        params.page = Number(prevParams.page) - 1;
    } else {
        if (params.page || params.type) {
            delete params.page;
        }
    }
    params.type = prevParams.type;

    const res = await axios({
        method: 'GET',
        url: 'posts/' + prevParams.username,
        params: {
            ...params,
            type: params.type ? params.type : 'posts',
        },
    });

    if (!res) return null;

    return res?.data;
};

export const getDetailPost: ApiDetailPost = async (id: string) => {
    const res = await axios({
        method: 'GET',
        url: 'posts/detail/' + id,
    });

    if (!res) return null;

    return res?.data;
};
