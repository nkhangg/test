'use client';
/* eslint-disable @next/next/no-img-element */
import { MainButton, RatingDialog, WrapperAnimation } from '@/components';
import { toCurrency, toGam } from '@/utils/format';
import { Grid } from '@mui/material';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

export interface IDetailOrderhistoryItemProps {}

export default function DetailOrderhistoryItem(props: IDetailOrderhistoryItemProps) {
    const [togleDialog, setTogleDialog] = useState(false);

    const handleTogleDialog = () => {
        setTogleDialog(!togleDialog);
    };

    return (
        <>
            <Grid
                container
                key={4}
                spacing={1}
                py={'38px'}
                sx={{
                    borderBottom: '1px solid #DBDBDB',
                }}
            >
                <Grid item lg={6}>
                    <Grid container spacing={1} key={5}>
                        <Grid item lg={2}>
                            <img
                                className="w-full h-full object-contain"
                                src="https://bizweb.dktcdn.net/100/362/345/products/xsmalladult-a81506df-ac29-4e87-8bd8-153192be5792.jpg?v=1571057515367"
                                alt="https://bizweb.dktcdn.net/100/362/345/products/xsmalladult-a81506df-ac29-4e87-8bd8-153192be5792.jpg?v=1571057515367"
                            />
                        </Grid>
                        <Grid item lg={10}>
                            <div className="flex flex-col justify-between h-full">
                                <h3 className="font-medium mb-2">Hạt Mềm Cho Chó Trưởng Thành Zenith Adult</h3>
                                <div className="flex items-center text-sm ">
                                    <span className="">{'Zenit'}</span>
                                    <span className="h-5 bg-[#666666] w-[1px] mx-3"></span>
                                    <span>{toGam(500)}</span>
                                </div>
                                <motion.button
                                    onClick={handleTogleDialog}
                                    whileTap={{
                                        scale: 0.9,
                                    }}
                                    whileHover={{
                                        y: -4,
                                    }}
                                    className="bg-[#F87171] py-[8px] max-w-[138px] px-[34px] text-white font-medium rounded-lg mt-5"
                                >
                                    Rating
                                </motion.button>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item lg={2}>
                    <div className="flex items-center justify-center h-full">
                        <span className="text-center text-[#303B4E]">{toCurrency(52000)}</span>
                    </div>
                </Grid>
                <Grid item lg={2}>
                    <div className="flex items-center justify-center h-full">
                        <span className="text-center text-[#303B4E]">1</span>
                    </div>
                </Grid>
                <Grid item lg={2}>
                    <div className="flex items-center justify-center h-full">
                        <span className="text-[#303B4E]">{toCurrency(52000)}</span>
                    </div>
                </Grid>
            </Grid>

            <RatingDialog open={togleDialog} setOpen={setTogleDialog} />
        </>
    );
}
