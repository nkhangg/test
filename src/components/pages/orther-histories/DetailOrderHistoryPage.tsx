import React from 'react';
import moment from 'moment';
import Link from 'next/link';
import { getIconWithStatus, toCurrency } from '@/utils/format';
import { BaseBreadcrumbs } from '../common';
import { Grid, Stack, capitalize } from '@mui/material';
import DetailOrderhistoryItem from './DetailOrderHistoryItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { detailOtherHistory } from '@/apis/app';
import { notFound } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { links } from '@/datas/links';
import { StateType } from '@/configs/types';

export interface IDetailOrderHistoryProps {}

export default function DetailOrderHistory(props: IDetailOrderHistoryProps) {
    return (
        <BaseBreadcrumbs
            title="ORDER DETAIL"
            breadcrumb={[
                {
                    title: 'Order Details',
                    href: '/other-history',
                },
            ]}
        >
            <div className="rounded-lg border-2 border-[#DBDBDB] flex flex-col overflow-hidden">
                <Grid
                    key={1}
                    container
                    spacing={2}
                    sx={{
                        px: '44px',
                        py: '30px',
                    }}
                    bgcolor={'#F2F2F2'}
                >
                    <Grid item lg={4}>
                        <Stack component={'ul'} spacing={'24px'}>
                            <li className="text-lg text-black-main font-medium">
                                Order ID:<span className="text-grey-secondary text-1xl font-normal"> #123</span>
                            </li>
                            <li className="text-lg text-black-main font-medium">
                                Date Placed:<span className="text-grey-secondary text-1xl font-normal"> {moment(new Date()).fromNow()} </span>
                            </li>
                            <li className="flex items-center gap-2">
                                <FontAwesomeIcon color="#65A30D" icon={faCheckCircle} />
                                <span>Delivered</span>
                            </li>
                        </Stack>
                    </Grid>
                    <Grid item lg={6}>
                        <Stack component={'ul'} spacing={'8px'}>
                            <li className="text-lg text-black-main font-medium mb-3">Shipping Info</li>
                            <li className="text-black-main flex flex-col gap-1">
                                <span>Ha Lam</span>
                                <span>0964 909 321</span>
                            </li>
                            <li className="text-black-main">132 3/2 Street, Hung Loi Ward, Ninh Kieu District, Can Tho City</li>
                        </Stack>
                    </Grid>
                    <Grid item lg={2}>
                        <Stack component={'ul'} spacing={'8px'}>
                            <li className="text-lg text-black-main font-medium mb-3">Payment Method</li>
                            <li className="text-black-main flex flex-col gap-1">Credit Card</li>
                        </Stack>
                        <Stack component={'ul'} spacing={'8px'} mt={'15px'}>
                            <li className="text-lg text-black-main font-medium mb-3">Delivery Method</li>
                            <li className="text-black-main flex flex-col gap-1">Express in 4 hours</li>
                        </Stack>
                    </Grid>
                </Grid>
                <div className="flex-1 pb-8">
                    <Grid
                        container
                        key={2}
                        spacing={1}
                        py={'18px'}
                        sx={{
                            borderBottom: '1px solid #DBDBDB',
                        }}
                    >
                        <Grid item lg={4}>
                            <Stack component={'ul'} spacing={'24px'}>
                                <li className="text-lg text-black-main font-medium">
                                    Order ID:<span className="text-grey-secondary text-1xl font-normal"> #{dataDetail.id}</span>
                                </li>
                                <li className="text-lg text-black-main font-medium">
                                    Date Placed:<span className="text-grey-secondary text-1xl font-normal"> {dataDetail.placedDate} </span>
                                </li>
                                <li className="flex items-center gap-2">
                                    {(() => {
                                        const status = dataDetail.state.toLowerCase() as StateType;
                                        const { icon, color } = getIconWithStatus(status);

                                        return (
                                            <>
                                                <FontAwesomeIcon color={color} icon={icon} />
                                                <span>{capitalize(status)}</span>
                                            </>
                                        );
                                    })()}
                                </li>
                            </Stack>
                        </Grid>
                        <Grid item lg={6}>
                            <div className="flex items-center justify-center">
                                <span className="text-center text-[#303B4E]">Product</span>
                            </div>
                        </Grid>
                        <Grid item lg={2}>
                            <div className="flex items-center justify-center">
                                <span className="text-center text-[#303B4E]">Price</span>
                            </div>
                        </Grid>
                        <Grid item lg={2}>
                            <div className="flex items-center justify-center">
                                <span className="text-center text-[#303B4E]">Quantity</span>
                            </div>
                        </Grid>
                        <Grid item lg={2}>
                            <div className="flex items-center justify-center">
                                <span className="text-center text-[#303B4E]">Total</span>
                            </div>
                        </Grid>
                    </Grid>

                    <div className="px-4">
                        <DetailOrderhistoryItem />
                        <DetailOrderhistoryItem />
                    </div>

                    <Grid container key={3} spacing={1} py={'18px'} px={'16px'} mt={'32px'}>
                        <Grid item lg={6}></Grid>
                        <Grid
                            item
                            lg={2}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <div className="flex flex-col items-start justify-center gap-5">
                                <span className="text-center font-medium text-[#303B4E]">Subtotal: </span>
                                <span className="text-center font-medium text-[#303B4E]">Shipping fee: </span>
                                <span className="text-center font-medium text-[#303B4E]">Total: </span>
                            </div>
                        </Grid>
                        <Grid item lg={2}></Grid>
                        <Grid item lg={2}>
                            <div className="flex flex-col items-center justify-center gap-5">
                                <span className="text-center text-grey-secondary">{toCurrency(59000)}</span>
                                <span className="text-center text-grey-secondary">{toCurrency(20000)}</span>
                                <span className="text-center text-grey-secondary">{toCurrency(79000)}</span>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <div className="w-full flex text-violet-primary justify-center mt-12">
                <Link href={'/other-history'} className="hover:underline flex items-center gap-4 font-medium">
                    <span>Back to my order</span>
                    <FontAwesomeIcon icon={faArrowRight} />
                </Link>
            </div>
        </BaseBreadcrumbs>
    );
}
