import { IRecordTransaction } from '@/configs/interface-ousite';
import * as React from 'react';
import TableRow from '../TableRow';
import { TableCell, Typography } from '@mui/material';
import { formatIndex, toCurrency } from '@/utils/format';
import moment from 'moment';

export interface IRowListTransactionProps {
    page: string | null;
    index: number;
    data: IRecordTransaction;
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
                    {data.bankCodeName}
                </Typography>
            </TableCell>
            <TableCell align="left">
                <Typography color="textSecondary" fontSize={'16px'} variant="subtitle2" maxWidth={'200px'} fontWeight={400} className="truncate">
                    {data.bankSubAccId}
                </Typography>
            </TableCell>
            <TableCell align="left">
                <Typography color="textSecondary" fontSize={'16px'} variant="subtitle2" maxWidth={'200px'} fontWeight={400} className="truncate">
                    {data.corresponsiveAccount}
                </Typography>
            </TableCell>

            <TableCell>{moment(data.when).format('DD/MM/yyyy')}</TableCell>

            <TableCell align="left">
                <Typography color="textSecondary" fontSize={'16px'} variant="subtitle2" maxWidth={'200px'} fontWeight={400} className="truncate">
                    {toCurrency(data.amount)}
                </Typography>
            </TableCell>
        </TableRow>
    );
}
