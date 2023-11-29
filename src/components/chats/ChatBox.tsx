/* eslint-disable @next/next/no-img-element */
'use client';
import { faPhotoFilm, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Fab } from '@mui/material';
import Tippy from '@tippyjs/react/headless';
import React, { MouseEventHandler, useEffect, useState } from 'react';
import { ChatBody, ChatFooter, ChatItem, WrapperAnimation } from '..';
import { faFaceSmile, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { useAppSelector } from '@/hooks/reduxHooks';
import { RootState } from '@/configs/types';
import { contants } from '@/utils/contants';
import firebaseService from '@/services/firebaseService';
import { useCollection } from 'react-firebase-hooks/firestore';
import { IConversation, IMessage } from '@/configs/interface';
import ChatAswer from './ChatAswer';
import { Timestamp, addDoc, collection, getDocs, serverTimestamp } from 'firebase/firestore';
import Validate from '@/utils/validate';
import { db } from '@/configs/firebase';

export interface IChatBoxProps {}

const Header = ({ onClick }: { onClick: MouseEventHandler<HTMLDivElement> }) => {
    return (
        <div className="w-full bg-green-5FA503 flex items-center justify-between text-white py-1 pl-5 pr-3 font-medium">
            <div className="flex items-center gap-3 text-1xl">
                <img className="max-w-[34px]" src="/icons/chatbox.svg" alt="chatbox.svg" />
                <h4>Quick chat</h4>
            </div>

            <WrapperAnimation onClick={onClick} hover={{}} className="text-2xl p-2 cursor-pointer">
                <FontAwesomeIcon icon={faXmark} />
            </WrapperAnimation>
        </div>
    );
};

export default function ChatBox(props: IChatBoxProps) {
    const [open, setOpen] = useState(false);
    const { user } = useAppSelector((state: RootState) => state.userReducer);
    const [showChatNow, setShowChatNow] = useState(true);
    const [conversationId, setConversationId] = useState<string | null>(null);

    const handleToggle = () => {
        setOpen((prev) => !prev);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [conversationSnapshot] = useCollection(firebaseService.querys.queryGetConversationForCurrentUser(user?.username));

    const handleClickChatNow = async () => {
        setShowChatNow(false);
        if (!user || contants.roles.manageRoles.includes(user.role)) return;

        const isConversationAlradyExists = conversationSnapshot?.docs.find((conversation) => {
            return (conversation.data() as IConversation).users.includes(user.username);
        });

        if (isConversationAlradyExists) {
            // set convertsation id
            setConversationId(isConversationAlradyExists.id);
            return;
        }

        // set convertsation id
        const newConversation = await firebaseService.addConversation(user.username);

        setConversationId(newConversation.id);
    };

    const handleSendMessage = async (value: string) => {
        if (Validate.isBlank(value) || !conversationId || !user) return;

        // user send message to manage
        const newMessage = await firebaseService.handleSendMessageToUser(value, conversationId, user.username);

        const idNewMessage = newMessage.id;

        await firebaseService.setNewMessageConversation(conversationId, idNewMessage);
    };

    return (
        <div>
            <Tippy
                interactive={true}
                visible={open}
                placement="top-end"
                onClickOutside={handleClose}
                render={(attr) => {
                    return !showChatNow ? (
                        conversationId && (
                            <div
                                {...attr}
                                tabIndex={-1}
                                className=" w-[80vw] md:w-[30vw] h-[58vh] max-w-[420px] rounded-lg bg-white flex flex-col justify-between items-center overflow-hidden
                            shadow-primary
                            "
                            >
                                <Header onClick={handleClose} />

                                <ChatBody conversationId={conversationId} />

                                <ChatFooter handleSubmit={handleSendMessage} />
                            </div>
                        )
                    ) : (
                        <ChatAswer handleClickChatNow={handleClickChatNow} handleClose={handleClose} />
                    );
                }}
            >
                {!open ? (
                    <Fab onClick={handleToggle} color="primary" aria-label="add">
                        <img src="/logo-footer.svg" alt="logo-footer.svg" />
                    </Fab>
                ) : (
                    <div></div>
                )}
            </Tippy>
        </div>
    );
}
