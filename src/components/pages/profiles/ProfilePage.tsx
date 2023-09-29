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
                                    <li
                                        onClick={(e) => handleClickProfileMethod(e, item)}
                                        key={item.title}
                                        className={classNames(
                                            `flex items-center gap-3 text-black-main text-1xl px-[18px] py-4 border-b 
                                border-[#DEDEDE] w-full hover:bg-green-65a30d rounded hover:text-white transition-all ease-linear cursor-pointer`,
                                            {
                                                'bg-green-65a30d text-white': item.link.includes(pages[0]),
                                            },
                                        )}
                                    >
                                        <FontAwesomeIcon className="text-2xl" icon={item.icon} />
                                        <p className=" uppercase">{item.title}</p>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </Grid>
                <Grid item xs={12} md={8} lg={9}>
                    <ContentTag state={pages[0] as PagesProfileType} />
                </Grid>
            </Grid>
        </BoxTitle>
    );
}
