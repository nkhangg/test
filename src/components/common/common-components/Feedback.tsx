'use client';
import React from 'react';
import { ContainerContent } from '..';
import { InputLabel, TextField as Tx, TextareaAutosize, styled } from '@mui/material';
import { BoxTitle, MainButton, TextArea, TextField } from '@/components';
import Image from 'next/image';

export interface IDonationComProps {
    className?: string;
}

export default function DonationCom({ className }: IDonationComProps) {
    return (
        <BoxTitle className={className} title="FEEDBACK & SUPPORT US">
            <div className="w-full gap-[90px] grid grid-cols-1 lg:grid-cols-2 max-w-[100%]">
                <div className="w-full flex justify-center lg:justify-end">
                    <div className="max-w-[505px] w-full bg-[#F8F6FC] px-9 py-8 rounded-2xl text-black-main shadow-primary">
                        <h3 className="text-green-5FA503 font-semibold text-center text-2xl mb-3">{'give us a feedback'.toLocaleUpperCase()}</h3>
                        <p className="text-sm mb-7">If you have any question or feedback, please send a message for us by submit a form below:</p>
                        <div className="flex flex-col justify-between gap-[22px]">
                            <div className="flex flex-col justify-between gap-2">
                                <InputLabel>Full name: </InputLabel>
                                <TextField required id="title" name="title" fullWidth size="small" />
                            </div>
                            <div className="flex flex-col justify-between gap-2">
                                <InputLabel>Phone number: </InputLabel>
                                <TextField required id="phone-number" name="phoneNumber" fullWidth size="small" />
                            </div>
                            <div className="flex flex-col justify-between gap-2">
                                <InputLabel>Email: </InputLabel>
                                <TextField required id="email" name="email" fullWidth size="small" />
                            </div>
                            <div className="flex flex-col justify-between gap-2">
                                <InputLabel>Message: </InputLabel>
                                <TextArea required id="title" name="title" />
                            </div>
                        </div>

                        <div className="flex items-center justify-center w-full">
                            <MainButton width={'208px'} title="send" className="mt-8" />
                        </div>
                    </div>
                </div>
                <div className="w-full flex-col flex items-center justify-center lg:items-start lg:justify-center">
                    <h3 className="text-green-5FA503 font-semibold text-2xl mb-8 text-center lg:text-left w-full">{'or donate via'.toLocaleUpperCase()}</h3>
                    <ul className="relative max-w-[552px] w-full bg-[#F8F6FC] rounded-2xl text-black-main shadow-primary py-16 px-9 md:px-20 flex flex-col gap-11">
                        <li className="grid grid-cols-2 gap-2 items-center">
                            <div className="relative w-[50%] h-[96px]">
                                <Image fill src={'/icons/tp-bank.svg'} className="object-contain" alt="tp-bank" />
                            </div>
                            <div className="text-1xl text-black-main flex-1">
                                <span>Nguyễn Thị Lam Hà</span>
                                <p className="mt-1">03872866101</p>
                            </div>
                        </li>
                        <li className="grid grid-cols-2 items-center">
                            <div className="relative w-[50%] h-[96px]">
                                <Image fill src={'/icons/qr.jpg'} className="object-contain" alt="tp-bank" />
                            </div>
                            <div className="text-1xl text-black-main flex-1">
                                <span>QR VP Bank</span>
                                <p className="mt-1">Phạm Trung Đức</p>
                            </div>
                        </li>
                        <li className="grid grid-cols-2 items-center">
                            <div className="relative w-[50%] h-[96px]">
                                <Image fill src={'/icons/papal.svg'} className="object-contain" alt="tp-bank" />
                            </div>
                            <div className="text-1xl text-black-main flex-1">
                                <span>PetFoster</span>
                                <p className="mt-1">petfoster@gmail.com</p>
                            </div>
                        </li>

                        <div className="absolute w-[127px] h-[135px] top-[-20%] right-0">
                            <Image src={'/icons/cat-cute.svg'} fill alt="cat-cute" />
                        </div>
                    </ul>
                </div>
            </div>
        </BoxTitle>
    );
}
