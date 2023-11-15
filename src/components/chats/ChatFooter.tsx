import React from 'react';
import { WrapperAnimation } from '..';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmile, faPaperPlane, faPhotoFilm } from '@fortawesome/free-solid-svg-icons';

export interface IChatFooterProps {}

export default function ChatFooter(props: IChatFooterProps) {
    return (
        <div className="w-full flex items-center justify-between px-6 py-4 gap-3">
            <div className="flex items-center justify-between bg-[#F3F4F6] flex-1 rounded-full px-5 py-1">
                <div className="flex-1 text-sm  text-black-main pr-3">
                    <input type="text" className="outline-none border-none bg-transparent w-full placeholder:text-sm " placeholder="Type your message" />
                </div>
                <div className="flex items-center gap-2 text-[#ACABAB]">
                    <WrapperAnimation className="py-2 cursor-pointer flex items-center justify-center" hover={{}}>
                        <FontAwesomeIcon icon={faPhotoFilm} />
                    </WrapperAnimation>
                    <WrapperAnimation className="py-2 cursor-pointer flex items-center justify-center" hover={{}}>
                        <FontAwesomeIcon icon={faFaceSmile} />
                    </WrapperAnimation>
                </div>
            </div>

            <WrapperAnimation hover={{}} className="flex items-center bg-green-65a30d py-2 rounded-full px-6 text-sm gap-1 cursor-pointer text-white">
                <span>Send</span>
                <FontAwesomeIcon icon={faPaperPlane} />
            </WrapperAnimation>
        </div>
    );
}
