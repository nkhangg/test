'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toCurrency } from '@/utils/format';
import classNames from 'classnames';
import React, { MouseEventHandler } from 'react';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { LoadingSecondary, MiniLoading } from '@/components';

export interface IPaymentCardProps {
    data: {
        title: string;
        business: string;
        price: number;
    };
    loading?: boolean;
    checked: boolean;
    disabled?: boolean;
    // setChecked: (value: boolean) => void;
    onClick?: MouseEventHandler<HTMLDivElement>;
}

export default function PaymentCard({ data, checked, loading, disabled, onClick }: IPaymentCardProps) {
    return (
        <div
            onClick={onClick && !disabled ? onClick : undefined}
            className={classNames('relative overflow-hidden py-[24px] px-[28px] pr-[20px] w-full  rounded-xl border-2  transition-all ease-linear  select-none ', {
                // [styles['check-label']]: true,
                'border-violet-secondary': checked,
                'border-transparent': !checked,
                'bg-[#F2F2F2] hover:border-violet-secondary cursor-pointer': !disabled,
                'bg-gray-400': disabled,
            })}
        >
            <div className="flex items-center justify-between">
                <h4 className="text-black-main text-lg">{data.title}</h4>

                {checked && (
                    <div className="w-5 h-5 bg-violet-secondary rounded-full flex items-center justify-center">
                        <FontAwesomeIcon icon={faCheck} className="text-white w-3 h-3" />
                    </div>
                )}
            </div>
            <p className="text-sm text-[#666666] mt-2">{data.business}</p>
            <span className="text-lg font-medium mt-3 block">{toCurrency(data.price)}</span>

            {loading && (
                <div className="absolute inset-0 bg-[rgba(0,0,0,.09)]">
                    <MiniLoading />
                </div>
            )}
        </div>
    );
}
