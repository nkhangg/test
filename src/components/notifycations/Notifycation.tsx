import { Alert, AlertColor, Snackbar, SnackbarCloseReason } from '@mui/material';
import * as React from 'react';

export interface INotifycationProps {
    title: string;
    autohide?: number;
    open: boolean;
    type?: AlertColor;
    onClose?: (event?: React.SyntheticEvent | Event, reason?: string) => void;
}

export default function Notifycation({ title, autohide = 2000, open, type = 'success', onClose }: INotifycationProps) {
    return (
        <Snackbar onClose={onClose} open={open} autoHideDuration={autohide}>
            <Alert onClose={onClose} severity={type} sx={{ width: '100%' }}>
                {title}
            </Alert>
        </Snackbar>
    );
}
