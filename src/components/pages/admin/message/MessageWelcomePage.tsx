import * as React from 'react';

export interface IMessageWelcomePageProps {}

export default function MessageWelcomePage(props: IMessageWelcomePageProps) {
    return (
        <div className="w-full h-full flex items-center justify-center text-black-main flex-col">
            <span className="text-xl font-medium">Welcome to Petfoster</span>
            <p className="text-sm">Choose a conversation to chat</p>
        </div>
    );
}
