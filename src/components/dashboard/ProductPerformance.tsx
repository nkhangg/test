'use client';
import React, { useState } from 'react';
import { Typography, Box, Table, TableBody, TableCell, TableHead, TableRow, Chip, Stack, Button, Dialog, DialogTitle, DialogContent, DialogActions, Slide } from '@mui/material';
import { DashboardCard } from '.';
import { TextField } from '..';
import { toCurrency } from '@/utils/format';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const products = [
    {
        id: '1',
        name: 'Sunil Joshi',
        post: 'Web Designer',
        pname: 'Elite Admin',
        priority: 'Low',
        pbg: 'primary.main',
        budget: '3.9',
    },
    {
        id: '2',
        name: 'Andrew McDownland',
        post: 'Project Manager',
        pname: 'Real Homes WP Theme',
        priority: 'Medium',
        pbg: 'secondary.main',
        budget: '24.5',
    },
    {
        id: '3',
        name: 'Christopher Jamil',
        post: 'Project Manager',
        pname: 'MedicalPro WP Theme',
        priority: 'High',
        pbg: 'error.main',
        budget: '12.8',
    },
    {
        id: '4',
        name: 'Nirav Joshi',
        post: 'Frontend Engineer',
        pname: 'Hosting Press HTML',
        priority: 'Critical',
        pbg: 'success.main',
        budget: '2.4',
    },
];

const ProductPerformance = () => {
    const [openDialog, setOpenDialog] = useState(false);

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
                    <Typography sx={{ fontSize: '20px', mt: '20px' }}>Total: {toCurrency(2423423)}</Typography>
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
                                    <TextField type="date" fullWidth size="small" />
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
                        {products.map((product) => (
                            <TableRow hover key={product.name}>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontSize: '15px',
                                            fontWeight: '500',
                                        }}
                                    >
                                        {product.id}
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
                                                {product.post}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {product.pname}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        sx={{
                                            px: '4px',
                                            backgroundColor: product.pbg,
                                            color: '#fff',
                                        }}
                                        size="small"
                                        label={product.priority}
                                    ></Chip>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="h6">${product.budget}k</Typography>
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
