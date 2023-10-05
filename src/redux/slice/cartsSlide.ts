import { ICart, IInitAppStoreState, IUser } from '@/configs/interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// init a store for app

const initState: { carts: ICart[] } = {
    carts: [],
};

export const cart = createSlice({
    name: 'cart',
    initialState: initState,
    reducers: {
        addCart: (state, action: PayloadAction<ICart>) => {
            state.carts.push(action.payload);
        },
        removeCart: (state, action: PayloadAction<ICart>) => {
            let newCarts = state.carts.filter((item) => {
                return item.id != action.payload.id;
            });
            return {
                ...state,
                carts: [...newCarts],
            };
        },
    },
});

export const { addCart, removeCart } = cart.actions;
export default cart.reducer;
