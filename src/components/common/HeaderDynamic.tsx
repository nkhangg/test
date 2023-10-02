'use client';
import classNames from 'classnames';
import React, { useState } from 'react';
import { MenuBars, MenuUser, Navbar } from '.';
import Link from 'next/link';
import Image from 'next/image';
import { useMotionValueEvent, useScroll } from 'framer-motion';

export interface IHeaderProps {}

export default function HeaderDynamic({}: IHeaderProps) {
    const { scrollY } = useScroll();

    const [isChangeBg, setIsChangeBg] = useState(false);

    useMotionValueEvent(scrollY, 'change', (latest) => {
        setIsChangeBg(latest > 0);
    });

    return (
        <header
            className={classNames(`h-[40px] lg:h-header w-full fixed inset-0 z-50  transition-colors ease-linear px-10`, {
                'bg-white': isChangeBg,
                'shadow-xl': isChangeBg,
                'bg-[rgba(0,0,0,.4)]': !isChangeBg,
            })}
        >
            <div className=" w-main m-auto h-full lg:flex  xl:w-main items-center justify-between max-w-[100%] hidden">
                <Link href={'/'} className="w-[136px] h-[42px] cursor-pointer ">
                    <Image src={`/images/${!isChangeBg ? 'large-logo.svg' : 'logo-large-dark.svg'}`} alt="logo" width={0} height={0} className="w-full h-full object-contain" />
                </Link>

                <Navbar isScroll={isChangeBg} />

                <MenuUser />
            </div>

            {/* responcesive */}
            <div className=" m-auto h-full text-white flex items-center justify-between select-none lg:hidden">
                <MenuBars isScroll={isChangeBg} />
            </div>
        </header>
    );
}
