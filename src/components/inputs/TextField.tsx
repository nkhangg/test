'use client';
import React from 'react';
import { TextFieldProps, TextField as Tx, styled } from '@mui/material';

export default function TextField(props: TextFieldProps) {
    const MyTextField = styled(Tx)({
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                border: '1px solid #5FA503', // customized
            },
        },
        '& .MuiOutlinedInput-root:hover': {
            '& fieldset': {
                border: '1px solid #5FA503', // customized
            },
        },
    });
    return <MyTextField {...props} variant="outlined" />;
}
