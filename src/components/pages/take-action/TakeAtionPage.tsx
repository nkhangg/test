import { BannerTakeAction, ContainerContent } from '@/components/common';
import React, { useState } from 'react';
import { CategoriesOverview, Overview } from '..';
import { BoxTitle, Product, ProductRecent, ProductRecents, Products } from '@/components';
import { takeActionPageData } from '@/datas/take-action';
import classNames from 'classnames';

export interface ITakeAtionPageProps {}

export default function TakeAtionPage(props: ITakeAtionPageProps) {
    return (
        <>
            <ContainerContent>
                <Overview />
                <CategoriesOverview />
            </ContainerContent>
            <Products data={takeActionPageData.newArrivals} title="NEW ARRIVALS" />
            <BannerTakeAction />
            <Products data={takeActionPageData.bestSellers} title="BEST SELLERS" pagination />
            <ProductRecents title={'YOUR RECENT VIEW'} data={takeActionPageData.recents} />
        </>
    );
}
