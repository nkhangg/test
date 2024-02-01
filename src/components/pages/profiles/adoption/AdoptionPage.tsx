'use client';
import React from 'react';
import AdoptionPageItem from './AdoptionPageItem';
import { BaseProfilePage } from '../../common';
import { LoadingSecondary } from '@/components';
import { useInfinities } from '@/hooks';

export interface IAdoptionPageProps {}

export default function AdoptionPage(props: IAdoptionPageProps) {
    const { lastDataRef, loading, data } = useInfinities();
    return (
        <BaseProfilePage title="MY PETS">
            <div className="py-5 flex items-center flex-col gap-3">
                {data.map((item, index) => {
                    return (
                        <div key={index} ref={data.length - 1 === index ? lastDataRef : null}>
                            <AdoptionPageItem
                                data={{
                                    id: 1,
                                    state: 'adopted',
                                    user: {
                                        id: 'af1afb34-9e4a-49fd-8faa-9f3a59f74843',
                                        username: 'khangpn1',
                                        fullname: 'Phạm Nhứt Khang',
                                        birthday: '2003-05-13T17:00:00.000+00:00',
                                        gender: true,
                                        phone: '0344507491',
                                        email: 'phamnhatkhang.hgi1167+11@gmail.com',
                                        avatar: 'http://localhost:8019/images/5bdd76f6-4074-4d19-8edd-f53e31dc628c.jpg',
                                        role: 'ROLE_USER',
                                        displayName: 'khangpn1',
                                        provider: 'local',
                                        createAt: '2024-01-16T11:55:01.525+00:00',
                                        address: '',
                                    },
                                    pet: {
                                        id: 'P0001',
                                        breed: 'Tabby cat',
                                        name: 'Mimi',
                                        image: 'https://i.pinimg.com/564x/77/63/d6/7763d6afb4486db671af6ffe472c16bc.jpg',
                                        description: 'The dog was hit by a car, broke his leg, and lost his eye for 2-3 days at an intersection',
                                        fostered: '05/10/2023',
                                        size: 'Adult ',
                                        sex: 'male',
                                        type: 'Cat',
                                        fosterDate: 116,
                                        like: false,
                                    },
                                    registerAt: '11/01/2023',
                                    adoptAt: '11/02/2024',
                                    reason: 'Lorem, ipsum dolor sit amet consectetur adipisicing el',
                                }}
                            />
                        </div>
                    );
                })}
                <div className="flex items-center justify-center mt-8">{loading && <LoadingSecondary />}</div>
            </div>
        </BaseProfilePage>
    );
}
