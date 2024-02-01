'use client';
/* eslint-disable @next/next/no-img-element */
import { IAdoption } from '@/configs/interface';
import { LabelAdopt } from '@/configs/types';
import { faCat, faChevronCircleUp, faChevronUp, faFaceFrown, faHeart, faMars, faMaximize, faVenus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import moment from 'moment';
import { Nunito_Sans } from 'next/font/google';
import React, { useState } from 'react';

const nunito = Nunito_Sans({
    subsets: ['latin'],
    style: ['normal'],
    weight: ['500', '600'],
});

export interface IAdoptionPageItemProps {
    data: IAdoption;
}

const Label = ({ type }: { type: LabelAdopt }) => {
    return (
        <div
            className={classNames('capitalize py-1 px-3 text-xs md:py-2 md:px-5 rounded-full  md:text-sm text-black-main font-medium', {
                ['bg-adopted']: type === 'adopted',
                ['bg-register']: type === 'waiting',
                ['bg-cancelled']: ['Cancelled By Admin', 'Cancelled By Customer'].includes(type),
            })}
        >
            {type}
        </div>
    );
};

export default function AdoptionPageItem({ data }: IAdoptionPageItemProps) {
    const [loadmore, setLoadmore] = useState(false);

    return (
        <div className=" rounded-lg p-4 shadow-primary flex items-start gap-7 min-h-[100px] border border-gray-primary transition-all ease-linear">
            <div className="w-1/4 max-h-[180px] rounded-xl overflow-hidden hidden md:block hover:shadow-primary transition-all ease-linear ">
                <img className="w-full h-full object-cover hover:scale-110 transition-all ease-linear" src={data.pet.image} alt="a" />
            </div>
            <div className="flex-1 flex flex-col justify-between py-4 w-full h-full gap-3 relative">
                <div className="flex items-center justify-between">
                    <h4
                        className={classNames('text-lg font-bold', {
                            [nunito.className]: true,
                        })}
                    >
                        QianQian
                    </h4>

                    {!(['adopted', 'cancelled', 'cancelledByAdmin'] as LabelAdopt[]).includes(data.state as LabelAdopt) && (
                        <span className="w-1/4 text-center text-[15px] text-[#505DE8] hover:underline cursor-pointer">Cancel</span>
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
                        <Label type={data.state as LabelAdopt} />
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
                {data.reason && (
                    <div className="flex items-center gap-2 text-[#4C6B99] ">
                        <FontAwesomeIcon icon={faFaceFrown} />
                        {(() => {
                            const limit = 100;
                            const condition = data.reason.length >= limit;
                            return (
                                <>
                                    <span className="text-sm">
                                        {condition ? (!loadmore ? data.reason.slice(0, limit) : data.reason) : data.reason}
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
        </div>
    );
}
