/* eslint-disable @next/next/no-img-element */
'use client';
import { faPhotoFilm, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Fab } from '@mui/material';
import Tippy from '@tippyjs/react/headless';
import React, { MouseEventHandler, useState } from 'react';
import { ChatBody, ChatFooter, ChatItem, WrapperAnimation } from '..';
import { faFaceSmile, faPaperPlane } from '@fortawesome/free-regular-svg-icons';

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

    const handleToggle = () => {
        setOpen((prev) => !prev);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Tippy
                interactive={true}
                visible={open}
                placement="top-end"
                onClickOutside={handleClose}
                render={(attr) => {
                    return (
                        <div
                            {...attr}
                            tabIndex={-1}
                            className=" w-[80vw] md:w-[30vw] h-[58vh] max-w-[420px] rounded-lg bg-white flex flex-col justify-between items-center overflow-hidden
                            shadow-primary 
                            "
                        >
                            <Header onClick={handleClose} />

                            {/* <div className="bg-[#F3F4F6] flex-1 w-full relative py-8 px-5 flex flex-col gap-5 overflow-y-auto scroll hide-scroll scroll-smooth">
                                <ChatItem data={{ title: 'Hi, how can I help you?' }} />
                                <ChatItem me={true} data={{ title: 'Sure, I have a question' }} />
                                <ChatItem me={true} data={{ title: 'Sure, I have a question' }} />
                                <ChatItem me={true} data={{ title: 'Sure, I have a question' }} />
                                <ChatItem me={true} data={{ title: 'Sure, I have a question' }} />
                                <ChatItem data={{ title: 'Hi, how can I help you?' }} />
                                <ChatItem data={{ title: 'Hi, how can I help you?' }} />

                                <ChatItem me={true} data={{ title: 'Sure, I have a question' }} />
                                <ChatItem data={{ title: 'Hi, how can I help you?' }} />
                                <ChatItem data={{ title: 'Hi, how can I help you?' }} />
                                <ChatItem me={true} data={{ title: 'Sure, I have a question' }} />
                                <ChatItem me={true} data={{ title: 'Sure, I have a question' }} />
                                <ChatItem me={true} data={{ title: 'Sure, I have a question' }} />
                                <ChatItem me={true} data={{ title: 'Sure, I have a question' }} />
                                <ChatItem data={{ title: 'Hi, how can I help you?' }} />
                                <ChatItem data={{ title: 'Hi, how can I help you?' }} />

                                <ChatItem me={true} data={{ title: 'Sure, I have a question' }} />
                                <ChatItem data={{ title: 'Hi, how can I help you?' }} />
                            </div> */}

                            <ChatBody />

                            <ChatFooter />
                        </div>
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
