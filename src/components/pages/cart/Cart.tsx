/* eslint-disable @next/next/no-img-element */
'use client';
import { ICart } from '@/configs/interface';
import React, { memo, useEffect, useState } from 'react';
import { toCurrency } from '@/utils/format';
import Quantity from './Quantity';

export interface ICartProps {
    data: ICart;
    setCart: (cart: ICart[]) => void;
    carts: ICart[];
}

function Cart({ data, carts, setCart }: ICartProps) {
    const [quantity, setQuantity] = useState(data.quantity);

    useEffect(() => {
        const ind = carts.indexOf(data);
        const arr = carts;

        arr[ind].quantity = quantity;

        setCart([...arr]);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quantity]);

    return (
        <div className="flex items-center py-[34px] h-[170px] border-b border-gray-primary text-black-main max-w-full">
            <div className=" w-[10%] h-full">
                <img className="w-full h-full object-contain" loading="lazy" src={data.image} alt={data.image} />
            </div>
            <div className="flex-1 ml-8 flex flex-col gap-5">
                <h2 className="text-lg line-clamp-1">{data.name}</h2>
                <div className="flex items-center text-sm">
                    <span className="">{data.branch}</span>
                    <span className="h-5 bg-[#666666] w-[1px] mx-3"></span>
                    <span>{data.size}</span>
                </div>
            </div>

            <div className="lg:w-[10%] text-black-main flex flex-col items-center gap-3 select-none">
                <Quantity
                    initValue={data.quantity}
                    onQuantity={(value: number) => {
                        setQuantity(value);
                    }}
                    maxValue={data.repo}
                />
                <span className="cursor-pointer hover:underline text-violet-primary">Remove</span>
            </div>
            <div className="ml-2 md:w-[20%] flex items-center justify-center text-sm md:text-xl md:ml-0">
                <span>{toCurrency(data.price * quantity)}</span>
            </div>
        </div>
    );
}

export default memo(Cart);
