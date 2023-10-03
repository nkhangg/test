'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Cart from './Cart';
import { dataCart } from '@/datas/cart-data';
import { ICart } from '@/configs/interface';

export interface ICartsProps {
    data: ICart[];
    onTotal?: (value: number) => void;
}

export default function Carts({ data, onTotal }: ICartsProps) {
    const [carts, setCarts] = useState(data);

    const total = useMemo(() => {
        const results = carts.reduce((result, item) => {
            return (result += item.price * item.quantity);
        }, 0);
        return results;
    }, [carts]);

    useEffect(() => {
        if (!onTotal) return;

        onTotal(total);
    }, [total, onTotal]);
    return (
        <div className="">
            {carts.map((cart, index) => {
                return <Cart carts={carts} setCart={setCarts} key={cart.id} data={cart} />;
            })}
        </div>
    );
}
