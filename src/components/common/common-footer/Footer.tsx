/* eslint-disable @next/next/no-img-element */
import * as React from 'react';
import { Fab, Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faEnvelope, faPhone, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { ContainerContent } from '..';
import Link from 'next/link';
import { dataFooter } from '@/datas/footer';

export interface IFooterProps {}

export default function Footer(props: IFooterProps) {
    return (
        <footer className="bg-[#2F2E2E] pt-20 pb-14 max-w-[100%] overflow-hidden mt-[10%]">
            <ContainerContent className="text-white">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-[74px] ">
                    <div className=" lg:col-span-2 flex flex-col gap-[30px] ">
                        <div className="w-fit">
                            <img src="/images/logo-large-dark.svg" alt="logo-large-dark.svg" />
                            <div className="w-3/4 h-[3px] bg-white"></div>
                        </div>
                        <p>{dataFooter.petfoster}</p>
                    </div>
                    <div className="flex flex-col gap-[30px]">
                        <div className="w-fit">
                            <h4 className="text-[25px] text-green-5FA503 font-bold leading-[42px]">ABOUT US</h4>
                            <div className="w-3/4 h-[3px] bg-white"></div>
                        </div>
                        <ul className="flex flex-col gap-5">
                            {dataFooter.aboutUs.map((item) => {
                                return (
                                    <li key={item.title} className="flex items-center gap-1 hover:underline">
                                        <FontAwesomeIcon className="text-xs" icon={faAngleRight} />
                                        <Link className="text-1xl" href={item.link}>
                                            {item.title}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className="flex flex-col gap-[30px]">
                        <div className="w-fit">
                            <h4 className="text-[25px] text-green-5FA503 font-bold leading-[42px]">ABOUT US</h4>
                            <div className="w-3/4 h-[3px] bg-white"></div>
                        </div>
                        <ul className="flex flex-col gap-5">
                            {dataFooter.contats.map((item) => {
                                return (
                                    <li key={item.title} className="flex items-center gap-2 hover:underline cursor-pointer">
                                        <FontAwesomeIcon className="text-xl h-5 w-5" icon={item.icon} />
                                        <span className="text-1xl">{item.title}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>

                <div className="bg-white h-[1px] w-full mt-24"></div>

                <div className="fixed bottom-[2%] right-[2%]">
                    <Fab color="primary" aria-label="add">
                        <img src="/logo-footer.svg" alt="logo-footer.svg" />
                    </Fab>
                </div>

                <div className="flex items-center justify-center py-14">
                    <p>{dataFooter.coppyRight}</p>
                </div>
            </ContainerContent>
        </footer>
    );
}
