/* eslint-disable @next/next/no-img-element */
'use client';
import React, { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import WraperDialog from '../WraperDialog';
import { Avatar, Button } from '@mui/material';
import { EmojiPicker, PrimaryPostButton, WrapperAnimation } from '@/components';
import { faImage, faPhotoFilm, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useAppSelector } from '@/hooks/reduxHooks';
import { ImageType, RootState } from '@/configs/types';
import { contants } from '@/utils/contants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDropzone } from 'react-dropzone';
import { fileToUrl } from '@/utils/format';
import { IMediasPrev } from '@/configs/interface';
import { EmojiClickData } from 'emoji-picker-react';
import Validate from '@/utils/validate';
import classNames from 'classnames';

export interface IPostDialogProps {
    open: boolean;
    setOpen: (v: boolean) => void;
}

export default function PostDialog({ open, setOpen }: IPostDialogProps) {
    // refs
    const refInput = useRef<HTMLTextAreaElement>(null);
    const dragImage = useRef(0);
    const draggedOverImage = useRef(0);

    // redux
    const { user } = useAppSelector((state: RootState) => state.userReducer);

    const clearFileActive: string[] = [];

    //states
    const [images, setImages] = useState<IMediasPrev[]>([]);
    const [messageMedias, setMessageMedias] = useState<string[]>([]);
    const [messageText, setMessageText] = useState('');

    const onDrop = useCallback((acceptedFiles: any) => {
        const files = acceptedFiles as File[];

        console.log(files);

        if (!files || !files.length) return;

        setMessageMedias([]);

        if (files.some((item) => item.type === 'video/mp4')) {
            const file = files[0];
            if (validateMedia(file)) {
                setMessageMedias(['Size no larger than 5MB']);
                return;
            }
            setImages([
                {
                    data: file,
                    link: fileToUrl(file, (url) => {
                        clearFileActive?.push(url);
                    }),
                    isVideo: true,
                },
            ]);
            setMessageMedias(['Only one video per post is accepted']);

            return;
        }
        const messages: string[] = [];

        const visibleFiles = files.filter((item) => {
            if (validateMedia(item)) {
                messages.push(`${item.name} photo larger than 5MB`);
            }
            return !validateMedia(item);
        });

        const activeFiles = visibleFiles.map((item) => {
            return {
                data: item,
                link: fileToUrl(item, (url) => {
                    clearFileActive?.push(url);
                }),
                isVideo: false,
            } as IMediasPrev;
        });

        if (messages.length) {
            setMessageMedias(messages);
        }

        setImages((prev) => [...prev, ...activeFiles]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //drozone
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const validateMedia = (file: File) => {
        console.log(file.size / Math.pow(10, 6), file.name);
        return file.size / Math.pow(10, 6) > Number(process.env.NEXT_PUBLIC_MEDIAS_SIZE);
    };

    const validate = () => {
        let text = null;
        let media = null;
        if (!refInput.current) return true;

        if (Validate.isBlank(refInput.current?.value)) {
            text = 'Please write something for your article';
            setMessageText(text);
        } else {
            setMessageText('');
        }

        if (!images.length) {
            media = 'The post must have at least one photo or only one video';
            setMessageMedias([media]);
        } else {
            setMessageMedias([]);
        }

        if (!text || !media) return true;

        return false;
    };

    const handleSort = () => {
        const imageClone = [...images];

        const temp = imageClone[dragImage.current];
        imageClone[dragImage.current] = imageClone[draggedOverImage.current];
        imageClone[draggedOverImage.current] = temp;
        setImages(imageClone);
    };

    const handleCloseImage = useCallback(
        (image: ImageType, index: number) => {
            images.splice(index, 1);
            setImages([...images]);
        },
        [images],
    );

    const handleAddIcon = (emojiObject: EmojiClickData, event: MouseEvent) => {
        if (!refInput.current) return;

        refInput.current.value += emojiObject.emoji;
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate()) return;
    };

    useEffect(() => {
        if (images.length && !messageMedias.length) {
            setMessageMedias([]);
        }
    }, [images, messageMedias]);

    useEffect(() => {
        return () => {
            if (clearFileActive.length) {
                clearFileActive.forEach((item) => {
                    URL.revokeObjectURL(item);
                });
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <WraperDialog
            sx={{
                '& .MuiPaper-root': {
                    borderRadius: '20px',
                },
            }}
            fullWidth={true}
            maxWidth={'md'}
            open={open}
            setOpen={setOpen}
        >
            <form onSubmit={handleSubmit} className="w-full h-full p-10 text-black-main flex flex-col justify-end">
                <div className="flex items-center gap-4 text-1xl font-semibold tracking-wider">
                    <Avatar
                        sx={{
                            width: '4rem',
                            height: '4rem',
                        }}
                        src={(user && user.avatar) || contants.avartarDefault}
                    />
                    <span>{(user && user.displayName) || user?.username}</span>
                </div>

                <div className="w-full mt-8 rounded-[20px] border border-gray-primary p-5 flex flex-col justify-between">
                    <textarea
                        ref={refInput}
                        spellCheck={false}
                        className="w-full resize-none outline-none scroll placeholder:text-1xl text-1xl"
                        placeholder="What is happening?"
                        name="status"
                        id="status"
                        cols={10}
                        rows={4}
                    />
                    {!Validate.isBlank(messageText) && <span className="text-sm text-fill-heart mb-2 italic">{messageText}</span>}
                    <div className="flex items-center justify-start gap-5">
                        <div {...getRootProps()}>
                            <WrapperAnimation hover={{}}>
                                <div className="flex items-center justify-center border gap-2 py-3 px-6 text-sm bg-[#F6F6F6] text-violet-post-primary border-violet-post-primary font-medium rounded-lg w-fit">
                                    <FontAwesomeIcon className="text-[20px]" icon={faPhotoFilm} />
                                    <span>Media</span>
                                </div>
                            </WrapperAnimation>

                            <input {...getInputProps} hidden />
                        </div>

                        <EmojiPicker classnNameIcon="text-violet-post-primary" onEmoji={handleAddIcon} stylePicker={{ height: 300 }} />
                    </div>

                    {/* messages */}
                    {messageMedias.length > 0 && (
                        <ul className="pl-5 list-disc text-sm italic text-fill-heart mt-4 ">
                            {messageMedias.map((item, index) => {
                                return (
                                    <li key={item}>
                                        {item}{' '}
                                        {index === 0 && (
                                            <span onClick={() => setMessageMedias([])} className="text-blue-primary hover:underline cursor-pointer">
                                                OK
                                            </span>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    )}

                    {/* preview medias */}
                    {images.length > 0 && (
                        <>
                            <div className="flex items-center gap-3 flex-wrap  mt-4">
                                {images.map((item, index) => {
                                    return (
                                        <div
                                            onDragStart={() => (dragImage.current = index)}
                                            onDragEnter={() => (draggedOverImage.current = index)}
                                            onDragEnd={handleSort}
                                            onDragOver={(e) => e.preventDefault()}
                                            draggable
                                            key={item.link}
                                            className={classNames(
                                                'w-20 select-none relative aspect-square rounded-lg border-2 flex items-center justify-center text-2xl text-black-main overflow-hidden ',
                                                {
                                                    ['border-post-primary']: index === 0,
                                                    ['border-gray-primary']: index !== 0,
                                                },
                                            )}
                                        >
                                            {!item.isVideo && <img className="w-full h-full object-cover aspect-square" src={item.link} alt={item.link} />}
                                            {item.isVideo && <video className="w-full h-full object-cover aspect-square" src={item.link} controls={false} />}
                                            <span onClick={() => handleCloseImage(item, index)} className="absolute top-0 right-0 px-2 text-1xl cursor-pointer text-white">
                                                <FontAwesomeIcon icon={faXmark} />
                                            </span>
                                        </div>
                                    );
                                })}

                                {isDragActive && (
                                    <div className="w-20 mt-4 aspect-square rounded border-dashed border-2 border-gray-primary flex items-center justify-center text-2xl text-black-main">
                                        <FontAwesomeIcon icon={faPlus} />
                                    </div>
                                )}
                            </div>
                            {images.length > 1 && (
                                <ul className="text-gray-500 italic text-sm mt-3">
                                    <li>You can drag and drop to choose the display position for the article. By default the first image will be displayed</li>
                                </ul>
                            )}
                        </>
                    )}
                </div>

                <div className="flex items-center justify-center mt-5">
                    <PrimaryPostButton title="Post" variant="circle-fill" size="sm" className="uppercase" />
                </div>
            </form>
        </WraperDialog>
    );
}
