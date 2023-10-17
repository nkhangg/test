/* eslint-disable @next/next/no-img-element */
'use client';
import { CardInfo, DynamicInput, TextField, Notifycation } from '@/components';
import { SelectImages } from '@/components/common';
import { DashboardCard } from '@/components/dashboard';
import { Button, CircularProgress, Grid, MenuItem, Stack, capitalize } from '@mui/material';
import Link from 'next/link';
import React, { ChangeEvent, FocusEvent, useEffect, useState } from 'react';
import Repository from './Repository';
import dynamic from 'next/dynamic';
import { productManageData } from '@/datas/product-manage-data';
import Validate from '@/utils/validate';
import { ModeType, RepoType } from '@/configs/types';
import { INotifycationProps } from '@/components/notifycations/Notifycation';
import ComInput from './ComInput';
import { useQuery } from '@tanstack/react-query';
import { typesAndBrands } from '@/apis/app';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { pushNoty } from '@/redux/slice/appSlice';
import { useRouter } from 'next/navigation';
import { links } from '@/datas/links';
import { DataProductType } from '@/configs/interface';
import { detailProductManage } from '@/apis/admin/product';
const Description = dynamic(() => import('./Description'), {
    loading: () => (
        <Stack justifyContent={'center'} alignItems={'center'}>
            <CircularProgress />
        </Stack>
    ),
    ssr: false,
});

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
    const [errors, setErrors] = useState<DataProductErrorsType>(initDataErrors);

    const [notify, setNotify] = useState<INotifycationProps>({ title: '', type: 'error', open: false });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

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

    const handleSubmit = () => {
        console.log(data);
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
            <>
                <CardInfo title="Infomation">
                    <Grid container spacing={4}>
                        <Grid lg={12} md={12} xs={12} item>
                            <ComInput
                                title="Name"
                                propsInput={{
                                    placeholder: 'ME-O Tuna In Jelly',
                                    name: 'name',
                                    value: data.name,
                                    message: errors.name,
                                    onChange: handleChange,
                                }}
                            />
                        </Grid>
                        <Grid item lg={6} md={12} xs={12}>
                            <ComInput title="Type">
                                <TextField select id="type" name="type" value={data.type} size="small" onChange={handleChange}>
                                    {typesAndBrandsData.data?.data.types.map((type, index) => {
                                        return (
                                            <MenuItem key={type.name} value={typeof type.id === 'object' ? type.id.join() : type.id}>
                                                {type.name}
                                            </MenuItem>
                                        );
                                    })}
                                </TextField>
                            </ComInput>
                        </Grid>
                        <Grid item lg={6} md={12} xs={12}>
                            <DynamicInput
                                propsInput={{
                                    name: 'brand',
                                    value: data.brand,
                                    message: errors.brand,
                                    onChange: handleChange,
                                }}
                                dataSelect={typesAndBrandsData.data?.data.brands || []}
                                title="Brand"
                            />
                        </Grid>
                    </Grid>
                </CardInfo>

                <SelectImages
                    dataOutsite={(dataProduct.data?.data.images as { id: string; image: string }[]) || []}
                    onImages={(images) => {
                        setData({
                            ...data,
                            images,
                        });
                    }}
                />

                <Repository
                    dataOusite={dataProduct.data?.data.repo}
                    onRepos={(repo) => {
                        setData({
                            ...data,
                            repo,
                        });
                    }}
                />

                <Description
                    inidata={dataProduct.data?.data.description}
                    onValues={(description) => {
                        setData({
                            ...data,
                            description,
                        });
                    }}
                />

                <CardInfo>
                    <Stack direction={'row'} justifyContent={'flex-end'}>
                        <Button onClick={handleSubmit} variant="outlined">
                            {'Update'}
                        </Button>
                    </Stack>
                </CardInfo>
                <Notifycation onClose={() => setNotify({ ...notify, open: false })} {...notify} />
            </>
        </DashboardCard>
    );
}
