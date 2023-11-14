/* eslint-disable @next/next/no-img-element */
import { contants } from '@/utils/contants';
import { Avatar, Grid } from '@mui/material';
import classNames from 'classnames';
import moment from 'moment';
import React from 'react';
import { toast } from 'react-toastify';

export interface INotifycationItemProps {
    data: {
        id: string;
        image: string;
        content: string;
        checked?: boolean;
        createdAt: string;
    };
}

export default function NotifycationItem({ data }: INotifycationItemProps) {
    return (
        <div
            className={classNames('px-8 hover:bg-[#F1F1F1] py-5 h-[108px] w-full cursor-pointer transition-all duration-100', {
                ['bg-[#F1F1F1]']: data?.checked,
            })}
        >
            <Grid container spacing={1}>
                <Grid item lg={2}>
                    <Avatar
                        sx={{
                            width: '50px',
                            height: '50px',
                        }}
                        variant="rounded"
                        src={data?.image || contants.avartarDefault}
                    />
                </Grid>
                <Grid item lg={10}>
                    <div className="flex flex-col gap-2">
                        <span className="text-1xl line-clamp-2">{data?.content}</span>
                        <p className="text-sm">{moment(data?.createdAt).fromNow()}</p>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}
