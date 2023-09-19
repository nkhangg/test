'use client';
import React, { ReactNode } from 'react';
import Link from 'next/link';
import { ValidTags } from '@/configs/types';

export interface IMainButtonProps {
    children: ReactNode;
    href?: string;
    className?: string;
}

export default function CustomButton({ children, href = '', className }: IMainButtonProps) {
    let Tag: ValidTags | typeof Link = 'button';
    if (href && href !== '') {
        Tag = Link;
    }
    return (
        <Tag className={className} href={href}>
            {children}
        </Tag>
    );
}
