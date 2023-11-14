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
import { BaseBreadcrumbs } from '../common';
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
            <BaseBreadcrumbs
                title="MY ORDERS"
                isLoading={isLoading}
                breadcrumb={[
                    {
                        title: 'Order History',
                        href: '/other-history',
                    },
                ]}
            >
                {data?.data && data.data.data && data.data.data.length > 0 && !isLoading && (
                    <>
                        <div className="flex flex-col items-center gap-8">
                            {data?.data?.data.map((item) => {
                                return <OtherHistoryItem key={item.id} data={item} />;
                            })}
                        </div>
                        <Pagination baseHref="/other-history?page=" pages={data.data.pages} />
                    </>
                )}
                {data?.data && (
                    <div className="flex items-center justify-center py-10">
                        <p className="flex items-center gap-1">
                            You have not purchased any products yet,{' '}
                            <Link href={'/take-action'} className="hover:underline text-violet-primary cursor-pointer font-medium">
                                shoping now
                            </Link>
                        </p>
                    </div>
                )}
            </BaseBreadcrumbs>
        </>
    );
}
