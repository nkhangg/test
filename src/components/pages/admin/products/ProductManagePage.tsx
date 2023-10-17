/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useState } from 'react';
import {
    Avatar,
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import TotipRepository from './TotipRepository';
import { productManageListData } from '@/datas/product-manage-data';
import { Comfirm, LoadingPrimary, Pagination, SekeletonTableItems } from '@/components';
import Link from 'next/link';
import { DashboardCard } from '@/components/dashboard';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { deleteProduct, productManage } from '@/apis/admin/product';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { pushNoty } from '@/redux/slice/appSlice';
import { IRepository } from '@/configs/interface';
import { links } from '@/datas/links';
export interface IProductManagePageProps {}

const dataHead = ['No', 'Id', 'Image', 'Name', 'Brand', 'Type', 'Total Repository'];

export default function ProductManagePage(props: IProductManagePageProps) {
    const router = useRouter();

    const [openComfirm, setOpenComfirm] = useState({ open: false, comfirm: 'cancel' });
    const [loading, setLoading] = useState(false);

    const [idDelete, setIdDelete] = useState('');

    const searchParams = useSearchParams();
    const dispath = useAppDispatch();

    const page = searchParams.get('page');

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['products-manage', page],
        queryFn: () => productManage(page ? parseInt(page) - 1 : 0),
    });

    if (error) {
        dispath(
            pushNoty({
                title: "Something went wrong !, Can't get data",
                open: true,
                type: 'error',
            }),
        );
    }

    const getTotalQuantiyRepo = (arr: IRepository[]): number => {
        return arr.reduce((acumentlator, curentValue) => {
            return (acumentlator += curentValue.quantity);
        }, 0);
    };

    const handleDeleteProduct = (id: string) => {
        setOpenComfirm({ ...openComfirm, open: true });
        setIdDelete(id);
    };

    return (
        <DashboardCard
            title="List product"
            action={
                <>
                    <Button>
                        <Link href={'/admin/dashboard/product/create'}>Create</Link>
                    </Button>
                </>
            }
        >
            <Grid container spacing={2}>
                <Grid item xs={12} md={12} lg={12}>
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
                                    {dataHead.map((item) => {
                                        return (
                                            <TableCell key={item}>
                                                <Typography variant="subtitle2" fontWeight={600}>
                                                    {item}
                                                </Typography>
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data &&
                                    data.data.data &&
                                    !isLoading &&
                                    data.data.data.map((item, index) => {
                                        return (
                                            <TableRow key={item.id} hover>
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
                                                <TableCell align="left">
                                                    <Typography color="textSecondary" variant="subtitle2" maxWidth={'200px'} fontWeight={400} className="truncate">
                                                        {item.id}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Avatar src={item.image} variant="rounded" />
                                                </TableCell>

                                                <TableCell align="left">
                                                    <Typography color="textSecondary" variant="subtitle2" maxWidth={'200px'} fontWeight={400} className="truncate">
                                                        {item.name}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Typography color="textSecondary" variant="subtitle2" maxWidth={'200px'} fontWeight={400} className="truncate">
                                                        {item.brand}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Typography color="textSecondary" variant="subtitle2" maxWidth={'200px'} fontWeight={400} className="truncate">
                                                        {item.type}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Tippy
                                                        interactive
                                                        placement="left-end"
                                                        delay={200}
                                                        render={() => {
                                                            return <TotipRepository data={item.repo} />;
                                                        }}
                                                    >
                                                        <Typography
                                                            color="textSecondary"
                                                            variant="subtitle2"
                                                            maxWidth={'200px'}
                                                            fontWeight={400}
                                                            className="truncate cursor-default"
                                                        >
                                                            {getTotalQuantiyRepo(item.repo)}
                                                        </Typography>
                                                    </Tippy>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Button onClick={() => handleDeleteProduct(item.id as string)}>
                                                        <FontAwesomeIcon className="text-red-400" icon={faTrash} />
                                                    </Button>
                                                    <Button>
                                                        <Link href={'/admin/dashboard/product/' + item.id}>
                                                            <FontAwesomeIcon icon={faEdit} />
                                                        </Link>
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}

                                {/* loading */}
                                {isLoading && <SekeletonTableItems />}
                            </TableBody>
                        </Table>

                        <Box pb={'4%'}>
                            {/* loading */}
                            {((data && data.data.data && !isLoading) || (data?.data.pages && data?.data.pages > 1)) && (
                                <Pagination baseHref="/admin/dashboard/product?page=" pages={data?.data.pages} />
                            )}

                            {isLoading && <Skeleton variant="text" sx={{ fontSize: '1rem' }} />}
                            {loading && <LoadingPrimary />}
                        </Box>
                        <Comfirm
                            title={'Comfirm delete product'}
                            open={openComfirm.open}
                            setOpen={setOpenComfirm}
                            onComfirm={async (value) => {
                                if (value.comfirm === 'ok' && idDelete !== '') {
                                    try {
                                        setLoading(true);
                                        const response = await deleteProduct(idDelete);
                                        setLoading(false);

                                        if (response.errors) {
                                            dispath(
                                                pushNoty({
                                                    title: `Can't delete this product. try again`,
                                                    open: true,
                                                    type: 'error',
                                                }),
                                            );
                                            return;
                                        }

                                        refetch();

                                        if (page && data?.data.pages && parseInt(page) > data?.data.pages - 1) {
                                            router.push(links.admin + 'product');
                                        }
                                        dispath(
                                            pushNoty({
                                                title: `${idDelete} deleted`,
                                                open: true,
                                                type: 'success',
                                            }),
                                        );
                                        return;
                                    } catch (error) {
                                        setLoading(false);
                                        dispath(
                                            pushNoty({
                                                title: `Can't delete this product. try again`,
                                                open: true,
                                                type: 'error',
                                            }),
                                        );
                                    }
                                }
                            }}
                        />
                    </Box>
                </Grid>
            </Grid>
        </DashboardCard>
    );
}
