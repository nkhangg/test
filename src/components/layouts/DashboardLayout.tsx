'use client';
import { Box, Container, styled } from '@mui/material';
import React, { ReactNode, useState } from 'react';
import Header from '../common/common-headers/admin/header/Header';
import Sidebar from '../common/common-headers/admin/sidebar/Sidebar';

export interface IDashboardLayoutProps {
    children: ReactNode;
}
const MainWrapper = styled('div')(() => ({
    display: 'flex',
    minHeight: '100vh',
    width: '100%',
}));

const PageWrapper = styled('div')(() => ({
    display: 'flex',
    flexGrow: 1,
    paddingBottom: '60px',
    flexDirection: 'column',
    zIndex: 1,
    backgroundColor: 'transparent',
}));
export default function DashboardLayout({ children }: IDashboardLayoutProps) {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    return (
        <MainWrapper className="mainwrapper">
            <Sidebar isSidebarOpen={isSidebarOpen} isMobileSidebarOpen={isMobileSidebarOpen} onSidebarClose={() => setMobileSidebarOpen(false)} />

            <PageWrapper className="page-wrapper">
                <Header toggleMobileSidebar={() => setMobileSidebarOpen(true)} />

                <Container
                    sx={{
                        paddingTop: '20px',
                        maxWidth: '1200px',
                    }}
                >
                    <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>{children}</Box>
                </Container>
            </PageWrapper>
        </MainWrapper>
    );
}
