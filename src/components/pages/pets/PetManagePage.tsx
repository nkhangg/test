'use client';
import { BoxTitle, Comfirm, LoadingSecondary, Pagination, RowListPet, Table, TippyChooser } from '@/components';
import { HeadHistory, SortAdmin } from '@/components/common';
import TableV2, { HeadItem } from '@/components/inputs/tables/TableV2';
import { dataHeadPet } from '@/datas/header';
import { links } from '@/datas/links';
import { Box } from '@mui/material';
import Link from 'next/link';
import React from 'react';

const dataHeadTable = [
    { title: 'No' },
    { title: 'ID', asc: 'id-asc', desc: 'id-desc' },
    { title: 'Name' },
    { title: 'Color', asc: 'name-asc', desc: 'name-desc' },
    { title: 'Size' },
    { title: 'Status' },
    { title: 'Foster At' },
    { title: 'Breed' },
    { title: 'Gender' },
    { title: 'Spay' },
];

export interface IPetManagePageProps {}

export default function PetManagePage(props: IPetManagePageProps) {
    return (
        <BoxTitle
            mt="mt-0"
            title="List Pet"
            actions={
                <Link className="text-violet-primary hover:underline" href={links.adminFuntionsLink.pets.create}>
                    Create
                </Link>
            }
        >
            <SortAdmin
                searchProps={{
                    value: '',
                }}
                sortProps={{
                    styles: {
                        minWidth: 'min-w-[160px]',
                    },
                    data: [],
                    title: 'Size',
                }}
                dateProps={{}}
            >
                <TippyChooser
                    styles={{
                        minWidth: 'min-w-[160px]',
                    }}
                    title="Color"
                    data={[]}
                />
            </SortAdmin>

            <HeadHistory styles="outline" iniData={dataHeadPet} />

            <div className="rounded-xl overflow-hidden border border-gray-primary relative">
                <TableV2
                    onSort={(value) => {
                        console.log(value);
                    }}
                    dataHead={dataHeadTable as HeadItem[]}
                >
                    <RowListPet index={1} page={'0'} data={{}} />
                </TableV2>
                {/* {dataOrders && dataOrders.orderFilters.length <= 0 && (
                                <div className="flex items-center justify-center py-5 text-violet-primary">
                                    <b>No data available</b>
                                </div>
                            )}

                            {isLoading && (
                                <div className="w-full h-full flex items-center justify-center absolute inset-0 bg-[rgba(0,0,0,0.04)]">
                                    <LoadingSecondary />
                                </div>
                            )} */}
            </div>

            {true && <Box mt={'-2%'}>{<Pagination baseHref={links.adminFuntionsLink.pets.index + '?page='} pages={10} />}</Box>}
        </BoxTitle>
    );
}
