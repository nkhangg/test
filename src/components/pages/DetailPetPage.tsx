'use client';
import * as React from 'react';
import { ContainerContent } from '../common';
import { MainButton, Pets, PreviewImage } from '..';
import { detailDataPets } from '@/datas/details';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, faBomb, faCat, faPalette, faPaw, faSitemap, faSyringe, faVenus } from '@fortawesome/free-solid-svg-icons';
import { capitalize } from '@/utils/format';
import { useQuery } from '@tanstack/react-query';
import { homePageData } from '@/datas/home-page';
import { petDetail } from '@/apis/pets';
import { notFound } from 'next/navigation';

export interface IDetailPetPageProps {
    params: [string, string];
}

const Li = ({ icon, title, content }: { icon: IconDefinition; title: string; content?: string }) => {
    return (
        <li className="flex items-center gap-4 w-full over">
            <div className="text-lg flex items-center gap-2">
                <FontAwesomeIcon className="" icon={icon} />
                <span>{title}:</span>
            </div>
            <p className="truncate">{content && capitalize(content)}</p>
        </li>
    );
};

export default function DetailPetPage({ params }: IDetailPetPageProps) {
    const { data, isLoading, error } = useQuery({
        queryKey: ['petDetail', params[0]],
        queryFn: () => petDetail(params[0]),
    });

    if (error) {
        notFound();
    }

    const detailData = data && data.data;

    return (
        <>
            <ContainerContent className="pt-24 pb-8">
                <div className="text-black-main">
                    <h2 className="uppercase font-bold text-4xl mb-11 pl-4 md:pl-14">pet details</h2>
                    <div className=" py-[30px] pr-4 pl-4 md:pl-14 rounded-[18px] shadow-primary">
                        <div className="w-full flex flex-col md:flex-row gap-10">
                            <PreviewImage images={detailData?.pet.images || []} />
                            <div className="w-full md:w-[40%] ">
                                <div className="text-[32px] font-bold text-green-dark-md uppercase pb-1 border-b border-gray-[#DBDBDB]">
                                    <h4>{detailData?.pet.name}</h4>
                                </div>
                                <ul className="mt-[22px] mb-10 flex flex-col gap-4">
                                    <Li icon={faCat} title="Type" content={detailData?.pet.type} />
                                    <Li icon={faPalette} title="Colors" content={detailData?.pet.color} />
                                    <Li icon={faVenus} title="Genther" content={detailData?.pet.sex} />
                                    <Li icon={faSitemap} title="Size" content={detailData?.pet.size} />
                                    {/* <Li icon={faBomb} title="Sterilization" content={detailData?.pet.sterilization} />
                                    <Li icon={faSyringe} title="Vaccination" content={detailData?.pet.vaccination} /> */}
                                    <li className="text-lg flex items-center gap-2 ">
                                        <FontAwesomeIcon className="" icon={faPaw} />
                                        <p className="truncate text-fill-heart">
                                            Mom and Dad, {"I've"} been waiting <b>{detailData?.pet.fosterDate}</b> days
                                        </p>
                                    </li>
                                </ul>
                                <div className="mt-10 flex items-center justify-center md:justify-start">
                                    <MainButton width={207} title="adopt" />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col pr-[58px] pt-8 gap-5">
                            <h6 className="text-2xl font-medium">Description</h6>
                            <p className="text-1xl">{detailData?.pet.description}</p>
                        </div>
                    </div>
                </div>
            </ContainerContent>
            <Pets
                bottom="none"
                heading={<h2 className="text-black-main text-left pb-[35px] text-4xl font-bold uppercase">Other Pet</h2>}
                background="bg-white"
                data={detailData?.orthers || []}
            />
        </>
    );
}
