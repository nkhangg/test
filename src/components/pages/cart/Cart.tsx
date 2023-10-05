/* eslint-disable @next/next/no-img-element */
'use client';
import { ICart } from '@/configs/interface';
import React, { memo, useEffect, useState } from 'react';
import { toCurrency, toGam } from '@/utils/format';
import Quantity from './Quantity';
import { Checkbox } from '@mui/material';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { addCart, removeCart } from '@/redux/slice/cartsSlide';
import { useDispatch } from 'react-redux';

export interface ICartProps {
    data: ICart;
    index: number;
}

function Cart({ data, index }: ICartProps) {
    const [quantity, setQuantity] = useState(data.quantity);

    const dispatch = useDispatch();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);

        if (checked) {
            // dispatch(addCart({ ...data, checked: true }));
        }
    };

    const handleRemove = () => {
        dispatch(removeCart({ data, index }));
    };

    const [checked, setChecked] = React.useState(data.checked);

    useEffect(() => {
        // if (carts.length <= 0) return;
        // const ind = carts.indexOf(data);
        // const arr = carts;
        // arr[ind].quantity = quantity;
        // setCart([...arr]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quantity]);

    return (
        <div className="flex items-center py-[34px] h-[170px] border-b border-gray-primary text-black-main max-w-full">
            <div className="w-[8%]">
                {data.repo > 0 ? (
                    <Checkbox checked={checked} onChange={handleChange} />
                ) : (
                    <div className="w-fit py-2 px-3 flex items-center whitespace-nowrap border border-red-primary text-red-primary text-sm rounded font-bold">
                        <span>Out stock</span>
                    </div>
                )}
            </div>
            <div className=" w-[10%] h-full">
                <img className="w-full h-full object-contain" loading="lazy" src={data.image} alt={data.image} />
            </div>
            <div className="flex-1 ml-8 flex flex-col gap-5">
                <h2 className="text-lg line-clamp-1">{data.name}</h2>
                <div className="flex items-center text-sm">
                    <span className="">{data.branch}</span>
                    <span className="h-5 bg-[#666666] w-[1px] mx-3"></span>
                    <span>{toGam(data.size as number)}</span>
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
                <span onClick={handleRemove} className="cursor-pointer hover:underline text-violet-primary">
                    Remove
                </span>
            </div>
            <div className="ml-2 md:w-[20%] flex items-center justify-center text-sm md:text-xl md:ml-0">
                <span>{toCurrency(data.price * quantity <= 0 ? data.price : data.price * quantity)}</span>
            </div>
        </div>
    );
}

export default memo(Cart);
