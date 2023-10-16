import { BannerTakeAction, ContainerContent } from '@/components/common';
import React, { useState } from 'react';
import { CategoriesOverview, Overview } from '..';
import { BoxTitle, Product, ProductRecent, ProductRecents, Products } from '@/components';
import { takeActionPageData } from '@/datas/take-action';
import { notFound } from 'next/navigation';
import { takeAction } from '@/apis/app';
import { IApiTakeAction, IBaseResponse } from '@/configs/interface';
import LogicalTakeAction from './LogicalTakeAction';

async function getData() {
    try {
        const res = await takeAction();

        if (!res) return null;

        return res;
    } catch (error) {
        return {
            data: {
                newArrivals: takeActionPageData.newArrivals,
            },
            errors: false,
            message: 'Use default data',
            status: 200,
        } as IBaseResponse<IApiTakeAction>;

        // notFound();
    }
}

export interface ITakeAtionPageProps {}

export default async function TakeAtionPage(props: ITakeAtionPageProps) {
    const response = await getData();

    // default data if error
    let newArrivals;

    // check data
    if (!response || response.errors) {
        notFound();
    } else {
        const { data } = response;
        newArrivals = data.newArrivals;
        console.log(123);
    }

    return (
        <>
            <ContainerContent>
                <Overview />
                <CategoriesOverview />
            </ContainerContent>
            <Products data={newArrivals} title="NEW ARRIVALS" />
            <BannerTakeAction />
            {/* <Products data={takeActionPageData.bestSellers.data} title="BEST SELLERS" pagination /> */}
            <LogicalTakeAction />
            <ProductRecents title={'YOUR RECENT VIEW'} data={takeActionPageData.recents} />
        </>
    );
}
