'use client';
import React, { useState } from 'react';
import { LoadingSecondary, MenuDropDownRadio, Pagination, Product } from '@/components';
import { ContainerContent, Sort } from '@/components/common';
import { SortType } from '@/configs/types';
import { dataTakeAction } from '@/datas/adopt';
import { dataProductFilter } from '@/datas/data-product-filter';
import { useQuery } from '@tanstack/react-query';
import { filterPage, typesAndBrands } from '@/apis/app';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { pushNoty } from '@/redux/slice/appSlice';
import { IDataRequestFilter } from '@/configs/interface';

export interface IProductFilterPageProps {}

export default function ProductFilterPage(props: IProductFilterPageProps) {
    const baseUrl = '/take-action/products';
    const searchParams = useSearchParams();

    const page = searchParams.get('page');

    const [filter, setFilter] = useState<IDataRequestFilter>({});

    const dispatch = useAppDispatch();

    const router = useRouter();

    const typesAndBrandsData = useQuery({
        queryKey: ['typeandbrand'],
        queryFn: () => typesAndBrands(),
    });

    const { data, error, isLoading } = useQuery({
        queryKey: ['productFilterPage/filter-date', filter, page],
        queryFn: () => filterPage({ ...filter, page: typeof page === 'string' ? parseInt(page) - 1 + '' : '0' }),
    });

    if (typesAndBrandsData.error || error) {
        router.push('/');
        dispatch(
            pushNoty({
                title: 'Something went wrong !',
                type: 'error',
                open: true,
            }),
        );
    }

    return (
        <ContainerContent className="">
            <Sort
                categories={typesAndBrandsData.data?.data.types || []}
                sorts={dataTakeAction.sorts}
                onCategories={(value) => {
                    if (page) {
                        router.push(baseUrl);
                    }
                    setFilter({
                        ...filter,
                        typeName: value || undefined,
                    });
                }}
                onSorts={(value: SortType) => {
                    if (value) {
                        setFilter({
                            ...filter,
                            sort: value,
                        });
                    }
                }}
                onSearch={(value: string) => {
                    setFilter({
                        ...filter,
                        productName: value || undefined,
                    });
                }}
            />

            <div className="flex md:flex-row flex-col justify-between min-h-[1000px] mt-9 gap-[38px]">
                <div className="w-full md:w-[24%] lg:w-[20%] h-full text-black-main select-none">
                    <div className="py-5 w-full border-b border-gray-primary">
                        <h6 className="font-medium text-xl">Filter</h6>
                    </div>
                    <MenuDropDownRadio
                        onValues={(price) => {
                            if (price) {
                                if (page) {
                                    router.push(baseUrl);
                                }

                                const [min, max] = price.toString().split(',');

                                setFilter({
                                    ...filter,
                                    minPrice: min,
                                    maxPrice: max,
                                });
                            }
                            console.log('price');
                        }}
                        title={'Price'}
                        data={dataProductFilter.fillters.prices}
                    />
                    <MenuDropDownRadio
                        onValues={(stock) => {
                            if (stock.length > 1) {
                                if (page) {
                                    router.push(baseUrl);
                                }
                                setFilter({
                                    ...filter,
                                    stock: stock.length > 1,
                                });
                            }
                        }}
                        title={'Stock'}
                        data={dataProductFilter.fillters.stock}
                    />
                    <MenuDropDownRadio
                        onValues={(brand) => {
                            console.log('brand', brand);
                            if (brand && typeof brand === 'string') {
                                if (page) {
                                    router.push(baseUrl);
                                }
                                setFilter({
                                    ...filter,
                                    brand: brand,
                                });
                            }
                        }}
                        title={'Brand'}
                        data={dataProductFilter.fillters.brands}
                    />
                </div>
                <div className="flex-1 flex flex-col items-center">
                    {data?.data && !isLoading && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px] gap-y-9">
                                {data?.data.filterProducts.map((product) => {
                                    return <Product key={product.id} data={product} />;
                                })}
                            </div>
                            <Pagination baseHref={baseUrl + '?page='} pages={data.data.pages} />
                        </>
                    )}

                    {isLoading && <LoadingSecondary />}

                    {((data?.data && data.data.filterProducts.length <= 0) || !data?.data) && <p className="text-black-main text-lg">No suitable products were found</p>}
                </div>
            </div>
        </ContainerContent>
    );
}
