import { TableBody, TableCell, TableHead, TableRow, Typography, Table as Tb, TableCellProps } from '@mui/material';
import React, { ReactNode } from 'react';

export interface ITableProps {
    dataHead: string[];
    children: ReactNode;
    styleHead?: TableCellProps;
}

export default function Table({ dataHead, children, styleHead }: ITableProps) {
    return (
        <Tb
            stickyHeader
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
                            <TableCell {...styleHead} key={item}>
                                <Typography variant="subtitle2" fontSize={'16px'} fontWeight={600}>
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
