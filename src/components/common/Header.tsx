'use client';
import React, { useState } from 'react';
import { MenuBars, MenuUser, Navbar } from '.';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { WrapperAnimation } from '..';
import Link from 'next/link';
import Image from 'next/image';
import { useMotionValueEvent, useScroll } from 'framer-motion';

export interface IHeaderProps {}

export default function Header({}: IHeaderProps) {
    const { scrollY } = useScroll();

    const [isBgBlack, setIsBgBlack] = useState(false);

    useMotionValueEvent(scrollY, 'change', (latest) => {
        setIsBgBlack(latest > 0);
    });

    return (
        <header className={`h-[40px] lg:h-header w-full fixed inset-0 z-50 ${isBgBlack && 'bg-[rgba(0,0,0,.4)]'} transition-colors ease-linear`}>
            <div className=" w-main m-auto h-full lg:flex lg:w-[90%] xl:w-main items-center justify-between max-w-[100%] hidden md:w-[840px]">
                <Link href={'/'} className="w-[136px] h-[42px] cursor-pointer ">
                    <Image src={'/images/large-logo.svg'} alt="logo" width={0} height={0} className="w-full h-full object-contain" />
                </Link>

                <Navbar />

                <MenuUser />
            </div>

            {/* responcesive */}
            <div className="w-[90%] m-auto h-full text-white flex items-center justify-between select-none lg:hidden">
                <MenuBars />
            </div>
        </header>
    );
}
