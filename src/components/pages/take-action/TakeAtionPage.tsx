'use client';
import { BannerTakeAction, ContainerContent } from '@/components/common';
import React, { useState } from 'react';
import { CategoriesOverview, Overview } from '..';
import { BoxTitle, LoadingPrimary, Product, ProductRecent, ProductRecents, Products } from '@/components';
import { takeActionPageData } from '@/datas/take-action';
import { notFound, useRouter } from 'next/navigation';
import { takeAction } from '@/apis/app';
import { IApiTakeAction, IBaseResponse } from '@/configs/interface';
import LogicalTakeAction from './LogicalTakeAction';
import { useQuery } from '@tanstack/react-query';

export interface ITakeAtionPageProps {}

export default function TakeAtionPage(props: ITakeAtionPageProps) {
    const router = useRouter();
    const { data, isLoading, error } = useQuery({
        queryKey: ['product/TakeAtionPage'],
        queryFn: () => takeAction(),
    });

    if (error) {
        router.push('/');
        return <span></span>;
    }

    return (
        <>
            <ContainerContent>
                <Overview />
                <CategoriesOverview />
            </ContainerContent>
            <Products data={data?.data.newArrivals || []} title="NEW ARRIVALS" />
            <BannerTakeAction />
            {/* <Products data={takeActionPageData.bestSellers.data} title="BEST SELLERS" pagination /> */}
            <LogicalTakeAction />
            <ProductRecents title={'YOUR RECENT VIEW'} data={takeActionPageData.recents} />

            {isLoading && <LoadingPrimary />}
        </>
    );
}
