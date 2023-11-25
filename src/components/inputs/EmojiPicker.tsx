'use client';
import React, { useEffect, useState } from 'react';
import { WraperTippy, WrapperAnimation } from '..';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import dynamic from 'next/dynamic';
import { EmojiClickData, EmojiStyle, SuggestionMode } from 'emoji-picker-react';

const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false });
export interface IEmojiPickerProps {
    onEmoji?: (emojiObject: EmojiClickData, event: MouseEvent) => void;
}

export default function EmojiPicker({ onEmoji }: IEmojiPickerProps) {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div>
            <WraperTippy
                visible={open}
                interactive
                onClickOutside={handleClose}
                renderEl={
                    <div>
                        <Picker
                            previewConfig={{
                                showPreview: false,
                            }}
                            suggestedEmojisMode={SuggestionMode.RECENT}
                            searchDisabled={true}
                            skinTonesDisabled={true}
                            emojiStyle={EmojiStyle.NATIVE}
                            onEmojiClick={onEmoji}
                            autoFocusSearch={false}
                            lazyLoadEmojis={true}
                        />
                    </div>
                }
            >
                <WrapperAnimation onClick={handleOpen} hover={{}} className="p-3 text-lg">
                    <FontAwesomeIcon icon={faFaceSmile} className="text-xl" />
                </WrapperAnimation>
            </WraperTippy>
        </div>
    );
}
