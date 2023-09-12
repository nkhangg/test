'use client';
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

// This interface of local component. Can delete if component haven't actribute
export interface IWrapperAnimationProps {
    styleAnimation?: {};
    hover?: {};
    children: ReactNode;
}

// Create tag tag animation with framer motion
export default function WrapperAnimation({
    styleAnimation,
    hover = {
        scale: 1.1,
    },
    children,
}: IWrapperAnimationProps) {
    return <motion.div whileHover={hover}>{children}</motion.div>;
}
