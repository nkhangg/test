'use client';
import React, { ChangeEvent, FocusEvent, createContext, memo, useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getDistrichts, getProvinces, getWards } from '@/apis/outside';
import AddressItem from './AddressItem';
import { IAddress, IDistrict, IProvinces, IWard } from '@/configs/interface';
import Validate from '@/utils/validate';
import AddressTippy from './AddressTippy';
import TextField from '../TextField';

export interface Address {
    province: IProvinces | undefined;
    district: IDistrict | undefined;
    ward: IWard | undefined;
}

export interface IAddressProps {
    onValidate?: (validateFuc: () => boolean) => void;
    onAddress?: (values: IAddress) => void;
    initData?: IAddress;
}

function Address({ initData, onValidate, onAddress }: IAddressProps) {
    //use Query
    const { data, isLoading } = useQuery({
        queryKey: ['getProvinces'],
        queryFn: () => getProvinces(),
    });

    // variables
    const validFucs = {
        province: () => false,
        districh: () => false,
        ward: () => false,
    };

    // states

    const [address, setAddress] = useState<Address>({
        province: undefined,
        district: undefined,
        ward: undefined,
    });

    const [form, setForm] = useState<IAddress>(
        initData || {
            province: '',
            district: '',
            ward: '',
            address: '',
        },
    );

    const [districhs, setDistrichs] = useState<IDistrict[] | undefined | null>(undefined);
    const [wards, setWards] = useState<IWard[] | undefined | null>(undefined);

    const [error, setError] = useState('');

    // functions and handle events

    const validate = (initData: string | undefined) => {
        const { error, message } = Validate.address(initData || '');
        setError(message);

        return error;
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        validate(e.target.value);
    };

    const validateAll = () => {
        const validError: boolean[] = [];
        const value = validate(form.address);
        validError.push(value);

        Object.values(validFucs).forEach((func) => {
            const value = func();
            validError.push(value);
        });

        return validError.some((item) => item);
    };

    const handleClearForm = () => {
        setForm({
            province: '',
            district: '',
            ward: '',
            address: '',
        });
    };

    // use effects

    useEffect(() => {
        if (!initData) return;
        setForm(initData);
    }, [initData]);

    useEffect(() => {
        setForm({
            ...form,
            province: address.province?.name || '',
            district: address.district?.name || '',
            ward: address.ward?.name || '',
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address]);

    useEffect(() => {
        if (!onValidate) return;

        onValidate(validateAll);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [validateAll]);

    useEffect(() => {
        if (!onAddress) return;

        onAddress(form);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form]);

    return (
        <div className="flex flex-col justify-between gap-[26px] w-full">
            <div className="flex md:flex-row flex-col items-center justify-between gap-5">
                <AddressTippy
                    onValidate={(validFuc) => {
                        validFucs.province = validFuc;
                    }}
                    name="province"
                    initData={initData && initData.province}
                    onValue={async (value) => {
                        console.log(value);
                        setAddress({
                            ...address,
                            province: value as IProvinces,
                            district: undefined,
                            ward: undefined,
                        });

                        if (!value) {
                            setDistrichs(null);
                            setWards(null);
                            return;
                        }

                        try {
                            const response = await getDistrichts(value.code);

                            setDistrichs(null);
                            // setWards(null);
                            if (response) {
                                setDistrichs(response.districts);
                                return;
                            }

                            setDistrichs(null);
                            setWards(null);
                        } catch (error) {
                            console.log(error);
                        }
                    }}
                    data={data}
                    label="Province"
                />
                <AddressTippy
                    onValidate={(validFuc) => {
                        validFucs.districh = validFuc;
                    }}
                    name="district"
                    initData={initData && initData.district}
                    messageUndefined="Please choose your province"
                    onValue={async (value) => {
                        setAddress({
                            ...address,
                            district: value as IDistrict,
                            ward: undefined,
                        });

                        if (!value) {
                            setWards(null);
                            return;
                        }

                        try {
                            const response = await getWards(value.code);

                            setWards(null);
                            if (response) {
                                setWards(response.wards);
                                return;
                            }
                            setWards(null);
                        } catch (error) {
                            console.log(error);
                        }
                    }}
                    data={districhs}
                    label="District"
                />
                <AddressTippy
                    onValidate={(validFuc) => {
                        validFucs.ward = validFuc;
                    }}
                    name="ward"
                    initData={initData && initData.ward}
                    messageUndefined="Please choose your district"
                    onValue={(value) => {
                        setAddress({
                            ...address,
                            ward: value as IWard,
                        });
                    }}
                    data={wards}
                    label="Ward"
                />
            </div>

            <TextField name="address" onChange={handleChange} onBlur={handleBlur} autoComplete="address" value={form.address} message={error} size="small" label={'Address'} />
        </div>
    );
}
export default memo(Address);
