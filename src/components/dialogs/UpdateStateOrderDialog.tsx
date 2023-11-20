'use client';
import React, { useContext, useEffect, useState } from 'react';
import WraperDialog from './WraperDialog';
import { Chip, Grid, capitalize } from '@mui/material';
import { Comfirm, RowOrderSummaryUpdateStatus, Table, WrapperAnimation } from '..';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { statusColor } from '../../../tailwind.config';
import classNames from 'classnames';
import { useQuery } from '@tanstack/react-query';
import { StateType } from '@/configs/types';
import { toCurrency } from '@/utils/format';
import { getOrdersDetailAdminWithFilter } from '@/apis/admin/orders';
import { toast } from 'react-toastify';
import { contants } from '@/utils/contants';

const status: StateType[] = ['placed', 'shipping', 'delivered', 'cancelled'];

const Header = ({ title, chip, options = { border: true } }: { title: string; chip?: StateType; options?: { border?: boolean } }) => {
    return (
        <div
            className={classNames('flex items-center justify-between  text-2xl font-medium w-full  pb-4', {
                ['border-b border-gray-primary']: options?.border,
            })}
        >
            <div className="flex items-center gap-3">
                <h2>{title}</h2>
                {chip && (
                    <Chip
                        label={capitalize(chip)}
                        variant="outlined"
                        size="medium"
                        sx={{
                            backgroundColor: statusColor[chip],
                            borderColor: statusColor[chip],
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export interface IUpdateStateOrderDialogProps {
    idOpen: number;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function UpdateStateOrderDialog({ idOpen, open, setOpen }: IUpdateStateOrderDialogProps) {
    const { data, error, isLoading } = useQuery({
        queryKey: ['ordersAdminPage/getOrdersDetailAdminWithFilter', idOpen],
        queryFn: () => getOrdersDetailAdminWithFilter(idOpen),
    });

    // state
    const [deleteData, setDeleteData] = useState<any | null>(null);
    const [openComfirm, setOpenComfirm] = useState({ open: false, comfirm: 'cancel' });

    const handleOpenConfirm = (data?: any) => {
        setOpenComfirm({ ...openComfirm, open: true });
        setDeleteData(data || null);
    };

    const handleComfirm = async (v: { open: boolean; comfirm: 'cancel' | 'ok' }) => {
        if (v.open || v.comfirm === 'cancel') return;

        // handleDelete();
    };

    if (error) {
        setOpen(false);
        toast.warn(contants.messages.errors.handle);
        return;
    }

    const dataDetail = data?.data;

    return (
        <WraperDialog
            sx={{
                '& .MuiPaper-root': {
                    borderRadius: '20px',
                },
            }}
            fullWidth={true}
            maxWidth={'xl'}
            open={open}
            setOpen={setOpen}
        >
            <div className="py-10 px-12 relative">
                <WrapperAnimation onClick={() => setOpen(false)} hover={{}} className="absolute right-12 text-2xl cursor-pointer flex items-center justify-center">
                    <FontAwesomeIcon icon={faXmark} />
                </WrapperAnimation>

                {dataDetail && (
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={12} lg={5}>
                            <Header title="DELIVERY DETAILS" chip={dataDetail.state.toLowerCase() as StateType} />
                            <div className="w-full text-black-main py-6 border-b border-gray-primary mb-6">
                                <ul className="w-full flex flex-col gap-5">
                                    <li className="flex items-start gap-3">
                                        <span className="text-black font-medium">Order ID: </span> <p>#{dataDetail.id}</p>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-black font-medium">Date Placed: </span> <p> {dataDetail.placedDate}</p>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-black font-medium whitespace-nowrap">Shipping Info: </span>
                                        <p>{dataDetail.address}</p>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-black font-medium">Payment Method: </span> <p>{dataDetail.paymentMethod}</p>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-black font-medium">Delivery Method: </span> <p>{dataDetail.deliveryMethod}</p>
                                    </li>
                                </ul>
                            </div>

                            <Header title="UPDATE STATUS" options={{ border: false }} />
                            <div className="flex items-center gap-5">
                                {status.map((item) => {
                                    return (
                                        <WrapperAnimation key={item} className="cursor-pointer">
                                            <Chip
                                                label={capitalize(item)}
                                                variant="outlined"
                                                size="medium"
                                                sx={{
                                                    backgroundColor: statusColor[item],
                                                    borderColor: statusColor[item],
                                                }}
                                            />
                                        </WrapperAnimation>
                                    );
                                })}
                            </div>
                        </Grid>
                        <Grid item xs={12} md={12} lg={7}>
                            <Header title="ORDER SUMMARY" />

                            <div className="py-6 ">
                                <div className="rounded-lg border border-gray-primary h-[400px] md:overflow-y-auto scroll">
                                    <Table
                                        styleHead={{
                                            align: 'center',
                                        }}
                                        dataHead={['Id', 'Product', 'Price', 'Size', 'Quantity']}
                                    >
                                        {dataDetail.products.map((item) => {
                                            return (
                                                <RowOrderSummaryUpdateStatus
                                                    key={`${item.id} ${item.size}`}
                                                    data={{
                                                        id: item.id,
                                                        image: item.image,
                                                        name: item.name,
                                                        price: item.price,
                                                        quantity: item.quantity,
                                                    }}
                                                />
                                            );
                                        })}
                                    </Table>
                                </div>

                                <ul className="px-6 py-5 flex flex-col gap-5">
                                    <li className="flex items-start justify-between gap-3">
                                        <span className="text-black font-medium">Subtotal: </span> <p>{toCurrency(dataDetail.subTotal)}</p>
                                    </li>
                                    <li className="flex items-start justify-between gap-3">
                                        <span className="text-black font-medium">Shipping Fee: </span> <p>{toCurrency(dataDetail.shippingFee)}</p>
                                    </li>
                                    <li className="flex items-start justify-between gap-3">
                                        <span className="text-black font-medium">Total: </span> <p>{toCurrency(dataDetail.total)}</p>
                                    </li>
                                </ul>
                            </div>
                        </Grid>
                    </Grid>
                )}
            </div>

            <Comfirm
                title={'Notification'}
                subtitle={
                    <>
                        {'Are want to cancel order id #'} {<b>{deleteData?.id}</b>}
                    </>
                }
                open={openComfirm.open}
                setOpen={setOpenComfirm}
                onComfirm={handleComfirm}
            />
        </WraperDialog>
    );
}
