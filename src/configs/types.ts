import { store } from '@/redux/store';
import { ILoginDataResponse, IUser } from './interface';
export type ValidTags = keyof JSX.IntrinsicElements;
export type ApiGetUsers = () => Promise<IUser[]>;
export type ApiLogin = (data: UserFormType) => Promise<ILoginDataResponse>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type SortType = string | null;

export type LocationTileType = 'center' | 'left' | 'right';

export type PagesProfileType = 'me' | 'history' | 'logout';

export type ValidateType = { message: string; error: boolean };

export type UserFormType = { username: string; password: string };
