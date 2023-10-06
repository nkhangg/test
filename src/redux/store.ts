import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { appReducer, cartReducer } from './slice';

export const store = configureStore({
    reducer: {
        appReducer,
        cartReducer,
    },
});

setupListeners(store.dispatch);
