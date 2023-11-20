'use client';
import React, { ChangeEvent, createContext, useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getOrdersAdminWithFilter } from '@/apis/admin/orders';
import { HeadHistory } from '@/components/common';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { dataHeadHistory } from '@/datas/header';
import { BoxTitle, Comfirm, DialogDateChooser, LoadingPrimary, LoadingSecondary, RowStatusOrders, Table, TippyChooser, UpdateStateOrderDialog } from '@/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IOrderAdminFillterForm, IRowStatusOrders } from '@/configs/interface';
import ThymeleafTable from './ThymeleafTable';
import { useRouter } from 'next/navigation';
import { StateType } from '@/configs/types';
import { useDebounce } from '@/hooks';
export interface IOrdersAdminPageProps {}

const dataHeadTable = ['No', 'Order ID', 'User', 'Price', 'Placed Date', 'Status', 'Action'];
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

    // context

    const parentContext = useContext(OrderAdminPageContext);

    // states
    const [open, setOpen] = useState(false);
    const [anotherLayout, setAnotherLayout] = useState(false);
    const [filter, setFilter] = useState<IOrderAdminFillterForm>(iniData);

    const [dataOpen, setDataOpen] = useState<number>(0);

    const [deleteData, setDeleteData] = useState<IRowStatusOrders | null>(null);
    const [openComfirm, setOpenComfirm] = useState({ open: false, comfirm: 'cancel' });

    const searDebounce = useDebounce(filter.search, 500);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFilter({
            ...filter,
            search: e.target.value,
        });
    };

    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ['ordersAdminPage/getOrdersAdminWithFilter', { ...filter, search: searDebounce }],
        queryFn: () => getOrdersAdminWithFilter({ ...filter, search: searDebounce }),
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
            {!anotherLayout && (
                <div className="py-2 text-right w-full">
                    <span onClick={() => setAnotherLayout(true)} className="hover:underline text-violet-primary cursor-pointer">
                        Other Layout
                    </span>
                </div>
            )}
            {!anotherLayout && <ThymeleafTable />}
            {anotherLayout && (
                <OrderAdminPageContext.Provider value={{ refetch }}>
                    <BoxTitle mt="mt-0" mbUnderline="mb-0" border={false} title="ORDER MANAGEMENT" className="">
                        <div className="flex items-center justify-between text-1xl mb-10 w-full">
                            <div className="flex items-center gap-5 md:gap-10">
                                <div className="flex items-center border border-gray-primary rounded py-2 px-4">
                                    <input name="search" onChange={handleChange} className="flex-1 outline-none mr-2" placeholder="Search for" type="text" />
                                    <FontAwesomeIcon className="text-[#A4A4A4]" icon={faMagnifyingGlass} />
                                </div>

                                <TippyChooser
                                    onValue={(sort) => {
                                        console.log(sort);
                                        setFilter({
                                            ...filter,
                                            sort: sort.id,
                                        });
                                    }}
                                    data={dataPopup}
                                    title="Sort by"
                                />
                            </div>

                            <DialogDateChooser
                                onDatas={(dates) => {
                                    if (!dates) return;

                                    setFilter({
                                        ...filter,
                                        dateStart: dates.start || '',
                                        dateEnd: dates.end || '',
                                    });
                                }}
                            />
                        </div>
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
                                    {dataOrders.length > 0 &&
                                        dataOrders.map((order, index) => {
                                            const status = order.status.toLowerCase() as StateType;
                                            return (
                                                <RowStatusOrders
                                                    key={order.orderId}
                                                    handleOpen={handleOpen}
                                                    index={index + 1}
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
                            {dataOrders && dataOrders.length <= 0 && (
                                <div className="flex items-center justify-center py-5 text-violet-primary">
                                    <b>No suitable data found</b>
                                </div>
                            )}

                            {isLoading && (
                                <div className="w-full h-full flex items-center justify-center absolute inset-0 bg-[rgba(0,0,0,0.04)]">
                                    <LoadingSecondary />
                                </div>
                            )}
                        </div>

                        {dataOpen ? <UpdateStateOrderDialog idOpen={dataOpen} open={open} setOpen={setOpen} /> : <span></span>}
                    </BoxTitle>
                </OrderAdminPageContext.Provider>
            )}
        </div>
    );
}
