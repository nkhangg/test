'use client';
import { BoxTitle, LoadingSecondary } from '@/components';
import { ContainerContent } from '@/components/common';
import { Breadcrumbs } from '@mui/material';
import Link from 'next/link';
import React, { ReactNode, memo, useEffect, useLayoutEffect, useState } from 'react';

export interface IBaseBreadcrumbsProps {
    isLoading?: boolean;
    title: string;
    breadcrumb: {
        title: string;
        href: string;
    };
    children: ReactNode;
}

function BaseBreadcrumbs({ isLoading = false, breadcrumb, children, title }: IBaseBreadcrumbsProps) {
    const [loading, setLoading] = useState(isLoading);

    useEffect(() => {
        setLoading(isLoading);
    }, [isLoading]);
    return (
        <>
            <ContainerContent className="pt-12">
                <div role="presentation">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link className="hover:underline" href="/">
                            Home
                        </Link>
                        <Link className="text-black-main hover:underline " href={breadcrumb.href}>
                            {breadcrumb.title}
                        </Link>
                    </Breadcrumbs>
                </div>
            </ContainerContent>
            <BoxTitle mt="mt-[46px]" title={title} fontWeigth="font-semibold" underlineTitle locationTitle="left" fontSizeTitle="text-[32px]">
                {children}
                {loading && <LoadingSecondary />}
            </BoxTitle>
        </>
    );
}

export default memo(BaseBreadcrumbs);
