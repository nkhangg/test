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
}

export default function BoxTitle({ children, title, locationTitle = 'center', background, className, underlineTitle }: IBoxTitleProps) {
    return (
        <ContainerContent
            className={className}
            classNameContainer={classNames('', {
                'bg-white': !background,
                [background ?? '']: background,
            })}
        >
            <h2
                className={classNames('text-black-main mt-24  text-4xl font-medium ', {
                    ['text-' + locationTitle]: true,
                    ['pb-[14px] mb-[34px] border-b border-gray-primary']: underlineTitle,
                    ['pb-[48px]']: !underlineTitle,
                })}
            >
                {title.toUpperCase()}
            </h2>

            {children}
        </ContainerContent>
    );
}
