'use client';
import { ImportExport } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React, { ReactNode, useEffect, useState } from 'react';

export interface IComfirmProps {
    open: boolean;
    title: string;
    subtitle?: string | ReactNode;
    setOpen: (value: { open: boolean; comfirm: 'ok' | 'cancel' }) => void;
    onComfirm?: (value: { open: boolean; comfirm: 'ok' | 'cancel' }) => void;
}

export default function Comfirm({ title, open, subtitle = 'You want to delete this product ?', setOpen, onComfirm }: IComfirmProps) {
    const [confirm, setConfirm] = useState<{ open: boolean; comfirm: 'ok' | 'cancel' }>({ open: false, comfirm: 'cancel' });

    const handleClose = () => {
        setOpen({ ...confirm, open: false });
    };

    useEffect(() => {
        if (!onComfirm) return;
        onComfirm(confirm);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [confirm]);

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">{subtitle}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setConfirm({ ...confirm, comfirm: 'cancel' });
                            handleClose();
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            setConfirm({ ...confirm, comfirm: 'ok' });
                            handleClose();
                        }}
                    >
                        Oke
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
