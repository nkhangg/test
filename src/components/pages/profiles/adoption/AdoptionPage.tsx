'use client';
import React, { useCallback, useRef } from 'react';
import AdoptionPageItem from './AdoptionPageItem';
import { BaseProfilePage } from '../../common';
import { LoadingSecondary } from '@/components';
import { useInfinities } from '@/hooks';
import { getAdoptions } from '@/apis/pets';
import { useInfiniteQuery } from '@tanstack/react-query';
import { IAdoption } from '@/configs/interface';

export interface IAdoptionPageProps {}

export default function AdoptionPage(props: IAdoptionPageProps) {
    // const { lastDataRef, loading, data } = useInfinities({
    //     queryFN: getAdoptions,
    // });
    const intObserver: any = useRef();

    const rawAdoptions = useInfiniteQuery({
        queryKey: ['adoptions/infinity'],
        queryFn: ({ pageParam = 1 }) => {
            return getAdoptions(pageParam);
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage: any, allPages) => {
            return lastPage?.data?.data.length ? allPages.length + 1 : undefined;
        },
    });

    const lastPostRef = useCallback(
        (post: any) => {
            if (rawAdoptions.isFetchingNextPage) return;

            if (intObserver.current) intObserver.current.disconnect();

            intObserver.current = new IntersectionObserver((posts) => {
                if (posts[0].isIntersecting && rawAdoptions.hasNextPage) {
                    rawAdoptions.fetchNextPage();
                }
            });

            if (post) intObserver.current.observe(post);
        },
        [rawAdoptions],
    );

    return (
        <BaseProfilePage title="MY PETS">
            <div className="py-5 flex items-center flex-col gap-3">
                {/* {data.map((item, index) => {
                    return (
                        <div className="w-full" key={item.id} ref={data.length - 1 === index ? lastDataRef : null}>
                            <AdoptionPageItem data={item} />
                        </div>
                    );
                })} */}

                {rawAdoptions.data &&
                    rawAdoptions.data.pages[0].data.data.length > 0 &&
                    !rawAdoptions.isLoading &&
                    rawAdoptions.data.pages.map((item) => {
                        return item.data.data.map((i: IAdoption) => {
                            return (
                                <div className="w-full" key={i.id} ref={lastPostRef}>
                                    <AdoptionPageItem data={i} />
                                </div>
                            );
                        });
                    })}

                {(!rawAdoptions.data || (rawAdoptions.data && rawAdoptions.data.pages[0].data.data.length <= 0)) && (
                    <div className="w-full flex items-center justify-center py-8">
                        <span className="text-center text-black-main">{"You don't have any adoptions yet"}</span>
                    </div>
                )}
                <div className="flex items-center justify-center mt-8">{rawAdoptions.isLoading || (rawAdoptions.isFetching && <LoadingSecondary />)}</div>
            </div>
        </BaseProfilePage>
    );
}
