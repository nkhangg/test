'use client';
import React, { JSXElementConstructor, ReactElement, ReactNode, useEffect, useState } from 'react';
import { WraperTippy, WrapperAnimation } from '..';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import dynamic from 'next/dynamic';
import { EmojiClickData, EmojiStyle, PickerProps, SuggestionMode } from 'emoji-picker-react';
import Tippy, { TippyProps } from '@tippyjs/react/headless';

const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false });
export interface IEmojiPickerProps {
    icon?: ReactElement<any, string | JSXElementConstructor<any>>;
    onEmoji?: (emojiObject: EmojiClickData, event: MouseEvent) => void;
    options?: TippyProps;
    stylePicker?: PickerProps;
}

export default function EmojiPicker({ icon, options, stylePicker, onEmoji }: IEmojiPickerProps) {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div>
            <Tippy
                {...options}
                visible={open}
                interactive
                onClickOutside={handleClose}
                render={(attr) => {
                    return (
                        <div {...attr}>
                            <Picker
                                {...stylePicker}
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
                    );
                }}
            >
                {!icon ? (
                    <WrapperAnimation onClick={handleOpen} hover={{}} className="p-3 text-lg">
                        <FontAwesomeIcon icon={faFaceSmile} className="text-xl" />
                    </WrapperAnimation>
                ) : (
                    <div onClick={handleOpen}>{icon}</div>
                )}
            </Tippy>
        </div>
    );
}
