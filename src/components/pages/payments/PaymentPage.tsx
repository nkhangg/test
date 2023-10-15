'use client';
import React, { ChangeEvent, FocusEvent, FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { ContainerContent } from '@/components/common';
import { Box, Breadcrumbs, CircularProgress, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Stack } from '@mui/material';
import { PaymentCard, PaymentItem } from '..';
import { LoadingPrimary, SocialButton, TextField } from '@/components';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { RootState } from '@/configs/types';
import Validate from '@/utils/validate';
import dynamic from 'next/dynamic';
import { clearAllPayment, getPayment } from '@/redux/slice/cartsSlide';
import { unwrapResult } from '@reduxjs/toolkit';
import { paymentsApi } from '@/apis/app';
import { OrderProduct } from '@/configs/interface';
import { pushNoty } from '@/redux/slice/appSlice';
import { useRouter } from 'next/navigation';
const OrderSummary = dynamic(() => import('./OrderSummary'), {
    ssr: false,
});

const dataCard = [
    { title: 'Standard', business: '4 - 6 business days', price: 30000 },
    { title: 'Express', business: '1 - 3 business days', price: 45000 },
];

const dataPayments = ['Cash', 'Credit card', 'Paypal', 'Momo'];

type PaymentFormData = {
    fullname: string;
    address: string;
    phone: string;
};

const initErros = {
    fullname: '',
    address: '',
    phone: '',
};

export interface IPaymentPageProps {}

export default function PaymentPage(props: IPaymentPageProps) {
    // redux
    const { user } = useAppSelector((state: RootState) => state.userReducer);
    const { payment } = useAppSelector((state: RootState) => state.cartReducer);
    const [loading, setLoading] = useState(false);

    // router
    const router = useRouter();

    const dispatch = useAppDispatch();

    const [isClient, setIsClient] = useState(false);

    const [checked, setChecked] = useState(0);
    const [form, setForm] = useState<PaymentFormData>({
        fullname: user?.fullname || '',
        address: user?.address || '',
        phone: user?.phone || '',
    });
    const [errors, setErrors] = useState<PaymentFormData>(initErros);

    const handleDelivery = (item: { title: string; business: string; price: number }, index: number) => {
        console.log(item);
        setChecked(index);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        const dynamicKey = e.target.name as keyof PaymentFormData;

        const { message } = Validate[dynamicKey](e.target.value);
        setErrors({
            ...errors,
            [dynamicKey]: message,
        });
    };

    const validate = () => {
        let flag = false;
        const validateErrors: PaymentFormData = { ...initErros };

        const keys: string[] = Object.keys(validateErrors);

        keys.forEach((key) => {
            const dynamic = key as keyof PaymentFormData;

            const { message, error } = Validate[dynamic](form[dynamic]);
            validateErrors[dynamic] = message;
            flag = error;
        });

        setErrors(validateErrors);

        return flag;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validate()) return;

        try {
            const orderProducts = payment.map((item) => {
                return {
                    productId: item.id.toString(),
                    quantity: item.quantity,
                    size: item.size,
                } as OrderProduct;
            });
            setLoading(true);
            const responce = await paymentsApi({ ...form, shippingFee: dataCard[checked].price, orderProducts });
            setLoading(false);
            if (responce.errors) {
                dispatch(
                    pushNoty({
                        open: true,
                        title: 'Pay falilure !, Please check your info !',
                        type: 'error',
                        plament: {
                            horizontal: 'center',
                            vertical: 'top',
                        },
                    }),
                );
                return;
            }

            dispatch(clearAllPayment());

            router.push('/take-action');
        } catch (error) {
            setLoading(false);
            console.log(error);
            dispatch(
                pushNoty({
                    open: true,
                    title: 'Pay falilure !, Some thing went wrong !',
                    type: 'error',
                    plament: {
                        horizontal: 'center',
                        vertical: 'top',
                    },
                }),
            );
        }
    };

    useEffect(() => {
        setIsClient(true);
        (async () => {
            const action = dispatch(getPayment());

            const data = unwrapResult(await action);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

            <Grid container spacing={'48px'} mt={'34px'} component={'form'} onSubmit={handleSubmit}>
                <Grid item xs={12} md={12} lg={6}>
                    {isClient && (
                        <Stack spacing={'40px'}>
                            <PaymentItem title="Shipping info">
                                <Stack spacing={'30px'}>
                                    <TextField
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={form.fullname}
                                        message={errors.fullname}
                                        name={'fullname'}
                                        label={'Fullname'}
                                        size="small"
                                        fullWidth
                                    />
                                    <TextField
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={form.address}
                                        message={errors.address}
                                        name={'address'}
                                        label={'Address'}
                                        size="small"
                                        fullWidth
                                    />
                                    <TextField
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={form.phone}
                                        message={errors.phone}
                                        name={'phone'}
                                        label={'Phone'}
                                        size="small"
                                        fullWidth
                                    />
                                </Stack>
                            </PaymentItem>
                            <PaymentItem title="Delivery method">
                                <div className="flex items-center justify-between gap-5">
                                    {dataCard.map((item, index) => {
                                        return <PaymentCard key={item.title} onClick={() => handleDelivery(item, index)} data={item} checked={checked === index} />;
                                    })}
                                </div>
                            </PaymentItem>
                            <PaymentItem title="Payment">
                                <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" defaultValue={dataPayments[0]} name="row-radio-buttons-group">
                                    {dataPayments.map((item) => {
                                        return (
                                            <FormControlLabel
                                                key={item}
                                                value={item}
                                                disabled={item !== dataPayments[0]}
                                                control={<Radio sx={{ color: '#505DE8', accentColor: '#505DE8' }} />}
                                                label={item}
                                            />
                                        );
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
