/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { BoxTitle, LoadingPrimary, MainButton, WrapperAnimation } from '@/components';
import { contants } from '@/utils/contants';
import { Box, Checkbox, Stack, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { useAppSelector } from '@/hooks/reduxHooks';
import { RootState } from '@/configs/types';
import { adoptionPet } from '@/apis/pets';
import WraperDialog from '../dialogs/WraperDialog';
import { IInfoAddress, IPet, IPetDetail } from '@/configs/interface';
import { useQuery } from '@tanstack/react-query';
import { getAddresses } from '@/apis/user';
import classNames from 'classnames';
import { addressToString } from '@/utils/format';
export interface IAskConditionPageProps {}

const _Item = ({ title, onChecked }: { title: string; onChecked?: (v: string, check?: boolean) => void }) => {
    return (
        <Box component={'div'} className="py-2 px-3 rounded-lg bg-[#F2F2F2] text-black-main text-1xl flex items-center justify-between gap-2">
            <p className="flex-1">{title}</p>
            <Checkbox
                onChange={(e) => {
                    if (!onChecked) return;

                    onChecked(title, e.target.checked);
                }}
            />
        </Box>
    );
};

export default function AskConditionPage(props: IAskConditionPageProps) {
    const [conditions, setConditions] = useState(() => new Set<string>());

    const { user } = useAppSelector((state: RootState) => state.userReducer);
    const { petAdopt } = useAppSelector((state: RootState) => state.adoptReducer);

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(true);

    const [phone, setPhone] = useState<IInfoAddress | null>(null);

    const validate = useCallback(() => {
        return conditions.size <= 0;
    }, [conditions]);

    //use Query
    const dataAddress = useQuery({
        queryKey: ['getAddresses'],
        queryFn: () => getAddresses(),
    });

    const handleContactToView = async () => {
        if (!user) {
            return toast.warn('Plese login to use !');
        }

        if (!petAdopt) {
            return toast.warn("You haven't chosen a pet yet !");
        }

        if (validate()) {
            return toast.warn('You must meet at least one requirement !');
        }

        try {
            console.log(user.id, petAdopt.id);
            const res = await adoptionPet({ userId: user.id, petId: petAdopt.id as string });

            if (!res || res.errors) {
                return toast.warn(res.message);
            }

            toast.success('Your request has been sent. We will contact as soon as possible !');
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    const dataPhone = useMemo(() => {
        if (dataAddress.data?.errors || dataAddress.isError) return [];

        if (!dataAddress.data || !dataAddress.data.data) return [];

        return dataAddress.data.data;
    }, [dataAddress]);

    return (
        <BoxTitle title="WE ASK? YOU ANSWER" locationTitle="center">
            <Box
                sx={{
                    width: '100%',
                    backgroundColor: '#fff',
                    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                    p: '40px',
                    borderRadius: '8px',
                }}
            >
                <Typography className="text-green-5FA503 text-justify">
                    We only allow direct adoption, not adoption for others, so please discuss all of the following questions{' '}
                </Typography>
                <Stack sx={{ mt: '36px', mb: '40px' }} spacing={'16px'}>
                    {contants.askConditions.map((item, index) => {
                        return (
                            <_Item
                                onChecked={(e, check) => {
                                    if (conditions.has(e) && !check) {
                                        setConditions((prev) => {
                                            const next = new Set(prev);

                                            next.delete(e);

                                            return next;
                                        });
                                        return;
                                    }
                                    setConditions((prev) => new Set(prev).add(e));
                                }}
                                key={item}
                                title={index + 1 + `. ${item}`}
                            />
                        );
                    })}
                </Stack>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <MainButton onClick={handleContactToView} width={'fit-content'} title="CONTACT TO INTERVIEW" />
                </Box>
            </Box>

            <WraperDialog
                sx={{
                    '& .MuiPaper-root': {
                        borderRadius: '18px',
                    },
                }}
                fullWidth={true}
                maxWidth={'md'}
                open={open}
                setOpen={setOpen}
            >
                <div className="p-5 text-black-main">
                    <h4 className="text-2xl font-bold mb-5">Confirm</h4>
                    <div className="flex items-start  justify-between gap-5">
                        <div className="w-1/2  flex justify-start flex-col gap-3">
                            <span className="flex items-center gap-3 capitalize">
                                <span className="font-medium">subscriber: </span>
                                <p>{user?.fullname || user?.displayName}</p>
                            </span>
                            <span className="font-medium">Contact phone number: </span>
                            <div className="flex items-center flex-wrap gap-2">
                                <small className="text-xs italic ">
                                    Select a phone number from the list or <span className="text-blue-primary hover:underline cursor-pointer">another phone number</span> to contact
                                </small>
                                {dataPhone.length &&
                                    dataPhone.map((item) => {
                                        return (
                                            <WrapperAnimation
                                                hover={{}}
                                                onClick={() => setPhone(item)}
                                                key={item.id}
                                                className={classNames(
                                                    'rounded-md shadow-primary px-5 py-2 w-full border capitalize text-sm cursor-pointer select-none flex gap-2 flex-col',
                                                    {
                                                        ['border-blue-primary']: phone && phone.id === item.id,
                                                        ['border-gray-primary']: !phone || phone.id !== item.id,
                                                    },
                                                )}
                                            >
                                                <span>{item.phone}</span>
                                                <p>{addressToString(item.address)}</p>
                                            </WrapperAnimation>
                                        );
                                    })}
                            </div>
                        </div>
                        <div className="capitalize flex-1 flex items-center gap-5">
                            <ul className=" flex flex-col gap-3">
                                {petAdopt &&
                                    Object.keys(petAdopt).map((item) => {
                                        const ingnorKeys = ['like', 'image', 'description', 'canAdopt', 'images', 'fosterDate'] as (keyof IPetDetail)[];

                                        if (!ingnorKeys.includes(item as keyof IPetDetail)) {
                                            return (
                                                <li key={item} className="flex items-center gap-3">
                                                    <span className="font-medium">{item}: </span> <p>{petAdopt[item as keyof IPetDetail]}</p>
                                                </li>
                                            );
                                        }
                                    })}
                            </ul>
                            <div className="w-[200px] h-[200px] overflow-hidden rounded">
                                <img className="w-full h-full object-cover" src={petAdopt?.image} alt={petAdopt?.image} />
                            </div>
                        </div>
                    </div>
                </div>
            </WraperDialog>

            {loading && <LoadingPrimary />}
        </BoxTitle>
    );
}
