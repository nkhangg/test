import * as React from 'react';
import Container from '@mui/material/Container';

import { Box } from '@mui/material';
import { ImpactOfYear } from '..';

export interface IHomePageProps {}

// This is funtion server component
// All component don't have 'use client' is server component
export default function HomePage(props: IHomePageProps) {
    return (
        <>
            <ImpactOfYear />
        </>
    );
}
