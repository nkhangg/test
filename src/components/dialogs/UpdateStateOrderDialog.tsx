'use client';
import React, { useState } from 'react';
import WraperDialog from './WraperDialog';
import { Chip, Grid, capitalize } from '@mui/material';
import { Comfirm, RowOrderSummaryUpdateStatus, Table, WrapperAnimation } from '..';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { statusColor } from '../../../tailwind.config';
import classNames from 'classnames';
import { StateType } from '@/configs/types';
import { toCurrency } from '@/utils/format';

const status: StateType[] = ['placed', 'shipping', 'delivered', 'cancelled'];

const Header = ({ title, chip, options = { border: true } }: { title: string; chip?: boolean; options?: { border?: boolean } }) => {
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
                        label={capitalize('Placed')}
                        variant="outlined"
                        size="medium"
                        sx={{
                            backgroundColor: statusColor['placed'],
                            borderColor: statusColor['placed'],
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export interface IUpdateStateOrderDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function UpdateStateOrderDialog({ open, setOpen }: IUpdateStateOrderDialogProps) {
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

    return (
        <WraperDialog fullWidth={true} maxWidth={'xl'} open={open} setOpen={setOpen}>
            <div className="py-10 px-12 relative">
                <WrapperAnimation onClick={() => setOpen(false)} hover={{}} className="absolute right-12 text-2xl cursor-pointer flex items-center justify-center">
                    <FontAwesomeIcon icon={faXmark} />
                </WrapperAnimation>

                <Grid container spacing={4}>
                    <Grid item xs={12} md={12} lg={5}>
                        <Header title="DELIVERY DETAILS" chip={true} />
                        <div className="w-full text-black-main py-6 border-b border-gray-primary mb-6">
                            <ul className="w-full flex flex-col gap-5">
                                <li className="flex items-start gap-3">
                                    <span className="text-black font-medium">Order ID: </span> <p>#1234</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-black font-medium">Date Placed: </span> <p>September 28, 2023 </p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-black font-medium whitespace-nowrap">Shipping Info: </span>
                                    <p>Nguyen Van A - 912345678 132 3/2 Street, Hung Loi Ward, Ninh Kieu District, Can Tho City</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-black font-medium">Payment Method: </span> <p>Payment Method</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-black font-medium">Delivery Method: </span> <p>Express in 4 hours</p>
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
                        <Header title="ORDER SUMMARY" chip={false} />

                        <div className="py-6 ">
                            <div className="rounded-lg border border-gray-primary h-[400px] md:overflow-y-auto scroll">
                                <Table
                                    styleHead={{
                                        align: 'center',
                                    }}
                                    dataHead={['Id', 'Product', 'Price', 'Size', 'Quantity']}
                                >
                                    <RowOrderSummaryUpdateStatus
                                        data={{
                                            id: 'PC00133',
                                            image: 'https://thuythithi.com/wp-content/uploads/2020/03/me-o-tuna-1.u3059.d20170529.t161435.388927.jpg',
                                            name: 'Hạt Mềm Cho Chó Trưởng Thành Zenith Adult',
                                            price: 100000,
                                            quantity: 10,
                                        }}
                                    />
                                    <RowOrderSummaryUpdateStatus
                                        data={{
                                            id: 'PC001',
                                            image: 'https://thuythithi.com/wp-content/uploads/2020/03/me-o-tuna-1.u3059.d20170529.t161435.388927.jpg',
                                            name: 'Hạt Mềm Cho Chó Trưởng Thành Zenith Adult',
                                            price: 100000,
                                            quantity: 10,
                                        }}
                                    />
                                    <RowOrderSummaryUpdateStatus
                                        data={{
                                            id: 'PC00122',
                                            image: 'https://thuythithi.com/wp-content/uploads/2020/03/me-o-tuna-1.u3059.d20170529.t161435.388927.jpg',
                                            name: 'Hạt Mềm Cho Chó Trưởng Thành Zenith Adult',
                                            price: 100000,
                                            quantity: 10,
                                        }}
                                    />
                                    <RowOrderSummaryUpdateStatus
                                        data={{
                                            id: 'PC001',
                                            image: 'https://thuythithi.com/wp-content/uploads/2020/03/me-o-tuna-1.u3059.d20170529.t161435.388927.jpg',
                                            name: 'Hạt Mềm Cho Chó Trưởng Thành Zenith Adult',
                                            price: 100000,
                                            quantity: 10,
                                        }}
                                    />
                                    <RowOrderSummaryUpdateStatus
                                        data={{
                                            id: 'PC001',
                                            image: 'https://thuythithi.com/wp-content/uploads/2020/03/me-o-tuna-1.u3059.d20170529.t161435.388927.jpg',
                                            name: 'Hạt Mềm Cho Chó Trưởng Thành Zenith Adult',
                                            price: 100000,
                                            quantity: 10,
                                        }}
                                    />
                                    <RowOrderSummaryUpdateStatus
                                        data={{
                                            id: 'PC001',
                                            image: 'https://thuythithi.com/wp-content/uploads/2020/03/me-o-tuna-1.u3059.d20170529.t161435.388927.jpg',
                                            name: 'Hạt Mềm Cho Chó Trưởng Thành Zenith Adult',
                                            price: 100000,
                                            quantity: 10,
                                        }}
                                    />
                                </Table>
                            </div>

                            <ul className="px-6 py-5 flex flex-col gap-5">
                                <li className="flex items-start justify-between gap-3">
                                    <span className="text-black font-medium">Subtotal: </span> <p>{toCurrency(100)}</p>
                                </li>
                                <li className="flex items-start justify-between gap-3">
                                    <span className="text-black font-medium">Shipping Fee: </span> <p>{toCurrency(100)}</p>
                                </li>
                                <li className="flex items-start justify-between gap-3">
                                    <span className="text-black font-medium">Total: </span> <p>{toCurrency(100)}</p>
                                </li>
                            </ul>
                        </div>
                    </Grid>
                </Grid>
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
