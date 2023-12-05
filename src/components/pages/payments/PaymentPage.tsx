'use client';
import React, { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ContainerContent } from '@/components/common';
import { Breadcrumbs, FormControlLabel, Grid, Radio, RadioGroup, Stack } from '@mui/material';
import { PaymentCard, PaymentItem } from '..';
import { AddressInfoPayment, Comfirm, ComfirmPaymentDialog, ContentComfirmPayment, LoadingPrimary, LoadingSecondary, SocialButton } from '@/components';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { AddressCodeType, PaymentMethod, RootState } from '@/configs/types';
import dynamic from 'next/dynamic';
import { IInfoAddress, IOrder, IOrderItem, IPayment } from '@/configs/interface';
import { useRouter, useSearchParams } from 'next/navigation';
import LineProPress from './LinePropress';
import { links } from '@/datas/links';
import { createOrder, createPayment } from '@/apis/user';
import { toast } from 'react-toastify';
import { contants } from '@/utils/contants';
import { clearAllPayment } from '@/redux/slice/cartsSlide';
import { addressToString, capitalize, toCurrency, toGam } from '@/utils/format';
import { getShippingFee, searchDistrichts, searchProvinces, searchWards } from '@/apis/outside';
const OrderSummary = dynamic(() => import('./OrderSummary'), {
    ssr: false,
});

const { dataCard } = contants;

const dataPayments = ['Cash', 'Pre-Payment'];

const initData: IOrder = {
    methodId: 1,
    addressId: 0,
    deliveryId: dataCard[0].id,
    ship: dataCard[0].price,
    orderItems: [],
};

export interface IPaymentPageProps {}

export default function PaymentPage(props: IPaymentPageProps) {
    // router
    const router = useRouter();

    // params
    const searchParams = useSearchParams();

    // redux
    const dispatch = useAppDispatch();
    const { payment } = useAppSelector((state: RootState) => state.cartReducer);

    const [line, setLine] = useState(2);

    const [checked, setChecked] = useState(0);
    const [isClient, setIsClient] = useState(false);
    const [addresses, setAddresses] = useState<IInfoAddress | null>(null);
    const [loadingShippingItem, setloadingShippingItem] = useState(false);

    const [shippingItem, setShippingItem] = useState(dataCard[1]);

    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState<IOrder>(initData);

    const [openComfirm, setOpenComfirm] = useState(false);

    const handleDelivery = (item: { id: number; title: string; business: string; price: number }, index: number) => {
        setChecked(index);
        setForm({
            ...form,
            ship: item.price,
            deliveryId: item.id,
        });
    };

    const handleOpenConfirm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setOpenComfirm(true);
    };

    const handleClearWhenSuccess = () => {
        dispatch(clearAllPayment());
        toast.success(contants.messages.success.payment);
        router.push(links.products);
    };

    const handleChangePaymentMethod = (e: ChangeEvent<HTMLInputElement>) => {
        const method = e.target.value.toLowerCase() as PaymentMethod;

        // set payment method
        setForm({
            ...form,
            methodId: method === 'cash' ? 1 : 2,
        });
    };

    const handlePaymentBeforeComfirm = async () => {
        try {
            setLoading(true);
            const response = await createOrder(form);
            setLoading(false);

            if (!response) {
                console.log(response);
                toast.warn(contants.messages.errors.handle);
                return;
            }

            if (response.status !== 200) {
                toast.error(capitalize(response.message));
                return;
            }

            // handle cash method
            if (form.methodId == 1) {
                handleClearWhenSuccess();

                // handle pre-payment method
            } else if (form.methodId == 2) {
                window.location.assign(response.data);
            }
        } catch (error) {
            setLoading(false);
            toast.error(contants.messages.errors.server);
        }
    };

    const handleShowShipping = async () => {
        if (!addresses) return;
        const addressCodes: AddressCodeType = {
            province: null,
            district: null,
            ward: null,
        };
        try {
            setloadingShippingItem(true);
            const province = await searchProvinces(addresses.address.province);

            if (!province) return;
            addressCodes.province = province.ProvinceID;

            const district = await searchDistrichts(province, addresses.address.district);

            if (!district) return;

            // set district code
            addressCodes.district = district.DistrictID;

            const ward = await searchWards(district, addresses.address.ward);

            if (!ward) return;

            // set district code
            addressCodes.ward = ward.WardCode;

            if (payment.length < 0 || totalAndWeight.weight < 0) return;

            const shippingFee: number = await getShippingFee(addressCodes, totalAndWeight);

            setShippingItem({
                ...shippingItem,
                price: shippingFee,
            });
            setloadingShippingItem(false);

            if (checked === 0) return;

            setForm({
                ...form,
                ship: shippingFee,
            });
        } catch (error) {
            setloadingShippingItem(false);
            console.log('error in handleShowShipping', error);
        }
    };

    const totalAndWeight = useMemo(() => {
        if (payment.length <= 0) return { value: 0, weight: 0, quantity: 0 };

        const value = payment.reduce((result, item) => {
            return (result += item.price * item.quantity);
        }, 0);

        const weight = payment.reduce((result, item) => {
            return (result += (item.size as number) * item.quantity);
        }, 0);

        const quantity = payment.reduce((result, item) => {
            return (result += item.quantity);
        }, 0);
        return { value, weight, quantity };
    }, [payment]);

    const conditonShowBtn = useMemo(() => {
        if (!payment) return true;

        if (payment.length <= 0 || addresses == null) {
            return true;
        }

        return false;
    }, [addresses, payment]);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!addresses) {
            // set line
            setLine(2);
            return;
        }

        // set line
        setLine(4);

        setForm({
            ...form,
            addressId: addresses.id,
        });

        (async () => {
            await handleShowShipping();
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addresses]);

    useEffect(() => {
        if (!payment) return;
        const orderItems = payment.map((item) => {
            return {
                productId: item.id,
                quantity: item.quantity,
                size: item.size,
            } as IOrderItem;
        });

        setForm({
            ...form,
            orderItems,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [payment]);

    useEffect(() => {
        const status = searchParams.get('vnp_TransactionStatus');

        const validateArr = [
            parseInt(searchParams.get('order_Id') || '0'),
            parseInt(searchParams.get('vnp_Amount') || '0'),
            parseInt(searchParams.get('vnp_TransactionNo') || '0'),
        ];

        const valid = validateArr.some((item) => item <= 0);

        if (valid) return;

        const form: IPayment = {
            orderId: parseInt(searchParams.get('order_Id') || '0'),
            amount: parseInt(searchParams.get('vnp_Amount') || '0'),
            isPaid: status === '00' || false,
            payAt: searchParams.get('vnp_PayDate') || '',
            transactionNumber: parseInt(searchParams.get('vnp_TransactionNo') || '0'),
            paymentMethod: {
                id: 2,
                method: searchParams.get('vnp_CardType') || 'ATM',
            },
        };

        (async () => {
            const response = await createPayment(form);

            try {
                if (!response) {
                    toast.error(contants.messages.errors.handle);
                    return;
                }

                if (response.status !== 200) {
                    toast.error(response.message);
                    return;
                }

                handleClearWhenSuccess();
            } catch (error) {
                toast.error(contants.messages.errors.server);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    return (
        <ContainerContent className="pt-12 select-none">
            <div role="presentation">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link className="hover:underline" href="/">
                        Home
                    </Link>
                    <Link className="hover:underline" href={links.users.cart}>
                        Cart
                    </Link>
                    <Link className="text-black-main hover:underline " href={links.users.payment}>
                        Payment
                    </Link>
                </Breadcrumbs>
            </div>

            <LineProPress progressNun={line} />

            <Grid container spacing={'48px'} mt={'34px'} component={'form'} onSubmit={handleOpenConfirm}>
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
                                    <PaymentCard onClick={() => handleDelivery(dataCard[0], 0)} data={dataCard[0]} checked={checked === 0} />
                                    <PaymentCard loading={loadingShippingItem} onClick={() => handleDelivery(shippingItem, 1)} data={shippingItem} checked={checked === 1} />
                                </div>
                            </PaymentItem>
                            <PaymentItem title="Payment">
                                <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" defaultValue={dataPayments[0]} name="row-radio-buttons-group">
                                    {dataPayments.map((item) => {
                                        return (
                                            <FormControlLabel
                                                key={item}
                                                value={item}
                                                control={
                                                    <Radio
                                                        onChange={handleChangePaymentMethod}
                                                        sx={{
                                                            color: '#505DE8',
                                                            accentColor: '#505DE8',
                                                        }}
                                                    />
                                                }
                                                label={item}
                                            />
                                        );
                                    })}
                                </RadioGroup>
                            </PaymentItem>
                            <div className="w-full ">
                                <SocialButton disabled={conditonShowBtn} type="submit" maxWidth="max-w-full" background="#505DE8" title="Confirm order" />
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
                            <LoadingSecondary />
                        </Stack>
                    </Grid>
                )}

                {loading && <LoadingPrimary />}

                <ComfirmPaymentDialog
                    handleSubmit={handlePaymentBeforeComfirm}
                    addresses={addresses}
                    totalAndWeight={totalAndWeight}
                    form={form}
                    setOpen={setOpenComfirm}
                    open={openComfirm}
                />
            </Grid>
        </ContainerContent>
    );
}
