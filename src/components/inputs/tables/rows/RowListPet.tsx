/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState } from 'react';
import TableRow from '../TableRow';
import { useRouter } from 'next/navigation';
import { TableCell, Typography } from '@mui/material';
import { formatIndex } from '@/utils/format';
import { links } from '@/datas/links';
import Tippy from '@tippyjs/react/headless';
import { delay } from '@/utils/funtionals';

export interface IRowListPetProps {
    index: number;
    data: any;
    page: string | null;
}

export default function RowListPet({ index, data, page }: IRowListPetProps) {
    const [openPopup, setOpenPopup] = useState(false);

    const router = useRouter();
    return (
        <TableRow
            onMouseEnter={async () => {
                await delay(400);
                setOpenPopup(true);
            }}
            onMouseLeave={() => setOpenPopup(false)}
            onClick={() => router.push(links.adminFuntionsLink.pets.detail + `/${data.id}`)}
        >
            <TableCell align="left">
                <Typography color="textSecondary" fontSize={'16px'} variant="subtitle2" fontWeight={400}>
                    {formatIndex(parseInt(page || '0'), index)}
                </Typography>
            </TableCell>

            <TableCell align="left">
                <Typography color="textSecondary" fontSize={'16px'} variant="subtitle2" fontWeight={400}>
                    P0001
                </Typography>
            </TableCell>
            <TableCell align="left">
                <Tippy
                    onClickOutside={() => setOpenPopup(false)}
                    visible={openPopup}
                    render={(attr) => {
                        return (
                            <div {...attr} tabIndex={-1} className="w-[200px] h-[200px] max-w-[240px] max-h-[240px] bg-white rounded-lg border border-gray-primary shadow-lg p-3">
                                <img
                                    className="w-full h-full object-contain"
                                    alt="egweg"
                                    loading="lazy"
                                    src="https://i.pinimg.com/564x/b7/03/99/b703996784a452d70917b3ed90472498.jpg"
                                />
                            </div>
                        );
                    }}
                >
                    <Typography color="textSecondary" fontSize={'16px'} variant="subtitle2" fontWeight={400}>
                        {'Lulu'}
                    </Typography>
                </Tippy>
            </TableCell>
            <TableCell align="left">Brow</TableCell>
            <TableCell align="left">Medium</TableCell>
            <TableCell align="left">
                <Typography color="textSecondary" fontSize={'16px'} variant="subtitle2" fontWeight={400}>
                    <p className="block truncate max-w-[80px]">{"Haven't adopted yet"}</p>
                </Typography>
            </TableCell>
            <TableCell align="left">
                <Typography color="textSecondary" fontSize={'16px'} variant="subtitle2" fontWeight={400}>
                    12/2/2023
                </Typography>
            </TableCell>
            <TableCell align="left">
                <Typography color="textSecondary" fontSize={'16px'} variant="subtitle2" fontWeight={400}>
                    Husky
                </Typography>
            </TableCell>
            <TableCell align="left">
                <Typography color="textSecondary" fontSize={'16px'} variant="subtitle2" fontWeight={400}>
                    Male
                </Typography>
            </TableCell>
            <TableCell align="left">
                <Typography color="textSecondary" fontSize={'16px'} variant="subtitle2" fontWeight={400}>
                    True
                </Typography>
            </TableCell>
        </TableRow>
    );
}
