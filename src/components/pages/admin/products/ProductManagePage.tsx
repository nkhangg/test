/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useState } from 'react';
import { Avatar, Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import TotipRepository from './TotipRepository';
import { productManageListData } from '@/datas/product-manage-data';
import { Comfirm, Pagination, SekeletonTableItems } from '@/components';
import Link from 'next/link';
import { DashboardCard } from '@/components/dashboard';
export interface IProductManagePageProps {}

export default function ProductManagePage(props: IProductManagePageProps) {
    const [openComfirm, setOpenComfirm] = useState(false);

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
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            No
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            Id
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            Image
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            Name
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            Brand
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            Type
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            Quantity Repositoy
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {productManageListData.map((item, index) => {
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
                                                    <Typography color="textSecondary" variant="subtitle2" maxWidth={'200px'} fontWeight={400} className="truncate cursor-default">
                                                        {item.repo.length}
                                                    </Typography>
                                                </Tippy>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button onClick={() => setOpenComfirm(true)}>
                                                    <FontAwesomeIcon className="text-red-400" icon={faTrash} />
                                                </Button>
                                                <Button>
                                                    <Link href={'/admin/dashboard/product/edit/' + item.id}>
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </Link>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}

                                {/* loading */}
                                {/* <SekeletonTableItems /> */}
                            </TableBody>
                        </Table>

                        <Box pb={'4%'}>
                            {/* loading */}
                            <Pagination pages={10} />

                            {/* <Skeleton variant="text" sx={{ fontSize: '1rem' }} /> */}
                        </Box>
                        <Comfirm
                            title={'Comfirm delete product'}
                            open={openComfirm}
                            setOpen={setOpenComfirm}
                            onComfirm={(value) => {
                                console.log(value);
                            }}
                        />
                    </Box>
                </Grid>
            </Grid>
        </DashboardCard>
    );
}
