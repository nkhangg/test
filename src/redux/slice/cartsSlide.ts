import { ICart, IInitAppStoreState, IUser } from '@/configs/interface';
import { dataCart } from '@/datas/cart-data';
import { addCartTolocal, getCartFromLocal } from '@/utils/localStorege';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// init a store for app
const initState: { cartUser: ICart[]; checkAll: boolean } = {
    cartUser: (getCartFromLocal() as ICart[]) || [],
    checkAll: ((): boolean => {
        const arrCart = (getCartFromLocal() as ICart[]) || [];
        const checkAll = arrCart.every((item) => {
            return item.checked;
        });
        return checkAll;
    })(),
};

export const cart = createSlice({
    name: 'cart',
    initialState: initState,
    reducers: {
        addCart: (state, action: PayloadAction<ICart>) => {
            const item = state.cartUser.find((i) => i.id === action.payload.id && i.size === action.payload.size);

            if (item) {
                item.quantity = action.payload.quantity + item.quantity;
                addCartTolocal(state.cartUser);

                return;
            }

            const newObj = {
                ...state,
                cartUser: [...state.cartUser, action.payload],
            };
            addCartTolocal(newObj.cartUser);

            console.log(newObj.cartUser);

            return {
                ...newObj,
            };
        },

        modifyQuantity: (state, action: PayloadAction<ICart>) => {
            const item = state.cartUser.find((i) => i.id === action.payload.id && i.size === action.payload.size);

            if (item) {
                item.quantity = action.payload.quantity;
                addCartTolocal(state.cartUser);
                return;
            }
        },

        modifyChecked: (state, action: PayloadAction<{ data: ICart; checked: boolean }>) => {
            const item = state.cartUser.find((i) => i.id === action.payload.data.id && i.size === action.payload.data.size);

            if (item) {
                item.checked = action.payload.checked;
                addCartTolocal(state.cartUser);

                const checkAll = state.cartUser.every((item) => {
                    return item.checked;
                });

                state.checkAll = checkAll;
                return;
            }
        },

        checkedAll: (state, action: PayloadAction<{ checked: boolean }>) => {
            const newCartUser = state.cartUser.map((item) => {
                return {
                    ...item,
                    checked: action.payload.checked,
                };
            });

            addCartTolocal(newCartUser);
            return {
                ...state,
                cartUser: [...newCartUser],
            };
        },

        setCheckedAllCartItem: (state, action: PayloadAction<boolean>) => {
            state.checkAll = action.payload;
        },

        removeCart: (state, action: PayloadAction<{ data: ICart; index: number }>) => {
            state.cartUser.splice(action.payload.index, 1);
            addCartTolocal(state.cartUser);
        },

        updateDataCartWhenMount: (state, action: PayloadAction<ICart[]>) => {
            const newStateCartUser = [...state.cartUser];
            newStateCartUser.sort();
            action.payload.sort();
            const newCartUser = newStateCartUser.map((item, index) => {
                return {
                    ...item,
                    repo: action.payload[index].repo,
                };
            });
            addCartTolocal(newCartUser);
            return {
                ...state,
                cartUser: [...newCartUser],
            };
        },
    },
});

export const { addCart, removeCart, modifyQuantity, modifyChecked, checkedAll, setCheckedAllCartItem, updateDataCartWhenMount } = cart.actions;
export default cart.reducer;
