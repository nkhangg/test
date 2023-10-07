import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { ContainerContent } from '../common';
import { LocationTileType } from '@/configs/types';

export interface IBoxTitleProps {
    children: ReactNode;
    title: string;
    locationTitle?: LocationTileType;
    background?: string;
    className?: string;
    underlineTitle?: boolean;
    fontSizeTitle?: string;
    fontWeigth?: string;
    mbUnderline?: string;
    mt?: string;
}

export default function BoxTitle({
    children,
    title,
    locationTitle = 'center',
    background = 'bg-white',
    className,
    underlineTitle,
    fontSizeTitle = 'text-[32px]',
    fontWeigth = 'font-medium',
    mbUnderline = 'mb-[34px]',
    mt = 'mt-24',
}: IBoxTitleProps) {
    return (
        <ContainerContent
            className={className}
            classNameContainer={classNames('', {
                [background]: true,
            })}
        >
            <h2
                className={classNames('text-black-main  ', {
                    ['text-' + locationTitle]: true,
                    ['pb-[14px] border-b border-gray-primary']: underlineTitle,
                    [mbUnderline]: true,
                    ['pb-[48px]']: !underlineTitle,
                    [fontSizeTitle]: true,
                    [fontWeigth]: true,
                    [mt]: true,
                })}
            >
                {title.toUpperCase()}
            </h2>

            {children}
        </ContainerContent>
    );
}
