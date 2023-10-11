'use client';
import { PageContainer } from '@/components/common';
import { DashboardCard, LabelCard, MonthlyEarnings, ProductPerformance, SalesOverview, YearlyBreakup } from '@/components/dashboard';
import { dataDashboard } from '@/datas/dashboard';
import { toCurrency } from '@/utils/format';
import { ShoppingCart, MonetizationOn, SupervisedUserCircle } from '@mui/icons-material';
import { Box, Grid } from '@mui/material';
import * as React from 'react';
export interface IDashboarddPageProps {}

export default function DashboarddPage(props: IDashboarddPageProps) {
    return (
        <PageContainer title="Dashboard" description="this is Dashboard">
            <Box>
                <DashboardCard title="Report">
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12} lg={4}>
                            <LabelCard
                                Icon={ShoppingCart}
                                data={{ ...dataDashboard.reports.dailyOrders, value: toCurrency(dataDashboard.reports.dailyOrders.value) }}
                                title="Daily Orders"
                            />
                        </Grid>
                        <Grid item xs={12} md={12} lg={4}>
                            <LabelCard
                                Icon={MonetizationOn}
                                underlineColor="#0D9488"
                                data={{ ...dataDashboard.reports.dailyRevenue, value: toCurrency(dataDashboard.reports.dailyRevenue.value) }}
                                title="Daily Revenue"
                            />
                        </Grid>

                        <Grid item xs={12} md={12} lg={4}>
                            <LabelCard Icon={SupervisedUserCircle} underlineColor="#FF7A00" showPersnet={false} data={dataDashboard.reports.users} title="Users" />
                        </Grid>
                    </Grid>
                </DashboardCard>
                <Grid container spacing={3} mt={3}>
                    <Grid item xs={12} md={12} lg={12}>
                        <SalesOverview dataOusite={dataDashboard.salesOverview} />
                    </Grid>

                    <Grid item xs={12} md={12} lg={12}>
                        <ProductPerformance dataOutsite={dataDashboard.productRevenueByDate} />
                    </Grid>
                </Grid>
            </Box>
        </PageContainer>
    );
}
