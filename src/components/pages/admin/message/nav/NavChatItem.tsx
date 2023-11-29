import { IConversationId, IProfile } from '@/configs/interface';
import { links } from '@/datas/links';
import { useGetInfoNavbarItem } from '@/hooks';
import { contants } from '@/utils/contants';
import { convertFirestoreTimestampToString } from '@/utils/format';
import { Avatar } from '@mui/material';
import moment from 'moment';
import Link from 'next/link';
import React, { useCallback } from 'react';
import PopupNavChatItem from './PopupNavChatItem';
import style from './styles.module.css';
import classNames from 'classnames';
import { listPopupNavChatItemHasGim } from '@/datas/popupData';
import { HeadTabType } from '@/configs/types';
import firebaseService from '@/services/firebaseService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export interface INavChatItemProps {
    data: IConversationId;
    currentUser: IProfile | null;
}

export default function NavChatItem({ data, currentUser }: INavChatItemProps) {
    const { user, lastMessage } = useGetInfoNavbarItem(data);

    const handleActionGim = async (item: HeadTabType) => {
        await firebaseService.setActionGimConversation(data.id, !data?.gim);
    };
    return (
        <Link
            href={links.message + `/${user?.username}/${data?.id}`}
            className={classNames(' flex items-start justify-between text-[#333333] hover:bg-[#f2f2f2] rounded transition-all py-2 px-5 pr-3  cursor-pointer', {
                [style['nav-chat-item']]: true,
            })}
        >
            <div className="flex items-center gap-3 ">
                <Avatar sx={{ width: '50px', height: '50px', border: '2px solid #ccc' }} src={user?.avartar || contants.avartarDefault} />

                <div className="max-w-full flex flex-col">
                    <h6 className="text-1xl w-[140px] text-ellipsis overflow-hidden whitespace-nowrap ">{user?.username || 'user'}</h6>
                    <p className="text-sm w-[160px]  overflow-hidden truncate text-ellipsis">
                        {lastMessage?.currentUser === user?.username ? `${lastMessage?.currentUser}: ${lastMessage?.message}` : `you: ${lastMessage?.message}`}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <p className="text-xs ">{moment(convertFirestoreTimestampToString(data?.sendAt)).fromNow()}</p>
                <PopupNavChatItem handleClickItem={handleActionGim} customs={data?.gim ? listPopupNavChatItemHasGim : undefined} />
            </div>
        </Link>
    );
}
