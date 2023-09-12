'use client';
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import React, { ReactNode } from 'react';
import { NextAppDirEmotionCacheProvider } from './EmotionCache';
import { Open_Sans } from 'next/font/google';

const openSans = Open_Sans({ subsets: ['latin'], style: ['normal', 'italic'], weight: ['300', '400', '500', '700', '800'] });
export interface IThemeRegistryProps {
    children: ReactNode;
}

const themeOptions: ThemeOptions = {
    typography: {
        fontFamily: openSans.style.fontFamily,
        fontSize: 14,
    },
    palette: {
        background: {
            default: '#ffffff',
        },
    },
};

const theme = createTheme(themeOptions);

export default function ThemeRegistry({ children }: IThemeRegistryProps) {
    return (
        <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
            <ThemeProvider theme={theme}>
                <CssBaseline>{children}</CssBaseline>
            </ThemeProvider>
        </NextAppDirEmotionCacheProvider>
    );
}
