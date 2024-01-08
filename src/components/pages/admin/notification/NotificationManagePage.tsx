'use client';
import { BoxTitle, DialogDateChooser, LoadingSecondary, NotificationDialog, SettingNotificationDialog, Table, WrapperAnimation } from '@/components';
import { SortAdmin } from '@/components/common';
import RowNotification from '@/components/inputs/tables/rows/RowNotification';
import { INotification } from '@/configs/interface';
import { TypeNotification } from '@/configs/types';
import { useDebounce } from '@/hooks';
import firebaseService from '@/services/firebaseService';
import Validate from '@/utils/validate';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Timestamp } from 'firebase/firestore';
import React, { ChangeEvent, useMemo, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

const dataHeadTable = ['#', 'Id', 'Image', 'Title', 'Message', 'Date', 'Type', 'Recipient', 'Action'];

const dataShort = [
    {
        id: 'rate-asc',
        title: 'None',
    },
    {
        id: 'rate-desc',
        title: 'Success',
    },
    {
        id: 'review-asc',
        title: 'Warning',
    },
    {
        id: 'review-desc',
        title: 'Error',
    },
    {
        id: 'latest-asc',
        title: 'Info',
    },
];

export interface INotificationManagePageProps {}

export default function NotificationManagePage(props: INotificationManagePageProps) {
    const [search, setSearch] = useState('');
    const [type, setType] = useState<TypeNotification | undefined>(undefined);

    const [open, setOpen] = useState(false);
    const [openSetting, setOpenSetting] = useState(false);

    const searchDebounce = useDebounce(search, 400);

    const [notificationsSnapshot, loading] = useCollection(firebaseService.querys.getAllNotification(searchDebounce, type));

    const dataNotifications = useMemo(() => {
        if (!notificationsSnapshot) return [];

        return notificationsSnapshot.docs.reverse().map((item) => {
            return {
                id: item.id,
                ...item.data(),
            } as INotification;
        });
    }, [notificationsSnapshot]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleOpenDialog = () => {
        setOpen(true);
    };

    const handleOpenSettingDialog = () => {
        setOpenSetting(true);
    };

    return (
        <BoxTitle mt="mt-0" mbUnderline="mb-0" border={false} title="NOTIFICATIONS MANAGEMENT">
            <div className="flex items-center justify-between">
                <SortAdmin
                    searchProps={{
                        placeholder: 'Search for title',
                        value: search,
                        handleChange,
                        handleClose: () => setSearch(''),
                    }}
                    sortProps={{
                        styles: {
                            minWidth: 'min-w-[140px]',
                        },
                        data: dataShort,
                        title: 'Type',
                        onValue: (v) => {
                            if (Validate.isBlank(v.title)) {
                                setType(undefined);
                                return;
                            }

                            setType(v.title.toLowerCase() as TypeNotification);
                        },
                    }}
                />

                <div className="flex items-center gap-6 text-black-main">
                    <span onClick={handleOpenDialog} className="text-[#505DE8] font-semibold hover:underline cursor-pointer">
                        PUSH
                    </span>

                    <WrapperAnimation
                        onClick={handleOpenSettingDialog}
                        hover={{
                            rotate: -10,
                        }}
                        className="text-xl cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faGear} />
                    </WrapperAnimation>
                </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-gray-primary relative">
                <Table
                    styleHead={{
                        align: 'center',
                    }}
                    dataHead={dataHeadTable}
                >
                    {dataNotifications.map((item, index) => {
                        return <RowNotification key={item.id} index={index} data={item} />;
                    })}
                </Table>

                {dataNotifications.length <= 0 && (
                    <div className="flex items-center justify-center py-5 text-violet-primary">
                        <b>No data available</b>
                    </div>
                )}

                {loading && (
                    <div className="absolute inset-0 bg-[rgba(0,0,0,0.4)] flex items-center justify-center z-20">
                        <LoadingSecondary />
                    </div>
                )}
            </div>

            {open && <NotificationDialog open={open} setOpen={setOpen} />}
            {openSetting && <SettingNotificationDialog open={openSetting} setOpen={setOpenSetting} />}
        </BoxTitle>
    );
}
