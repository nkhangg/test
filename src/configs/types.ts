import { store } from '@/redux/store';
import { ISignDataResponse, IUser } from './interface';
export type ValidTags = keyof JSX.IntrinsicElements;
export type ApiGetUsers = () => Promise<IUser[]>;
export type ApiLogin = (data: UserFormType) => Promise<ISignDataResponse>;
export type ApiRegister = (data: RegisterFormData) => Promise<ISignDataResponse>;
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
export type SortType = string | null;

export type LocationTileType = 'center' | 'left' | 'right';

export type PagesProfileType = 'me' | 'history' | 'logout';

export type ValidateType = { message: string; error: boolean };

export type UserFormType = { username: string; password: string };
