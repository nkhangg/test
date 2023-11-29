'use client';
import { Grid } from '@mui/material';
import React, { ReactNode, useEffect, useState } from 'react';
import NavMessageManament from '../pages/admin/message/nav/NavMessageManagement';
import { contants } from '@/utils/contants';

export interface IMessageManageLayoutProps {
    children: ReactNode;
}

export default function MessageManageLayout({ children }: IMessageManageLayoutProps) {
    useEffect(() => {
        const html = document.querySelector('html');

        if (!html) return;
        html?.classList.add('drop-scroll');

        return () => {
            html?.classList.remove('drop-scroll');
        };
    }, []);

    return (
        <div style={contants.styleMessageManagePage} className="w-full max-w-[100%] mt-[-20px]">
            <Grid container spacing={1}>
                <Grid item lg={3}>
                    <NavMessageManament />
                </Grid>
                <Grid item lg={9}>
                    {children}
                </Grid>
            </Grid>
        </div>
    );
}
