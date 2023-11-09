/* eslint-disable @next/next/no-img-element */
import { IProduct } from '@/configs/interface';
import { links } from '@/datas/links';
import { stringToUrl } from '@/utils/format';
import { Rating } from '@mui/material';
import Link from 'next/link';
import * as React from 'react';

export interface IProductRecentProps {
    data: IProduct;
}

export default function ProductRecent({ data }: IProductRecentProps) {
    return (
        <Link href={links.produt + `${data.id}/${stringToUrl(data.name)}`}>
            <div className="flex items-center border border-gray-primary rounded w-full gap-2">
                <div className="w-2/5 h-[98px] max-w-[98px]">
                    <img className="w-full h-full object-contain" loading="lazy" src={data.image} alt={data.image} />
                </div>
                <div className="w-3/5 flex flex-col justify-between h-full pr-[18px] py-5">
                    <Rating
                        sx={{
                            '& .MuiSvgIcon-root': {
                                fontSize: '14px',
                            },
                        }}
                        name="read-only"
                        value={data.rating}
                        readOnly
                    />
                    <h4 className="line-clamp-1 text-[#374151] text-sm">{data.name}</h4>

                    <div className="">
                        <span className="text-[#EF4444] text-lg">{data.price}</span>
                        <del className="text-black-main text-sm ml-[10px]">{data.oldPrice}</del>
                    </div>
                </div>
            </div>
        </Link>
    );
}
