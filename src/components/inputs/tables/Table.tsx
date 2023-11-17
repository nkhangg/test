import { TableBody, TableCell, TableHead, TableRow, Typography, Table as Tb } from '@mui/material';
import React, { ReactNode } from 'react';

export interface ITableProps {
    dataHead: string[];
    children: ReactNode;
}

export default function Table({ dataHead, children }: ITableProps) {
    return (
        <Tb
            aria-label="orders-table"
            sx={{
                whiteSpace: 'nowrap',
            }}
        >
            <TableHead
                sx={{
                    backgroundColor: '#F2F2F2',
                    borderTopLeftRadius: '12px',
                }}
            >
                <TableRow>
                    {dataHead.map((item) => {
                        return (
                            <TableCell key={item}>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    {item}
                                </Typography>
                            </TableCell>
                        );
                    })}
                </TableRow>
            </TableHead>
            <TableBody>{children}</TableBody>
        </Tb>
    );
}
