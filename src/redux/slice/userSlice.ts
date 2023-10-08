import { login } from '@/apis/user';
import { IInitAppStoreState, ILoginDataResponse, IUser } from '@/configs/interface';
import { UserFormType } from '@/configs/types';
import { getTokenFromCookie } from '@/utils/cookie';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export const fetchUserByToken = createAsyncThunk('user/fetchUserByToken', async () => {
    const token = getTokenFromCookie();

    if (!token || token === '' || token === 'null') return null;
    const res: { id: string; username: string; avatar: string; role: boolean } = await new Promise((resovle, reject) => {
        setTimeout(() => {
            const curUser: { id: string; username: string; avatar: string; role: boolean } = {
                id: 'user001',
                username: 'khangpn',
                avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuEvKHSodSNlROQYDU-lUWHH1MI8RmCbFl2xpisFnQ&s',
                role: false,
            };

            resovle(curUser);
        }, 500);
    });

    return res;
});

// init a store for app
interface IInitUserStoreState {
    user: null | { id: string; username: string; avatar: string; role: boolean };
    token: string;
    loading: boolean;
}

const initState: IInitUserStoreState = {
    user: null,
    token: getTokenFromCookie() || '',
    loading: false,
};

export const user = createSlice({
    name: 'user',
    initialState: initState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserByToken.pending, (state, action) => {
            state.loading = true;
        }),
            builder.addCase(fetchUserByToken.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            }),
            builder.addCase(fetchUserByToken.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
            });
    },
});

export const { setToken } = user.actions;
export default user.reducer;
