/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
'use client';
import { IReviewHasReplay } from '@/configs/interface';
import { contants } from '@/utils/contants';
import { toGam } from '@/utils/format';
import { Rating } from '@mui/material';
import classNames from 'classnames';
import React, { useState } from 'react';
import { TextArea, WrapperAnimation } from '..';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import { faPaperPlane, faXmark } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
export interface IReviewProps {
    data: IReviewHasReplay;
    option?: {
        replay?: boolean;
        item?: boolean;
        adminAvatar?: string;
        adminName?: string;
    };
}

export default function Review({ data, option }: IReviewProps) {
    const [open, setOpen] = useState(false);

    const handleFormatSizes = () => {
        if (!data.sizes) return '';

        const strSizes = data.sizes.map((item) => {
            return toGam(item);
        });
        return strSizes.join(', ');
    };

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="text-black-main w-full max-w-full">
            <div
                className={classNames('flex justify-between text-black-main border rounded-md', {
                    'ml-5': option?.item,
                })}
            >
                <div className="p-3">
                    <div className="flex gap-3 items-start">
                        <img src={data.avatar || contants.avartarDefault} className="object-cover w-10 h-10 rounded-full " />
                        <div className="flex flex-col">
                            <h3 className="font-semibold">{data.name}</h3>
                            {data.rating && data.sizes ? (
                                <div className="flex items-center gap-4">
                                    <Rating
                                        sx={{
                                            '& .MuiSvgIcon-root': {
                                                fontSize: '16px',
                                            },
                                        }}
                                        name="read-only"
                                        value={data.rating}
                                        readOnly
                                    />

                                    <span className="text-sm italic text-grey-secondary">Size: {handleFormatSizes()}</span>
                                </div>
                            ) : (
                                ''
                            )}
                            <p className=" mt-2 text-sm">{data.comment}</p>
                            {option?.replay && (
                                <span onClick={handleOpen} className="text-left text-red-primary hover:underline text-sm cursor-pointer mt-2 select-none">
                                    Reply
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div
                    className={classNames('flex flex-col  gap-3 pr-3 py-3 text-sm text-grey-secondary', {
                        'items-end': !option?.item,
                    })}
                >
                    <span>{data.createAt}</span>
                </div>
            </div>

            {data.replayItems &&
                data.replayItems.length > 0 &&
                data.replayItems.map((comment) => {
                    return (
                        <>
                            <div className="text-gray-300 font-bold pl-14">|</div>

                            <Review
                                key={comment.id}
                                data={{ ...comment, avatar: option?.adminAvatar || contants.avartarAdminDefault, name: option?.adminName || contants.shopName }}
                                option={{ item: true }}
                            />
                        </>
                    );
                })}

            <AnimatePresence>
                {option?.replay && open && (
                    <>
                        <div className="text-gray-300 font-bold pl-14">|</div>
                        <motion.div
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                            className="p-3 flex items-center border rounded-md w-fit"
                        >
                            <div className="flex gap-3 items-start">
                                <img src={contants.avartarAdminDefault} className="object-cover w-10 h-10 rounded-full " />
                                <div className="flex flex-col">
                                    <TextArea cols={100} maxRows={3} />
                                    <div className="flex items-center justify-end mt-2">
                                        <WrapperAnimation onClick={handleClose} hover={{}} className="p-3 text-lg">
                                            <FontAwesomeIcon icon={faXmark} className="text-2xl" />
                                        </WrapperAnimation>
                                        <WrapperAnimation hover={{}} className="p-3 text-lg">
                                            <FontAwesomeIcon icon={faFaceSmile} className="text-2xl" />
                                        </WrapperAnimation>
                                        <WrapperAnimation
                                            hover={{}}
                                            className="bg-violet-primary rounded-lg px-6 py-2 text-white font-medium flex items-center gap-2 cursor-pointer"
                                        >
                                            <p>Send</p>
                                            <FontAwesomeIcon icon={faPaperPlane} />
                                        </WrapperAnimation>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
