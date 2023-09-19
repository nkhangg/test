import { ButtonNavbar } from '@/components';
import { navbar } from '@/datas/header';
import React from 'react';

export interface INavBarProps {}

export default function NavBar({}: INavBarProps) {
    return (
        <ul className="h-navbar lg:flex hidden items-center gap-1 text-white">
            {navbar.map((nav) => {
                return (
                    <li key={nav.title}>
                        <ButtonNavbar contents={nav.title} href={nav.href} border={nav?.style?.border} />
                    </li>
                );
            })}
        </ul>
    );
}
