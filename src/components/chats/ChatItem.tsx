'use client';
import { Avatar } from '@mui/material';
import classNames from 'classnames';
import moment from 'moment';
import React from 'react';

export interface IChatItemProps {
    data: {
        title: string;
    };
    me?: boolean;
}

export default function ChatItem({ data, me }: IChatItemProps) {
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
                        src="https://i.bloganchoi.com/bloganchoi.com/wp-content/uploads/2023/04/ahn-yujin1.jpeg?fit=640%2C20000&quality=95&ssl=1"
                    />
                )}

                <div
                    className={classNames('flex flex-col gap-1', {
                        ['items-end']: me,
                    })}
                >
                    <div
                        className={classNames('py-2 px-6 rounded-full max-w-[100%] break-all shadow-sm', {
                            ['bg-white']: true,
                        })}
                    >
                        {data.title}
                    </div>
                    <span className="text-xs px-6 text-[#8D8D8D] italic">{moment(new Date()).fromNow()}</span>
                </div>
            </div>
        </div>
    );
}
