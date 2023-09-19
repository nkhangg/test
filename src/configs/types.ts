import { store } from '@/redux/store';
import { IUser } from './interface';
export type ValidTags = keyof JSX.IntrinsicElements;
export type ApiGetUsers = () => Promise<IUser[]>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
