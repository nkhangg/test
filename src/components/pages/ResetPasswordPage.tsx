'use client';
import React, { ChangeEvent, FocusEvent, FormEvent, FormEventHandler, InputHTMLAttributes, useState } from 'react';
import { BoxSign, SocialButton, TextField, WrapperAnimation } from '@/components';
import { ContainerContent } from '@/components/common';
import { faSquareFacebook, faSquareGooglePlus } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import Validate from '@/utils/validate';
export interface IResetPasswordProps {}

export default function ResetPassword(props: IResetPasswordProps) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const validate = () => {
        let flag = true;

        const { message, error } = Validate.password(password);

        if (error) {
            setError(message);
            flag = false;
        } else {
            setError('');
        }

        return flag;
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validate()) return;

        alert('123');
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };
    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        validate();
    };
    return (
        <BoxSign showForgot={false} title="RESET PASSWORD" onSubmit={handleSubmit}>
            <Typography
                variant="subtitle1"
                fontSize={{ xs: 12, md: 13, lg: 14 }}
                className=" text-[#6C6C6C]"
                sx={{
                    mb: '20px',
                    mt: '-26px',
                }}
            >
                {"Just enter your email address below and we'll send you a link to reset your password!"}
            </Typography>

            <TextField
                error={error.length > 0}
                helperText={error}
                onBlur={handleBlur}
                value={password}
                onChange={handleChange}
                type="password"
                name="password"
                label={'Password'}
                size="small"
                fullWidth
            />
        </BoxSign>
    );
}
