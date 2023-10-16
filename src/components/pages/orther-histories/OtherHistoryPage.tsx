'use client';
import { BoxTitle, LoadingPrimary, LoadingSecondary, Pagination } from '@/components';
import { ContainerContent } from '@/components/common';
import { Breadcrumbs, CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React, { useCallback } from 'react';
import OtherHistoryItem from './OtherHistoryItem';
import { dataOrtherHistory } from '@/datas/other-data';
import { otherHistory } from '@/apis/app';
import { useRouter, useSearchParams } from 'next/navigation';
export interface IOttherHistoryProps {}
export default function OttherHistoryPage(props: IOttherHistoryProps) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const page = searchParams.get('page');

    const { data, isLoading, error } = useQuery({
        queryKey: ['histories', page],
        queryFn: () => otherHistory(page ? parseInt(page) - 1 : undefined),
    });

    if (error) {
        router.push('/login');
        return;
    }

    return (
        <>
            <ContainerContent className="pt-12">
                <div role="presentation">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link className="hover:underline" href="/">
                            Home
                        </Link>
                        <Link className="text-black-main hover:underline " href="/other-history">
                            Other History
                        </Link>
                    </Breadcrumbs>
                </div>
            </ContainerContent>
            <BoxTitle mt="mt-[46px]" title="MY ORDERS" fontWeigth="font-semibold" underlineTitle locationTitle="left" fontSizeTitle="text-[32px]">
                {data?.data && !isLoading && (
                    <>
                        <div className="flex flex-col items-center gap-8">
                            {data?.data?.data.map((item) => {
                                return <OtherHistoryItem key={item.id} data={item} />;
                            })}
                        </div>
                        <Pagination
                            baseHref="/other-history?page="
                            onPage={(page) => {
                                // router.push('other-history?page=' + page - 1);
                            }}
                            pages={data.data.pages}
                        />
                    </>
                )}

                {isLoading && <LoadingSecondary />}
            </BoxTitle>
        </>
    );
}
