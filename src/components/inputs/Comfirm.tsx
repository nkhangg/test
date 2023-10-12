'use client';
import { ImportExport } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React, { useEffect, useState } from 'react';

export interface IComfirmProps {
    open: boolean;
    title: string;
    setOpen: (value: boolean) => void;
    onComfirm?: (value: 'ok' | 'cancel') => void;
}

export default function Comfirm({ title, open, setOpen, onComfirm }: IComfirmProps) {
    const [confirm, setConfirm] = useState<'ok' | 'cancel'>('cancel');

    const handleClose = () => {
        setOpen(false);
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
                    <DialogContentText id="alert-dialog-description">You want to delete this product ?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setConfirm('cancel');
                            handleClose();
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            setConfirm('ok');
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
