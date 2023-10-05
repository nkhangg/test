'use client';
import { IUser } from '@/configs/interface';
import { RootState } from '@/configs/types';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { addUser } from '@/redux/slice/appSlice';
import { Button, FormControl, FormControlLabel, InputLabel, Input, FormHelperText, Grid, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React, { useState } from 'react';
import ContainerContent from '@/components/common/common-components/ContainerContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook, faSquareGooglePlus } from '@fortawesome/free-brands-svg-icons';
import { TextField, WrapperAnimation } from '..';
import Link from 'next/link';

export interface ILoginPageProps {}

export default function LoginPage(props: ILoginPageProps) {
    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };

    return (
        <ContainerContent>
            <Grid container spacing={2}>
                <Grid item lg={6} xs={12}>
                    <div className="md:border-r-2">
                        <Grid item lg={4} xs={12}>
                            <div className="mt-28 pl-4">
                                <p className="font-black text-4xl pl-3">SIGN IN</p>
                            </div>
                        </Grid>
                        <Grid item lg={12} xs={12}>
                            <div className="mt-4 p-4">
                                <div className="p-3 rounded-lg">
                                    <FormControl className="w-full">
                                        <TextField id="filled-basic" label="Username" variant="filled" />
                                    </FormControl>
                                </div>
                            </div>
                        </Grid>
                        <Grid item lg={12} xs={12}>
                            <div className=" p-4">
                                <div className="p-3  rounded-lg">
                                    <FormControl className="w-full mt-2">
                                        <TextField id="filled-basic" label="Full Name" variant="filled" />
                                    </FormControl>
                                </div>
                            </div>
                        </Grid>
                        <Grid item lg={12} xs={12}>
                            <div className="pl-4">
                                <p className="pl-3 text-lg font-thin tracking-widest">
                                    Need an account?
                                    <Link href="/register" className="text-sky-500 font-thin hover:underline">
                                        Sign up
                                    </Link>
                                </p>
                            </div>
                        </Grid>
                        <Grid item lg={6} xs={12}>
                            <div className="pl-4 mt-10 flex items-center justify-center md:justify-start md:items-start">
                                <WrapperAnimation hover={{ y: -2 }}>
                                    <Button variant="contained" className="w-[250px] h-[50px] uppercase" sx={{ borderRadius: '50px', backgroundColor: '#374151' }}>
                                        <span className="text-xl font-medium">Sign in</span>
                                    </Button>
                                </WrapperAnimation>
                            </div>
                        </Grid>
                    </div>
                </Grid>

                <Grid item lg={6} xs={12}>
                    <div className="flex justify-items-center items-center h-full md:pl-10">
                        <div className="w-full">
                            <p className="text-xl text-center mt-5">Or sign in with</p>
                            <div className="flex flex-col gap-3 md:flex-row md:justify-around mt-7 w-full">
                                <div className="px-5">
                                    <WrapperAnimation hover={{ y: -2 }}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className=" w-full md:w-[200px] place-content-center "
                                            sx={{ p: '10px', backgroundColor: '#0284C7' }}
                                        >
                                            <FontAwesomeIcon icon={faSquareFacebook} className="w-[42px] h-[36px] mr-3" />
                                            <span className="text-center tracking-widest font-black">Facebook</span>
                                        </Button>
                                    </WrapperAnimation>
                                </div>

                                <div className="px-5">
                                    <WrapperAnimation hover={{ y: -2 }} className="w-full">
                                        <Button
                                            variant="contained"
                                            className="w-full md:w-[200px] place-content-center "
                                            sx={{
                                                p: '10px',
                                                backgroundColor: '#0D9488',
                                                '&:hover': {
                                                    backgroundColor: '#0D9488',
                                                    boxShadow: 'none !important',
                                                },
                                                '&:active': {
                                                    boxShadow: 'none !important',
                                                    backgroundColor: '#3c52b2 !important',
                                                },
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faSquareGooglePlus} className="w-[42px] h-[36px] mr-3" />
                                            <span className="text-center tracking-widest font-black">Google</span>
                                        </Button>
                                    </WrapperAnimation>
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </ContainerContent>
    );
}
