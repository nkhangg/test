'use client';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { MenuBars, MenuUser, Navbar } from '.';
import Link from 'next/link';
import Image from 'next/image';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { RootState } from '@/configs/types';
import { fetchUserByToken } from '@/redux/slice/userSlice';
import { unwrapResult } from '@reduxjs/toolkit';
export interface IHeaderProps {
    dynamic?: boolean;
}

export default function Header({ dynamic = true }: IHeaderProps) {
    const { scrollY } = useScroll();

    const [isChangeBg, setIsChangeBg] = useState(false);
    const { token } = useAppSelector((state: RootState) => state.userReducer);
    const { user } = useAppSelector((state: RootState) => state.userReducer);
    const dispatch = useAppDispatch();

    useMotionValueEvent(scrollY, 'change', (latest) => {
        setIsChangeBg(latest > 0);
    });

    useEffect(() => {
        console.log('reloaded', token);
        (async () => {
            const actionResult = dispatch(fetchUserByToken());
            const curUser = unwrapResult(await actionResult);
            console.log(curUser);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

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

                        {!user ? (
                            <div
                                className={classNames('flex items-center justify-center gap-1 font-medium', {
                                    ['text-white']: !isChangeBg,
                                })}
                            >
                                <Link className="hover:underline text-1xl" href={'/login'}>
                                    Login
                                </Link>
                                /
                                <Link className="hover:underline text-1xl" href={'/register'}>
                                    Register
                                </Link>
                            </div>
                        ) : (
                            <MenuUser />
                        )}
                    </div>

                    {/* responcesive */}
                    <div className=" m-auto h-full text-white flex items-center justify-between select-none lg:hidden">
                        <MenuBars isScroll={isChangeBg} />
                    </div>
                </header>
            ) : (
                <header
                    className={classNames(`h-[40px] lg:h-header w-full fixed inset-0 z-50  transition-colors ease-linear px-10 shadow-xl`, {
                        'bg-[#fff]': true,
                    })}
                >
                    <div className=" w-main m-auto h-full lg:flex  xl:w-main items-center justify-between max-w-[100%] hidden">
                        <Link href={'/'} className="w-[136px] h-[42px] cursor-pointer ">
                            <Image src={`/images/logo-large-dark.svg`} alt="logo" width={0} height={0} className="w-full h-full object-contain" />
                        </Link>

                        <Navbar isScroll={true} />

                        {!user ? (
                            <div className="flex items-center justify-center gap-1 font-medium">
                                <Link className="hover:underline text-1xl" href={'/login'}>
                                    Login
                                </Link>
                                /
                                <Link className="hover:underline text-1xl" href={'/register'}>
                                    Register
                                </Link>
                            </div>
                        ) : (
                            <MenuUser />
                        )}
                    </div>

                    {/* responcesive */}
                    <div className=" m-auto h-full text-white flex items-center justify-between select-none lg:hidden">
                        <MenuBars isScroll={true} />
                    </div>
                </header>
            )}
        </>
    );
}
