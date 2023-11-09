'use client';
import React, { useState } from 'react';
import { BoxTitle, ProductRecent } from '..';
import classNames from 'classnames';
import { IProduct } from '@/configs/interface';

export interface IProductRencentProps {
    data: IProduct[];
    title: string;
    fontSizeTitle?: string;
}

export default function ProductRencent({ data, title, fontSizeTitle }: IProductRencentProps) {
    const [isHideScroll, setIsHideScroll] = useState(true);
    return (
        <BoxTitle title={title} locationTitle="left" underlineTitle fontSizeTitle={fontSizeTitle}>
            <div
                style={{
                    overscrollBehaviorInline: 'contain',
                }}
                onMouseEnter={() => setIsHideScroll(false)}
                onMouseLeave={() => setIsHideScroll(true)}
                className={classNames('scroll grid grid-flow-col auto-cols-[60%] md:auto-cols-[30%] lg:auto-cols-5item gap-[10px] pb-4 select-none transition-all ease-linear', {
                    'hide-scroll ': isHideScroll,
                })}
            >
                {data.map((product) => {
                    return <ProductRecent key={product.id} data={product} />;
                })}
            </div>
        </BoxTitle>
    );
}
