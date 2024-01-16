/* eslint-disable @next/next/no-img-element */
'use client';
import React, { MouseEvent, useState } from 'react';
import classNames from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faEllipsisVertical, faFlag, faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toAbbrevNumber } from '@/utils/format';
import Tippy from '@tippyjs/react/headless';
import { OptionButton, PostDetailDialog } from '..';
export interface IPostProps {
    variant?: 'rounded' | 'circle';
}

export default function Post({ variant = 'circle' }: IPostProps) {
    // modals state
    const [model, setModel] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);

    // handle funtionals
    const handleOpenDetail = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setOpenDetail(true);
    };

    return (
        <div
            onMouseEnter={() => setModel(true)}
            onMouseLeave={() => {
                setModel(false);
            }}
            className={classNames('relative w-full h-full overflow-hidden cursor-pointer', {
                ['border-[3px] border-[#A1A2D3] rounded-[40px] min-h-[338px] min-w-[230px]']: variant === 'circle',
                ['min-h-[300px] min-w-[300px] rounded-lg']: variant === 'rounded',
            })}
        >
            <img className="absolute w-full h-full object-cover " src={'https://i.pinimg.com/564x/0f/1c/15/0f1c15c001c3afc9b338e4fe50bb9acf.jpg'} alt="/image/mockup/1.png" />

            <AnimatePresence>
                {model && (
                    <motion.div
                        onClick={handleOpenDetail}
                        initial={{
                            scale: 0.9,
                            opacity: 0,
                        }}
                        exit={{
                            scale: 0.9,
                            opacity: 0,
                        }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                        }}
                        className={classNames('absolute bg-[rgba(0,0,0,0.45)] inset-0 w-full h-full  flex flex-col items-center justify-between py-8 pt-4 px-4 text-white', {
                            ['rounded-[20px]']: variant === 'circle',
                            ['rounded-[6px]']: variant === 'rounded',
                        })}
                    >
                        <div className="flex items-center justify-end w-full p-4 pr-0 select-none">{<OptionButton options={{ hover: false }} />}</div>

                        <div className="flex items-center gap-8 lowercase text-xl select-none">
                            <div className={classNames('flex items-center gap-[6px]')}>
                                <FontAwesomeIcon icon={faHeart} />
                                <span className="text-white">{toAbbrevNumber(1000)}</span>
                            </div>
                            <div className="flex items-center gap-[6px]">
                                <FontAwesomeIcon icon={faComment} />
                                <span>{toAbbrevNumber(1200)}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 w-full">
                            <Avatar
                                sx={{
                                    width: '48px',
                                    height: '48px',
                                }}
                                src="https://media-cdn-v2.laodong.vn/storage/newsportal/2023/7/25/1220914/Rose.jpg?w=800&h=496&crop=auto&scale=both"
                            />
                            <div className="flex flex-col w-full flex-1 max-w-full">
                                <h4 className="truncate max-w-[70%] text-1xl font-medium">Roses BlackPink</h4>
                                <p className="truncate  max-w-[70%] text-sm font-normal">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt, minus.</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {openDetail && <PostDetailDialog open={openDetail} setOpen={setOpenDetail} onClose={() => setModel(false)} />}
        </div>
    );
}
