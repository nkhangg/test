import axios from '@/configs/axios';
import { ApiReportType, ApiRevenueDateType, ApiSlaesOverviewType } from '@/configs/types';

export const dailyReport: ApiReportType = async () => {
    const res = await axios({
        method: 'GET',
        url: 'admin/report/daily',
    });

    if (!res) return null;

    return res?.data;
};

export const salesOverview: ApiSlaesOverviewType = async (year: string) => {
    const res = await axios({
        method: 'GET',
        url: 'admin/report/sales-overview',
        params: {
            year,
        },
    });

    if (!res) return null;

    return res?.data;
};

export const productRevenue: ApiRevenueDateType = async (dates: { start?: string; end?: string }) => {
    const res = await axios({
        method: 'GET',
        url: 'admin/report/product-revenue-by-date',
        params: {
            minDate: dates.start,
            maxDate: dates.end,
        },
    });

    if (!res) return null;

    return res?.data;
};
