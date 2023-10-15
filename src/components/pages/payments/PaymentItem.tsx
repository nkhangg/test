'use client';
import { Box, Grid, Typography } from '@mui/material';
import React, { ReactNode, useEffect, useState } from 'react';

export interface IPaymentItemProps {
    title: string;
    children: ReactNode;
}

export default function PaymentItem({ title, children }: IPaymentItemProps) {
    // const [isClient, setIsClient] = useState(false);

    // useEffect(() => {
    //     setIsClient(true);
    // }, []);
    return (
        <div className="text-black-main">
            <h2 className="text-2xl">{title}</h2>
            <div className="mt-5">{children}</div>
        </div>
    );
}
