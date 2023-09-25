import styles from './styles/hand-cat-button.module.css';
import React, { MouseEventHandler, ReactNode } from 'react';
import classNames from 'classnames';

export interface IHandCatButtonProps {
    size?: string;
    title: ReactNode;
    disable?: boolean;
    active?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function HandCatButton({ size, title, disable, active, onClick }: IHandCatButtonProps) {
    return (
        <button
            disabled={disable}
            onClick={disable ? undefined : onClick}
            style={size ? ({ '--height': size } as React.CSSProperties) : undefined}
            className={classNames('', {
                [styles['hand-cat-btn']]: true,
                [styles['active']]: active,
            })}
        >
            <span
                className={classNames('', {
                    [styles['hand-cat-btn-text']]: true,
                    'text-gray-400': disable,
                })}
            >
                {title}
            </span>
        </button>
    );
}
