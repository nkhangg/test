/* eslint-disable @next/next/no-img-element */
'use client';
import React, { FormEvent, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import WraperDialog from '../WraperDialog';
import { Avatar } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Comment, EmojiPicker, MiniLoading, OptionButton, WrapperAnimation } from '@/components';
import { toAbbrevNumber } from '@/utils/format';
import { faChevronCircleLeft, faChevronCircleRight, faHeart as faHeartFull, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faComment, faShareSquare, faFaceSmile, faFaceSmileWink } from '@fortawesome/free-regular-svg-icons';
import moment from 'moment';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { commentWittPost, deleteCommentWittPost, deletePost, getCommentWithPost, getDetailPost, likeComment, likePost } from '@/apis/posts';
import { contants } from '@/utils/contants';
import { useQueryState } from 'nuqs';
import { IComment, PagiantionResponse } from '@/configs/interface';
import { useAppSelector } from '@/hooks/reduxHooks';
import { RootState } from '@/configs/types';
import { appService } from '@/services/appService';
import { toast } from 'react-toastify';
import Validate from '@/utils/validate';
import { EmojiClickData } from 'emoji-picker-react';
import MediaPostDetail from './MediaPostDetail';
import MediaPostDetailMobile from './MediaPostDetailMobile';

// const icons = [faComment, faShareSquare];
const icons = [faShareSquare];

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
    const pathname = usePathname();
    const router = useRouter();

    const refInput = useRef<HTMLInputElement>(null);

    const { user } = useAppSelector((state: RootState) => state.userReducer);

    const [like, setLike] = useState(false);

    const [uuid] = useQueryState('uuid');

    const [replay, setReplay] = useState<IComment | null>(null);
    const [loadingComment, setLoadingComment] = useState(false);

    const [comments, setComments] = useState<PagiantionResponse<IComment> | null>(null);
    const [pageComment, setPageComment] = useState(1);

    const rawData = useQuery({
        queryKey: ['postDetailDialog', uuid],
        queryFn: () => {
            if (!uuid) return null;
            return getDetailPost(uuid);
        },
    });
    const rawComments = useQuery({
        queryKey: ['postDetailDialog/comments', uuid, pageComment],
        queryFn: () => {
            if (!uuid) return null;
            return getCommentWithPost(uuid, pageComment);
        },
    });

    const data = useMemo(() => {
        if (rawData.isError || !rawData.data?.data) return null;

        return rawData.data?.data;
    }, [rawData]);

    // const comments = useMemo(() => {
    //     if (rawComments.isError || !rawComments.data?.data) return null;

    //     return rawComments.data?.data;
    // }, [rawComments]);

    //images
    const [curImage, setCurImage] = useState(0);
    const [direction, setDirection] = useState(0);

    const [images, setImages] = useState(data?.images || []);

    useLayoutEffect(() => {
        if (data?.images.length) {
            setImages(data.images);
        }

        if (data) {
            setLike(data.isLike);
        }
    }, [data]);

    const handleClose = () => {
        if (!onClose) return;
        onClose();
    };

    const handleLike = async () => {
        if (!user) return appService.handleNonLogin(pathname, router);

        if (!data) return;

        setLike((prev) => !prev);

        try {
            const response = await likePost(data.id as string);

            if (!response) {
                return toast.warn(contants.messages.errors.handle);
            }

            if (response.errors) {
                return toast.warn(response.message);
            }

            rawData.refetch();
            setLike((prev) => !prev);
        } catch (error) {
            return toast.warn(contants.messages.errors.server);
        }
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

    const handleClickLike = async (data: IComment) => {
        if (!user) return appService.handleNonLogin(pathname, router);

        try {
            const response = await likeComment(data.id);

            if (!response) {
                return toast.warn(contants.messages.errors.handle);
            }

            if (response.errors) {
                return toast.warn(response.message);
            }

            rawComments.refetch();
        } catch (error) {
            return toast.warn(contants.messages.errors.server);
        }
    };

    const handleReplay = async (data: IComment) => {
        if (!user) return appService.handleNonLogin(pathname, router);
        setReplay(data);
    };

    const handleSubmitComment = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!user) return appService.handleNonLogin(pathname, router);

        if (!data || !refInput.current) return;

        const value = refInput.current.value;

        if (Validate.isBlank(value)) return;

        try {
            setLoadingComment(true);
            const response = await commentWittPost({
                comment: value,
                uuid: data?.id as string,
                replayId: replay ? replay.id : null,
            });

            if (!response) {
                return toast.warn(contants.messages.errors.handle);
            }

            if (response.errors) {
                return toast.warn(response.message);
            }

            rawComments.refetch();
            refInput.current.value = '';
            if (replay) {
                setReplay(null);
            }
        } catch (error) {
            return toast.warn(contants.messages.errors.server);
        } finally {
            setLoadingComment(false);
        }
    };

    const handleAddIcon = (emojiObject: EmojiClickData, event: MouseEvent) => {
        if (!refInput.current) return;

        refInput.current.value += emojiObject.emoji;
    };

    const handleDeleteComment = async (data: IComment) => {
        if (!user) return appService.handleNonLogin(pathname, router);

        if (!data.owner) return;

        try {
            const response = await deleteCommentWittPost(data.id);

            if (!response) {
                return toast.warn(contants.messages.errors.handle);
            }

            if (response.errors) {
                return toast.warn(response.message);
            }

            rawComments.refetch();
        } catch (error) {
            return toast.warn(contants.messages.errors.server);
        } finally {
        }
    };
    const handleDeletePost = async () => {
        if (!user) return appService.handleNonLogin(pathname, router);
        if (!data || !data.owner) return;

        try {
            const response = await deletePost(data.id as string);

            if (!response) {
                return toast.warn(contants.messages.errors.handle);
            }

            if (response.errors) {
                return toast.warn(response.message);
            }

            setOpen(false);
            toast.success('Your post has been successfully deleted');
        } catch (error) {
            return toast.warn(contants.messages.errors.server);
        }
    };

    useLayoutEffect(() => {
        if (rawComments.isError || !rawComments.data?.data) return;

        setComments(rawComments.data?.data);
    }, [rawComments]);

    if (!data) {
        return;
    }

    return (
        <WraperDialog fullWidth={true} maxWidth={'lg'} open={open} setOpen={setOpen} onClose={handleClose}>
            <div className="w-full text-post-primary flex items-center justify-between h-[80vh] select-none ">
                <MediaPostDetail images={images} />
                <div className="md:w-1/2 lg:w-2/5 w-full h-full flex flex-col justify-between">
                    <div className="w-full h-fit p-8 pb-0">
                        <div className="w-full flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Avatar sx={{ width: '3.75rem', height: '3.75rem' }} src={data.user.avatar || contants.avartarDefault} />
                                <span className="text-lg font-semibold">{data.user.displayName || data.user.username}</span>
                            </div>
                            {data.owner && <OptionButton handleDelete={handleDeletePost} options={{ border: true }} />}
                        </div>
                        <p className="font-medium text-1xl mt-3 pb-[22px] md:border-b border-[#B5A8FF] text-[#444444]">{data.title}</p>
                    </div>

                    {comments && comments.data.length > 0 && (
                        <div className="px-8 flex-1 w-full h-full hidden md:flex flex-col gap-2 overflow-y-auto overflow-x-hidden scroll py-6">
                            {!rawComments.isLoading &&
                                comments.data.map((item) => {
                                    return <Comment onDelete={handleDeleteComment} onReplay={handleReplay} onLike={handleClickLike} data={item} item={true} key={item.id} />;
                                })}

                            {rawComments.isLoading && <MiniLoading color="#3E3771" className="w-full h-full flex items-center justify justify-center" />}
                        </div>
                    )}

                    {comments && comments.data.length <= 0 && (
                        <div className="px-8 hidden md:flex-1 w-full h-full sm:hidden md:flex gap-2 overflow-y-auto overflow-x-hidden scroll py-6 items-center">
                            <span className="text-center text-black-main">You are the first to comment on this article</span>
                            <FontAwesomeIcon className="" icon={faFaceSmileWink} />
                        </div>
                    )}

                    <MediaPostDetailMobile images={images} />

                    <div className="border-t border-gray-primary ">
                        <div className="flex items-center justify-between py-[14px] px-9">
                            <div className="flex flex-col gap-1 text-post-primary text-sm ">
                                <span className="font-semibold tracking-wide">{toAbbrevNumber(data.likes)} likes</span>
                                <p className="text-[#666666]">{moment(data.createdAt).format('MMMM Do, YYYY')}</p>
                            </div>

                            <div className="text-post-primary flex items-center gap-4">
                                <motion.div
                                    onClick={handleLike}
                                    className="flex items-center justify-center cursor-pointer"
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
                        {replay && (
                            <div className="px-9 text-sm mb-2">
                                <div className="bg-gray-200 rounded-2xl w-fit py-1 px-3 text-black-main">@ {replay.user.displayName || replay.user.username}</div>
                            </div>
                        )}
                        <form
                            onSubmit={loadingComment ? undefined : handleSubmitComment}
                            className="bg-[#F7F7F7] py-[14px] px-9 flex items-center justify-between gap-4 text-post-primary"
                        >
                            <EmojiPicker
                                icon={
                                    <WrapperAnimation className="cursor-pointer" hover={{}}>
                                        <FontAwesomeIcon className="w-6 h-6" icon={faFaceSmile} />
                                    </WrapperAnimation>
                                }
                                onEmoji={handleAddIcon}
                            />
                            <div className="flex-1 text-sm relative">
                                <input
                                    ref={refInput}
                                    type="text"
                                    className="outline-none border-none bg-transparent w-full h-full placeholder:text-sm"
                                    placeholder="Leave a comment..."
                                />

                                {loadingComment && (
                                    <div className="absolute inset-0 flex items-center justify-end w-full max-h-fit">
                                        <MiniLoading color="#3E3771" className="w-full h-full flex items-center justify justify-end" />
                                    </div>
                                )}
                            </div>
                            <button type="submit" className="outline-none border-none">
                                <WrapperAnimation className="cursor-pointer" hover={{}}>
                                    <FontAwesomeIcon className="w-6 h-6" icon={faPaperPlane} />
                                </WrapperAnimation>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </WraperDialog>
    );
}
