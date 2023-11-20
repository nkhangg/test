'use client';
import { BoxTitle, DialogDateChooser, Table, TippyChooser } from '@/components';
import { HeadHistory } from '@/components/common';
import { IOrderAdminFillterForm, IRowStatusOrders } from '@/configs/interface';
import { dataHeadHistory, dataHeadReviews } from '@/datas/header';
import { useDebounce } from '@/hooks';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useState } from 'react';

const dataHeadTable = ['No', 'Id', 'Product', 'Image', 'Rate', 'Lastest', 'Reviews', 'Non Reviews'];
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

export interface IReviewManamentPageProps {}

export default function ReviewManamentPage(props: IReviewManamentPageProps) {
    // router
    const router = useRouter();

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

    return (
        <BoxTitle mt="mt-0" mbUnderline="mb-0" border={false} title="REVIEW  MANAGEMENT" className="">
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
                styles="border-bottom"
                iniData={dataHeadReviews}
                color="#FCBD18"
            />

            <div className="rounded-xl overflow-hidden border border-gray-primary relative">
                <Table dataHead={dataHeadTable}>
                    <span></span>
                </Table>
                {/* {dataOrders && dataOrders.length <= 0 && (
            <div className="flex items-center justify-center py-5 text-violet-primary">
                <b>No suitable data found</b>
            </div>
        )}

        {isLoading && (
            <div className="w-full h-full flex items-center justify-center absolute inset-0 bg-[rgba(0,0,0,0.04)]">
                <LoadingSecondary />
            </div>
        )} */}
            </div>
        </BoxTitle>
    );
}
