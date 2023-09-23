'use client';
import React, { CSSProperties } from 'react';
import classNames from 'classnames';
import { CustomButton, WrapperAnimation } from '..';

export interface IMainButtonProps {
    className?: string;
    title: string;
    width?: number | string;
    height?: number | string;
}

export default function MainButton({ className, title, width, height }: IMainButtonProps) {
    return (
        <WrapperAnimation hover={{ y: -2 }}>
            <CustomButton
                style={width || height ? { width: width, height: height } : undefined}
                className={classNames('bg-[#5FA503] text-1xl font-medium text-white py-[14px] px-8 rounded-md', {
                    [className ?? '']: Boolean(className),
                    'w-[188px]': !Boolean(width),
                    'h-[48px]': !Boolean(height),
                })}
            >
                <span>{title.toUpperCase()}</span>
            </CustomButton>
        </WrapperAnimation>
    );
}
