import React from 'react';
import { BoxTitle, Pagination, Product } from '..';
import { IProduct } from '@/configs/interface';

export interface IProductsProps {
    data: IProduct[];
    title: string;
    pagination?: boolean;
}

export default function Products({ data, title, pagination }: IProductsProps) {
    return (
        <BoxTitle underlineTitle title={title} locationTitle="left">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-y-6">
                {data.map((product) => {
                    return <Product key={product.id} data={product} />;
                })}
            </div>

            {pagination && <Pagination pages={10} />}
        </BoxTitle>
    );
}
