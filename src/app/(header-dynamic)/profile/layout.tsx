import { BoxTitle } from '@/components';
import { NavProfile } from '@/components/common';
import { Avatar, Grid } from '@mui/material';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Profile Page | Petfoster',
    description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <BoxTitle locationTitle="left" title="MY ACCOUNT">
            <Grid container spacing={'10px'} className="min-h-[518px]">
                <Grid item xs={12} md={4} lg={3}>
                    <NavProfile />
                </Grid>
                <Grid item xs={12} md={8} lg={9}>
                    <div className="h-full">{children}</div>
                </Grid>
            </Grid>
        </BoxTitle>
    );
}