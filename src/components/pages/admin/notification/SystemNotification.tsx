'use client';
import { INotification } from '@/configs/interface';
import { RootState } from '@/configs/types';
import { useAppSelector } from '@/hooks/reduxHooks';
import firebaseService from '@/services/firebaseService';
import React, { useMemo } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { NotificationPageItem } from '../..';

export interface ISystemNotificationProps {}

export default function SystemNotification(props: ISystemNotificationProps) {
    const { user } = useAppSelector((state: RootState) => state.userReducer);
    const [notificationSnapshot, loading] = useCollection(firebaseService.querys.getNotifications(user));

    const dataNotifications = useMemo(() => {
        if (!notificationSnapshot) return [];

        return notificationSnapshot.docs.map((item) => {
            return {
                id: item.id,
                ...item.data(),
            } as INotification;
        });
    }, [notificationSnapshot]);

    const handleMarkAllAsRead = async () => {
        await firebaseService.handleMarkAllAsRead(dataNotifications, user);
    };

    return (
        <div className="flex flex-col gap-5 py-5">
            <div className="w-full flex items-center justify-end px-5">
                <p onClick={handleMarkAllAsRead} className="text-fill-heart text-[16px] hover:underline cursor-pointer font-medium">
                    Mark all as read
                </p>
            </div>
            <div className="py-6 flex flex-col gap-2">
                {dataNotifications.map((item) => {
                    return <NotificationPageItem key={item.id} data={item} user={user} />;
                })}
            </div>
        </div>
    );
}
