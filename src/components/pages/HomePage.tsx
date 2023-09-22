import * as React from 'react';

import { Box } from '@mui/material';
import { Feedback, ImpactOfYear, KnowldegeAboutFoster, Pets } from '..';
import { AboutCom } from '../common';
import { homePageData } from '@/datas/home-page';

export interface IHomePageProps {}

// This is funtion server component
// All component don't have 'use client' is server component
export default function HomePage(props: IHomePageProps) {
    return (
        <>
            <ImpactOfYear />
            <AboutCom />
            <Pets data={homePageData.pets} />
            <Feedback />
            <KnowldegeAboutFoster data={homePageData.postsPreview} />
        </>
    );
}
