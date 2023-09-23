/* eslint-disable @next/next/no-img-element */
import { DivAnitmation } from '@/components';
import { aboutComData } from '@/datas/component-data';
import Image from 'next/image';
import * as React from 'react';

export interface IAboutComProps {}

export default function AboutCom(props: IAboutComProps) {
    return (
        <section className="px-10">
            <div className="bg-white w-full flex flex-col md:flex-row gap-10 lg:gap-[88px] items-center lg:w-main max-w-[100%] m-auto">
                <DivAnitmation className="md:w-[40%] w-full">
                    <img className="w-full h-full" src={`/images/${aboutComData.image}`} alt="about-com-img" />
                </DivAnitmation>

                <DivAnitmation delay={0.2} className="flex-1">
                    <p className="text-black-main text-[16px]">{aboutComData.contents}</p>
                </DivAnitmation>
            </div>
        </section>
    );
}
