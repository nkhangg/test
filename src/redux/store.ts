import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { appReducer, cartReducer, userReducer, chatReducer, adoptReducer } from './slice';

export const store = configureStore({
    reducer: {
        appReducer,
        cartReducer,
        userReducer,
        chatReducer,
        adoptReducer,
    },
});

setupListeners(store.dispatch);
