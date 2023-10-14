import { store } from '@/redux/store';

import { ApiBestSeller, ApiTakeAction, IBaseResponse, IDetailProduct, IProductRevenue, IProfile, IReports, ISalesOverviews, ISignDataResponse, IUser } from './interface';
export type ValidTags = keyof JSX.IntrinsicElements;

export type ApiGetUsers = () => Promise<IUser[]>;

export type ApiLogin = (data: UserFormType) => Promise<ISignDataResponse>;

export type ApiRegister = (data: RegisterFormData) => Promise<ISignDataResponse>;

export type ApiTakeActionType = () => Promise<IBaseResponse<ApiTakeAction>>;

export type ApiDetailProductType = (idProduct: string) => Promise<IBaseResponse<IDetailProduct>>;

export type ApiReportType = () => Promise<IBaseResponse<IReports>>;

export type ApiSlaesOverviewType = (year: string) => Promise<IBaseResponse<ISalesOverviews>>;

export type ApiRevenueDateType = (dates: { start?: string; end?: string }) => Promise<IBaseResponse<IProductRevenue>>;

export type ApiBestSellerType = (page: number | undefined) => Promise<IBaseResponse<ApiBestSeller>>;

export type ApiGetCurUser = () => Promise<IBaseResponse<IProfile>>;

export type ApiUpdateCurUser = (data: DataRequestUpdateUser) => Promise<IBaseResponse<IProfile>>;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type RegisterFormData = {
    username: string;
    gender: string | boolean;
    fullname: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export type ProfileType = {
    fullname: string;
    email: string;
    phone: string;
    gender: string;
    birthday: string;
    address: string;
};

export type DataRequestUpdateUser = {
    fullname: string;
    email: string;
    phone: string;
    gender: string;
    birthday: string;
    address: string;
    avatar?: string;
};

export type SortType = string | null;

export type LocationTileType = 'center' | 'left' | 'right';

export type PagesProfileType = 'me' | 'history' | 'logout';

export type ValidateType = { message: string; error: boolean };

export type UserFormType = { username: string; password: string };

export type RepoType = {
    size: number;
    quantity: number;
    inPrice: number;
    outPrice: number;
};
export type RepoTypeErrors = {
    size: string;
    quantity: string;
    inPrice: string;
    outPrice: string;
};

export type ModeType = 'create' | 'update';
