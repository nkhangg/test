'use client';
import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// This interface of local component. Can delete if component haven't actribute
export interface IWrapperAnimationProps {
    styleAnimation?: {
        initial: {};
        animate: {};
        exits: {};
    };
    tag?: {};
    hover?: {};
    className?: string;
    children: ReactNode;
}

// Create tag tag animation with framer motion
export default function WrapperAnimation({
    styleAnimation,
    hover = {
        scale: 1.1,
    },
    tag,
    children,
    className,
}: IWrapperAnimationProps) {
    return (
        <AnimatePresence>
            <motion.div className={className} whileTap={tag} animate={styleAnimation?.animate} exit={styleAnimation?.exits} initial={styleAnimation?.initial} whileHover={hover}>
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
