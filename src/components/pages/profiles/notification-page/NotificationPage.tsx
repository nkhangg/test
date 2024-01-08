'use client';
import React, { useEffect, useMemo } from 'react';
import { BaseProfilePage } from '../../common';
import NotificationPageItem from './NotificationPageItem';
import { useCollection } from 'react-firebase-hooks/firestore';
import firebaseService from '@/services/firebaseService';
import { INotification } from '@/configs/interface';
import { useAppSelector } from '@/hooks/reduxHooks';
import { RootState } from '@/configs/types';

export interface INotificationPageProps {}

export default function NotificationPage(props: INotificationPageProps) {
    const { user } = useAppSelector((state: RootState) => state.userReducer);
    const [notificationSnapshot, loading] = useCollection(firebaseService.querys.getNotifications(user?.username || 'all'));

    const dataNotifications = useMemo(() => {
        if (!notificationSnapshot) return [];

        return notificationSnapshot.docs.reverse().map((item) => {
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
        <BaseProfilePage
            title="NOTIFICATIONS"
            action={
                <p onClick={handleMarkAllAsRead} className="text-fill-heart text-[16px] hover:underline cursor-pointer font-medium">
                    Mark all as read
                </p>
            }
        >
            <div className="py-6 flex flex-col gap-2">
                {dataNotifications.map((item) => {
                    return <NotificationPageItem key={item.id} data={item} user={user} />;
                })}
            </div>
            {dataNotifications.length >= 10 && (
                <div className="flex items-center justify-center">
                    <span className="text-fill-heart hover:underline cursor-pointer">See more</span>
                </div>
            )}
        </BaseProfilePage>
    );
}
