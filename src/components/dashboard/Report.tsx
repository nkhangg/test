'use client';
import * as React from 'react';
import { DashboardCard, LabelCard } from '.';
import { Grid } from '@mui/material';
import { MonetizationOn, ShoppingCart, SupervisedUserCircle } from '@mui/icons-material';
import { toCurrency } from '@/utils/format';
import { IReports } from '@/configs/interface';
import { useQuery } from '@tanstack/react-query';
import { dailyReport } from '@/apis/dashboard';
export interface IReportProps {}

export default function Report(props: IReportProps) {
    const { data, isLoading, error } = useQuery({
        queryKey: ['reports'],
        queryFn: () => dailyReport(),
    });

    const dataDashboard: IReports | undefined = data?.data;

    return (
        <DashboardCard title="Report">
            <Grid container spacing={5}>
                <Grid item xs={12} md={12} lg={4}>
                    <LabelCard
                        Icon={ShoppingCart}
                        data={{ ...dataDashboard?.reports.dailyOrders, value: dataDashboard?.reports.dailyOrders.value + ' orders' }}
                        title="Daily Orders"
                    />
                </Grid>
                <Grid item xs={12} md={12} lg={4}>
                    <LabelCard
                        Icon={MonetizationOn}
                        underlineColor="#0D9488"
                        data={{ ...dataDashboard?.reports.dailyRevenue, value: toCurrency(dataDashboard?.reports.dailyRevenue.value || 0) }}
                        title="Daily Revenue"
                    />
                </Grid>

                <Grid item xs={12} md={12} lg={4}>
                    <LabelCard
                        Icon={SupervisedUserCircle}
                        underlineColor="#FF7A00"
                        showPersnet={false}
                        data={{
                            value: (dataDashboard?.reports.users.value || 0) + ' users',
                        }}
                        title="Users"
                    />
                </Grid>
            </Grid>
        </DashboardCard>
    );
}
