import * as React from 'react';
import Container from '@mui/material/Container';

import { Cart } from '..';
import { Box } from '@mui/material';
import Link from 'next/link';

export interface IHomePageProps {}

// This is funtion server component
// All component don't have 'use client' is server component
export default function HomePage(props: IHomePageProps) {
    return <Cart />;
}
