'use client';
import { RowListTransaction, TableV2 } from '@/components';
import { HeadItem } from '@/components/inputs/tables/TableV2';
import { donationMethod } from '@/datas/donation';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React, { useMemo } from 'react';
import { BaseBreadcrumbs } from '../common';
import { links } from '@/datas/links';
import { notFound, useRouter, useSearchParams } from 'next/navigation';
import { getTransaction } from '@/apis/transaction';

export interface IDonationPageProps {}

const dataHeadTable = [{ title: 'No' }, { title: 'Beneficiary bank' }, { title: 'To account number' }, { title: 'From account number' }, { title: 'When' }, { title: 'Amout' }];

export default function DonationPage(props: IDonationPageProps) {
    const baseUrl = links.pets.adoptPage;
    const searchParams = useSearchParams();

    const router = useRouter();

    const page = searchParams.get('page');

    const rawData = useQuery({
        queryKey: ['donationPage', page],
        queryFn: () => getTransaction(),
    });

    if (rawData.isError) {
        notFound();
    }

    const data = useMemo(() => {
        if (!rawData.data?.data.records) return [];

        return rawData.data?.data.records;
    }, [rawData]);

    return (
        <BaseBreadcrumbs
            isLoading={rawData.isLoading}
            title="ORDER DETAIL"
            breadcrumb={[
                {
                    title: 'donation',
                    href: links.donation,
                },
            ]}
        >
            <div className="flex gap-10">
                <div className="w-3/4">
                    <TableV2 dataHead={dataHeadTable as HeadItem[]}>
                        {data.map((item, index) => {
                            return <RowListTransaction key={item.id} page={page} index={index} data={item} />;
                        })}
                    </TableV2>
                </div>
                <ul className="flex flex-col gap-5 flex-1">
                    {donationMethod.map((item) => {
                        return (
                            <li key={item.image} className="grid grid-cols-2 gap-2 items-center">
                                <div className="relative w-[50%] h-[96px]">
                                    <Image fill src={item.image} className="object-contain" alt="tp-bank" />
                                </div>
                                <div className="text-1xl text-black-main flex-1">
                                    <span>{item.name}</span>
                                    <p className="mt-1">{item.bankNumber}</p>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </BaseBreadcrumbs>
    );
}
