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
import { faSquareFacebook, faSquareGooglePlus } from '@fortawesome/free-brands-svg-icons'
import { TextField, WrapperAnimation } from '..';

export interface ILoginPageProps { }

export default function LoginPage(props: ILoginPageProps) {

    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };
    const useStyle = {
        Button: {
            "&:hover": {
                backgroundColor: "#ffffff !important",
                boxShadow: "none !important",
            },
            "&:active": {
                boxShadow: "none !important",
                backgroundColor: "#3c52b2 !important",
            },
        },
    };


    return (
        <ContainerContent>

            <Grid container spacing={2}>

                <Grid item lg={4} xs={12}>
                    <div className='mt-28 pl-4'>
                        <p className='font-black text-4xl pl-3'>SIGN UP</p>
                    </div>
                </Grid>
                <Grid item lg={6} xs={12}>
                    <div className='mt-24 flex'>
                        <p className='text-xl mt-5'>Or sign in with</p>
                        <div className='px-5'>
                            <WrapperAnimation hover={{ y: -2 }}>
                                <Button variant='contained' color="primary" className=' w-[200px] place-content-center ' sx={{ p: "10px", backgroundColor: "#0284C7" }}>
                                    <FontAwesomeIcon icon={faSquareFacebook} className='w-[42px] h-[36px] mr-3' />
                                    <span className='text-center tracking-widest font-black'>Facebook</span>
                                </Button>

                            </WrapperAnimation>

                        </div>
                        <div className='px-5'>
                            <WrapperAnimation hover={{ y: -2 }}>
                                <Button variant='contained' className='w-[200px] place-content-center ' sx={{
                                    p: "10px",
                                    backgroundColor: "#0D9488",
                                    "&:hover": {
                                        backgroundColor: "#0D9488",
                                        boxShadow: "none !important",
                                    },
                                    "&:active": {
                                        boxShadow: "none !important",
                                        backgroundColor: "#3c52b2 !important",
                                    },
                                }}>
                                    <FontAwesomeIcon icon={faSquareGooglePlus} className='w-[42px] h-[36px] mr-3' />
                                    <span className='text-center tracking-widest font-black'>Google</span>
                                </Button>
                            </WrapperAnimation>

                        </div>

                    </div>
                </Grid>
                <Grid item lg={6} xs={12}>
                    <div className="mt-4 p-4">
                        <div className='p-3 rounded-lg'>
                            <FormControl className='w-full'>
                                <TextField id="filled-basic" label="Username" variant="filled" />
                            </FormControl>
                        </div>
                    </div>
                </Grid>
                <Grid item lg={6} xs={12}>
                    <div className="mt-4  p-4">
                        <div className='p-3  rounded-lg'>
                            <FormControl className='w-full mt-2'>
                                <TextField id="filled-basic" label="Full Name" variant="filled" />
                            </FormControl>
                        </div>
                    </div>
                </Grid>
                <Grid item lg={6} xs={12}>
                    <div className="mt-4 p-4">
                        <div className='p-3  rounded-lg'>
                            <FormControl className='w-80'>
                                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={age}
                                    label="Gender"
                                    onChange={handleChange}
                                    className='bg-zinc-100'
                                >
                                    <MenuItem value={10}>Female</MenuItem>
                                    <MenuItem value={20}>Male</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                </Grid>
                <Grid item lg={6} xs={12}>
                    <div className="mt-4  p-4">
                        <div className='p-3  rounded-lg'>
                            <FormControl className='w-full mt-2'>
                                <TextField id="filled-basic" label="Email" variant="filled" />
                            </FormControl>
                        </div>
                    </div>
                </Grid>
                <Grid item lg={6} xs={12}>
                    <div className="mt-4  p-4">
                        <div className='p-3  rounded-lg'>
                            <FormControl className='w-full mt-2'>
                                <TextField id="filled-basic" label="Password" variant="filled" />
                            </FormControl>
                        </div>
                    </div>
                </Grid>
                <Grid item lg={6} xs={12}>
                    <div className="mt-4 p-4">
                        <div className='p-3  rounded-lg'>
                            <FormControl className='w-full mt-2'>
                                <TextField id="filled-basic" label="Password Confirm" variant="filled" />
                            </FormControl>
                        </div>
                    </div>
                </Grid>

                <Grid item lg={12} xs={12}>
                    <div className="pl-4">
                        <p className='pl-3 text-2xl font-thin tracking-widest'>Already have an account? <a href="" className='text-sky-500 font-thin'>Log in</a></p>
                    </div>
                </Grid>
                <Grid item lg={6} xs={12}>
                    <div className="pl-4 mt-10">
                        <WrapperAnimation hover={{ y: -2 }}>
                            <Button variant='contained' className='w-[300px] h-[60px] uppercase' sx={{ borderRadius: "50px", backgroundColor: "#374151" }}>
                                <span className='text-2xl font-medium'>Sign up</span>
                            </Button>
                        </WrapperAnimation>

                    </div>
                </Grid>
            </Grid>


        </ContainerContent>

    );
}

