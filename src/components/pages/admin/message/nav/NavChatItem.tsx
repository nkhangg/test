import { contants } from '@/utils/contants';
import { Avatar } from '@mui/material';
import moment from 'moment';
import React from 'react';

export interface INavChatItemProps {
    data: {
        name: string;
        avartar?: string;
        content: string;
        lastTime: string;
    };
}

export default function NavChatItem({ data }: INavChatItemProps) {
    return (
        <div className="flex items-start justify-between text-[#333333] hover:bg-[#f2f2f2] rounded transition-all py-2 px-5  cursor-pointer">
            <div className="flex items-center gap-3 ">
                <Avatar sx={{ width: '50px', height: '50px', border: '2px solid #ccc' }} src={data.avartar || contants.avartarDefault} />

                <div className="max-w-full flex flex-col">
                    <h6 className="text-1xl w-[140px] text-ellipsis overflow-hidden whitespace-nowrap ">{data.name}</h6>
                    <p className="text-sm w-[160px] text-ellipsis overflow-hidden">{data.content}</p>
                </div>
            </div>
            <p className="text-xs ">{moment(new Date()).fromNow()}</p>
        </div>
    );
}
