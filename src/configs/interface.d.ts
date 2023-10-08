import { UserFormType } from './types';

export interface Action<T, P> {
    readonly type: T;
    readonly data?: P;
}

export interface IResponce<T> {
    message: string;
    status: number;
    errors: boolean;
    data: T;
}

export interface IUser {
    id?: number;
    username: string;
    password: string;
    email?: string;
}
export interface ILoginDataResponse {
    message: string;
    token: string;
    errors: UserFormType | null;
}

export interface IProfile {
    id: string;
    username: string;
    fullname: string;
    email: string;
    phone: string;
    genther: boolean;
    birthday: number; // Cứ trả về Date trong java bình thường
}

export interface IInitAppStoreState {
    numberCart: number;
    user: IUser | null;
}

export interface IPet {
    id: string | number;
    name: string;
    image: string;
    breed: string;
    type: string;
    size: string;
    sex: string;
    fostered: string | number;
    description: string;
    fosterDate: number;
    like: boolean;
}
export interface IProduct {
    id: string | number;
    name: string;
    image: string;
    branch: string;
    size: string[] | number[];
    rating: number;
    price: number;
    oldPrice: number;
    discount: number;
}

export interface IPost {
    id: number | string;
    title: string;
    thumbnail: string;
    contents: string;
    createdAt: string | number;
    updatedAt: string | number;
}

export interface IPostsPreview {
    primary: IPost;
    propose: IPost[];
}

export interface ICart {
    id: string | number;
    image: string;
    name: string;
    branch: string;
    size: string | number;
    price: number;
    quantity: number;
    repo: number;
    checked?: boolean;
}

export interface IChart {
    title: string[]; // mảng các tháng
    data: {
        name: string; // tên mảng dữ liệu
        data: number[]; // mảng dữ liệu
    };
}
export interface IImpactOfYear {
    title: string; // mảng các tháng
    data: number;
}

export interface IStatisDashboard {
    revenue: ICart;
    product: IChart;
    impactOfYear: IImpactOfYear[];
}
