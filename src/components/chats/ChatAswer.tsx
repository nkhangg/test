/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { WrapperAnimation } from '..';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripLines } from '@fortawesome/free-solid-svg-icons';
import { Avatar } from '@mui/material';

export interface IChatAswerProps {
    handleClickChatNow?: () => void;
    handleClose?: () => void;
}

export default function ChatAswer({ handleClickChatNow, handleClose }: IChatAswerProps) {
    return (
        <div className="w-[80vw] md:w-[30vw] h-[30vh] max-w-[420px] rounded-lg bg-white shadow-2xl text-black-main p-6 flex items-center justify-between flex-col">
            <div className="flex w-full items-center justify-between">
                <img className="bg-green-5FA503 object-contain w-[40px] h-[40px] rounded-full" src="/icons/chatbox.svg" alt="chatbox.svg" />
                <WrapperAnimation
                    onClick={handleClose}
                    hover={{}}
                    className="flex items-center justify-center cursor-pointer p-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-full"
                >
                    <FontAwesomeIcon icon={faGripLines} />
                </WrapperAnimation>
            </div>
            <div className=" text-xl font-medium flex items-center justify-center flex-col">
                <h4>Chat with Petfoster</h4>
                <p className="font-normal text-sm text-gray-500">Usually respond within an hour</p>
            </div>

            <WrapperAnimation
                onClick={handleClickChatNow}
                hover={{}}
                className="w-full py-2 flex items-center justify-center bg-violet-primary text-white font-medium rounded-lg cursor-pointer"
            >
                <span>Chat now</span>
            </WrapperAnimation>
        </div>
    );
}
