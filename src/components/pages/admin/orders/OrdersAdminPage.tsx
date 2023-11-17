'use client';
import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getOrdersAdmin } from '@/apis/admin/orders';
import { HeadHistory } from '@/components/common';
import { faBoxesStacked, faChevronDown, faMagnifyingGlass, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { dataHeadHistory } from '@/datas/header';
import { BoxTitle, Comfirm, DialogDateChooser, RowStatusOrders, Table, TableRow, TextField, TippyChooser, WrapperAnimation } from '@/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import WraperDialog from '@/components/dialogs/WraperDialog';
import { Button, DialogActions, DialogContent, DialogTitle, Stack, TableCell, Typography, styled } from '@mui/material';
import { IRowStatusOrders } from '@/configs/interface';
export interface IOrdersAdminPageProps {}

const dataHeadTable = ['No', 'Order ID', 'User', 'Price', 'Placed Date', 'Status', 'Action'];
const dataPopup = [
    {
        id: '1',
        title: 'Price',
    },
    {
        id: '2',
        title: 'Date',
    },
    {
        id: '3',
        title: 'ID',
    },
];

interface IFillterForm {
    search: string;
    sort: string;
    dateStart: string;
    dateEnd: string;
    status: string;
}

const iniData = {
    search: '',
    sort: '',
    dateStart: '',
    dateEnd: '',
    status: '',
};

export default function OrdersAdminPage(props: IOrdersAdminPageProps) {
    const { data } = useQuery({
        queryKey: ['ordersAdminPage/get'],
        queryFn: () => getOrdersAdmin(),
    });

    // states
    const [anotherLayout, setAnotherLayout] = useState(false);
    const [filter, setFilter] = useState<IFillterForm>(iniData);
    const [deleteData, setDeleteData] = useState<IRowStatusOrders | null>(null);
    const [openComfirm, setOpenComfirm] = useState({ open: false, comfirm: 'cancel' });
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFilter({
            ...filter,
            search: e.target.value,
        });
    };

    const handleOpenConfirm = (data?: IRowStatusOrders) => {
        setOpenComfirm({ ...openComfirm, open: true });
        setDeleteData(data || null);
    };

    const handleComfirm = async (v: { open: boolean; comfirm: 'cancel' | 'ok' }) => {
        if (v.open || v.comfirm === 'cancel') return;

        // handleDelete();
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
            {!anotherLayout && <div dangerouslySetInnerHTML={{ __html: data }}></div>}
            {anotherLayout && (
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
                                        sort: sort.title,
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
                                status: tab.title,
                            });
                        }}
                        styles="outline"
                        iniData={dataHeadHistory}
                    />

                    <div className="rounded-xl overflow-hidden border border-gray-primary">
                        <Table dataHead={dataHeadTable}>
                            <RowStatusOrders
                                handleCacel={handleOpenConfirm}
                                index={1}
                                data={{
                                    id: 1,
                                    placedData: new Date().toUTCString(),
                                    price: 90000,
                                    status: 'cancelled',
                                    user: 'hantlpc04927',
                                }}
                            />
                            <RowStatusOrders
                                handleCacel={handleOpenConfirm}
                                index={1}
                                data={{
                                    id: 1,
                                    placedData: new Date().toUTCString(),
                                    price: 90000,
                                    status: 'placed',
                                    user: 'hantlpc04927',
                                }}
                            />
                            <RowStatusOrders
                                index={1}
                                data={{
                                    id: 1,
                                    placedData: new Date().toUTCString(),
                                    price: 90000,
                                    status: 'delivered',
                                    user: 'hantlpc04927',
                                }}
                            />
                        </Table>
                    </div>

                    <Comfirm
                        title={'Notification'}
                        subtitle={
                            <>
                                {'Are want to cancel order id #'} {<b>{deleteData?.id}</b>}
                            </>
                        }
                        open={openComfirm.open}
                        setOpen={setOpenComfirm}
                        onComfirm={handleComfirm}
                    />
                </BoxTitle>
            )}
        </div>
    );
}
