import React from 'react';
import TableRow from '../TableRow';
import { Chip, TableCell, Typography, capitalize } from '@mui/material';
import { IRowStatusOrders } from '@/configs/interface';
import { toCurrency } from '@/utils/format';
import moment from 'moment';
import { statusColor } from '../../../../../tailwind.config';

export interface IRowStatusProps {
    data: IRowStatusOrders;
    index?: number;
    handleOpen?: (data: IRowStatusOrders) => void;
}

export default function RowStatus({ data, index, handleOpen }: IRowStatusProps) {
    return (
        <TableRow>
            <TableCell>
                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                    {index}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                    #{data.id}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                    {data.user}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                    {toCurrency(data.price)}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                    {data.placedData}
                </Typography>
            </TableCell>
            <TableCell>
                <Chip
                    label={capitalize(data.status)}
                    variant="outlined"
                    sx={{
                        backgroundColor: statusColor[data.status],
                        borderColor: statusColor[data.status],
                    }}
                />
            </TableCell>
            <TableCell onClick={handleOpen ? () => handleOpen(data) : undefined}>
                <span className="text-violet-primary hover:underline cursor-pointer select-none">Open</span>
            </TableCell>
        </TableRow>
    );
}
