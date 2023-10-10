'use client';
import { PageContainer } from '@/components/common';
import { DashboardCard, LabelCard, MonthlyEarnings, ProductPerformance, SalesOverview, YearlyBreakup } from '@/components/dashboard';
import { ShoppingCart, MonetizationOn, SupervisedUserCircle } from '@mui/icons-material';
import { Box, Grid } from '@mui/material';
import * as React from 'react';

export interface IDashboardProps {}

export default function Dashboard(props: IDashboardProps) {
    return (
        <PageContainer title="Dashboard" description="this is Dashboard">
            <Box>
                <DashboardCard title="Report">
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4} lg={4}>
                            <LabelCard Icon={ShoppingCart} data={{ content: '300.000 vnd', persent: '8' }} title="Daily Orders" />
                        </Grid>
                        <Grid item xs={12} md={4} lg={4}>
                            <LabelCard Icon={MonetizationOn} underlineColor="#0D9488" data={{ content: '300.000 vnd', persent: '8' }} title="Daily Revenue" />
                        </Grid>

                        <Grid item xs={12} md={4} lg={4}>
                            <LabelCard Icon={SupervisedUserCircle} underlineColor="#FF7A00" showPersnet={false} data={{ content: '300.000 vnd', persent: '8' }} title="Users" />
                        </Grid>
                    </Grid>
                </DashboardCard>
                <Grid container spacing={3} mt={3}>
                    <Grid item xs={12} md={12} lg={12}>
                        <SalesOverview />
                    </Grid>

                    <Grid item xs={12} md={12} lg={12}>
                        <ProductPerformance />
                    </Grid>
                </Grid>
            </Box>
        </PageContainer>
    );
}
