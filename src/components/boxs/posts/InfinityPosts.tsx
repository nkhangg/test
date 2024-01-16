'use client';
import React, { useEffect, useRef, useState } from 'react';
import { LoadingSecondary, Post } from '@/components';
import classNames from 'classnames';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { delay } from '@/utils/funtionals';

export interface IInfinityPostsProps {}

export default function InfinityPosts(props: IInfinityPostsProps) {
    const refCountPage = useRef<number>(1);

    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(true);

    const fetchPosts = async (skip = 0, limit = 10) => {
        setLoading(true);

        // test loading
        await delay(2000);
        const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);

        const data = await res.json();

        if (data.total <= skip + limit) setHasNextPage(false);
        setLoading(false);

        return data.products;
    };

    const lastPostRef = useIntersectionObserver<HTMLDivElement>(() => {
        refCountPage.current += 1;
        fetchPosts(refCountPage.current).then((newPosts) => setPosts((posts) => [...posts, ...newPosts]));
    }, [hasNextPage, !loading]);

    useEffect(() => {
        fetchPosts().then(setPosts);
    }, []);

    return (
        <>
            <div
                className={classNames('grid', {
                    ['lg:grid-cols-4 gap-4 py-4']: true,
                    ['md:grid-cols-3']: true,
                })}
            >
                {posts.map((item, index, posts) => {
                    return (
                        <div key={index} ref={posts.length - 1 === index ? lastPostRef : null}>
                            <Post variant="rounded" />
                        </div>
                    );
                })}
            </div>
            {loading && (
                <div className="flex items-center justify-center py-10 overflow-hidden">
                    <LoadingSecondary color="#3E3771" defaultStyle={false} />
                </div>
            )}
        </>
    );
}
