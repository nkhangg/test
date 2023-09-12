import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { appReducer } from './slice';

export const store = configureStore({
    reducer: {
        appReducer,
    },
});

setupListeners(store.dispatch);
