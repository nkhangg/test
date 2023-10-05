'use client';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { Roboto_Flex } from 'next/font/google';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
const robotoFlex = Roboto_Flex({ subsets: ['latin'], style: ['normal'], weight: ['300', '400', '500', '600', '700', '800'] });
export interface IQuantityProps {
    maxValue: number;
    initValue?: number;
    onQuantity?: (value: number) => void;
}

export default function Quantity({ maxValue, initValue, onQuantity }: IQuantityProps) {
    const [value, setValue] = useState(initValue || 1);

    const handlePlus = () => {
        if (maxValue <= 0) return 0;

        setValue((prev) => {
            if (prev > maxValue - 1) return prev;

            return prev + 1;
        });
    };

    const handleMinus = () => {
        if (maxValue <= 0) return 0;
        setValue((prev) => {
            if (prev <= 1) return 1;
            return prev - 1;
        });
    };

    useEffect(() => {
        if (value > maxValue) {
            setValue(maxValue);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [maxValue]);

    useEffect(() => {
        if (!onQuantity) return;

        onQuantity(value);
    }, [value, onQuantity]);
    return (
        <div
            className={classNames('flex items-center gap-[40px] select-none', {
                [robotoFlex.className]: true,
            })}
        >
            <ul className={classNames('flex items-center rounded-md py-[8px] bg-[#F2F2F2] text-lg')}>
                <motion.li
                    onClick={handleMinus}
                    whileTap={{
                        scale: 0.8,
                    }}
                    className=" px-2 cursor-pointer"
                >
                    <FontAwesomeIcon icon={faMinus} />
                </motion.li>
                <li className=" px-3 border-l border-r border-gray-primary">{value}</li>
                <motion.li
                    onClick={handlePlus}
                    whileTap={{
                        scale: 0.8,
                    }}
                    className=" px-2 cursor-pointer"
                >
                    <FontAwesomeIcon icon={faPlus} />
                </motion.li>
            </ul>
        </div>
    );
}
