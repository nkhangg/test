'use client';
import classNames from 'classnames';
import React, { useState } from 'react';
import { MenuBars, Navbar } from '.';
import Link from 'next/link';
import Image from 'next/image';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import dynamic from 'next/dynamic';
const MenuUser = dynamic(() => import('./common-headers/MenuUser'), { ssr: false });
export interface IHeaderProps {
    dynamic?: boolean;
}

export default function Header({ dynamic = true }: IHeaderProps) {
    const { scrollY } = useScroll();

    const [isChangeBg, setIsChangeBg] = useState(false);

    useMotionValueEvent(scrollY, 'change', (latest) => {
        setIsChangeBg(latest > 0);
    });

    return (
        <>
            {dynamic ? (
                <header
                    className={classNames(`h-[40px] lg:h-header w-full fixed inset-0 z-50  transition-colors ease-linear px-10`, {
                        'bg-white': isChangeBg,
                        'shadow-xl': isChangeBg,
                        'bg-[rgba(0,0,0,.4)]': !isChangeBg,
                    })}
                >
                    <div className=" w-main m-auto h-full lg:flex  xl:w-main items-center justify-between max-w-[100%] hidden">
                        <Link href={'/'} className="w-[136px] h-[42px] cursor-pointer ">
                            <Image
                                src={`/images/${!isChangeBg ? 'large-logo.svg' : 'logo-large-dark.svg'}`}
                                alt="logo"
                                width={0}
                                height={0}
                                className="w-full h-full object-contain"
                            />
                        </Link>

                        <Navbar isScroll={isChangeBg} />

                        <MenuUser />
                    </div>

                    {/* responcesive */}
                    <div className=" m-auto h-full text-white flex items-center justify-between select-none lg:hidden">
                        <MenuBars isScroll={isChangeBg} />
                    </div>
                </header>
            ) : (
                <header
                    className={classNames(`h-[40px] lg:h-header w-full fixed inset-0 z-50  transition-colors ease-linear px-10`, {
                        'bg-[#374151]': true,
                    })}
                >
                    <div className=" w-main m-auto h-full lg:flex  xl:w-main items-center justify-between max-w-[100%] hidden">
                        <Link href={'/'} className="w-[136px] h-[42px] cursor-pointer ">
                            <Image src={`/images/large-logo.svg`} alt="logo" width={0} height={0} className="w-full h-full object-contain" />
                        </Link>

                        <Navbar isScroll={false} />

                        <MenuUser />
                    </div>

                    {/* responcesive */}
                    <div className=" m-auto h-full text-white flex items-center justify-between select-none lg:hidden">
                        <MenuBars isScroll={false} />
                    </div>
                </header>
            )}
        </>
    );
}
