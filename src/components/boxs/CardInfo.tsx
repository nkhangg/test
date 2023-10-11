import { Box, Card, CardContent, Typography } from '@mui/material';
import React, { ReactNode } from 'react';

export interface CardInfoProps {
    children?: ReactNode;
    title?: string;
}

export default function CardInfo({ children, title }: CardInfoProps) {
    return (
        <Card elevation={0} variant={undefined}>
            <CardContent>
                {title && <Typography>{title}</Typography>}
                <Box mt={3}>{children}</Box>
            </CardContent>
        </Card>
    );
}
