'use client';
import { RootState } from '@/configs/types';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { getCart, getPayment } from '@/redux/slice/cartsSlide';
import { fetchUserByToken } from '@/redux/slice/userSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import firebaseService from '@/services/firebaseService';
import React, { ReactNode, useEffect } from 'react';
import { IProfile } from '@/configs/interface';
import { handleSetLastSeenInfoFirebase } from '@/utils/firebaseUltils';

export interface IInitStateProps {
    children: ReactNode;
}

export default function InitState({ children }: IInitStateProps) {
    const { user } = useAppSelector((state: RootState) => state.userReducer);

    useEffect(() => {
        if (!user) return;
        window.addEventListener('beforeunload', () => handleSetLastSeenInfoFirebase(user));

        return () => {
            removeEventListener('beforeunload', () => handleSetLastSeenInfoFirebase(user));
        };
    }, [user]);

    return <>{children}</>;
}
