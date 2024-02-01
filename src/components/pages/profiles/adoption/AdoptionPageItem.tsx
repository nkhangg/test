'use client';
import { cancelAdoptionPet } from '@/apis/pets';
import { MiniLoading, WrapperAnimation } from '@/components';
import WraperDialog from '@/components/dialogs/WraperDialog';
/* eslint-disable @next/next/no-img-element */
import { IAdoption } from '@/configs/interface';
import { LabelAdopt } from '@/configs/types';
import { contants } from '@/utils/contants';
import { faCat, faChevronUp, faFaceFrown, faHeart, faMars, faMaximize, faVenus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import moment from 'moment';
import { Nunito_Sans } from 'next/font/google';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const nunito = Nunito_Sans({
    subsets: ['latin'],
    style: ['normal'],
    weight: ['500', '600'],
});

export interface IAdoptionPageItemProps {
    data: IAdoption;
}

const Label = ({ type }: { type: LabelAdopt }) => {
    const cancelArr = ['cancelled by admin', 'cancelled by customer'];
    return (
        <div
            className={classNames('capitalize py-1 px-3 text-xs md:py-2 md:px-5 rounded-full  md:text-sm text-black-main font-medium', {
                ['bg-adopted']: type.toLocaleLowerCase() === 'adopted',
                ['bg-register']: type.toLocaleLowerCase() === 'waiting',
                ['bg-cancelled']: cancelArr.includes(type.toLocaleLowerCase()),
            })}
        >
            {cancelArr.includes(type.toLocaleLowerCase()) ? 'Cancel' : type}
        </div>
    );
};

export default function AdoptionPageItem({ data }: IAdoptionPageItemProps) {
    const [loadmore, setLoadmore] = useState(false);
    const [loading, setLoading] = useState(false);

    const [types, setTypes] = useState<LabelAdopt>(data.state.toLowerCase() as LabelAdopt);

    const [openModal, setOpenModal] = useState(false);

    const handleCancel = async () => {
        try {
            setLoading(true);
            const response = await cancelAdoptionPet(data.id + '');

            if (!response || response.errors) {
                return toast.warn(response.message);
            }

            toast.success('Cancellation successful');
            requestIdleCallback(handleClearWhenSuccess);
        } catch (error) {
            return toast.error(contants.messages.errors.server);
        } finally {
            setLoading(false);
        }
    };

    const handleClearWhenSuccess = () => {
        setOpenModal(false);
        setTypes('cancelled by customer');
    };

    return (
        <div className="relative overflow-hidden rounded-lg p-4 shadow-primary flex items-start gap-7 min-h-[100px] border border-gray-primary transition-all ease-linear w-full">
            <div className="w-1/4 max-h-[180px] rounded-xl overflow-hidden hidden md:block hover:shadow-primary transition-all ease-linear ">
                <img className="w-full h-full object-cover hover:scale-110 transition-all ease-linear" src={data.pet.image} alt={data.pet.image} />
            </div>
            <div className="flex-1 flex flex-col justify-between py-4 w-full h-full gap-3 relative">
                <div className="flex items-center justify-between">
                    <h4
                        className={classNames('text-lg font-bold capitalize', {
                            [nunito.className]: true,
                        })}
                    >
                        {data.pet.name}
                    </h4>

                    {!(['adopted', 'cancelled', 'cancelled by admin', 'cancelled by customer'] as LabelAdopt[]).includes(types) && (
                        <span onClick={() => setOpenModal(true)} className="w-1/4 text-center text-[15px] text-[#505DE8] hover:underline cursor-pointer">
                            Cancel
                        </span>
                    )}
                </div>
                <ul className="flex items-center gap-7 text-black-main">
                    <li className="flex items-center gap-1 text-[#727272]">
                        <span className="flex items-center justify-center ">
                            <FontAwesomeIcon className="" icon={faCat} />
                        </span>
                        <span className="hidden md:inline-block capitalize">{data.pet.type}</span>
                    </li>
                    <li className="flex items-center gap-1 text-[#727272]">
                        <span className="flex items-center justify-center ">
                            <FontAwesomeIcon className="" icon={data.pet.sex === 'male' ? faMars : faVenus} />
                        </span>
                        <span className="hidden md:inline-block capitalize">{data.pet.sex}</span>
                    </li>
                    <li className="flex items-center gap-1 text-[#727272]">
                        <span className="flex items-center justify-center ">
                            <FontAwesomeIcon className="" icon={faMaximize} />
                        </span>
                        <span className="hidden md:inline-block capitalize">{data.pet.size}</span>
                    </li>
                </ul>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Label type={types} />
                        <span className="text-sm text-[#727272]">{moment(new Date()).format('MMM Do YY')}</span>
                    </div>
                    <div className="w-1/4 flex items-center justify-center">
                        <FontAwesomeIcon
                            className={classNames('', {
                                ['text-fill-heart']: data.pet.like,
                                ['text-inherit']: !data.pet.like,
                            })}
                            icon={faHeart}
                        />
                    </div>
                </div>
                {data.cancelReason && (
                    <div className="flex items-center gap-2 text-[#4C6B99] ">
                        <FontAwesomeIcon icon={faFaceFrown} />
                        {(() => {
                            const limit = 100;
                            const condition = data.cancelReason.length >= limit;
                            return (
                                <>
                                    <span className="text-sm">
                                        {condition ? (!loadmore ? data.cancelReason.slice(0, limit) : data.cancelReason) : data.cancelReason}
                                        {condition && !loadmore && (
                                            <span className="hover:underline text-blue-primary cursor-pointer ml-1" onClick={() => setLoadmore(true)}>
                                                load more
                                            </span>
                                        )}
                                    </span>
                                </>
                            );
                        })()}
                    </div>
                )}

                {loadmore && (
                    <div className=" hover:text-blue-primary cursor-pointer text-center absolute -bottom-[8%] right-[50%]" onClick={() => setLoadmore(false)}>
                        <FontAwesomeIcon className="p-2" icon={faChevronUp} />
                    </div>
                )}
            </div>

            <WraperDialog open={openModal} setOpen={setOpenModal}>
                <div className="p-6 flex flex-col gap-4 text-black-main">
                    <span className="break-all max-w-[80%]">
                        Do you really want to cancel your adoption registration for <b className="capitalize">{data.pet.name}</b>?
                    </span>
                    <div className="flex items-center justify-end text-sm gap-5">
                        <WrapperAnimation
                            onClick={() => setOpenModal(false)}
                            hover={{}}
                            className="py-2 px-6 rounded-full hover:bg-[rgba(0,0,0,.2)] transition-all ease-linear cursor-pointer hover:text-white"
                        >
                            Cancel
                        </WrapperAnimation>
                        <WrapperAnimation
                            onClick={handleCancel}
                            hover={{}}
                            className="py-2 px-6 rounded-full hover:bg-[rgba(0,0,0,.2)] transition-all ease-linear cursor-pointer hover:text-white text-red-primary"
                        >
                            Cancel registration
                        </WrapperAnimation>
                    </div>
                </div>
            </WraperDialog>

            {loading && (
                <div className="absolute inset-0 bg-black-040 flex items-center justify-center">
                    <MiniLoading />
                </div>
            )}
        </div>
    );
}
