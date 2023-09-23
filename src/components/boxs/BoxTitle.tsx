import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { ContainerContent } from '../common';

export interface IBoxTitleProps {
    children: ReactNode;
    title: string;
    locationTitle?: 'center' | 'left' | 'right';
    background?: string;
    className?: string;
}

export default function BoxTitle({ children, title, locationTitle = 'center', background, className }: IBoxTitleProps) {
    return (
        <ContainerContent
            className={className}
            classNameContainer={classNames('', {
                'bg-white': !background,
                [background ?? '']: background,
            })}
        >
            <h2
                className={classNames('text-black-main mt-24 pb-[48px] text-4xl font-medium', {
                    ['text-' + locationTitle]: true,
                })}
            >
                {title.toUpperCase()}
            </h2>
            {children}
        </ContainerContent>
    );
}
