import React from 'react';
import TableRow from '../TableRow';
import { Chip, TableCell, Typography, capitalize } from '@mui/material';
import { IRowStatusOrders } from '@/configs/interface';
import { formatIndex, formatStatus, toCurrency } from '@/utils/format';
import { statusColor } from '../../../../../tailwind.config';
import moment from 'moment';

export interface IRowStatusProps {
    data: IRowStatusOrders;
    index: number;
    page: string | null;
    handleOpen?: (data: IRowStatusOrders) => void;
}

export default function RowStatus({ data, index, page, handleOpen }: IRowStatusProps) {
    return (
        <TableRow>
            <TableCell>
                <Typography color="textSecondary" fontSize={'16px'} variant="subtitle2" fontWeight={400}>
                    {formatIndex(parseInt(page || '0'), index)}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography color="textSecondary" fontSize={'16px'} variant="subtitle2" fontWeight={400}>
                    #{data.id}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography color="textSecondary" fontSize={'16px'} variant="subtitle2" fontWeight={400}>
                    {data.user}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography color="textSecondary" fontSize={'16px'} variant="subtitle2" fontWeight={400}>
                    {toCurrency(data.price)}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography color="textSecondary" fontSize={'16px'} variant="subtitle2" fontWeight={400}>
                    {moment(data.placedData).format('DD/MM/yyyy')}
                </Typography>
            </TableCell>
            <TableCell>
                <Chip
                    label={formatStatus(data.status)}
                    variant="outlined"
                    sx={{
                        backgroundColor: statusColor[data.status],
                        borderColor: statusColor[data.status],
                        textTransform: 'capitalize',
                    }}
                />
            </TableCell>
            <TableCell onClick={handleOpen ? () => handleOpen(data) : undefined}>
                <span className="text-violet-primary hover:underline cursor-pointer select-none font-medium">Open</span>
            </TableCell>
        </TableRow>
    );
}
