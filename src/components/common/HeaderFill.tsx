import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { MenuBars, MenuUser, Navbar } from '.';

export interface IHeaderFillProps {}

export default function HeaderFill(props: IHeaderFillProps) {
    return (
        <header
            className={classNames(`h-[40px] lg:h-header w-full fixed inset-0 z-50  transition-colors ease-linear px-10`, {
                'bg-[#374151]': true,
            })}
        >
            <div className=" w-main m-auto h-full lg:flex  xl:w-main items-center justify-between max-w-[100%] hidden">
                <Link href={'/'} className="w-[136px] h-[42px] cursor-pointer ">
                    <Image src={`/images/large-logo.svg`} alt="logo" width={0} height={0} className="w-full h-full object-contain" />
                </Link>

                <Navbar isScroll={false} />

                <MenuUser />
            </div>

            {/* responcesive */}
            <div className=" m-auto h-full text-white flex items-center justify-between select-none lg:hidden">
                <MenuBars isScroll={false} />
            </div>
        </header>
    );
}
