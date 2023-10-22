/* eslint-disable @next/next/no-img-element */
'use client';
import { CardInfo, DynamicInput, TextField, Notifycation, LoadingPrimary } from '@/components';
import { SelectImages } from '@/components/common';
import { DashboardCard } from '@/components/dashboard';
import { Box, Button, CircularProgress, Grid, MenuItem, Stack, Tab, Tabs, capitalize } from '@mui/material';
import Link from 'next/link';
import React, { ChangeEvent, FocusEvent, useEffect, useState } from 'react';
import { productManageData } from '@/datas/product-manage-data';
import { useQuery } from '@tanstack/react-query';
import { typesAndBrands } from '@/apis/app';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { pushNoty } from '@/redux/slice/appSlice';
import { useRouter } from 'next/navigation';
import { links } from '@/datas/links';
import { DataProductType } from '@/configs/interface';
import { detailProductManage, updateProduct } from '@/apis/admin/product';
import TabCustom from '@/components/inputs/TabCustom';
import Infomation from './update/Infomation';
import Repositories from './update/Repositories';
import Images from './update/Images';

type DataProductErrorsType = {
    name: string;
    type: string;
    brand: string;
    images: string;
    repo: string;
    description: string;
};

const initDataErrors: DataProductErrorsType = {
    name: '',
    brand: '',
    type: '',
    images: '',
    description: '',
    repo: '',
};

const initData: DataProductType = {
    id: '',
    name: '',
    brand: '',
    type: productManageData.types[0].id,
    images: [],
    description: '',
    repo: [],
};

export interface ICreateOrUpdateProductProps {
    idProduct: string;
    dataOusite?: DataProductType;
}

export default function UpdateProduct({ idProduct, dataOusite }: ICreateOrUpdateProductProps) {
    // redux
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState(0);

    const typesAndBrandsData = useQuery({
        queryKey: ['typeandbrand'],
        queryFn: () => typesAndBrands(),
    });

    const dataProduct = useQuery({
        queryKey: ['UpdateProduct/update', idProduct],
        queryFn: () => detailProductManage(idProduct),
    });

    if (typesAndBrandsData.error || dataProduct.error) {
        dispatch(
            pushNoty({
                title: "Something went wrong, Can't get data",
                type: 'error',
                open: true,
            }),
        );

        router.push(links.admin);
    }

    const [data, setData] = useState<DataProductType>(initData);

    useEffect(() => {
        const type = typesAndBrandsData.data?.data.types.find((item) => item.name === dataProduct.data?.data.type)?.id;

        setData({
            ...dataProduct.data?.data,
            id: dataProduct.data?.data.id || '',
            name: dataProduct.data?.data.name || '',
            brand: dataProduct.data?.data.brand || '',
            type: typeof type === 'object' ? '' : type || '',
            images: dataProduct.data?.data.images || [],
            description: dataProduct.data?.data.description || '',
            repo: dataProduct.data?.data.repo || [],
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataProduct.data?.data]);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const response = await updateProduct(data);
            setLoading(false);
            if (!response.data || response.errors) {
                dispatch(
                    pushNoty({
                        title: 'Update Falure !',
                        open: true,
                        type: 'error',
                    }),
                );

                return;
            }

            router.push(links.admin + 'product');
            dispatch(
                pushNoty({
                    title: 'Update Successfuly !',
                    open: true,
                    type: 'success',
                }),
            );
        } catch (error) {
            console.log('error in update product ' + error);
            setLoading(false);
            dispatch(
                pushNoty({
                    title: 'Update Falure !',
                    open: true,
                    type: 'error',
                }),
            );
        }
    };

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <DashboardCard
            title="Product Detail"
            action={
                <>
                    <Button>
                        <Link href={'/admin/dashboard/product/preview'}>Preview</Link>
                    </Button>
                </>
            }
        >
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChangeTab} aria-label="basic tabs example">
                        <Tab label="Information" />
                        <Tab label="Repositories" />
                        <Tab label="Images" />
                    </Tabs>
                </Box>
                <TabCustom value={value} index={0}>
                    <Infomation id={idProduct} />
                </TabCustom>
                <TabCustom value={value} index={1}>
                    <Repositories id={idProduct} />
                </TabCustom>
                <TabCustom value={value} index={2}>
                    <Images id={idProduct} />
                </TabCustom>
            </Box>
        </DashboardCard>
    );
}

{
}