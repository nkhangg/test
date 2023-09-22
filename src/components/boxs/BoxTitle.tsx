import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { ContainerContent } from '../common';

export interface IBoxTitleProps {
    children: ReactNode;
    title: string;
    locationTitle?: 'center' | 'left' | 'right';
    background?: string;
}

export default function BoxTitle({ children, title, locationTitle = 'center', background }: IBoxTitleProps) {
    return (
        <ContainerContent
            classNameContainer={classNames('min-h-[1000px]', {
                'bg-white': !background,
                [background ?? '']: background,
            })}
        >
            <h2
                className={classNames('text-black-main py-[48px] text-4xl font-medium', {
                    ['text-' + locationTitle]: true,
                })}
            >
                {title.toUpperCase()}
            </h2>
            {children}
        </ContainerContent>
    );
}
