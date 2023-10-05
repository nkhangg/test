'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { ContainerContent } from '../../common';
import { Box, Grid, Rating, Tab, Tabs, Typography } from '@mui/material';
import { MainButton, PreviewImageProduct, ProductRecents } from '../..';
import { dataDetailProductPage } from '@/datas/detail-product';
import { Nunito_Sans, Roboto_Flex } from 'next/font/google';
import classNames from 'classnames';
import { toCurrency, urlToString } from '@/utils/format';
import Sizes from './Sizes';
import Quantity from './Quantity';
import DesAndReview from './DesAndReview';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { addCart } from '@/redux/slice/cartsSlide';
const nunitoSans = Nunito_Sans({ subsets: ['latin'], style: ['normal', 'italic'], weight: ['300', '400', '500', '600', '700', '800'] });
const robotoFlex = Roboto_Flex({ subsets: ['latin'], style: ['normal'], weight: ['300', '400', '500', '600', '700', '800'] });
export interface IDetailProductPageProps {
    params: {
        id: string;
        name: string;
    };
}

export default function DetailProductPage({ params }: IDetailProductPageProps) {
    const [indexSizeAndPrice, setIndexSizeAndPrice] = useState(0);
    const [quantity, setQuantity] = useState(1);

    const dispatch = useAppDispatch();

    return (
        <>
            <ContainerContent className="pt-24 mb-96">
                <Grid container spacing={'65px'}>
                    <Grid item xs={12} md={5} lg={5}>
                        <div className=" w-full h-full rounded flex items-center justify-center">
                            <PreviewImageProduct images={dataDetailProductPage.images} />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={7} lg={7}>
                        <div className=" w-full h-full text-black-main max-w-full">
                            <h2
                                className={classNames('text-[32px] font-bold line-clamp-2', {
                                    [nunitoSans.className]: true,
                                })}
                            >
                                {dataDetailProductPage.name}
                            </h2>

                            <div className="flex md:flex-row flex-col md:items-center gap-3 md:gap-0 mt-5 text-lg">
                                <div
                                    className={classNames('flex items-center gap-[10px] border-r border-gray-primary md:pr-4 md:mr-4', {
                                        [robotoFlex.className]: true,
                                    })}
                                >
                                    <span className={classNames('text-[28px] text-red-primary font-bold')}>
                                        {toCurrency(dataDetailProductPage.sizeAndPrice[indexSizeAndPrice].price)}
                                    </span>
                                    <del className="">{toCurrency(dataDetailProductPage.sizeAndPrice[indexSizeAndPrice].oldPrice)}</del>
                                </div>

                                <Rating
                                    sx={{
                                        '& .MuiSvgIcon-root': {
                                            fontSize: '16px',
                                        },
                                    }}
                                    name="read-only"
                                    value={dataDetailProductPage.rating}
                                    readOnly
                                />
                                <p className=" md:ml-3">1234 reviews</p>
                            </div>
                            <span className="mt-[22px] inline-block">
                                Manufacturer: <b>{dataDetailProductPage.branch}</b>
                            </span>

                            <p className="line-clamp-6 mt-5 mb-7 text-1xl leading-8 text-[#374151] text-justify">{dataDetailProductPage.desciption}</p>

                            <Sizes
                                onSize={(value: number | string, index?: number) => {
                                    setIndexSizeAndPrice(index ?? 0);
                                }}
                                data={dataDetailProductPage.sizeAndPrice.map((item) => {
                                    return item.size;
                                })}
                            />

                            <Quantity
                                onQuantity={(quantity: number) => {
                                    console.log(quantity);
                                    setQuantity(quantity);
                                }}
                                maxValue={dataDetailProductPage.sizeAndPrice[indexSizeAndPrice].repo}
                            />

                            <div className="mt-[50px] flex items-center gap-5">
                                <MainButton
                                    title="add to card"
                                    onClick={() => {
                                        dispatch(
                                            addCart({
                                                id: params.id,
                                                branch: dataDetailProductPage.branch,
                                                image: dataDetailProductPage.image,
                                                name: dataDetailProductPage.name,
                                                price: dataDetailProductPage.sizeAndPrice[indexSizeAndPrice].price,
                                                quantity: quantity,
                                                repo: dataDetailProductPage.sizeAndPrice[indexSizeAndPrice].repo,
                                                size: dataDetailProductPage.sizeAndPrice[indexSizeAndPrice].size,
                                                checked: true,
                                            }),
                                        );
                                    }}
                                />
                                <MainButton background="bg-orange-primary" title="buy now" />
                            </div>
                        </div>
                    </Grid>
                </Grid>
                <DesAndReview description={dataDetailProductPage.desciption} review="this is review" />
            </ContainerContent>
            <ProductRecents title="Suggestions just for you" fontSizeTitle="text-[24px]" data={dataDetailProductPage.suggestions} />
        </>
    );
}
