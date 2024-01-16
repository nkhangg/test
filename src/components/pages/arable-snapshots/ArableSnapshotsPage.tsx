'use client';
import { BoxPost, BoxPostHighlight, InfinityPosts, LoadingSecondary, Post, PostDialog, PrimaryPostButton, SearchInput } from '@/components';
import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { delay } from '@/utils/funtionals';

export interface IArableSnapshotsPageProps {}

export default function ArableSnapshotsPage(props: IArableSnapshotsPageProps) {
    const [search, setSearch] = useState('');

    // modals state
    const [openPostModal, setOpenPostModal] = useState(false);

    const handleOpenPostModal = () => {
        setOpenPostModal(true);
    };

    return (
        <div className="pt-12">
            <div className="flex flex-col md:flex-row md:gap-0 gap-5 items-center justify-between mb-10">
                <PrimaryPostButton onClick={handleOpenPostModal} hover="up" title="New Post" size="md" variant="rouded-fill" />
                <div className="w-full md:w-2/3 lg:w-1/3">
                    <SearchInput
                        className="bg-[#F7F7F7] py-[15px] px-6 border-[#D6D6D6]"
                        classNameInput="bg-inherit placeholder:text-sm text-sm"
                        defaultStyle={false}
                        placeholder="Interested in..."
                        variant="circle"
                        value={search}
                        handleChange={(e) => setSearch(e.target.value)}
                        handleClose={() => setSearch('')}
                    />
                </div>
            </div>

            <BoxPostHighlight title="HIGHLIGHT POSTS" data={[]} />

            <BoxPost title="OTHER POSTS" className="mt-20">
                <InfinityPosts />
            </BoxPost>

            {openPostModal && <PostDialog open={openPostModal} setOpen={setOpenPostModal} />}
        </div>
    );
}
