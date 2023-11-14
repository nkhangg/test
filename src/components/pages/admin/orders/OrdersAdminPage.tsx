'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getOrdersAdmin } from '@/apis/admin/orders';
export interface IOrdersAdminPageProps {}

export default function OrdersAdminPage(props: IOrdersAdminPageProps) {
    const { data, isLoading, error } = useQuery({
        queryKey: ['ordersAdminPage/get'],
        queryFn: () => getOrdersAdmin(),
    });

    return (
        <div dangerouslySetInnerHTML={{ __html: data }}>
            {/* <table className="table-thymeleaf">
                <thead>
                    <tr
                        style={{
                            height: '60px',
                        }}
                        className="tr-head-thymeleaf"
                    >
                        <th>ID</th>
                        <th>Total</th>
                        <th>Quantity</th>
                        <th>Name Custumer</th>
                        <th>Phone Custumer</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        style={{
                            textAlign: 'center',
                            height: '60px',
                        }}
                        className="tr-thymeleaf"
                    >
                        <td>#100</td>
                        <td>300.000 VND</td>
                        <td>x10</td>
                        <td>Pham Nhut Khang</td>
                        <td>0344507491</td>
                        <td>Delivered</td>
                    </tr>
                </tbody>
            </table> */}
        </div>
    );
}
