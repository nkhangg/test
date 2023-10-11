'use client';
import React from 'react';
import { Select, MenuItem, Tabs, Tab, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import { DashboardCard } from '.';
import { toCurrency } from '@/utils/format';
import { IDataCharts } from '@/configs/interface';
import Chart from './Charts/Chart';
// const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ISalesOverviewProps {
    dataOusite: {
        revenue: IDataCharts;
        productRevenueByType: IDataCharts;
    };
}

const SalesOverview = ({ dataOusite }: ISalesOverviewProps) => {
    // select
    const [month, setMonth] = React.useState('2023');

    const handleChange = (event: any) => {
        setMonth(event.target.value);
    };

    // chart color
    const theme = useTheme();

    const [value, setValue] = React.useState(0);

    const handleChanges = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    interface TabPanelProps {
        children?: React.ReactNode;
        index: number;
        value: number;
    }

    function CustomTabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;

        return (
            <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
                {value === index && <>{children}</>}
            </div>
        );
    }
    return (
        <DashboardCard
            title="Sales Overview"
            action={
                <Select labelId="month-dd" id="month-dd" value={month} size="small" onChange={handleChange}>
                    <MenuItem value={'2021'}>2021</MenuItem>
                    <MenuItem value={'2022'}>2022</MenuItem>
                    <MenuItem value={'2023'}>2023</MenuItem>
                </Select>
            }
            middlecontent={
                <>
                    <Typography sx={{ fontSize: '20px', mt: '10px' }}>Total: {toCurrency(dataOusite.productRevenueByType.total)}</Typography>
                </>
            }
        >
            <>
                <Tabs value={value} onChange={handleChanges} aria-label="basic tabs example">
                    <Tab label="Revenue" />
                    <Tab label="Product Revenue By Type" />
                </Tabs>
                <CustomTabPanel value={value} index={0}>
                    <Chart data={dataOusite.revenue} type="area" />
                </CustomTabPanel>

                <CustomTabPanel value={value} index={1}>
                    <Chart data={dataOusite.productRevenueByType} type="bar" />
                </CustomTabPanel>
            </>
        </DashboardCard>
    );
};

export default SalesOverview;
