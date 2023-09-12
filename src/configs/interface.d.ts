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

export interface IInitAppStoreState {
    numberCart: number;
    user: IUser | null;
}
