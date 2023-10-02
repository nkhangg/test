'use client';
import { BoxTitle, DivTextfield, MainButton, TextArea, TextField } from '@/components';
import { ContainerContent } from '@/components/common';
import { profileUiData } from '@/datas/profile';
import { IconDefinition, faUserPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Grid } from '@mui/material';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import React, { FormEvent, InputHTMLAttributes, MouseEvent, useEffect, useState } from 'react';
import { ContentTag } from '..';
import { PagesProfileType } from '@/configs/types';
import Link from 'next/link';

export interface IProfilePageProps {
    pages: [string];
}

export default function ProfilePage({ pages }: IProfilePageProps) {
    const router = useRouter();
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const handleClickProfileMethod = (
        e: MouseEvent,
        item: {
            title: string;
            icon: IconDefinition;
            link: string;
        },
    ) => {
        router.push(item.link);
    };
    return (
        <BoxTitle locationTitle="left" title="MY ACCOUNT">
            <Grid container spacing={'10px'} className="min-h-[718px]">
                <Grid item xs={12} md={4} lg={3}>
                    <div className="py-[25px] px-9 w-full h-full bg-[#f2f2f2] rounded">
                        <div className="flex items-center gap-2 mb-[38px]">
                            <Avatar
                                sx={{
                                    width: 60,
                                    height: 60,
                                }}
                                alt="avatar"
                                src="https://ngungonblog.files.wordpress.com/2016/03/pussinboots.gif?w=1200"
                            />
                            <span className="font-medium text-lg">Qian Qian</span>
                        </div>

                        <ul>
                            {profileUiData.listMethod.map((item) => {
                                return (
                                    <li onClick={(e) => handleClickProfileMethod(e, item)} key={item.title} className={''}>
                                        <Link
                                            className={classNames(
                                                `flex items-center gap-3 text-black-main text-1xl px-[18px] py-4 border-b 
                                border-[#DEDEDE] w-full hover:bg-green-65a30d rounded hover:text-white transition-all ease-linear cursor-pointer`,
                                                {
                                                    'bg-green-65a30d text-white': item.link === '/profile',
                                                },
                                            )}
                                            href={item.link}
                                        >
                                            <FontAwesomeIcon className="text-2xl" icon={item.icon} />
                                            <p className=" uppercase">{item.title}</p>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </Grid>
                <Grid item xs={12} md={8} lg={9}>
                    <form onSubmit={handleSubmit} className="px-14 py-[60px] w-full h-full bg-[#f2f2f2] rounded">
                        <div className="flex flex-col justify-between gap-[22px]">
                            <DivTextfield name="fullname" label="Full name" />

                            <div className="flex items-center gap-[22px] lg:gap-12 flex-col md:flex-row">
                                <div className="flex items-center flex-col w-full gap-[22px]">
                                    <DivTextfield name="email" label="Email" type="email" />
                                    <DivTextfield name="genther" label="Gender" />
                                </div>
                                <div className="flex items-center flex-col w-full gap-[22px]">
                                    <DivTextfield name="phoneNumber" label="Phone number" />
                                    <DivTextfield name="birthday" label="Birthday" type="date" />
                                </div>
                            </div>

                            <DivTextfield name="address" label="Address" />
                            <DivTextfield name="password" label="Current Password (Skip if you don’t want to change the password)" type="password" />
                            <DivTextfield name="confirm-password" label="Confirm new password" type="password" />
                        </div>

                        <div className="flex items-center justify-center w-full">
                            <MainButton width={'208px'} title="update" className="mt-8" />
                        </div>
                    </form>
                </Grid>
            </Grid>
        </BoxTitle>
    );
}
