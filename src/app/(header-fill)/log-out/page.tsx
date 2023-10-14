'use client';
import { LoadingPrimary } from '@/components';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { logout } from '@/redux/slice/userSlice';
import { NavigateOptions } from 'next/dist/shared/lib/app-router-context';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export interface ILogoutProps {}

export default function Logout(props: ILogoutProps) {
    const dispatch = useAppDispatch();

    const router = useRouter();

    useEffect(() => {
        dispatch(logout());

        router.prefetch('/');
        router.push('/');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <LoadingPrimary />;
}
