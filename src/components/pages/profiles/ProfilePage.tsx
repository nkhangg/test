'use client';
import style from './styles/product.module.css';
import { AvartarEdit, BoxTitle, DivTextfield, LoadingPrimary, MainButton } from '@/components';
import { profileUiData } from '@/datas/profile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Grid } from '@mui/material';
import classNames from 'classnames';
import React, { ChangeEvent, FocusEvent, FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import Validate from '@/utils/validate';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { ProfileType, RootState } from '@/configs/types';
import { notFound, useRouter } from 'next/navigation';
import { pushNoty } from '@/redux/slice/appSlice';
import { IProfile } from '@/configs/interface';
import moment from 'moment';
import { contants } from '@/utils/contants';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { curUser, updateUser } from '@/apis/user';
import { fetchUserByToken, update } from '@/redux/slice/userSlice';
import { clearToken } from '@/utils/cookie';

export interface IProfilePageProps {
    pages: [string];
}

const initdata = {
    fullname: '',
    email: '',
    phone: '',
    gender: 'Male',
    birthday: '',
    address: '',
    password: '',
    newPassword: '',
};
const initdataErrors = {
    fullname: '',
    email: '',
    phone: '',
    gender: '',
    birthday: '',
    address: '',
    password: '',
    newPassword: '',
};

export default function ProfilePage({ pages }: IProfilePageProps) {
    const { user } = useAppSelector((state: RootState) => state.userReducer);
    const dispatch = useAppDispatch();
    const [form, setForm] = useState<ProfileType>(initdata);
    const [errors, setErrors] = useState<ProfileType>(initdataErrors);
    const [avartar, setAvartar] = useState(user?.avatar);

    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const [openEditor, setOpenEditor] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validate()) return;

        console.log(form);

        try {
            setLoading(true);
            const response = await updateUser({ ...form, avatar: avartar });
            setLoading(false);
            if (response.errors) {
                setErrors({
                    ...errors,
                    ...(response.errors as unknown as ProfileType),
                });

                return;
            }

            dispatch(
                pushNoty({
                    title: 'Update Successfuly',
                    open: true,
                    type: 'success',
                    autohide: 5000,
                }),
            );

            dispatch(fetchUserByToken());

            router.refresh();
        } catch (error) {
            console.log('errors in product page when update' + error);
            setLoading(false);
            dispatch(fetchUserByToken());
            router.push('/');
        }

        // (async () => {
        //     const curUserupdated = unwrapResult(await response);
        //     console.log('in product page when update: ', curUserupdated);
        // })();
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        const dynamicKey = e.target.name as keyof ProfileType;

        if (dynamicKey === 'newPassword' || dynamicKey === 'password') {
            const checkBlank = Validate.isBlank(e.target.value);

            if (dynamicKey === 'newPassword' && Validate.isNotBlank(form.password)) {
                const { message } = Validate[dynamicKey](e.target.value);
                setErrors({
                    ...errors,
                    [dynamicKey]: message,
                });

                return;
            } else if (dynamicKey === 'password' && Validate.isNotBlank(form.newPassword)) {
                const { message } = Validate[dynamicKey](e.target.value);
                setErrors({
                    ...errors,
                    [dynamicKey]: message,
                });

                return;
            }

            if (checkBlank) {
                setErrors({
                    ...errors,
                    [dynamicKey]: '',
                });
                return;
            }
        }

        const { message } = Validate[dynamicKey](e.target.value);
        setErrors({
            ...errors,
            [dynamicKey]: message,
        });
    };

    const validate = () => {
        let flag = false;
        const validateErrors: ProfileType = { ...initdataErrors };

        const keys: string[] = Object.keys(validateErrors);

        keys.forEach((key) => {
            const dynamic = key as keyof ProfileType;

            if (dynamic == 'password' || dynamic === 'newPassword') {
                if (Validate.isNotBlank(form.password) || Validate.isNotBlank(form.newPassword)) {
                    if (dynamic === 'newPassword') {
                        const { message, error } = Validate.newPassword(form.newPassword);
                        validateErrors[dynamic] = message;
                        flag = error;
                    } else {
                        const { message, error } = Validate[dynamic](form[dynamic]);
                        validateErrors[dynamic] = message;
                        flag = error;
                    }
                }
            } else {
                const { message, error } = Validate[dynamic](form[dynamic]);
                validateErrors[dynamic] = message;
                flag = error;
            }
        });

        setErrors(validateErrors);

        return flag;
    };

    useEffect(() => {
        if (!user) {
            dispatch(
                pushNoty({
                    title: 'Some thing went wrong, please re-login to use continue !',
                    open: true,
                    type: 'error',
                }),
            );
            dispatch(fetchUserByToken());
            router.push('/');
            return;
        }

        console.log(user);
        setForm({
            fullname: user?.fullname || '',
            email: user?.email || '',
            phone: user?.phone || '',
            gender: user?.gender ? 'Male' : 'Female',
            birthday: user?.birthday ? moment(user?.birthday).format('yyyy-MM-D') : '',
            address: user?.address || '',
            password: '',
            newPassword: '',
        });

        setAvartar(user.avatar);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return (
        <BoxTitle locationTitle="left" title="MY ACCOUNT">
            <Grid container spacing={'10px'} className="min-h-[518px]">
                <Grid item xs={12} md={4} lg={3}>
                    <div className="py-[25px] px-9 w-full h-full bg-[#f1f1f1] rounded">
                        <div className="flex items-center gap-2 mb-[38px]">
                            <Avatar
                                sx={{
                                    width: 60,
                                    height: 60,
                                }}
                                alt="avatar"
                                src={avartar || contants.avartarDefault}
                            />
                            <span className="font-medium text-lg">{user?.username}</span>
                        </div>

                        <ul>
                            {profileUiData.listMethod.map((item) => {
                                return (
                                    <li key={item.title} className={''}>
                                        <Link
                                            className={classNames(
                                                `flex items-center gap-3 text-black-main text-sm px-[18px] py-2 border-b 
                                                border-[#DEDEDE] w-full hover:bg-green-65a30d rounded hover:text-white transition-all 
                                                ease-linear cursor-pointer mb-1 text-1xl`,
                                                {
                                                    'bg-green-65a30d text-white': item.link === '/profile',
                                                },
                                            )}
                                            href={item.link}
                                        >
                                            <FontAwesomeIcon className="text-1xl" icon={item.icon} />
                                            <p className=" uppercase">{item.title}</p>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </Grid>
                <Grid item xs={12} md={8} lg={9}>
                    <form onSubmit={handleSubmit} className="px-14 py-[60px] w-full h-full bg-[#f1f1f1] rounded flex flex-col justify-between">
                        <div className="flex flex-col justify-between gap-[40px]">
                            <div className="flex items-center flex-col w-full">
                                <div
                                    className={classNames('relative rounded-full overflow-hidden', {
                                        [style['avatar']]: true,
                                    })}
                                >
                                    <Avatar
                                        sx={{
                                            width: 140,
                                            height: 140,
                                        }}
                                        alt="avatar"
                                        src={avartar || contants.avartarDefault}
                                    />

                                    <div
                                        onClick={() => setOpenEditor(true)}
                                        className={classNames(
                                            'absolute bg-[rgba(0,0,0,.4)] inset-0 flex items-center justify-center text-white transition-all ease-linear cursor-pointer',
                                            {
                                                [style['avatar-backdrop']]: true,
                                            },
                                        )}
                                    >
                                        <FontAwesomeIcon icon={faEdit} />
                                    </div>
                                </div>
                            </div>
                            <DivTextfield
                                propsInput={{
                                    name: 'fullname',
                                    value: form.fullname,
                                    message: errors.fullname,
                                    onChange: handleChange,
                                    onBlur: handleBlur,
                                }}
                                label="Full name"
                            />

                            <div className="flex items-center gap-[22px] lg:gap-12 flex-col md:flex-row">
                                <div className="flex items-center flex-col w-full gap-[40px]">
                                    <DivTextfield
                                        propsInput={{
                                            disabled: true,
                                            name: 'email',
                                            type: 'email',
                                            onChange: handleChange,
                                            onBlur: handleBlur,
                                            value: form.email,
                                            message: errors.email,
                                        }}
                                        label="Email"
                                    />
                                    <DivTextfield
                                        dataSelect={[
                                            {
                                                id: 'Male',
                                                name: 'Male',
                                            },
                                            {
                                                id: 'Female',
                                                name: 'Female',
                                            },
                                        ]}
                                        propsInput={{
                                            name: 'gender',
                                            onChange: handleChange,
                                            onBlur: handleBlur,
                                            value: form.gender,
                                            message: errors.gender,
                                        }}
                                        label="Gender"
                                    />
                                </div>
                                <div className="flex items-center flex-col w-full gap-[40px]">
                                    <DivTextfield
                                        propsInput={{
                                            name: 'phone',
                                            onChange: handleChange,
                                            onBlur: handleBlur,
                                            value: form.phone,
                                            message: errors.phone,
                                        }}
                                        label="Phone number"
                                    />
                                    <DivTextfield
                                        propsInput={{
                                            name: 'birthday',
                                            type: 'date',
                                            onChange: handleChange,
                                            onBlur: handleBlur,
                                            value: form.birthday,
                                            message: errors.birthday,
                                        }}
                                        label="Birthday"
                                    />
                                </div>
                            </div>

                            <DivTextfield
                                propsInput={{
                                    name: 'address',
                                    onChange: handleChange,
                                    onBlur: handleBlur,
                                    value: form.address,
                                    message: errors.address,
                                }}
                                label="Address"
                            />
                            <DivTextfield
                                propsInput={{
                                    name: 'password',
                                    type: 'password',
                                    onChange: handleChange,
                                    onBlur: handleBlur,
                                    value: form.password,
                                    message: errors.password,
                                }}
                                label="Current Password (Skip if you don’t want to change the password)"
                            />
                            <DivTextfield
                                propsInput={{
                                    name: 'newPassword',
                                    type: 'password',
                                    onChange: handleChange,
                                    onBlur: handleBlur,
                                    value: form.newPassword,
                                    message: errors.newPassword,
                                }}
                                label="New password"
                            />
                        </div>

                        <div className="flex items-center justify-center w-full">
                            <MainButton width={'208px'} title="update" className="mt-8" />
                        </div>
                    </form>
                </Grid>
            </Grid>

            <AvartarEdit
                setOpen={setOpenEditor}
                onAvartar={(avatar) => {
                    setAvartar(avatar || user?.avatar);
                }}
                open={openEditor}
            />

            {loading && <LoadingPrimary />}
        </BoxTitle>
    );
}
