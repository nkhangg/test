'use client';
import * as React from 'react';
import { CustomButton, WrapperAnimation } from '..';
import { usePathname } from 'next/navigation';

export interface IButtonNavbarProps {
    href: string;
    contents: string;
    border?: boolean;
}

export default function ButtonNavbar({ href, contents, border }: IButtonNavbarProps) {
    const path = usePathname();

    return (
        <WrapperAnimation
            hover={{
                y: -4,
            }}
        >
            <CustomButton
                className={`font-bold hover:text-green-main transition-all ease-linear text-sm ${path === href ? 'text-green-main' : ''}
            border-2 py-2 px-6 rounded-lg ${border ? 'border-green-main' : 'border-transparent'}`}
                href={href}
            >
                <span>{contents.toUpperCase()}</span>
            </CustomButton>
        </WrapperAnimation>
    );
}
