'use client';
import React, { useEffect, useMemo, useState } from 'react';
import Cart from './Cart';
import { dataCart } from '@/datas/cart-data';
import { ICart } from '@/configs/interface';
import { Checkbox } from '@mui/material';
import { useAppSelector } from '@/hooks/reduxHooks';
import { RootState } from '@/configs/types';

export interface ICartsProps {
    data: ICart[];
    onTotal?: (value: number) => void;
}

export default function Carts({ data, onTotal }: ICartsProps) {
    const { cartUser } = useAppSelector((state: RootState) => state.cartReducer);

    const total = useMemo(() => {
        if (cartUser.length <= 0) return 0;

        const newCart = cartUser.filter((item) => {
            return item.checked;
        });

        const results = newCart.reduce((result, item) => {
            return (result += item.price * item.quantity);
        }, 0);
        return results;
    }, [cartUser]);

    useEffect(() => {
        if (!onTotal) return;

        onTotal(total);
    }, [total, onTotal]);

    return (
        <>
            <div className="flex items-center py-4 text-xl border-b border-gray-primary font-semibold text-black-main">
                <div className="w-[8%] flex items-center">
                    <Checkbox />
                </div>
                <div className="flex-1 ml-8 flex flex-col items-center justify-center gap-5">
                    <span>Product</span>
                </div>

                <div className="lg:w-[10%] flex flex-col items-center justify-center">
                    <span>Quantity</span>
                </div>
                <div className="ml-2 md:w-[20%] flex items-center justify-center">
                    <span>Total</span>
                </div>
            </div>
            {cartUser.map((cart, index) => {
                return <Cart index={index} key={cart.id + cart.size.toString() + cart.branch} data={cart} />;
            })}
        </>
    );
}
