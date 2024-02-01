'use client';
import React from 'react';
import AdoptionPageItem from './AdoptionPageItem';
import { BaseProfilePage } from '../../common';
import { LoadingSecondary } from '@/components';
import { useInfinities } from '@/hooks';
import { getAdoptions } from '@/apis/pets';

export interface IAdoptionPageProps {}

export default function AdoptionPage(props: IAdoptionPageProps) {
    const { lastDataRef, loading, data } = useInfinities({
        queryFN: getAdoptions,
    });
    return (
        <BaseProfilePage title="MY PETS">
            <div className="py-5 flex items-center flex-col gap-3">
                {data.map((item, index) => {
                    return (
                        <div className="w-full" key={item.id} ref={data.length - 1 === index ? lastDataRef : null}>
                            <AdoptionPageItem data={item} />
                        </div>
                    );
                })}
                <div className="flex items-center justify-center mt-8">{loading && <LoadingSecondary />}</div>
            </div>
        </BaseProfilePage>
    );
}
