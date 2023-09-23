'use client';
import React, { CSSProperties, ReactNode } from 'react';
import Link from 'next/link';
import { ValidTags } from '@/configs/types';

export interface IMainButtonProps {
    children: ReactNode;
    href?: string;
    className?: string;
    style?: CSSProperties;
}

export default function CustomButton({ children, href = '', className, style }: IMainButtonProps) {
    let Tag: ValidTags | typeof Link = 'button';
    if (href && href !== '') {
        Tag = Link;
    }
    return (
        <Tag style={style} className={className} href={href}>
            {children}
        </Tag>
    );
}
