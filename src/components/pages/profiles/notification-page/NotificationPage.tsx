import * as React from 'react';
import { BaseProfilePage } from '../../common';
import NotificationPageItem from './NotificationPageItem';

export interface INotificationPageProps {}

export default function NotificationPage(props: INotificationPageProps) {
    return (
        <BaseProfilePage title="NOTIFICATION" action={<p className="text-fill-heart text-[16px] hover:underline cursor-pointer font-medium">Mark all as read</p>}>
            <div className="">
                <NotificationPageItem />
            </div>
        </BaseProfilePage>
    );
}
