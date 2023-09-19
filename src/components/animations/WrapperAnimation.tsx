'use client';
import React, { MouseEventHandler, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// This interface of local component. Can delete if component haven't actribute
export interface IWrapperAnimationProps {
    styleAnimation?: {
        initial: {};
        animate: {};
        exits: {};
    };
    tag?: null | {};
    styleTag?: 'scale';
    hover?: {};
    className?: string;
    children: ReactNode;
    onClick?: MouseEventHandler<HTMLDivElement>;
}

// Create tag tag animation with framer motion
export default function WrapperAnimation({
    styleAnimation,
    hover = {
        scale: 1.1,
    },
    tag,
    children,
    styleTag = 'scale',
    className,
    onClick,
}: IWrapperAnimationProps) {
    const tags = {
        scale: {
            scale: 0.9,
        },
    };

    return (
        <AnimatePresence>
            <motion.div
                onClick={onClick}
                className={className}
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
}
