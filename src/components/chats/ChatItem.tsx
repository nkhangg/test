'use client';
import { IMessage } from '@/configs/interface';
import { RootState } from '@/configs/types';
import { links } from '@/datas/links';
import { useAppSelector } from '@/hooks/reduxHooks';
import { contants } from '@/utils/contants';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar } from '@mui/material';
import classNames from 'classnames';
import moment from 'moment';
import Link from 'next/link';
import React from 'react';
import style from './style.module.css';
import { WrapperAnimation } from '..';
import PopupMessage from './PopupMessage';

export interface IChatItemProps {
    data: IMessage;
    avartar?: string;
    me?: boolean;
}

export default function ChatItem({ data, me, avartar }: IChatItemProps) {
    const { user } = useAppSelector((state: RootState) => state.userReducer);
    return (
        <div
            className={classNames('w-full flex', {
                ['justify-end']: me,
            })}
        >
            <div className="flex items-start text-black-main text-sm max-w-[80%] gap-3">
                {!me && (
                    <Avatar
                        sx={{
                            width: '34px',
                            height: '34px',
                        }}
                        src={avartar && !me ? avartar : contants.avartarAdminDefault}
                    />
                )}
                {me && user?.username !== data.currentUser && (
                    <Link className="order-1" href={links.adminFuntionsLink.users.detail + user?.id}>
                        <Avatar
                            sx={{
                                width: '34px',
                                height: '34px',
                            }}
                            src={user?.avatar || contants.avartarDefault}
                        />
                    </Link>
                )}

                <div
                    className={classNames('flex flex-col gap-1', {
                        ['items-end']: me,
                    })}
                >
                    <div
                        className={classNames('flex items-center gap-2', {
                            [style['chat-item-message']]: true,
                        })}
                    >
                        <div
                            className={classNames('py-2 px-3 rounded-full max-w-[100%] break-all shadow-sm flex flex-col ', {
                                ['bg-white']: true,
                                [' text-right']: me,
                                ['order-1']: me,
                                ['text-gray-primary italic']: data.recall,
                            })}
                        >
                            {me && user?.username !== data.currentUser && <small>{data.currentUser}</small>}
                            {!data.recall ? data.message : 'message has been recalled'}
                        </div>

                        {me && !data.recall && <PopupMessage data={data} />}
                    </div>
                    <span className="text-xs px-2 text-[#8D8D8D] italic">{moment(data.sendAt).fromNow()}</span>
                </div>
            </div>
        </div>
    );
}
