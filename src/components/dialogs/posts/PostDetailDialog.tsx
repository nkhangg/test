/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState } from 'react';
import WraperDialog from '../WraperDialog';
import { Avatar } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Comment, OptionButton, WrapperAnimation } from '@/components';
import { toAbbrevNumber } from '@/utils/format';
import { faChevronCircleLeft, faChevronCircleRight, faHeart as faHeartFull, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faComment, faShareSquare, faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import moment from 'moment';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';

const icons = [faComment, faShareSquare];

const variants = {
    initial: (direction: number) => {
        return {
            x: direction > 0 ? 100 : -100,
            opacity: 0,
        };
    },
    animate: {
        x: 0,
        opacity: 1,

        transition: {
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
        },
    },
    exit: (direction: number) => {
        return {
            x: direction > 0 ? -100 : 100,
            opacity: 0,

            transition: {
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
            },
        };
    },
};

export interface IPostDetailDialogProps {
    open: boolean;
    setOpen: (v: boolean) => void;
    onClose?: () => void;
}

export default function PostDetailDialog({ open, setOpen, onClose }: IPostDetailDialogProps) {
    const [like, setLike] = useState(false);

    //images
    const [curImage, setCurImage] = useState(0);
    const [direction, setDirection] = useState(0);

    const [images, setImages] = useState([
        'https://media-cdn-v2.laodong.vn/storage/newsportal/2023/7/25/1220914/Rose.jpg?w=800&h=496&crop=auto&scale=both',
        'https://media-cdn-v2.laodong.vn/storage/newsportal/2023/7/25/1220914/Rose.jpg?w=800&h=496&crop=auto&scale=both',
        'https://media-cdn-v2.laodong.vn/storage/newsportal/2023/7/25/1220914/Rose.jpg?w=800&h=496&crop=auto&scale=both',
    ]);

    const handleClose = () => {
        if (!onClose) return;
        onClose();
    };

    const handleLike = () => {
        setLike((prev) => !prev);
    };

    const handleClick = (index: number) => {
        setDirection(1);
        setCurImage(index);
    };

    function nextStep() {
        setDirection(1);
        if (curImage === images.length - 1) {
            setCurImage(0);
            return;
        }
        setCurImage(curImage + 1);
    }

    function prevStep() {
        setDirection(-1);
        if (curImage === 0) {
            setCurImage(images.length - 1);
            return;
        }
        setCurImage(curImage - 1);
    }
    return (
        <WraperDialog fullWidth={true} maxWidth={'lg'} open={open} setOpen={setOpen} onClose={handleClose}>
            <div className="w-full text-post-primary flex items-center justify-between h-[80vh] select-none ">
                <AnimatePresence initial={false} custom={direction}>
                    <div className="sm:hidden md:block flex-1 h-full overflow-hidden relative">
                        <motion.img
                            variants={variants}
                            animate="animate"
                            initial="initial"
                            exit="exit"
                            src={images[curImage]}
                            alt="slides"
                            className="w-full max-w-full h-full object-cover"
                            key={images[curImage]}
                            custom={direction}
                        />

                        <div className="absolute inset-0 flex items-center justify-center z-30">
                            <div className="w-full flex items-center justify-between px-6">
                                <span className="text-2xl text-white cursor-pointer" onClick={prevStep}>
                                    <FontAwesomeIcon icon={faChevronCircleLeft} />
                                </span>
                                <span className="text-2xl text-white cursor-pointer" onClick={nextStep}>
                                    <FontAwesomeIcon icon={faChevronCircleRight} />
                                </span>
                            </div>
                        </div>

                        <div className="absolute flex items-end justify-center gap-[6px] w-full h-full inset-0 pb-4">
                            {[1, 2, 3, 4].map((item, index) => {
                                return (
                                    <span
                                        key={index}
                                        className={classNames('w-2 h-2  rounded-full', {
                                            ['bg-gray-300']: index !== curImage,
                                            ['bg-white']: index === curImage,
                                        })}
                                    ></span>
                                );
                            })}
                        </div>
                    </div>
                </AnimatePresence>
                <div className="md:w-1/2 lg:w-2/5 w-full h-full flex flex-col justify-between">
                    <div className="w-full h-fit p-8 pb-0">
                        <div className="w-full flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Avatar
                                    sx={{ width: '3.75rem', height: '3.75rem' }}
                                    src="https://media-cdn-v2.laodong.vn/storage/newsportal/2023/7/25/1220914/Rose.jpg?w=800&h=496&crop=auto&scale=both"
                                />
                                <span className="text-lg font-semibold">Roses BlackPink</span>
                            </div>
                            <OptionButton options={{ border: true }} />
                        </div>
                        <p className="font-medium text-1xl mt-3 pb-[22px] md:border-b border-[#B5A8FF] text-[#444444]">
                            My love path may lose, but my racing track, Ill give a handicap!!!
                        </p>
                    </div>

                    <div className="px-8 flex-1 w-full h-full sm:hidden md:flex flex-col gap-2 overflow-y-auto overflow-x-hidden scroll py-6">
                        {/* <Comment item={true} /> */}
                        <Comment />
                        <Comment />
                        <Comment />
                        <Comment />
                        <Comment />
                    </div>

                    {/* mobile */}
                    <AnimatePresence initial={false} custom={direction}>
                        <div className="flex-1 w-full h-full md:hidden sm:flex flex-col gap-2 overflow-hidden relative mb-2 pt-2 border-t border-gray-primary">
                            <motion.img
                                variants={variants}
                                animate="animate"
                                initial="initial"
                                exit="exit"
                                src={images[curImage]}
                                alt="slides"
                                className="w-full max-w-full h-full sm:object-contain md:object-fill"
                                key={images[curImage]}
                                custom={direction}
                            />

                            <div className="absolute inset-0 flex items-center justify-center z-30">
                                <div className="w-full flex items-center justify-between px-6">
                                    <span className="text-2xl text-gray-500 cursor-pointer" onClick={prevStep}>
                                        <FontAwesomeIcon icon={faChevronCircleLeft} />
                                    </span>
                                    <span className="text-2xl text-gray-500 cursor-pointer" onClick={nextStep}>
                                        <FontAwesomeIcon icon={faChevronCircleRight} />
                                    </span>
                                </div>
                            </div>

                            <div className="absolute flex items-end justify-center gap-[6px] w-full h-full inset-0 pb-4">
                                {[1, 2, 3, 4].map((item, index) => {
                                    return (
                                        <span
                                            key={index}
                                            className={classNames('w-2 h-2  rounded-full', {
                                                ['bg-gray-300']: index !== curImage,
                                                ['bg-white']: index === curImage,
                                            })}
                                        ></span>
                                    );
                                })}
                            </div>
                        </div>
                    </AnimatePresence>
                    {/* mobile */}

                    <div className="border-t border-gray-primary ">
                        <div className="flex items-center justify-between py-[14px] px-9">
                            <div className="flex flex-col gap-1 text-post-primary text-sm ">
                                <span className="font-semibold tracking-wide">{toAbbrevNumber(1200000)} likes</span>
                                <p className="text-[#666666]">{moment(new Date()).format('MMMM Do, YYYY')}</p>
                            </div>

                            <div className="text-post-primary flex items-center gap-4">
                                <motion.div
                                    onClick={handleLike}
                                    className="flex items-center justify-center"
                                    whileTap={{
                                        scale: !like ? 2 : 1,
                                    }}
                                >
                                    <FontAwesomeIcon
                                        className={classNames('w-6 h-6', {
                                            ['text-fill-heart']: like,
                                        })}
                                        icon={like ? faHeartFull : faHeart}
                                    />
                                </motion.div>
                                {icons.map((item, index) => {
                                    return (
                                        <WrapperAnimation className="cursor-pointer" key={index} hover={{}}>
                                            <FontAwesomeIcon className="w-6 h-6" icon={item} />
                                        </WrapperAnimation>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="bg-[#F7F7F7] py-[14px] px-9 flex items-center justify-between gap-4 text-post-primary">
                            <WrapperAnimation className="cursor-pointer" hover={{}}>
                                <FontAwesomeIcon className="w-6 h-6" icon={faFaceSmile} />
                            </WrapperAnimation>
                            <div className="flex-1 text-sm">
                                <input type="text" className="outline-none border-none bg-transparent w-full h-full placeholder:text-sm" placeholder="Leave a comment..." />
                            </div>
                            <WrapperAnimation className="cursor-pointer" hover={{}}>
                                <FontAwesomeIcon className="w-6 h-6" icon={faPaperPlane} />
                            </WrapperAnimation>
                        </div>
                    </div>
                </div>
            </div>
        </WraperDialog>
    );
}
