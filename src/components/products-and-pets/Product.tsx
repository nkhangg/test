/* eslint-disable @next/next/no-img-element */
import { IProduct } from '@/configs/interface';
import { links } from '@/datas/links';
import { capitalize, stringToUrl, toCurrency } from '@/utils/format';
import { Rating } from '@mui/material';
import Link from 'next/link';
import * as React from 'react';

export interface IProductProps {
    data: IProduct;
}

export default function Product({ data }: IProductProps) {
    return (
        <div className="flex flex-col items-center hover:shadow-primary pb-[21px] transition-all ease-linear max-h-[468px] rounded">
            <div className="w-full h-3/5 min-h-[304px] relative">
                <img className="w-full h-full object-contain" loading="lazy" src={data.image} alt={data.image} />

                <div className="absolute top-4 right-3 bg-[#EF4444] px-[14px] py-1 text-white font-medium rounded-full text-sm">
                    <span>-{data.discount}%</span>
                </div>
            </div>
            <div className="px-[20px] w-full">
                <div className="flex items-center justify-between w-full text-gray-primary text-sm ">
                    <span>{capitalize(data.branch)}</span>
                    <p>{data.size[0]}</p>
                </div>
                <Link href={links.produt + `${data.id}/${stringToUrl(data.name)}`} className="text-1xl line-clamp-2 hover:underline cursor-pointer mt-2 mb-1">
                    {data.name}
                </Link>
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
                <div className="flex items-center gap-[10px] mt-3">
                    <span className="text-lg text-[#EF4444]">{toCurrency(data.price)}</span>
                    <del className="text-sm text-black-main">{toCurrency(data.oldPrice)}</del>
                </div>
            </div>
        </div>
    );
}
