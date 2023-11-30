'use client';
import React, { KeyboardEvent, useRef } from 'react';
import { EmojiPicker, WrapperAnimation } from '..';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmile, faPaperPlane, faPhotoFilm } from '@fortawesome/free-solid-svg-icons';
import { EmojiClickData } from 'emoji-picker-react';
import classNames from 'classnames';

export interface IChatFooterProps {
    handleSubmit?: (value: string) => void;
    options?: {
        styleIcon?: string;
    };
}

export default function ChatFooter({ options, handleSubmit }: IChatFooterProps) {
    const refInput = useRef<HTMLInputElement>(null);

    const handleClickSendMessage = () => {
        if (!refInput.current) return;

        if (!handleSubmit) return;

        handleSubmit(refInput.current.value);

        refInput.current.value = '';
    };

    const handleKeyOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleClickSendMessage();
        }
    };

    const handleAddEmoji = (emojiObject: EmojiClickData, event: MouseEvent) => {
        if (!refInput.current) return;
        refInput.current.value += emojiObject.emoji;
    };

    return (
        <div className="w-full flex items-center justify-between px-6 py-4 gap-3">
            <div className="flex items-center justify-between bg-[#F3F4F6] flex-1 rounded-full px-5 py-1">
                <div className="flex-1 text-sm  text-black-main pr-3">
                    <input
                        onKeyDown={handleKeyOnEnter}
                        ref={refInput}
                        type="text"
                        className="outline-none border-none bg-transparent w-full placeholder:text-sm "
                        placeholder="Type your message"
                    />
                </div>
                <div className="flex items-center gap-2 text-[#ACABAB]">
                    <WrapperAnimation
                        className={classNames('py-2 cursor-pointer flex items-center justify-center', {
                            [options?.styleIcon || '']: true,
                        })}
                        hover={{}}
                    >
                        <FontAwesomeIcon icon={faPhotoFilm} />
                    </WrapperAnimation>

                    <EmojiPicker
                        options={{
                            placement: 'top',
                        }}
                        onEmoji={handleAddEmoji}
                        icon={
                            <WrapperAnimation
                                className={classNames('py-2 cursor-pointer flex items-center justify-center', {
                                    [options?.styleIcon || '']: true,
                                })}
                                hover={{}}
                            >
                                <FontAwesomeIcon icon={faFaceSmile} />
                            </WrapperAnimation>
                        }
                    />
                </div>
            </div>

            <WrapperAnimation
                onClick={handleClickSendMessage}
                hover={{}}
                className="flex items-center bg-green-65a30d py-2 rounded-full px-6 text-sm gap-1 cursor-pointer text-white"
            >
                <span>Send</span>
                <FontAwesomeIcon icon={faPaperPlane} />
            </WrapperAnimation>
        </div>
    );
}
