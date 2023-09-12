import { IInitAppStoreState, IUser } from '@/configs/interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
