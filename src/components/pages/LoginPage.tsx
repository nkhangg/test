'use client';
import { IUser } from '@/configs/interface';
import { RootState } from '@/configs/types';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { addUser } from '@/redux/slice/appSlice';
import { Button, FormControl, FormControlLabel, TextField } from '@mui/material';
import React, { useState } from 'react';

export interface ILoginPageProps {}

export default function LoginPage(props: ILoginPageProps) {
    // get user from store redux
    const user: IUser | null = useAppSelector((state: RootState) => state.appReducer.user);

    // dispatch user to store redux
    const dispatch = useAppDispatch();

    // local state in component
    const [values, setValues] = useState<IUser>({
        username: '',
        password: '',
    });

    // handle dispatch action and send payload to store
    const handleDispatchUser = () => {
        dispatch(addUser(values));
    };

    return (
        <div className="flex flex-col gap-4 items-center justify-center h-screen">
            <FormControl className="w-[400px] flex flex-col gap-4">
                <h2 className="text-center text-xl font-bold">Login</h2>
                <TextField onChange={(e) => setValues({ ...values, username: e.target.value })} id="username" label="Username" variant="standard" />
                <TextField type="password" onChange={(e) => setValues({ ...values, password: e.target.value })} id="password" label="Password" variant="standard" />

                <Button onClick={handleDispatchUser} variant="contained">
                    Login
                </Button>
            </FormControl>

            {user ? (
                <div className="flex flex-col gap-2 w-[400px]">
                    <span className="font-bold">Username: {user?.username}</span>
                    <span className="font-bold">Password: {user?.password}</span>
                </div>
            ) : (
                ''
            )}
        </div>
    );
}
