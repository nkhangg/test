'use client';
import React from 'react';
import { Select, MenuItem, Tabs, Tab, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import { DashboardCard } from '.';
import { toCurrency } from '@/utils/format';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const SalesOverview = () => {
    // select
    const [month, setMonth] = React.useState('2023');

    const handleChange = (event: any) => {
        setMonth(event.target.value);
    };

    // chart color
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const secondary = theme.palette.secondary.main;

    // chart
    const optionscolumnchart: any = {
        chart: {
            type: 'bar',
            fontFamily: "'Plus Jakarta Sans', sans-serif;",
            foreColor: '#adb0bb',
            toolbar: {
                show: true,
            },
            height: 370,
        },
        colors: [primary, secondary],
        plotOptions: {
            bar: {
                horizontal: false,
                barHeight: '60%',
                columnWidth: '42%',
                borderRadius: [6],
                borderRadiusApplication: 'end',
                borderRadiusWhenStacked: 'all',
            },
        },

        stroke: {
            show: true,
            width: 5,
            lineCap: 'butt',
            colors: ['transparent'],
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        grid: {
            borderColor: 'rgba(0,0,0,0.1)',
            strokeDashArray: 3,
            xaxis: {
                lines: {
                    show: false,
                },
            },
        },
        yaxis: {
            tickAmount: 4,
        },
        xaxis: {
            categories: ['Dog', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Sep', 'Sep', 'Sep'],
            axisBorder: {
                show: false,
            },
        },
        tooltip: {
            theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
            fillSeriesColor: false,
        },
    };
    const seriescolumnchart: any = [
        {
            name: 'Thang 1',
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 150, 160, 180],
        },
    ];
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
                    <Typography sx={{ fontSize: '20px', mt: '10px' }}>Total: {toCurrency(2423423)}</Typography>
                </>
            }
        >
            {/* <Chart options={optionscolumnchart} series={seriescolumnchart} type="bar" width={'100%'} height="370px" /> */}
            <>
                <Tabs value={value} onChange={handleChanges} aria-label="basic tabs example">
                    <Tab label="Revenue" />
                    <Tab label="Product Revenue By Type" />
                </Tabs>
                <CustomTabPanel value={value} index={0}>
                    <Chart options={optionscolumnchart} series={seriescolumnchart} type="area" width={'100%'} height="370px" />
                </CustomTabPanel>

                <CustomTabPanel value={value} index={1}>
                    <Chart options={optionscolumnchart} series={seriescolumnchart} type="bar" width={'100%'} height="370px" />
                </CustomTabPanel>
            </>
        </DashboardCard>
    );
};

export default SalesOverview;
