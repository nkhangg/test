import { IRecordTransaction } from '@/configs/interface-ousite';
import * as React from 'react';
import TableRow from '../TableRow';
import { TableCell, Typography } from '@mui/material';
import { formatIndex, toCurrency } from '@/utils/format';
import moment from 'moment';
import { IRowTransaction } from '@/configs/interface';

export interface IRowListTransactionProps {
    page: string | null;
    index: number;
    data: IRowTransaction;
}

export default function RowListTransaction({ index, page, data }: IRowListTransactionProps) {
    return (
        <TableRow>
            <TableCell>
                <Typography
                    sx={{
                        fontSize: '16px',
                        fontWeight: '500',
                    }}
                >
                    {formatIndex(parseInt(page || '0'), index)}
                </Typography>
            </TableCell>
            <TableCell align="left">
                <Typography color="textSecondary" fontSize={'16px'} variant="subtitle2" maxWidth={'200px'} fontWeight={400} className="truncate">
                    {data.beneficiaryBank}
                </Typography>
            </TableCell>
            <TableCell align="left">
                <Typography color="textSecondary" fontSize={'16px'} variant="subtitle2" maxWidth={'200px'} fontWeight={400} className="truncate">
                    {data.toAccountNumber}
                </Typography>
            </TableCell>
            <TableCell align="left">
                <Typography color="textSecondary" fontSize={'16px'} variant="subtitle2" maxWidth={'200px'} fontWeight={400} className="truncate">
                    {data.donater}
                </Typography>
            </TableCell>

            <TableCell>{data.donateAt}</TableCell>

            <TableCell align="left">
                <Typography color="textSecondary" fontSize={'16px'} variant="subtitle2" maxWidth={'200px'} fontWeight={400} className="truncate">
                    {toCurrency(data.donateAmount)}
                </Typography>
            </TableCell>
            <TableCell align="left">
                <Typography color="textSecondary" fontSize={'16px'} variant="subtitle2" maxWidth={'200px'} fontWeight={400} className="truncate">
                    <p className="block max-w-[80px] line-clamp-1">{data.descriptions}</p>
                </Typography>
            </TableCell>
        </TableRow>
    );
}
