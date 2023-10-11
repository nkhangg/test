'use client';
import React, { useState } from 'react';
import { Typography, Box, Table, TableBody, TableCell, TableHead, TableRow, Chip, Stack, Button, Dialog, DialogTitle, DialogContent, DialogActions, Slide } from '@mui/material';
import { DashboardCard } from '.';
import { TextField } from '..';
import { toCurrency, toGam } from '@/utils/format';
import { TransitionProps } from '@mui/material/transitions';
import { IProductRevenueTableItem } from '@/configs/interface';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface IProductPerformanceProps {
    dataOutsite: {
        data: IProductRevenueTableItem[];
        total: number;
    };
}

const ProductPerformance = ({ dataOutsite }: IProductPerformanceProps) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [data, setData] = useState(dataOutsite);

    const handleClose = () => {
        setOpenDialog(!openDialog);
    };
    return (
        <DashboardCard
            title="Product Revenue Date"
            action={
                <>
                    <Button onClick={handleClose}>Choose Date</Button>
                </>
            }
            middlecontent={
                <>
                    <Typography sx={{ fontSize: '20px', mt: '20px' }}>Total: {toCurrency(data.total)}</Typography>
                </>
            }
            footer={
                <>
                    <Dialog open={openDialog} TransitionComponent={Transition} keepMounted aria-describedby="alert-dialog-slide-description">
                        <DialogTitle>{'Choose date you want to show on table'}</DialogTitle>
                        <DialogContent>
                            <Stack spacing={'10px'} mb={'20px'}>
                                <div>Start Date</div>
                                <div className="flex-1">
                                    <TextField
                                        type="date"
                                        onChange={(e) => {
                                            console.log(e.target.value);
                                        }}
                                        fullWidth
                                        size="small"
                                    />
                                </div>
                            </Stack>
                            <Stack spacing={'10px'}>
                                <div>Start Date</div>
                                <div className="flex-1">
                                    <TextField type="date" fullWidth size="small" />
                                </div>
                            </Stack>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Close</Button>
                            <Button>Oke</Button>
                        </DialogActions>
                    </Dialog>
                </>
            }
        >
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
                                    Name
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Quantity
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Size
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Revenue
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.data.map((product, index) => (
                            <TableRow hover key={`${product.id + (product.size + '')}`}>
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
                                <TableCell>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Box>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                {product.name}
                                            </Typography>
                                            <Typography
                                                color="textSecondary"
                                                sx={{
                                                    fontSize: '13px',
                                                }}
                                            >
                                                {product.brand}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {product.quantity}
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography variant="subtitle2">{toGam(product.size)}</Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="subtitle2">{toCurrency(product.revenue)}</Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </DashboardCard>
    );
};

export default ProductPerformance;
