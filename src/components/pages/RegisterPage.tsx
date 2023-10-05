'use client';
import { Button, FormControl, InputLabel, Grid, MenuItem } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import React, { useState } from 'react';
import ContainerContent from '@/components/common/common-components/ContainerContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook, faSquareGooglePlus } from '@fortawesome/free-brands-svg-icons';
import { TextField, WrapperAnimation, Select } from '..';
import Link from 'next/link';

export interface IRegisterPageProps {}

export default function RegisterPage(props: IRegisterPageProps) {
    const handleChange = (event: SelectChangeEvent<any>) => {
        // setAge(event.target.value as string);
    };
    const useStyle = {
        Button: {
            '&:hover': {
                backgroundColor: '#ffffff !important',
                boxShadow: 'none !important',
            },
            '&:active': {
                boxShadow: 'none !important',
                backgroundColor: '#3c52b2 !important',
            },
        },
    };

    return (
        <ContainerContent>
            <Grid container spacing={2}>
                <Grid item lg={4} xs={12}>
                    <div className="mt-28 pl-4">
                        <p className="font-black text-4xl pl-3">SIGN UP</p>
                    </div>
                </Grid>
                <Grid item lg={6} xs={12}>
                    <div className="mt-24 flex flex-col md:flex-row items-center justify-center gap-4 w-full">
                        <p className="text-xl whitespace-nowrap">Or sign in with</p>
                        <div className="px-5 w-full md:w-auto">
                            <WrapperAnimation hover={{ y: -2 }}>
                                <Button variant="contained" color="primary" className="w-full md:w-[200px] place-content-center " sx={{ p: '10px', backgroundColor: '#0284C7' }}>
                                    <FontAwesomeIcon icon={faSquareFacebook} className="w-[42px] h-[36px] mr-3" />
                                    <span className="text-center tracking-widest font-black">Facebook</span>
                                </Button>
                            </WrapperAnimation>
                        </div>
                        <div className="px-5 w-full md:w-auto">
                            <WrapperAnimation hover={{ y: -2 }}>
                                <Button
                                    variant="contained"
                                    className=" w-full md:w-[200px] place-content-center "
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
                </Grid>
                <Grid item lg={6} xs={12}>
                    <div className="mt-4 p-4">
                        <div className="p-3 rounded-lg">
                            <FormControl className="w-full">
                                <TextField id="filled-basic" label="Username" variant="filled" />
                            </FormControl>
                        </div>
                    </div>
                </Grid>
                <Grid item lg={6} xs={12}>
                    <div className="mt-4  p-4">
                        <div className="p-3  rounded-lg">
                            <FormControl className="w-full mt-2">
                                <TextField id="filled-basic" label="Full Name" variant="filled" />
                            </FormControl>
                        </div>
                    </div>
                </Grid>
                <Grid item lg={6} xs={12}>
                    <div className="mt-4 p-4">
                        <div className="p-3  rounded-lg">
                            <FormControl className="w-full md:w-80">
                                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Gender" onChange={(e) => handleChange(e)}>
                                    <MenuItem value={'false'}>Female</MenuItem>
                                    <MenuItem value={'true'}>Male</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                </Grid>
                <Grid item lg={6} xs={12}>
                    <div className="mt-4  p-4">
                        <div className="p-3  rounded-lg">
                            <FormControl className="w-full mt-2">
                                <TextField id="filled-basic" label="Email" variant="filled" />
                            </FormControl>
                        </div>
                    </div>
                </Grid>
                <Grid item lg={6} xs={12}>
                    <div className="mt-4  p-4">
                        <div className="p-3  rounded-lg">
                            <FormControl className="w-full mt-2">
                                <TextField id="filled-basic" label="Password" variant="filled" />
                            </FormControl>
                        </div>
                    </div>
                </Grid>
                <Grid item lg={6} xs={12}>
                    <div className="mt-4 p-4">
                        <div className="p-3  rounded-lg">
                            <FormControl className="w-full mt-2">
                                <TextField id="filled-basic" label="Password Confirm" variant="filled" />
                            </FormControl>
                        </div>
                    </div>
                </Grid>

                <Grid item lg={12} xs={12}>
                    <div className="pl-4">
                        <p className="pl-3 text-lg font-thin tracking-widest">
                            Already have an account?
                            <Link href={'/login'} className="text-sky-500 font-thin hover:underline">
                                Log in
                            </Link>
                        </p>
                    </div>
                </Grid>
                <Grid item lg={6} xs={12}>
                    <div className="pl-4 mt-10 flex items-center justify-center md:justify-start">
                        <WrapperAnimation hover={{ y: -2 }}>
                            <Button variant="contained" className="w-[250px] h-[50px] uppercase" sx={{ borderRadius: '50px', backgroundColor: '#374151' }}>
                                <span className="text-xl font-medium">Sign up</span>
                            </Button>
                        </WrapperAnimation>
                    </div>
                </Grid>
            </Grid>
        </ContainerContent>
    );
}
