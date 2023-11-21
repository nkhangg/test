'use client';
import React, { MouseEventHandler, ReactNode, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
export type Ref = HTMLDivElement;
// This interface of local component. Can delete if component haven't actribute
export interface IWrapperAnimationProps {
    styleAnimation?: {
        initial: {};
        animate: {};
        exits: {};
    };
    tag?: null | {};
    styleTag?: 'scale' | 'none';
    hover?: {};
    className?: string;
    children: ReactNode;
    onClick?: MouseEventHandler<HTMLDivElement>;
}

const WrapperAnimation = forwardRef<Ref, IWrapperAnimationProps>(
    (
        {
            styleAnimation,
            hover = {
                scale: 1.1,
            },
            tag,
            children,
            styleTag = 'scale',
            className,
            onClick,
        },
        ref,
    ) => {
        const tags = {
            scale: {
                scale: 0.9,
            },
            none: {},
        };

        return (
            <AnimatePresence>
                <motion.div
                    ref={ref}
                    onClick={onClick}
                    className={className + ' select-none'}
                    whileTap={tag || tags[styleTag]}
                    animate={styleAnimation?.animate}
                    exit={styleAnimation?.exits}
                    initial={styleAnimation?.initial}
                    whileHover={hover}
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        );
    },
);

// 👇️ set display name
WrapperAnimation.displayName = 'WrapperAnimation';

export default WrapperAnimation;
