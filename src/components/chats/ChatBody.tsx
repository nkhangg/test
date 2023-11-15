import React from 'react';
import { ChatItem } from '..';

export interface IChatBodyProps {}

export default function ChatBody(props: IChatBodyProps) {
    return (
        <div className="bg-[#F3F4F6] flex-1 w-full relative py-8 px-5 flex flex-col gap-5 overflow-y-auto scroll hide-scroll scroll-smooth">
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
        </div>
    );
}
