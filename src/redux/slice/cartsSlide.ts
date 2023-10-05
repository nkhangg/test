import { ICart, IInitAppStoreState, IUser } from '@/configs/interface';
import { dataCart } from '@/datas/cart-data';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// init a store for app

const initState: { cartUser: ICart[] } = {
    cartUser: [],
};

export const cart = createSlice({
    name: 'cart',
    initialState: initState,
    reducers: {
        addCart: (state, action: PayloadAction<ICart>) => {
            const index = state.cartUser.indexOf(action.payload);

            console.log('index in store: ' + index);

            return {
                ...state,
                cartUser: [...state.cartUser, action.payload],
            };
        },
        removeCart: (state, action: PayloadAction<{ data: ICart; index: number }>) => {
            console.log(action.payload.index);

            state.cartUser.splice(action.payload.index, 1);
        },
    },
});

export const { addCart, removeCart } = cart.actions;
export default cart.reducer;
