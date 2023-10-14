import { Box, Tab, Tabs, Typography, styled } from '@mui/material';
import classNames from 'classnames';
import React, { SyntheticEvent, useState } from 'react';

export interface IDesAndReviewProps {
    description: string;
    review: string;
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    className?: string;
}

const AntTabs = styled(Tabs)({
    '& .MuiTabs-indicator': {
        backgroundColor: '#FF7A00',
    },
    '& .Mui-selected': {
        color: '#333 !important',
    },
    '&': { color: '#333333 !important' },
});

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, className, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && (
                <div
                    className={classNames('mt-[30px]', {
                        [className ?? '']: true,
                    })}
                >
                    {children}
                </div>
            )}
        </div>
    );
}

export default function DesAndReview({ description, review }: IDesAndReviewProps) {
    const [value, setValue] = useState(0);
    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <Box sx={{ width: '100%', mt: '74px' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <AntTabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Description" {...a11yProps(0)} />
                    <Tab label="Review" {...a11yProps(1)} />
                </AntTabs>
            </Box>
            <CustomTabPanel className="text-1xl text-[#374151]" value={value} index={0}>
                <div dangerouslySetInnerHTML={{ __html: description }}></div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                {review}
            </CustomTabPanel>
        </Box>
    );
}
