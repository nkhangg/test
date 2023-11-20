'use client';
import { IRowStatusOrders } from '@/configs/interface';
import React, { ReactNode, createContext, useState } from 'react';

export interface IOrderAdminPageProviderProps {
    children: ReactNode;
}

type OrderAdminPageContextType = {
    dataOrderOpen: IRowStatusOrders | null;
    setDataOrderOpen: (data: IRowStatusOrders) => void;
};

const OrderAdminPageContext = createContext<OrderAdminPageContextType>({ dataOrderOpen: null, setDataOrderOpen: () => {} });

function OrderAdminPageProvider({ children }: IOrderAdminPageProviderProps) {
    const [dataOrderOpen, setDataOrderOpen] = useState<IRowStatusOrders | null>(null);

    return <OrderAdminPageContext.Provider value={{ dataOrderOpen, setDataOrderOpen }}>{children}</OrderAdminPageContext.Provider>;
}

export { OrderAdminPageContext, OrderAdminPageProvider };
