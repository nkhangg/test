import Image from 'next/image';
import React from 'react';
import { MenuUser, Navbar } from '.';

export interface IHeaderProps {}

export default function Header({}: IHeaderProps) {
    return (
        <header className="h-header w-full fixed inset-0 z-50">
            <div className="w-main m-auto h-full flex items-center justify-between max-w-[100%] ">
                <div className="w-[136px] h-[42px]">
                    <Image src={'/images/large-logo.svg'} alt="logo" width={0} height={0} className="w-full h-full object-contain" />
                </div>

                <Navbar />

                <MenuUser />
            </div>
        </header>
    );
}
