'use client';
import { IUser } from '@/configs/interface';
import { RootState } from '@/configs/types';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { addUser } from '@/redux/slice/appSlice';
import { Button, FormControl, FormControlLabel, InputLabel, Input, FormHelperText, Grid, MenuItem, Stack } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React, { useState } from 'react';
import ContainerContent from '@/components/common/common-components/ContainerContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook, faSquareGooglePlus } from '@fortawesome/free-brands-svg-icons';
import { BoxSign, SocialButton, TextField, WrapperAnimation } from '..';
import Link from 'next/link';

export interface ILoginPageProps {}

export default function LoginPage(props: ILoginPageProps) {
    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };

    return (
        <BoxSign onSubmit={(e) => e.preventDefault()} title="SIGN IN" titleBtn="SIGN IN">
            <Stack spacing={'20px'}>
                <TextField type="text" name="username" label={'Username'} size="small" fullWidth />
                <TextField type="password" name="password" label={'Password'} size="small" fullWidth />
            </Stack>
        </BoxSign>
    );
}
