import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { appReducer, cartReducer, userReducer } from './slice';

export const store = configureStore({
    reducer: {
        appReducer,
        cartReducer,
        userReducer,
    },
});

setupListeners(store.dispatch);
