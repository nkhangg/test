'use client';
import { CustomBadge, WrapperAnimation } from '@/components';
import { Badge } from '@mui/material';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import React, { ReactNode, useState } from 'react';
import NotifycationItem from './NotifycationItem';

export interface INotifycationProps {
    icon: ReactNode;
}

export default function Notifycation({ icon }: INotifycationProps) {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <Tippy
                onClickOutside={() => setOpen(false)}
                interactive={true}
                visible={open}
                placement="bottom-end"
                offset={[20, 0]}
                render={(attr) => {
                    return (
                        <div
                            {...attr}
                            tabIndex={-1}
                            className="w-[80%] md:w-[560px] 
                            bg-white rounded-2xl min-h-[560px] max-h-[740px] shadow-primary text-black-main flex flex-col justify-between"
                        >
                            <div className="flex items-center justify-between px-8 py-6">
                                <span className="text-lg font-medium tracking-wide">Notifications</span>
                                <p className="text-fill-heart text-sm hover:underline cursor-pointer">Mark all as read</p>
                            </div>

                            <div className="flex flex-col items-start flex-1 scroll  overflow-y-auto">
                                <NotifycationItem
                                    data={{
                                        id: '123',
                                        image: '',
                                        content: 'Your order was created successfully! Your order was created successfully!',
                                        createdAt: new Date().toDateString(),
                                    }}
                                />
                            </div>

                            <div className="mx-8  text-fill-heart flex items-center justify-center h-full border-t border-gray-primary bg-white">
                                <WrapperAnimation hover={{}} className="py-5">
                                    <span>See all</span>
                                </WrapperAnimation>
                            </div>
                        </div>
                    );
                }}
            >
                <CustomBadge badgeContent={''} dot invisible={false}>
                    <WrapperAnimation onClick={() => setOpen((prev) => !prev)} hover={{ rotate: 10 }}>
                        {icon}
                    </WrapperAnimation>
                </CustomBadge>
            </Tippy>
        </div>
    );
}
