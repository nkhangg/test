'use client';
import React, { useState } from 'react';
import TableRow from '../TableRow';
import { Chip, TableCell, Typography, capitalize } from '@mui/material';
import { IRowStatusOrders } from '@/configs/interface';
import { formatIndex, formatStatus, toCurrency } from '@/utils/format';
import { statusColor } from '../../../../../tailwind.config';
import moment from 'moment';
import { updateReadForOrder } from '@/apis/admin/orders';
import { toast } from 'react-toastify';
import { contants } from '@/utils/contants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faPrint } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { getTokenPrint } from '@/apis/outside';

export interface IRowStatusProps {
    data: IRowStatusOrders;
    index: number;
    page: string | null;
    handleOpen?: (data: IRowStatusOrders) => void;
}

export default function RowStatus({ data, index, page, handleOpen }: IRowStatusProps) {
    const [isRead, setIsRead] = useState(data.read);
    const [openOption, setOpenOption] = useState(false);

    const handleUpdateRead = async () => {
        console.log(data);

        if (!handleOpen) return;
        handleOpen(data);

        if (isRead) return;

        try {
            const response = await updateReadForOrder(data.id);

            if (!response) return toast.warn(contants.messages.errors.handle);

            if (response.errors) return toast.warn(response.message);

            setIsRead(response.data.read);
        } catch (error) {
            toast.error(contants.messages.errors.server);
        } finally {
        }
    };

    // const handlePrint = async () => {
    //     console.log(data);
    //     if (!data.token) return;
    //     try {
    //         const response = await getTokenPrint(data.token);

    //         if (!response) return toast.error(contants.messages.errors.server);

    //         console.log(response);
    //     } catch (error) {
    //         toast.error(contants.messages.errors.server);
    //     }
    // };

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
            <TableCell>
                <div onClick={handleOpen ? handleUpdateRead : undefined} className="flex items-center gap-4">
                    <span className="text-violet-primary hover:underline cursor-pointer select-none font-medium">Open</span>
                    {/* <Tippy
                        interactive
                        placement="right"
                        onClickOutside={() => setOpenOption(false)}
                        visible={openOption}
                        render={(attr) => {
                            return (
                                <ul {...attr} tabIndex={-1} className="bg-white rounded-lg border border-gray-primary shadow-primary py-1">
                                    <li onClick={handlePrint} className="flex items-center gap-2 px-5 hover:bg-gray-200 transition-all ease-linear cursor-pointer">
                                        <FontAwesomeIcon icon={faPrint} />
                                        <p>Print</p>
                                    </li>
                                </ul>
                            );
                        }}
                    >
                        <span
                            onClick={() => setOpenOption(true)}
                            className="w-6 h-6 hover:bg-gray-300 rounded-full transition-all ease-linear text-black-main flex items-center justify-center p-2"
                        >
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                        </span>
                    </Tippy> */}
                    {!isRead && <span className="bg-red-primary w-2 h-2 rounded-full block"></span>}
                </div>
            </TableCell>
        </TableRow>
    );
}
