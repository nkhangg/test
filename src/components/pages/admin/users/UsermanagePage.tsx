'use client';
import { Comfirm, Pagination } from '@/components';
import { DashboardCard } from '@/components/dashboard';
import { productManageListData } from '@/datas/product-manage-data';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Box, Button, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import * as React from 'react';

const listHead = ['No', 'Avartar', 'Username', 'Fullname', 'Email', 'Gender', 'Phone', 'Role', 'Active'];

export interface IUserManagePageProps {}

export default function UserManagePage(props: IUserManagePageProps) {
    const { data, isLoading, error } = useQuery({
        queryKey: ['reports'],
        // queryFn: () => dailyReport(),
    });
    return (
        <DashboardCard
            title="List users"
            action={
                <>
                    <Button>
                        <Link href={'/admin/dashboard/users/create'}>Create</Link>
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
                                    {listHead.map((item) => {
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
                                {productManageListData.map((item, index) => {
                                    return (
                                        <TableRow key={item.id} hover>
                                            <TableCell>
                                                {/* no */}
                                                <Typography
                                                    sx={{
                                                        fontSize: '15px',
                                                        fontWeight: '500',
                                                    }}
                                                >
                                                    {index + 1}
                                                </Typography>
                                            </TableCell>
                                            {/* avatart */}
                                            <TableCell align="left">
                                                <Avatar src={item.image} variant="rounded" />
                                            </TableCell>

                                            {/* username */}
                                            <TableCell>
                                                <Typography color="textSecondary" variant="subtitle2" maxWidth={'200px'} fontWeight={400} className="truncate">
                                                    {item.id}
                                                </Typography>
                                            </TableCell>

                                            {/* fullname */}
                                            <TableCell align="left">
                                                <Typography color="textSecondary" variant="subtitle2" maxWidth={'200px'} fontWeight={400} className="truncate">
                                                    {item.name}
                                                </Typography>
                                            </TableCell>
                                            {/* email */}
                                            <TableCell align="left">
                                                <Typography color="textSecondary" variant="subtitle2" maxWidth={'200px'} fontWeight={400} className="truncate">
                                                    {item.brand}
                                                </Typography>
                                            </TableCell>
                                            {/* gender */}
                                            <TableCell align="left">
                                                <Typography color="textSecondary" variant="subtitle2" maxWidth={'200px'} fontWeight={400} className="truncate">
                                                    {item.type}
                                                </Typography>
                                            </TableCell>
                                            {/* phone */}
                                            <TableCell align="center">0344457491</TableCell>
                                            {/* role */}
                                            <TableCell align="center">Role_user</TableCell>
                                            {/* active */}
                                            <TableCell align="center">true</TableCell>
                                            <TableCell align="center">
                                                <Button>
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
                        {/* <Comfirm
                            title={'Comfirm delete product'}
                            open={false}
                            setOpen={set() => {}}
                            onComfirm={(value) => {
                                console.log(value);
                            }}
                        /> */}
                    </Box>
                </Grid>
            </Grid>
        </DashboardCard>
    );
}
