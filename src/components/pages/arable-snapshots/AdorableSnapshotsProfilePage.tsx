'use client';
import React, { useMemo, useState } from 'react';
import { BoxPostHighlight, InfinityPosts } from '@/components';
import { Avatar } from '@mui/material';
import { Tabs } from './tabs';
import { useAppSelector } from '@/hooks/reduxHooks';
import { RootState } from '@/configs/types';
import { contants } from '@/utils/contants';

export interface IAdorableSnapshotsProfilePageProps {
    id: string;
}

export default function AdorableSnapshotsProfilePage({ id }: IAdorableSnapshotsProfilePageProps) {
    // redux
    const { user } = useAppSelector((state: RootState) => state.userReducer);

    const dataUser = useMemo(() => {
        if (!id) return;

        if (user) {
            if (id === user?.username) {
                return user;
            }
        }

        // do something
    }, [id, user]);

    return (
        <div className="w-full max-w-full">
            <div className="w-full flex flex-col items-center justify-center gap-2 py-8 text-post-primary">
                <Avatar
                    sx={{
                        width: '14rem',
                        height: '14rem',
                    }}
                    alt="avatar"
                    src={dataUser?.avatar || contants.avartarDefault}
                />

                <h1 className="text-[2.1rem] font-semibold ">{dataUser?.displayName || dataUser?.username}</h1>
            </div>

            {/* hightlight */}
            <BoxPostHighlight options={{ captialize: false, tracking: 'tracking-wide' }} title="Highlight" data={[]} />

            <div className="my-16 w-full flex flex-col gap-6">
                <Tabs />

                <div>
                    <InfinityPosts />
                </div>
            </div>
        </div>
    );
}
