import { BoxTitle, Pagination } from '@/components';
import { ContainerContent } from '@/components/common';
import { Breadcrumbs } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import OtherHistoryItem from './OtherHistoryItem';
import { dataOrtherHistory } from '@/datas/other-data';

export interface IOttherHistoryProps {}

export default function OttherHistoryPage(props: IOttherHistoryProps) {
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
                <div className="flex flex-col items-center gap-8">
                    {dataOrtherHistory.data.map((item) => {
                        return <OtherHistoryItem key={item.id} data={item} />;
                    })}
                </div>
                <Pagination pages={dataOrtherHistory.paginationTotal} />
            </BoxTitle>
        </>
    );
}
