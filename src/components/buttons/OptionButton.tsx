'use client';
import { IconDefinition, faEllipsisVertical, faFlag, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react/headless';
import React, { ReactNode, useState } from 'react';
import { WrapperAnimation } from '..';
import classNames from 'classnames';
import WraperDialog from '../dialogs/WraperDialog';

export interface IOptionButtonProps {
    handleReport?: () => void;
    handleDelete?: () => void;
    icon?: IconDefinition;
    children?: ReactNode;
    className?: string;
    options?: {
        border?: boolean;
        hover?: boolean;
        showReport?: boolean;
        size?: 'small' | 'medium';
    };
}

export default function OptionButton({
    handleDelete,
    handleReport,
    options = { border: false, hover: true, showReport: false, size: 'medium' },
    icon = faEllipsisVertical,
    children,
    className,
}: IOptionButtonProps) {
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
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
                            className={classNames('bg-white text-black-main rounded-lg py-2 text-1xl shadow-primary', {
                                ['border border-gray-primary']: options.border,
                                ['text-sm']: options.size === 'small',
                            })}
                        >
                            {options.showReport && (
                                <li onClick={handleReport} className="hover:bg-[#f2f2f2] transition-all cursor-pointer ease-linear px-6 py-2 flex items-center gap-3">
                                    <FontAwesomeIcon icon={faFlag} />
                                    <span>Report</span>
                                </li>
                            )}
                            <li onClick={() => setOpenModal(true)} className="hover:bg-[#f2f2f2] cursor-pointer transition-all ease-linear px-6 py-2 flex items-center gap-3">
                                <FontAwesomeIcon icon={faTrash} />
                                <span>Delete</span>
                            </li>
                        </ul>
                    );
                }}
            >
                <div>
                    {!children && (
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
                    )}

                    {children && (
                        <div
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpen(true);
                            }}
                            className={className}
                        >
                            {children}
                        </div>
                    )}
                </div>
            </Tippy>

            {openModal && (
                <WraperDialog open={openModal} setOpen={setOpenModal}>
                    <div className="p-6 flex flex-col gap-4 items-center text-black-main">
                        <b>Are you sure about this action?</b>
                        <div className="flex items-center justify-between text-sm">
                            <WrapperAnimation
                                onClick={() => setOpenModal(false)}
                                hover={{}}
                                className="py-2 px-6 rounded-full hover:bg-[rgba(0,0,0,.2)] transition-all ease-linear cursor-pointer hover:text-white"
                            >
                                Cancel
                            </WrapperAnimation>
                            <WrapperAnimation
                                onClick={handleDelete}
                                hover={{}}
                                className="py-2 px-6 rounded-full hover:bg-[rgba(0,0,0,.2)] transition-all ease-linear cursor-pointer hover:text-white text-red-primary"
                            >
                                Ok
                            </WrapperAnimation>
                        </div>
                    </div>
                </WraperDialog>
            )}
        </>
    );
}
