'use client';
import React, { useState } from 'react';
import WraperDialog from '../WraperDialog';
import { Avatar, Button } from '@mui/material';
import { PrimaryPostButton, WrapperAnimation } from '@/components';
import { faPhotoFilm } from '@fortawesome/free-solid-svg-icons';
import { useAppSelector } from '@/hooks/reduxHooks';
import { RootState } from '@/configs/types';
import { contants } from '@/utils/contants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface IPostDialogProps {
    open: boolean;
    setOpen: (v: boolean) => void;
}

export default function PostDialog({ open, setOpen }: IPostDialogProps) {
    // redux
    const { user } = useAppSelector((state: RootState) => state.userReducer);

    return (
        <WraperDialog
            sx={{
                '& .MuiPaper-root': {
                    borderRadius: '20px',
                },
            }}
            fullWidth={true}
            maxWidth={'sm'}
            open={open}
            setOpen={setOpen}
        >
            <div className="w-full h-full p-10 text-black-main">
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
                        spellCheck={false}
                        className="w-full resize-none outline-none scroll placeholder:text-1xl text-1xl"
                        placeholder="What is happening?"
                        name="status"
                        id="status"
                        cols={10}
                        rows={4}
                    />
                    <div className="flex items-center justify-start">
                        <WrapperAnimation hover={{}}>
                            <label
                                htmlFor="media-post-btn"
                                className="flex items-center justify-center border gap-2 py-3 px-6 text-sm bg-[#F6F6F6] text-violet-post-primary border-violet-post-primary font-medium rounded-lg w-fit"
                            >
                                <FontAwesomeIcon className="text-[20px]" icon={faPhotoFilm} />
                                <span>Media</span>
                            </label>
                        </WrapperAnimation>
                    </div>
                    <input type="file" hidden id="media-post-btn" />
                </div>

                <div className="flex items-center justify-center mt-5">
                    <PrimaryPostButton title="Post" variant="circle-fill" size="sm" className="uppercase" />
                </div>
            </div>
        </WraperDialog>
    );
}
