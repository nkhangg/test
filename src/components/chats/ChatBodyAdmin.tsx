'use client';
import { IMessage } from '@/configs/interface';
import firebaseService from '@/services/firebaseService';
import { convertFirestoreTimestampToString } from '@/utils/format';
import { Timestamp } from 'firebase/firestore';
import React, { useEffect, useMemo, useRef } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { ChatItem } from '..';
import { contants } from '@/utils/contants';
import ChatOrderItem from './ChatOrderItem';

export interface IChatBodyAdminProps {
    conversationId: string;
    avartar?: string;
}

export default function ChatBodyAdmin({ conversationId, avartar }: IChatBodyAdminProps) {
    const refDiv = useRef<HTMLDivElement>(null);

    const queryMessages = firebaseService.querys.generateQueryGetMessages(conversationId);
    const [messageSnapshot] = useCollection(queryMessages);

    const handleScrollIntoView = () => {
        if (!refDiv.current) return;

        refDiv.current.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
        });
    };

    const messagesData = useMemo(() => {
        if (!messageSnapshot) return [];

        handleScrollIntoView();

        return messageSnapshot.docs.map((item) => {
            return {
                ...item.data(),
                id: item.id,
                sendAt: convertFirestoreTimestampToString(item.data().sendAt as Timestamp),
            } as IMessage;
        });
    }, [messageSnapshot]);

    useEffect(() => {
        handleScrollIntoView();
    }, [messageSnapshot]);

    return (
        <>
            <div className="bg-[#F3F4F6] flex-1 w-full relative py-8 pb-0 px-5 flex flex-col gap-5 overflow-y-auto scroll hide-scroll scroll-smooth rounded-md shadow-sm">
                {messagesData.map((item) => {
                    if (item.type === 'message') {
                        return <ChatItem avartar={avartar} key={item.id} data={item} me={item?.username === contants.usernameAdmin} />;
                    }
                    return <ChatOrderItem key={item.id} data={item} me={item?.username === contants.usernameAdmin} />;
                })}
                <div ref={refDiv} className="h-0"></div>
            </div>
        </>
    );
}
