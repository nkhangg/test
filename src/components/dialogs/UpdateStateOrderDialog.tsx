'use client';
import React, { useContext, useEffect, useState } from 'react';
import WraperDialog from './WraperDialog';
import { Chip, Grid, capitalize } from '@mui/material';
import { Comfirm, ReasonDialog, RowOrderSummaryUpdateStatus, Table, WrapperAnimation } from '..';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { statusColor } from '../../../tailwind.config';
import classNames from 'classnames';
import { useQuery } from '@tanstack/react-query';
import { StateType } from '@/configs/types';
import { toCurrency } from '@/utils/format';
import { getOrdersDetailAdminWithFilter, updateStatusOrder } from '@/apis/admin/orders';
import { toast } from 'react-toastify';
import { contants } from '@/utils/contants';
import { OrderAdminPageContext } from '../pages/admin/orders/OrdersAdminPage';
import Validate from '@/utils/validate';

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
    const context = useContext(OrderAdminPageContext);

    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ['ordersAdminPage/getOrdersDetailAdminWithFilter', idOpen],
        queryFn: () => getOrdersDetailAdminWithFilter(idOpen),
    });

    // state
    const [dataUpdate, setDataUpdate] = useState<StateType | null>(null);

    const [openComfirm, setOpenComfirm] = useState({ open: false, comfirm: 'cancel' });

    const renderStateUpdate = (curState: StateType): StateType[] => {
        let status: StateType[] = ['placed', 'shipping', 'delivered', 'cancelled'];

        switch (curState) {
            case 'placed': {
                return ['shipping', 'delivered', 'cancelled'];
            }
            case 'shipping': {
                return ['delivered', 'cancelled'];
            }
            case 'delivered': {
                return [];
            }

            case 'cancelled': {
                return [];
            }
            default: {
                return status;
            }
        }
    };

    if (error) {
        setOpen(false);
        toast.warn(contants.messages.errors.handle);
        return;
    }

    const dataDetail = data?.data;

    const status = dataDetail && (dataDetail.state.toLowerCase() as StateType);

    const handleUpdateStatus = async (reason?: string) => {
        if (!dataUpdate || !dataDetail) return;

        if (dataUpdate === 'cancelled' && (!reason || Validate.isBlank(reason))) return;

        try {
            const response = await updateStatusOrder({ id: dataDetail.id, status: dataUpdate, reason });

            if (!response) {
                toast.warn(contants.messages.errors.handle);
                return;
            }

            if (response.errors) {
                toast.warn(capitalize(response.message));
                return;
            }

            toast.success(`Change success #${dataDetail.id} form ${dataDetail.state} to ${capitalize(dataUpdate)}`);
            refetch();
        } catch (error) {
            toast.error(contants.messages.errors.server);
        }
    };

    const handleOpenConfirm = (data: StateType) => {
        setOpenComfirm({ ...openComfirm, open: true });
        setDataUpdate(data || null);
    };

    const handleComfirm = async (v: { open: boolean; comfirm: 'cancel' | 'ok' }) => {
        if (v.open || v.comfirm === 'cancel') return;

        handleUpdateStatus();
    };

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
                            <Header title="DELIVERY DETAILS" chip={status} />
                            <div className="w-full text-black-main py-6 border-b border-gray-primary mb-6">
                                <ul className="w-full flex flex-col gap-5">
                                    <li className="flex items-start gap-3">
                                        <span className="text-black font-medium">Order ID: </span> <p>#{dataDetail.id}</p>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-black font-medium">Date Placed: </span> <p> {dataDetail.placedDate}</p>
                                    </li>
                                    <li className="flex flex-col items-start gap-1">
                                        <span className="text-black font-medium whitespace-nowrap">Shipping Info: </span>
                                        <p>{`${dataDetail.name} - ${dataDetail.address}`}</p>
                                    </li>
                                    <li className="flex flex-col items-start gap-1">
                                        <span className="text-black font-medium">Payment Method: </span> <p>{dataDetail.paymentMethod}</p>
                                    </li>
                                    <li className="flex flex-col items-start gap-1">
                                        <span className="text-black font-medium">Delivery Method: </span> <p>{dataDetail.deliveryMethod}</p>
                                    </li>
                                    {status === 'cancelled' && (
                                        <li className="flex flex-col items-start gap-1">
                                            <span className="text-black font-medium">Reason: </span> <p>{dataDetail.description}</p>
                                        </li>
                                    )}
                                </ul>
                            </div>

                            {!['cancelled', 'delivered'].includes(status || 'cancelled') && <Header title="UPDATE STATUS" options={{ border: false }} />}
                            <div className="flex items-center gap-5">
                                {renderStateUpdate(status || 'placed').map((item) => {
                                    return (
                                        <WrapperAnimation onClick={() => handleOpenConfirm(item)} key={item} className="cursor-pointer">
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

            {dataUpdate && dataUpdate !== 'cancelled' && (
                <Comfirm
                    title={'Notification'}
                    subtitle={
                        <>
                            {`Are want to update #`}
                            {<b>{dataDetail?.id}</b>} {` to `} <b>{capitalize(dataUpdate || '')}</b>
                        </>
                    }
                    open={openComfirm.open}
                    setOpen={setOpenComfirm}
                    onComfirm={handleComfirm}
                />
            )}

            {dataUpdate === 'cancelled' && (
                <ReasonDialog
                    onClose={() => setDataUpdate(null)}
                    handleAfterClickSend={async (reason) => {
                        await handleUpdateStatus(reason);
                        requestIdleCallback(() => {
                            setDataUpdate(null);
                        });
                    }}
                />
            )}
        </WraperDialog>
    );
}
