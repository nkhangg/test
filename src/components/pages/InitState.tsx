'use client';
import { RootState } from '@/configs/types';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { getCart } from '@/redux/slice/cartsSlide';
import { fetchUserByToken } from '@/redux/slice/userSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import React, { ReactNode, useEffect } from 'react';

export interface IInitStateProps {
    children: ReactNode;
}

export default function InitState({ children }: IInitStateProps) {
    return <>{children}</>;
}
