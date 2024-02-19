'use client';
import React, { ReactNode, useEffect, useState } from 'react';
import { ContainerContent } from '../common';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { RootState } from '@/configs/types';
import { delay } from '@/utils/funtionals';
import { contants } from '@/utils/contants';
import { ChatBox, PostDialog, PrimaryPostButton, WrapperAnimation } from '..';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from '@mui/material';
import { setOpenPostModal } from '@/redux/slice/adorableSlide';

export interface IAdorableSnapshotsLayoutProps {
    children: ReactNode;
}

export default function AdorableSnapshotsLayout({ children }: IAdorableSnapshotsLayoutProps) {
    const { user } = useAppSelector((state: RootState) => state.userReducer);
    const { openPostModal } = useAppSelector((state: RootState) => state.adorableReducer);

    const dispatch = useAppDispatch();

    const [showChatbox, setShowChatbox] = useState(false);

    useEffect(() => {
        (async () => {
            if (user && user.role && !contants.roles.manageRoles.includes(user?.role)) {
                await delay(2000);
                setShowChatbox(true);
            } else {
                setShowChatbox(false);
            }
        })();
    }, [user]);

    return (
        <ContainerContent className="h-full">
            <div className="flex items-center justify-center pt-6 md:pt-12 pb-8 border-b border-violet-post-primary">
                <h1 className="text-[2rem] md:text-[2.4rem] font-bold text-gradient block">ADORABLE PETS CORNER</h1>
            </div>
            {children}

            {showChatbox && (
                <div className="fixed bottom-[2%] right-[2%] flex flex-col items-center gap-4">
                    <Tooltip placement="top" title="New post">
                        <div
                            onClick={() => {
                                console.log(12321);
                                dispatch(setOpenPostModal(true));
                            }}
                        >
                            <WrapperAnimation
                                hover={{}}
                                className="flex items-center justify-center border cursor-pointer p-7 text-[15px] rounded-full bg-[#F6F6F6] text-violet-post-primary border-violet-post-primary font-medium  w-[56px] h-[56px]"
                            >
                                <FontAwesomeIcon icon={faPlus} />
                            </WrapperAnimation>
                        </div>
                    </Tooltip>

                    <ChatBox />
                </div>
            )}
            {openPostModal && <PostDialog />}
        </ContainerContent>
    );
}
