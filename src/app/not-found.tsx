'use client';
import { MainButton } from '@/components';
import { ContainerContent, Header } from '@/components/common';
import Footer from '@/components/common/common-footer/Footer';
import Link from 'next/link';

export default function NotFound() {
    return (
        <html lang="en">
            <body>
                <Header dynamic={false} />
                <ContainerContent className="my-[100px] lg:mt-[200px] lg:mb-0 flex items-center justify-center flex-col text-black-main">
                    <h2 className=" text-[80px] lg:text-[150px] font-bold text-[#505DE8]">404</h2>
                    <span className="text-[32px] lg:text-[48px]">Oops!!! Page not found</span>
                    <p className="text-[18px] text-center lg:text-[28px] mb-10 mt-4">The page you are looking for does not exist. It might have been moved or deleted.</p>
                    <MainButton href={'/'} title="BACK TO HOME" background="bg-[#505DE8]" />
                </ContainerContent>
            </body>
        </html>
    );
}
