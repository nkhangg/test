/* eslint-disable @next/next/no-img-element */
'use client';
import { CardInfo, DynamicInput, TextField } from '@/components';
import { SelectImages } from '@/components/common';
import { DashboardCard } from '@/components/dashboard';
import { Button, CircularProgress, Grid, MenuItem, Stack, capitalize } from '@mui/material';
import Link from 'next/link';
import React, { ChangeEvent, FocusEvent, useState } from 'react';
import ComInput from './ComInput';
import Repository from './Repository';
import dynamic from 'next/dynamic';
import { productManageData } from '@/datas/product-manage-data';
import Validate from '@/utils/validate';
import { Cases } from '@mui/icons-material';
import { RepoType } from '@/configs/types';
const Description = dynamic(() => import('./Description'), {
    loading: () => (
        <Stack justifyContent={'center'} alignItems={'center'}>
            <CircularProgress />
        </Stack>
    ),
    ssr: false,
});

type DataProductType = {
    name: string;
    type: string;
    brand: string;
    images: File[];
    repo: RepoType[];
    description: string;
};
type DataProductErrorsType = {
    name: string;
    type: string;
    brand: string;
    images: string;
    repo: string;
    description: string;
};

const initData: DataProductType = {
    name: '',
    brand: productManageData.branhs[0].id,
    type: productManageData.types[0].id,
    images: [],
    description: '',
    repo: [],
};
const initDataErrors: DataProductErrorsType = {
    name: '',
    brand: productManageData.branhs[0].id,
    type: productManageData.types[0].id,
    images: '',
    description: '',
    repo: '',
};

export interface IProductManagePageProps {}

export default function ProductManagePage(props: IProductManagePageProps) {
    const [data, setData] = useState<DataProductType>(initData);
    const [errors, setErrors] = useState<DataProductErrorsType>(initDataErrors);
    // select

    const [ortherBrand, setOrtherBrand] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        const dynamicKey = e.target.name as keyof DataProductType;

        const { message } = Validate.infomation(e.target.value, () => {
            return capitalize(dynamicKey);
        });
        setErrors({
            ...errors,
            [dynamicKey]: message,
        });
    };

    const validate = () => {
        let flag = false;
        const validateErrors: DataProductErrorsType = { ...initDataErrors };

        const keys: string[] = Object.keys(validateErrors);

        keys.forEach((key) => {
            const dynamic = key as keyof DataProductType;

            if (dynamic === 'description') {
                const { message, error } = Validate.description(data[dynamic]);
                validateErrors[dynamic] = message;
                flag = error;
            } else if (dynamic !== 'images' && dynamic !== 'repo') {
                const { message, error } = Validate.infomation(data[dynamic], () => {
                    return capitalize(key);
                });
                validateErrors[dynamic] = message;
                flag = error;
            } else {
                if (data.repo.length <= 0 || data.images.length <= 0) {
                    flag = true;
                }
            }
        });

        setErrors(validateErrors);

        return flag;
    };

    const handleSubmit = () => {
        if (validate()) return;
        console.log(validate());
    };
    return (
        <DashboardCard
            title="Product Manage"
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
                                    message: errors.name,
                                    onChange: handleChange,
                                    onBlur: handleBlur,
                                }}
                            />
                        </Grid>
                        <Grid item lg={6} md={12} xs={12}>
                            <ComInput title="Type">
                                <TextField select id="type" name="type" value={data.type} size="small" onChange={handleChange} onBlur={handleBlur}>
                                    {productManageData.types.map((type, index) => {
                                        return (
                                            <MenuItem key={type.id} value={type.id}>
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
                                    onBlur: handleBlur,
                                }}
                                dataSelect={productManageData.branhs}
                                title="Brand"
                            />
                        </Grid>
                    </Grid>
                </CardInfo>

                <SelectImages
                    onImages={(images) => {
                        setData({
                            ...data,
                            images,
                        });
                    }}
                />

                <Repository
                    onRepos={(repo) => {
                        setData({
                            ...data,
                            repo,
                        });
                    }}
                />

                <Description
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
                            Create
                        </Button>
                    </Stack>
                </CardInfo>
            </>
        </DashboardCard>
    );
}
