'use client';
import { CardInfo, DynamicInput, TextField } from '@/components';
import { Box, Button, Grid, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import React, { ChangeEvent, FocusEvent, useEffect, useState } from 'react';
import ComInput from './ComInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toGam } from '@/utils/format';
import Validate from '@/utils/validate';
import { productManageData } from '@/datas/product-manage-data';
import { RepoType, RepoTypeErrors } from '@/configs/types';

const initDataErrors = {
    size: '',
    quantity: '',
    inPrice: '',
    outPrice: '',
};

export interface IRepositoryProps {
    dataOusite?: RepoType[];
    onRepos?: (repos: RepoType[]) => void;
}

export default function Repository({ dataOusite, onRepos }: IRepositoryProps) {
    const initData = {
        size: productManageData.sizes[0].id,
        quantity: 0,
        inPrice: 0,
        outPrice: 0,
    };
    const [data, setData] = useState<RepoType[]>(dataOusite || []);

    const [items, setItems] = useState<RepoType>(initData);

    const [errors, setErrors] = useState<RepoTypeErrors>(initDataErrors);

    const handleChageData = (e: ChangeEvent<HTMLInputElement>) => {
        setItems({
            ...items,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddRepo = () => {
        if (validate()) return;

        setData([...data, items]);
        setItems({ ...initData });
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        const dynamicKey = e.target.name as keyof RepoTypeErrors;

        const { message } = Validate.number(e.target.value, dynamicKey);
        setErrors({
            ...errors,
            [dynamicKey]: message,
        });
    };

    const validate = () => {
        let flag = false;
        const validateErrors: RepoTypeErrors = { ...initDataErrors };

        const keys: string[] = Object.keys(validateErrors);

        keys.forEach((key) => {
            const dynamic = key as keyof RepoType;

            const { message, error } = Validate.number(items[dynamic], key);
            validateErrors[dynamic] = message;
            flag = error;
        });

        setErrors(validateErrors);

        return flag;
    };

    useEffect(() => {
        if (!onRepos) return;
        onRepos(data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return (
        <CardInfo title="Repository">
            <Grid container spacing={4}>
                <Grid item xs={12} md={6} lg={6}>
                    <DynamicInput
                        dataSelect={productManageData.sizes}
                        type="number"
                        title="Size"
                        propsInput={{ type: 'number', placeholder: 'Size', name: 'size', onChange: handleChageData, onBlur: handleBlur, value: items.size, message: errors.size }}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <ComInput
                        title="Quantity"
                        propsInput={{
                            placeholder: 'Quantity',
                            type: 'number',
                            name: 'quantity',
                            onChange: handleChageData,
                            value: items.quantity,
                            message: errors.quantity,
                            onBlur: handleBlur,
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <ComInput
                        title="In price"
                        propsInput={{
                            placeholder: 'In price',
                            type: 'number',
                            name: 'inPrice',
                            onChange: handleChageData,
                            value: items.inPrice,
                            message: errors.inPrice,
                            onBlur: handleBlur,
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <ComInput
                        title="Out Price"
                        propsInput={{
                            name: 'outPrice',
                            type: 'number',
                            placeholder: 'Out Price',
                            onChange: handleChageData,
                            value: items.outPrice,
                            message: errors.outPrice,
                            onBlur: handleBlur,
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={12}>
                    <Stack direction={'row'} justifyContent={'flex-end'}>
                        <Button
                            onClick={handleAddRepo}
                            variant="contained"
                            endIcon={
                                <>
                                    <FontAwesomeIcon icon={faPlus} />
                                </>
                            }
                        >
                            Add Repository
                        </Button>
                    </Stack>
                </Grid>

                <Grid item xs={12} md={12} lg={12}>
                    {data.length > 0 && (
                        <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                            <Table
                                aria-label="simple table"
                                sx={{
                                    whiteSpace: 'nowrap',
                                    mt: 2,
                                }}
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                No
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                Size
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                Quantity
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                In Price
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                Out Price
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map((repo, index) => (
                                        <TableRow hover key={index}>
                                            <TableCell>
                                                <Typography
                                                    sx={{
                                                        fontSize: '15px',
                                                        fontWeight: '500',
                                                    }}
                                                >
                                                    {index + 1}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>{toGam(repo.size)}</TableCell>
                                            <TableCell align="left">
                                                <Typography color="textSecondary" variant="subtitle2" maxWidth={'200px'} fontWeight={400} className="truncate">
                                                    {repo.quantity}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="left">
                                                <Typography color="textSecondary" variant="subtitle2" maxWidth={'200px'} fontWeight={400} className="truncate">
                                                    {repo.inPrice}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="left">
                                                <Typography color="textSecondary" variant="subtitle2" maxWidth={'200px'} fontWeight={400} className="truncate">
                                                    {repo.outPrice}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button
                                                    onClick={() => {
                                                        data.splice(index, 1);
                                                        setData([...data]);
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    )}

                    {data.length <= 0 && (
                        <Stack alignItems={'center'} justifyContent={'center'} height={'100%'}>
                            <Typography color={'red'}>Add repository for this product</Typography>
                        </Stack>
                    )}
                </Grid>
            </Grid>
        </CardInfo>
    );
}
