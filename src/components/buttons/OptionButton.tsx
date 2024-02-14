'use client';
import { IconDefinition, faEllipsisVertical, faFlag, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react/headless';
import React, { useState } from 'react';
import { WrapperAnimation } from '..';
import classNames from 'classnames';

export interface IOptionButtonProps {
    handleReport?: () => void;
    handleDelete?: () => void;
    icon?: IconDefinition;
    options?: {
        border?: boolean;
        hover?: boolean;
    };
}

export default function OptionButton({ handleDelete, handleReport, options = { border: false, hover: true }, icon = faEllipsisVertical }: IOptionButtonProps) {
    const [open, setOpen] = useState(false);

    return (
        <Tippy
            interactive
            placement="left-start"
            visible={open}
            onClickOutside={() => setOpen(false)}
            render={(attr) => {
                return (
                    <ul
                        tabIndex={-1}
                        {...attr}
                        className={classNames('bg-white text-black-main rounded-lg py-2 text-1xl shadow-lg', {
                            ['border border-gray-primary']: options.border,
                        })}
                    >
                        <li onClick={handleReport} className="hover:bg-[#f2f2f2] transition-all ease-linear px-6 py-2 flex items-center gap-3">
                            <FontAwesomeIcon icon={faFlag} />
                            <span>Report</span>
                        </li>
                        <li onClick={handleDelete} className="hover:bg-[#f2f2f2] transition-all ease-linear px-6 py-2 flex items-center gap-3">
                            <FontAwesomeIcon icon={faTrash} />
                            <span>Delete</span>
                        </li>
                    </ul>
                );
            }}
        >
            <WrapperAnimation
                onClick={(e) => {
                    e.stopPropagation();
                    setOpen(true);
                }}
                hover={{}}
                className={classNames(' p-3 pt-0 rounded-full transition-all ease-linear flex items-center justify-center cursor-pointer', {
                    ['hover:bg-gray-200']: options.hover,
                })}
            >
                <FontAwesomeIcon icon={icon} />
            </WrapperAnimation>
        </Tippy>
    );
}
