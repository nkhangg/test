'use client';
import styles from './styles/cart.module.css';
import { BoxTitle, MainButton } from '@/components';
import { ContainerContent } from '@/components/common';
import { Breadcrumbs, Typography } from '@mui/material';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Cart from './Cart';
import { dataCart } from '@/datas/cart-data';
import { toCurrency } from '@/utils/format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import dynamic from 'next/dynamic';

const Carts = dynamic(() => import('./Carts'), { ssr: false });

export interface ICartPageProps {}

export default function CartPage(props: ICartPageProps) {
    const [total, setTotal] = useState(0);

    return (
        <>
            <ContainerContent className="pt-12">
                <div role="presentation">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link className="hover:underline" href="/">
                            Home
                        </Link>
                        <Link className="text-black-main hover:underline " href="/cart">
                            Cart
                        </Link>
                    </Breadcrumbs>
                </div>
            </ContainerContent>
            {
                <BoxTitle mt="mt-[46px]" mbUnderline="pb-0" title="my cart" fontWeigth="font-semibold" underlineTitle locationTitle="left" fontSizeTitle="text-[32px]">
                    {/* <Carts onTotal={(t) => setTotal(t)} data={dataCart} /> */}
                    <Carts onTotal={(t) => setTotal(t)} data={dataCart} />

                    <div className="flex items-center justify-between mt-10 text-lg md:text-xl text-black-main">
                        <div className="flex items-center justify-start w-[10%]">
                            <span className="">Total</span>
                        </div>

                        <div className="flex items-center justify-center w-[20%] ">
                            <p className="">{toCurrency(total)}</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center mt-20 mb-[60px] lg:mb-[-100px] gap-6">
                        <MainButton title="Checkout" background="bg-violet-primary" />
                        <Link
                            href={'/take-action'}
                            className={classNames(' hover:underline text-violet-primary flex items-center gap-[10px] text-1xl', {
                                [styles['cart-page']]: true,
                            })}
                        >
                            <span>Continue to buying</span>
                            <FontAwesomeIcon
                                className={classNames(' transition-all ease-linear', {
                                    [styles['link']]: true,
                                })}
                                icon={faArrowRight}
                            />
                        </Link>
                    </div>
                </BoxTitle>
            }
        </>
    );
}
