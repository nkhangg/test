'use client';
import { toAbbrevNumber } from '@/utils/format';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { Avatar } from '@mui/material';
import moment from 'moment';
import * as React from 'react';
import { WrapperAnimation } from '..';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface ICommentProps {
    item?: boolean;
}

export default function Comment({ item }: ICommentProps) {
    const __SIZE_AVARTAR = '3.4rem';

    return (
        <div className="w-full">
            <div className="flex items-center justify-between">
                <div className="flex items-start gap-3">
                    <Avatar
                        sx={{ width: __SIZE_AVARTAR, height: __SIZE_AVARTAR }}
                        src="https://media-cdn-v2.laodong.vn/storage/newsportal/2023/7/25/1220914/Rose.jpg?w=800&h=496&crop=auto&scale=both"
                    />

                    <div className="flex flex-col items-start">
                        <h4 className="text-[15px] font-medium text-post-primary">Jennie</h4>
                        <p className="text-sm">So cool, guys!!! Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, enim.</p>
                        <div className="text-sm flex items-center gap-2 mt-1 capitalize">
                            <span>{moment(new Date()).fromNow() === 'a few seconds ago' ? 'now' : moment(new Date()).fromNow()}</span>
                            <span className="hover:underline cursor-pointer">{toAbbrevNumber(1000)} Likes</span>
                            <span className="hover:underline cursor-pointer">Reply</span>
                        </div>

                        {item && (
                            <div className="flex items-center text-sm hover:underline gap-1 mt-1 cursor-pointer">
                                <span className="w-[25px] h-[1px] bg-[#333333]"></span>
                                <span>Show more replies (10)</span>
                            </div>
                        )}
                    </div>
                </div>

                <WrapperAnimation className="cursor-pointer" hover={{}}>
                    <FontAwesomeIcon className="w-4 h-w-4" icon={faHeart} />
                </WrapperAnimation>
            </div>

            {item && (
                <div
                    style={{
                        paddingLeft: `calc(${__SIZE_AVARTAR} + 14px)`,
                    }}
                    className="mt-3"
                >
                    <Comment />
                </div>
            )}
        </div>
    );
}
