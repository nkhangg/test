'use client';
import React, { ReactNode, useEffect, useLayoutEffect, useState } from 'react';
import { TransitionProps } from '@mui/material/transitions';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogProps, DialogTitle, Slide } from '@mui/material';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="down" ref={ref} {...props} />;
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

    useEffect(() => {
        if (!open) return;
        document.body.style.paddingRight = '0px';

        return () => {
            document.body.style.paddingRight = 'auto';
        };
    }, [open]);
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
