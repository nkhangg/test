import React, { ReactNode } from 'react';
import { ContainerContent } from '../common';
import { IPet } from '@/configs/interface';
import { MainButton, Pet } from '..';

type bottomStyle = 'load-more' | 'pagination';

export interface IPetsProps {
    data: IPet[];
    heading?: ReactNode;
    bottom?: bottomStyle;
}

export default function Pets({ data, heading, bottom = 'load-more' }: IPetsProps) {
    return (
        <ContainerContent classNameContainer="bg-[#F5FAFF] mt-[30px] pt-[50px]">
            {heading ? heading : <h2 className="text-black-main text-center pb-[35px] text-4xl font-medium">RECENTLY FOSTER</h2>}

            <div className="w-full grid md:grid-cols-3 lg:grid-cols-4 gap-[20px] gap-y-9">
                {data.map((pet) => {
                    return <Pet key={pet.id} data={pet} />;
                })}
            </div>
            {bottom === 'load-more' && (
                <div className="flex items-center justify-center w-full">
                    <MainButton title="load more" className="my-11" />
                </div>
            )}
        </ContainerContent>
    );
}
