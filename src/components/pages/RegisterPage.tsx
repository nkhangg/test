'use client';
import { Button, FormControl, InputLabel, Grid, MenuItem, Typography, Box, Stack } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import React, { useState } from 'react';
import ContainerContent from '@/components/common/common-components/ContainerContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook, faSquareGooglePlus } from '@fortawesome/free-brands-svg-icons';
import { TextField, WrapperAnimation, Select, RoudedButton, SocialButton } from '..';
import Link from 'next/link';

export interface IRegisterPageProps {}

export default function RegisterPage(props: IRegisterPageProps) {
    const handleChange = (event: SelectChangeEvent<any>) => {
        // setAge(event.target.value as string);
    };

    return (
        <ContainerContent className="pt-24">
            <Grid container sx={{ px: '10%' }} spacing={'20px'}>
                <Grid item xs={12} md={12} lg={12} sx={{ mb: '2%' }}>
                    <div className="flex flex-col md:flex-row items-center md:justify-between w-full gap-4 md:gap-2">
                        <Typography variant="h3" fontSize={{ xs: 18, md: 22, lg: 32 }} fontWeight={600} className="uppercase text-[#4D4D4D]">
                            SIGN UP
                        </Typography>

                        <div className="w-full md:w-[60%] flex-col md:flex-row flex items-center justify-between gap-4">
                            <span className=" whitespace-nowrap ">Or sign in with</span>

                            <SocialButton mt="mt-0" title="Facebook" icon={faSquareFacebook} />
                            <SocialButton mt="mt-0" title="Google" background="#0D9488" icon={faSquareGooglePlus} />
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <Stack spacing={'20px'}>
                        <TextField id="username" label="Username" size="small" />

                        <FormControl className="w-full md:w-80">
                            <InputLabel
                                size="small"
                                id="genther"
                                sx={{
                                    color: '#6C6C6C !important',
                                    fontSize: '14px !important',
                                }}
                            >
                                Gender
                            </InputLabel>
                            <Select labelId="genther" id="genther-select" size="small" label="Gender" onChange={(e) => handleChange(e)}>
                                <MenuItem value={'false'} sx={{ fontSize: '14px !important' }}>
                                    Female
                                </MenuItem>
                                <MenuItem value={'true'} sx={{ fontSize: '14px !important' }}>
                                    Male
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <Stack spacing={'20px'}>
                        <TextField id="full-name" label="Full Name" size="small" />
                        <TextField id="email" label="Email" size="small" />
                    </Stack>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <TextField id="password" label="Password" size="small" />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <TextField id="confirm-password" label="Password Confirm" size="small" />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <Box>
                        <Typography variant="subtitle2" sx={{ mt: '20px', fontSize: { xs: '12px', md: '13px', lg: '14px' } }}>
                            Need an account?
                            <Link href={'/register'} className="text-blue-primary hover:underline ml-1">
                                Sign up
                            </Link>
                        </Typography>

                        <RoudedButton title={'SIGN UP'} />
                    </Box>
                </Grid>
            </Grid>
        </ContainerContent>
    );
}
