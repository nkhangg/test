'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toCurrency } from '@/utils/format';
import classNames from 'classnames';
import React, { MouseEventHandler } from 'react';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export interface IPaymentCardProps {
    data: {
        title: string;
        business: string;
        price: number;
    };
    checked: boolean;
    // setChecked: (value: boolean) => void;
    onClick?: MouseEventHandler<HTMLDivElement>;
}

export default function PaymentCard({ data, checked, onClick }: IPaymentCardProps) {
    return (
        <div
            onClick={onClick}
            className={classNames(
                'py-[24px] px-[28px] pr-[20px] w-full bg-[#F2F2F2] rounded-xl border-2 hover:border-violet-secondary transition-all ease-linear cursor-pointer select-none ',
                {
                    // [styles['check-label']]: true,
                    'border-violet-secondary': checked,
                    'border-transparent': !checked,
                },
            )}
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
        </div>
    );
}
