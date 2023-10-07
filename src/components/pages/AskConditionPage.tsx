import React from 'react';
import { BoxTitle, MainButton } from '@/components';
import { ContainerContent } from '@/components/common';
import { contants } from '@/utils/contants';
import { Box, Checkbox, Stack, Typography } from '@mui/material';
export interface IAskConditionPageProps {}

const _Item = ({ title, checked }: { title: string; checked?: boolean }) => {
    return (
        <Box component={'div'} className="py-2 px-3 rounded-lg bg-[#F2F2F2] text-black-main text-1xl flex items-center justify-between gap-2">
            <p className="flex-1">{title}</p>
            <Checkbox />
        </Box>
    );
};

export default function AskConditionPage(props: IAskConditionPageProps) {
    return (
        <BoxTitle title="WE ASK? YOU ANSWER" locationTitle="center">
            <Box
                sx={{
                    width: '100%',
                    backgroundColor: '#fff',
                    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                    p: '40px',
                    borderRadius: '8px',
                }}
            >
                <Typography className="text-green-5FA503 text-justify">
                    We only allow direct adoption, not adoption for others, so please discuss all of the following questions{' '}
                </Typography>
                <Stack sx={{ mt: '36px', mb: '40px' }} spacing={'16px'}>
                    {contants.askConditions.map((item, index) => {
                        return <_Item key={item} title={index + 1 + `. ${item}`} />;
                    })}
                </Stack>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <MainButton width={'fit-content'} title="CONTACT TO INTERVIEW" />
                </Box>
            </Box>
        </BoxTitle>
    );
}
