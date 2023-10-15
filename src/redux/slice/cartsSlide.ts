import { ICart, IInitAppStoreState, IUser } from '@/configs/interface';
import { RootState } from '@/configs/types';
import { addCartTolocal, addPaymetnTolocal, getCartFromLocal, getPaymentFromLocal } from '@/utils/localStorege';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { pushNoty } from './appSlice';

export const getPayment = createAsyncThunk('cart/getPayment', (_, thunkApi) => {
    const { userReducer } = thunkApi.getState() as RootState;

    const username = userReducer.user?.username;
    if (!username || username === '') return [];

    const store = getPaymentFromLocal(username);

    console.log('store', store);

    if (!store) return [];

    return store.payment as ICart[];
});

export const addPaymentFromCard = createAsyncThunk('cart/addPaymentFromCard', (_, thunkApi) => {
    const { userReducer, cartReducer } = thunkApi.getState() as RootState;
    const username = userReducer.user?.username;
    if (!username || username === '') return { paymentItems: [], cartItems: [], username: '' };

    const paymentItems = cartReducer.cartUser.filter((item) => {
        return item.checked;
    });

    const cartItems = cartReducer.cartUser.filter((item) => {
        return !item.checked;
    });

    return {
        paymentItems,
        cartItems,
        username,
    };
});

export const clearAllPayment = createAsyncThunk('cart/clearAllPayment', (_, thunkApi) => {
    const { userReducer, cartReducer } = thunkApi.getState() as RootState;
    const username = userReducer.user?.username;
    if (!username || username === '') return { paymentItems: [], cartItems: [], username: '' };

    thunkApi.dispatch(
        pushNoty({
            open: true,
            title: 'Pay successfuly !, We will contact for you !. Thank you ❤️❤️❤️',
            plament: {
                horizontal: 'center',
                vertical: 'top',
            },
            autohide: 3000,
        }),
    );

    addPaymetnTolocal({ cart: cartReducer.cartUser, payment: [] }, username);
});

export const addPayment = createAsyncThunk('cart/addPayment', (data: ICart, thunkApi) => {
    const { userReducer } = thunkApi.getState() as RootState;
    const username = userReducer.user?.username;
    if (!username || username === '') return undefined;

    return {
        username,
        data,
    };
});

export const deletePayment = createAsyncThunk('cart/deletePayment', (index: number, thunkApi) => {
    const { userReducer } = thunkApi.getState() as RootState;
    const username = userReducer.user?.username;
    if (!username || username === '') return undefined;

    return {
        username,
        index,
    };
});

// init a store for app
const initState: { cartUser: ICart[]; checkAll: boolean; payment: ICart[] } = {
    cartUser: (getCartFromLocal() as ICart[]) || [],
    checkAll: ((): boolean => {
        const arrCart = (getCartFromLocal() as ICart[]) || [];
        const checkAll = arrCart.every((item) => {
            return item.checked;
        });
        return checkAll;
    })(),
    payment: [],
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
    extraReducers: (builder) => {
        builder.addCase(getPayment.pending, (state, action) => {}),
            builder.addCase(getPayment.fulfilled, (state, action) => {
                state.payment = action.payload;
            }),
            builder.addCase(getPayment.rejected, (state, action) => {}),
            builder.addCase(addPaymentFromCard.fulfilled, (state, action) => {
                if (!action.payload?.username || action.payload.paymentItems.length <= 0) {
                    return;
                }

                const data = {
                    cart: action.payload.cartItems,
                    payment: action.payload.paymentItems,
                };

                addCartTolocal(data.cart);
                addPaymetnTolocal({ ...data }, action.payload.username);

                return {
                    ...state,
                    cartUser: [...data.cart],
                    payment: [...data.payment],
                };
            });
        builder.addCase(addPayment.fulfilled, (state, action) => {
            if (!action.payload?.username || !action.payload.data) {
                return;
            }

            const item = state.payment.find((item) => item.id === action.payload?.data.id && item.size === action.payload.data.size);

            if (item) {
                // handle when double key
                const newQuantity = action.payload.data.quantity + item.quantity;
                if (newQuantity > item.repo) {
                    item.quantity = item.repo;
                } else {
                    item.quantity = newQuantity;
                }
                addPaymetnTolocal({ cart: state.cartUser, payment: state.payment }, action.payload.username);

                return;
            }

            // add
            addPaymetnTolocal({ cart: state.cartUser, payment: [...state.payment, action.payload.data] }, action.payload.username);
            state.payment = [...state.payment, action.payload.data];
        });
        builder.addCase(deletePayment.fulfilled, (state, action) => {
            if (!action.payload?.username) {
                return;
            }

            // delete payment
            state.payment.splice(action.payload.index, 1);
            addPaymetnTolocal({ cart: state.cartUser, payment: state.payment }, action.payload.username);
        }),
            builder.addCase(clearAllPayment.fulfilled, (state, action) => {
                return {
                    ...state,
                    payment: [],
                };
            });
    },
});

export const { addCart, removeCart, modifyQuantity, modifyChecked, checkedAll, setCheckedAllCartItem, updateDataCartWhenMount } = cart.actions;
export default cart.reducer;
