'use client';
import React, { ChangeEvent, FocusEvent, FormEvent, useState } from 'react';
import { BoxSign, LoadingPrimary, TextField, Notifycation } from '..';
import { Stack } from '@mui/material';
import Validate from '@/utils/validate';
import { UserFormType } from '@/configs/types';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { login } from '@/apis/user';
import { setToken } from '@/redux/slice/userSlice';

export interface ILoginPageProps {}

export default function LoginPage(props: ILoginPageProps) {
    const [loading, setLoading] = useState(false);
    const [notifycation, setnotifycation] = useState(false);

    const dispatch = useDispatch();

    const router = useRouter();
    const initalDataForm = {
        username: '',
        password: '',
    };

    const [form, setForm] = useState<UserFormType>(initalDataForm);

    const [errors, setErrors] = useState<UserFormType>(initalDataForm);

    const validate = () => {
        let flag = true;

        const validErrors: UserFormType = initalDataForm;

        const validUsername = Validate.username(form.username);
        const validPassword = Validate.password(form.password);

        validErrors.username = validUsername.message;
        validErrors.password = validPassword.message;

        if (validUsername.error) {
            flag = false;
        }
        if (validPassword.error) {
            flag = false;
        }

        setErrors(validErrors);

        return flag;
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        const dynamicKey = e.target.name as keyof UserFormType;

        const { message } = Validate[dynamicKey](e.target.value);

        setErrors({
            ...errors,
            [dynamicKey]: message,
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            setLoading(true);
            const res = await login(form);
            setLoading(false);
            if (res.errors && Object.keys(res.errors).length > 0) {
                setErrors({
                    username: res.errors.username ? res.errors.username : '',
                    password: res.errors.password ? res.errors.password : '',
                });

                return;
            }

            // all good

            router.push('/');
            dispatch(setToken(res.token));
        } catch (error) {
            console.log('error in login page: ' + error);
            setLoading(false);
            setnotifycation(true);
        }
    };

    return (
        <BoxSign onSubmit={handleSubmit} title="SIGN IN" titleBtn="SIGN IN">
            <Stack spacing={'20px'}>
                <TextField
                    onBlur={handleBlur}
                    error={Validate.isNotBlank(errors.username)}
                    helperText={Validate.isNotBlank(errors.username) && errors.username}
                    onChange={handleChange}
                    value={form.username}
                    type="text"
                    name="username"
                    label={'Username'}
                    size="small"
                    fullWidth
                />
                <TextField
                    onBlur={handleBlur}
                    error={Validate.isNotBlank(errors.password)}
                    helperText={Validate.isNotBlank(errors.password) && errors.password}
                    onChange={handleChange}
                    value={form.password}
                    type="password"
                    name="password"
                    label={'Password'}
                    size="small"
                    fullWidth
                />
            </Stack>

            {loading && <LoadingPrimary />}
            <Notifycation
                onClose={(e) => {
                    setnotifycation(false);
                }}
                open={notifycation}
                title="Something went wrong !"
                type="error"
            />
        </BoxSign>
    );
}
