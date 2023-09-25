'use client';
import React, { useState } from 'react';
import { ContainerContent, Sort } from '../common';
import { dataTakeAction } from '@/datas/take-action';
import { SortType } from '@/configs/types';
import { MenuDropDown, Pagination, Pet } from '..';

export interface ITakeActionPageProps {}

export default function TakeActionPage({}: ITakeActionPageProps) {
    return (
        <ContainerContent className="">
            <Sort
                categories={dataTakeAction.categories}
                sorts={dataTakeAction.sorts}
                onCategories={(value: SortType) => {
                    console.log(value);
                }}
                onSorts={(value: SortType) => {
                    console.log(value);
                }}
                onSearch={(value: string) => {
                    console.log(value);
                }}
            />

            <div className="flex md:flex-row flex-col justify-between min-h-[1000px] mt-9 gap-[38px]">
                <div className="w-full md:w-[24%] lg:w-[20%] h-full text-black-main select-none">
                    <div className="py-5 w-full border-b border-gray-primary">
                        <h6 className="font-medium text-xl">Filter</h6>
                    </div>
                    <MenuDropDown
                        onValues={(colors: string[]) => {
                            console.log(colors);
                        }}
                        title={'Color'}
                        data={dataTakeAction.fillters.colors}
                    />
                    <MenuDropDown
                        onValues={(ages: string[]) => {
                            console.log(ages);
                        }}
                        title={'Age'}
                        data={dataTakeAction.fillters.ages}
                    />
                    <MenuDropDown
                        onValues={(genthers: string[]) => {
                            console.log(genthers);
                        }}
                        title={'Genther'}
                        data={dataTakeAction.fillters.genthers}
                    />
                </div>
                <div className="flex-1 flex flex-col items-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px] gap-y-9">
                        {dataTakeAction.pets.map((pet) => {
                            return <Pet key={pet.id} data={pet} />;
                        })}
                    </div>
                    <Pagination
                        onPage={(page: number) => {
                            console.log(page);
                        }}
                        pages={100}
                    />
                </div>
            </div>
        </ContainerContent>
    );
}
