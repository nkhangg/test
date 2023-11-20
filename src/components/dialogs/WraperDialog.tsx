'use client';
import React, { ReactNode, useEffect, useLayoutEffect, useState } from 'react';
import { TransitionProps } from '@mui/material/transitions';
import { Dialog, DialogProps, Slide } from '@mui/material';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export interface IWraperDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    children: ReactNode;
    className?: string;
}

export default function WraperDialog({ open, children, className, setOpen, ...props }: IWraperDialogProps & DialogProps) {
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Dialog
                className={className}
                sx={{
                    color: '#333333',
                }}
                {...props}
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                {children}
            </Dialog>
        </>
    );
}
