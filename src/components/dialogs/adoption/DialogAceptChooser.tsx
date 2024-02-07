'use client';
import React, { ChangeEvent, ReactNode, useState } from 'react';
import WraperDialog from '../WraperDialog';
import { Button, DialogActions, DialogContent, DialogTitle, Stack } from '@mui/material';
import { TextField, WrapperAnimation } from '../..';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import Validate from '@/utils/validate';

const iniData = undefined;

export interface IDialogDateChooserProps {
    iniData?: string;
    className?: string;
    onDatas?: (dates: string) => void;
    title?: string;
    label?: ReactNode | string;
}

export default function DialogDateChooser({ className, label, title = 'Choose date you want to show on table', iniData, onDatas }: IDialogDateChooserProps) {
    const [dates, setDates] = useState<string | undefined>(iniData);
    const [message, setMessage] = useState('');

    const [open, setOpen] = useState(false);
    const handleChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
        setDates(e.target.value);
    };

    const handleOk = () => {
        if (!onDatas || validate()) return;

        console.log(dates);

        onDatas(dates || '');

        setOpen(false);
    };

    const validate = () => {
        const { message, error } = Validate.date(dates || '');

        setMessage(message);

        return error;
    };

    return (
        <div className="">
            <div className={className} onClick={() => setOpen((prev) => !prev)}>
                {label}
            </div>

            <WraperDialog open={open} setOpen={setOpen}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <Stack spacing={'10px'}>
                        <div className="flex-1">
                            <TextField message={message} value={dates || ''} type="date" name="date" onChange={handleChangeDate} fullWidth size="small" />
                        </div>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={() => handleOk()}>Ok</Button>
                </DialogActions>
            </WraperDialog>
        </div>
    );
}
