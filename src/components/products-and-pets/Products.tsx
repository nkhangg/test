import React from 'react';
import { BoxTitle, Pagination, Product, SekeletonProduct } from '..';
import { IProduct } from '@/configs/interface';
import { Grid } from '@mui/material';

export interface IProductsProps {
    data: IProduct[];
    title: string;
    pagination?: boolean;
    onPage?: (value: number) => void;
    totalPage?: number;
    loading?: boolean;
}

export default function Products({ data, title, pagination, totalPage, loading, onPage }: IProductsProps) {
    return (
        <BoxTitle underlineTitle title={title} locationTitle="left">
            {!loading && data && data.length > 0 && (
                <>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-y-6">
                        {data.map((product) => {
                            return <Product key={product.id} data={product} />;
                        })}
                    </div>
                    {pagination && <Pagination pages={totalPage || 1} onPage={onPage} />}
                </>
            )}

            {loading && (
                <>
                    <Grid container spacing={'10px'} rowSpacing={'20px'}>
                        <SekeletonProduct />
                        <SekeletonProduct />
                        <SekeletonProduct />
                        <SekeletonProduct />
                    </Grid>
                </>
            )}
        </BoxTitle>
    );
}
