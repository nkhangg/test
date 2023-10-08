import { IInitAppStoreState, IUser } from '@/configs/interface';
import { getTokenFromCookie } from '@/utils/cookie';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export const loginRedux = createAsyncThunk('app/login', async () => {});

// init a store for app

const initState: IInitAppStoreState = {
    numberCart: 0,
    user: null,
};

export const app = createSlice({
    name: 'app',
    initialState: initState,
    reducers: {
        increment: (state) => {
            state.numberCart++;
        },
        descrement: (state) => {
            state.numberCart--;
        },

        addUser: (state, action: PayloadAction<IUser>) => {
            return {
                ...state,
                user: {
                    ...action.payload,
                },
            };
        },
    },
});

export const { increment, descrement, addUser } = app.actions;
export default app.reducer;
