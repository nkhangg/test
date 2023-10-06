'use client';
import { CustomBadge, WrapperAnimation } from '@/components';
import { RootState } from '@/configs/types';
import { listProfile } from '@/datas/header';
import { useAppSelector } from '@/hooks/reduxHooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar } from '@mui/material';
import Tippy from '@tippyjs/react/headless';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export interface IMenuYserProps {}

export default function MenuUser(props: IMenuYserProps) {
    const [openMenu, setOpenMenu] = useState(false);

    const [isClient, setisClient] = useState(false);

    const { cartUser } = useAppSelector((state: RootState) => state.cartReducer);

    useEffect(() => {
        setisClient(true);
    }, []);

    return (
        <div className="flex gap-4 ">
            {isClient ? (
                <Tippy
                    interactive
                    visible={openMenu}
                    onClickOutside={() => setOpenMenu(false)}
                    placement="bottom-end"
                    render={(attr) => {
                        return (
                            <ul className="w-[188px] bg-[#F2F2F2] text-[#4C4C4C] rounded-lg overflow-hidden shadow-xl" tabIndex={0} {...attr}>
                                {listProfile.map((profile, index) => {
                                    return (
                                        <li
                                            key={profile.href}
                                            className="cursor-pointer w-full hover:bg-green-65a30d transition-all ease-linear duration-1500 hover:text-white px-3 h-10 flex items-center pl-6"
                                        >
                                            <Link className="w-full flex items-center gap-[10px]" href={profile.href}>
                                                <CustomBadge invisible={!profile.style?.badge || cartUser.length <= 0} badgeContent={cartUser.length}>
                                                    <FontAwesomeIcon icon={profile.icon} />
                                                </CustomBadge>
                                                <span>{profile.title}</span>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        );
                    }}
                >
                    <CustomBadge badgeContent={cartUser.length} onClick={() => setOpenMenu((prev) => !prev)} invisible={openMenu || cartUser.length <= 0}>
                        <WrapperAnimation hover={{}}>
                            <Avatar alt="avartar" className="cursor-pointer border-2" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
                        </WrapperAnimation>
                    </CustomBadge>
                </Tippy>
            ) : (
                ''
            )}
        </div>
    );
}
