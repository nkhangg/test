'use client';
import React, { ChangeEvent, createContext, useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getOrdersAdminWithFilter } from '@/apis/admin/orders';
import { HeadHistory, SortAdmin } from '@/components/common';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { dataHeadHistory } from '@/datas/header';
import {
    BoxTitle,
    Comfirm,
    DialogDateChooser,
    LoadingPrimary,
    LoadingSecondary,
    Pagination,
    RowStatusOrders,
    SearchInput,
    Table,
    TippyChooser,
    UpdateStateOrderDialog,
} from '@/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IOrderAdminFillterForm, IRowStatusOrders } from '@/configs/interface';
import ThymeleafTable from './ThymeleafTable';
import { useRouter, useSearchParams } from 'next/navigation';
import { StateType } from '@/configs/types';
import { useDebounce } from '@/hooks';
import { Box } from '@mui/material';
export interface IOrdersAdminPageProps {}

const dataHeadTable = ['No', 'Order ID', 'User', 'Total', 'Placed Date', 'Status', 'Action'];
const dataPopup = [
    {
        id: 'id-desc',
        title: 'Id desc',
    },
    {
        id: 'id-asc',
        title: 'Id asc',
    },
    {
        id: 'total-desc',
        title: 'Total desc',
    },
    {
        id: 'total-asc',
        title: 'Total asc',
    },

    {
        id: 'date-desc',
        title: 'Date desc',
    },
    {
        id: 'date-asc',
        title: 'Date asc',
    },
];

const iniData = {
    search: '',
    sort: '',
    dateStart: '',
    dateEnd: '',
    status: '',
};

type OrderAdminPageContextType = {
    refetch: () => void;
};

export const OrderAdminPageContext = createContext<OrderAdminPageContextType>({ refetch: () => {} });

export default function OrdersAdminPage(props: IOrdersAdminPageProps) {
    // router
    const router = useRouter();

    // params
    const searchParams = useSearchParams();
    const page = searchParams.get('page');

    // context

    const parentContext = useContext(OrderAdminPageContext);

    // states
    const [open, setOpen] = useState(false);
    const [anotherLayout, setAnotherLayout] = useState(true);
    const [filter, setFilter] = useState<IOrderAdminFillterForm>(iniData);

    const [dataOpen, setDataOpen] = useState<number>(0);

    const searDebounce = useDebounce(filter.search, 500);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFilter({
            ...filter,
            search: e.target.value,
        });
    };

    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ['ordersAdminPage/getOrdersAdminWithFilter', page, { ...filter, search: searDebounce }],
        queryFn: () => getOrdersAdminWithFilter({ ...filter, search: searDebounce }, page),
    });

    if (error) {
        router.back();
        return;
    }

    const dataOrders = data?.data;

    const handleOpen = (data: IRowStatusOrders) => {
        setDataOpen(data.id);
        setOpen(true);
    };

    return (
        <div className="">
            {
                <div className="py-2 text-right w-full">
                    <span onClick={() => setAnotherLayout(!anotherLayout)} className="hover:underline text-violet-primary cursor-pointer">
                        Other Layout
                    </span>
                </div>
            }
            {!anotherLayout && <ThymeleafTable />}
            {anotherLayout && (
                <OrderAdminPageContext.Provider value={{ refetch }}>
                    <BoxTitle mt="mt-0" mbUnderline="mb-0" border={false} title="ORDER MANAGEMENT" className="">
                        <SortAdmin
                            searchProps={{
                                handleClose: () => setFilter({ ...filter, search: '' }),
                                handleChange: handleChange,
                                value: filter.search,
                            }}
                            sortProps={{
                                onValue: (sort) => {
                                    console.log(sort);
                                    setFilter({
                                        ...filter,
                                        sort: sort.id,
                                    });
                                },
                                data: dataPopup,
                                title: 'Sort by',
                            }}
                            dateProps={{
                                onDatas: (dates) => {
                                    if (!dates) return;

                                    setFilter({
                                        ...filter,
                                        dateStart: dates.start || '',
                                        dateEnd: dates.end || '',
                                    });
                                },
                            }}
                        />
                        <HeadHistory
                            onTab={(tab) => {
                                setFilter({
                                    ...filter,
                                    status: tab.title === 'All order' ? '' : tab.title,
                                });
                            }}
                            styles="outline"
                            iniData={dataHeadHistory}
                        />

                        <div className="rounded-xl overflow-hidden border border-gray-primary relative">
                            {dataOrders && (
                                <Table dataHead={dataHeadTable}>
                                    {dataOrders.orderFilters.length > 0 &&
                                        dataOrders.orderFilters.map((order, index) => {
                                            const status = order.status.toLowerCase().trim().replaceAll(' ', '_') as StateType;
                                            return (
                                                <RowStatusOrders
                                                    page={page}
                                                    key={order.orderId}
                                                    handleOpen={handleOpen}
                                                    index={index}
                                                    data={{
                                                        id: order.orderId,
                                                        placedData: order.placedDate,
                                                        price: order.total,
                                                        status: status,
                                                        user: order.username,
                                                    }}
                                                />
                                            );
                                        })}
                                </Table>
                            )}
                            {dataOrders && dataOrders.orderFilters.length <= 0 && (
                                <div className="flex items-center justify-center py-5 text-violet-primary">
                                    <b>No data available</b>
                                </div>
                            )}

                            {isLoading && (
                                <div className="w-full h-full flex items-center justify-center absolute inset-0 bg-[rgba(0,0,0,0.04)]">
                                    <LoadingSecondary />
                                </div>
                            )}
                        </div>

                        {dataOrders && <Box mt={'-2%'}>{<Pagination baseHref="/admin/dashboard/orders?page=" pages={dataOrders.pages} />}</Box>}
                    </BoxTitle>
                    {dataOpen ? <UpdateStateOrderDialog idOpen={dataOpen} open={open} setOpen={setOpen} /> : <span></span>}
                </OrderAdminPageContext.Provider>
            )}
        </div>
    );
}
