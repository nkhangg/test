'use client';
import React, { ChangeEvent, FocusEvent, FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { ContainerContent } from '@/components/common';
import { Box, Breadcrumbs, CircularProgress, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Stack } from '@mui/material';
import { PaymentCard, PaymentItem } from '..';
import { AddressDialog, AddressInfoPayment, LoadingPrimary, SocialButton, TextField } from '@/components';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { RootState } from '@/configs/types';
import Validate from '@/utils/validate';
import dynamic from 'next/dynamic';
import { clearAllPayment, getPayment } from '@/redux/slice/cartsSlide';
import { unwrapResult } from '@reduxjs/toolkit';
import { paymentsApi } from '@/apis/app';
import { IInfoAddress, OrderProduct } from '@/configs/interface';
import { pushNoty } from '@/redux/slice/appSlice';
import { useRouter } from 'next/navigation';
import { BaseBreadcrumbs } from '../common';
import LineProPress from './LinePropress';
import { useGetDefaultAddress } from '@/hooks';
const OrderSummary = dynamic(() => import('./OrderSummary'), {
    ssr: false,
});

const dataCard = [
    { title: 'Express (in Can Tho)', business: '4 hours', price: 20000 },
    { title: 'GHTK', business: '1 - 3 business days', price: 45000 },
];

const dataPayments = ['Cash', 'Pre-Payment'];

type PaymentFormData = {
    info: IInfoAddress | null;
};

const initErros = {
    fullname: '',
    address: '',
    phone: '',
};

export interface IPaymentPageProps {}

export default function PaymentPage(props: IPaymentPageProps) {
    // router
    const router = useRouter();

    // redux
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state: RootState) => state.userReducer);
    const { payment } = useAppSelector((state: RootState) => state.cartReducer);

    const [line, setLine] = useState(2);

    const [checked, setChecked] = useState(0);
    const [isClient, setIsClient] = useState(false);
    const [addresses, setAddresses] = useState<IInfoAddress | null>(null);

    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState<PaymentFormData>({
        info: null,
    });

    const handleDelivery = (item: { title: string; business: string; price: number }, index: number) => {
        setChecked(index);
        setForm({
            ...form,
            info: null,
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    useEffect(() => {
        setIsClient(true);
        (async () => {
            const action = dispatch(getPayment());

            const data = unwrapResult(await action);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!addresses) return;

        if (addresses) {
            setLine(4);
        } else {
            setLine(2);
        }
    }, [addresses]);

    return (
        <ContainerContent className="pt-12 select-none">
            <div role="presentation">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link className="hover:underline" href="/">
                        Home
                    </Link>
                    <Link className="text-black-main hover:underline " href="/payment">
                        Payment
                    </Link>
                </Breadcrumbs>
            </div>

            <LineProPress progressNun={line} />

            <Grid container spacing={'48px'} mt={'34px'} component={'form'} onSubmit={handleSubmit}>
                <Grid item xs={12} md={12} lg={6}>
                    {isClient && (
                        <Stack spacing={'40px'}>
                            {/* default address */}
                            <AddressInfoPayment
                                onData={(data) => {
                                    if (!data) return;
                                    setAddresses(data);
                                }}
                            />

                            <PaymentItem title="Delivery method">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-5 mt-6">
                                    {dataCard.map((item, index) => {
                                        return <PaymentCard key={item.title} onClick={() => handleDelivery(item, index)} data={item} checked={checked === index} />;
                                    })}
                                </div>
                            </PaymentItem>
                            <PaymentItem title="Payment">
                                <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" defaultValue={dataPayments[0]} name="row-radio-buttons-group">
                                    {dataPayments.map((item) => {
                                        return <FormControlLabel key={item} value={item} control={<Radio sx={{ color: '#505DE8', accentColor: '#505DE8' }} />} label={item} />;
                                    })}
                                </RadioGroup>
                            </PaymentItem>
                            <div className="w-full ">
                                <SocialButton disabled={payment.length <= 0} type="submit" maxWidth="max-w-full" background="#505DE8" title="Confirm order" />
                            </div>
                        </Stack>
                    )}
                </Grid>
                <Grid item xs={12} md={12} lg={6}>
                    <OrderSummary dataDelevery={dataCard[checked]} />
                </Grid>
                {!isClient && (
                    <Grid item xs={12} md={12} lg={12}>
                        <Stack alignItems={'center'} justifyContent={'center'} height={'100%'}>
                            <CircularProgress />
                        </Stack>
                    </Grid>
                )}

                {loading && <LoadingPrimary />}
            </Grid>
        </ContainerContent>
    );
}
