'use client';
import { TableRow as Tr, styled } from '@mui/material';
import React, { ReactNode } from 'react';

export interface ITableCellProps {
    children: ReactNode;
}

export default function TableRow({ children, ...props }: ITableCellProps & ITableCellProps) {
    return (
        <Tr
            sx={{
                '&:nth-of-type(odd)': {
                    backgroundColor: '#f8f8f8',
                },
                // hide last border
                '&:last-child td, &:last-child th': {
                    border: 0,
                },
                '&:hover': {
                    backgroundColor: '#f1f1f1',
                    transition: 'all ease-in .1s',
                },
            }}
            {...props}
        >
            {children}
        </Tr>
    );
}
