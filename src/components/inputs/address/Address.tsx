'use client';
import React, { ChangeEvent, FocusEvent, memo, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getDistrichts, getProvinces, getWards } from '@/apis/outside';
import AddressItem from './AddressItem';
import { IDistrict, IProvinces, IWard } from '@/configs/interface';
import DivTextfield from '../DivTextfield';
import Validate from '@/utils/validate';

interface Address {
    province: IProvinces | undefined;
    district: IDistrict | undefined;
    ward: IWard | undefined;
}

interface AddressForm {
    province: string | undefined;
    district: string | undefined;
    ward: string | undefined;
    address: string | undefined;
}

export interface IAddressProps {
    onValidate?: (validateFuc: () => boolean) => void;
    onAddress?: (values: AddressForm) => void;
    initData?: AddressForm;
}

function Address({
    initData = {
        province: '',
        district: '',
        ward: '',
        address: '',
    },
    onValidate,
    onAddress,
}: IAddressProps) {
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

    const [form, setForm] = useState<AddressForm>(initData);
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

    // use effects

    useEffect(() => {
        // setForm({ ...initData });
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
        <div className="flex flex-col justify-between gap-2 w-full">
            <div className="flex flex-col gap-10">
                <AddressItem
                    onValidate={(validFuc) => {
                        validFucs.province = validFuc;
                    }}
                    name="province"
                    initData={initData && initData.province}
                    title="Province"
                    onValue={async (value) => {
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
                            setWards(null);
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
                    placeholder="Your province"
                />
                <AddressItem
                    onValidate={(validFuc) => {
                        validFucs.districh = validFuc;
                    }}
                    name="district"
                    initData={initData && initData.district}
                    title="District"
                    messageUndefined="Please choose your province"
                    onValue={async (value) => {
                        setAddress({
                            ...address,
                            ward: undefined,
                            district: value as IDistrict,
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
                    placeholder="Your district"
                />
                <AddressItem
                    onValidate={(validFuc) => {
                        validFucs.ward = validFuc;
                    }}
                    name="ward"
                    initData={initData && initData.ward}
                    title="Ward"
                    messageUndefined="Please choose your district"
                    onValue={(value) => {
                        setAddress({
                            ...address,
                            ward: value as IWard,
                        });
                    }}
                    data={wards}
                    placeholder="Your ward"
                />

                <DivTextfield
                    propsInput={{
                        name: 'address',
                        autoComplete: 'address',
                        onChange: handleChange,
                        onBlur: handleBlur,
                        placeholder: 'Your address',
                        value: form.address,
                        message: error,
                    }}
                    label="Address"
                />
            </div>
        </div>
    );
}
export default memo(Address);
