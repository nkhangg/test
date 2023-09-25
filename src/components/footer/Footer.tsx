/* eslint-disable @next/next/no-img-element */
import * as React from 'react';
import { Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faEnvelope, faPhone, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { ContainerContent } from '../common';
import Link from 'next/link';
import { dataFooter } from '@/datas/footer';

export interface IFooterProps {}

export default function Footer(props: IFooterProps) {
    return (
        // <footer className="bg-slate-950 text-sm overflow-hidden">
        //     <div className="w-[1280px] m-auto">
        //         <div className="p-0 grid grid-cols-4">
        //             <Grid item xs={12} lg={5} className="col-span-2">
        //                 <p className="text-cyan-600 font-bold text-3xl pt-6">
        //                     Pet<span className="text-lime-600  font-bold text-3xl">Foster</span>{' '}
        //                 </p>
        //                 <Grid item lg={2}>
        //                     <div className="pt-2">
        //                         <span className="border-b-2 border-slate-300 flex justify-center "></span>
        //                     </div>
        //                 </Grid>

        //                 <p className="text-slate-50 text-justify pt-4">
        //                     Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus quam dolorem voluptate adipisci culpa architecto eum aut. Non fuga cumque
        //                     consequatur, repellendus dolore modi voluptates architecto in eos aliquam expedita.
        //                 </p>
        //             </Grid>
        //             <Grid item xs={12} lg={3}>
        //                 <div className="">
        //                     <p className="text-lime-600 font-bold text-3xl pl-6 pt-6">About Us</p>
        //                     <Grid item lg={4}>
        //                         <div className="pl-6 pt-2">
        //                             <span className="border-b-2 border-slate-300 flex justify-end "></span>
        //                         </div>
        //                     </Grid>
        //                     <div className="pl-6 pt-4">
        //                         <ul className="list-inside">
        //                             <li>
        //                                 <a href="/login" className="text-slate-50">
        //                                     <FontAwesomeIcon icon={faAngleRight} /> Terms & privacy policy
        //                                 </a>
        //                             </li>
        //                             <li className="pt-6">
        //                                 <a href="/login" className="text-slate-50">
        //                                     <FontAwesomeIcon icon={faAngleRight} /> Terms & privacy policy
        //                                 </a>
        //                             </li>
        //                             <li className="pt-6">
        //                                 <a href="/login" className="text-slate-50">
        //                                     <FontAwesomeIcon icon={faAngleRight} /> Terms & privacy policy
        //                                 </a>
        //                             </li>
        //                         </ul>
        //                     </div>
        //                 </div>
        //             </Grid>
        //             <Grid item xs={12} lg={4}>
        //                 <p className="text-lime-600 font-bold text-3xl pl-6 pt-6">Contact Us</p>
        //                 <Grid item lg={3}>
        //                     <div className="pl-6 pt-2">
        //                         <span className="border-b-2 border-slate-300 flex justify-center "></span>
        //                     </div>
        //                 </Grid>
        //                 <div className="pl-6 pt-4 pr-3">
        //                     <ul className="list-inside">
        //                         <li>
        //                             <p className="text-slate-50">
        //                                 {' '}
        //                                 <FontAwesomeIcon icon={faHouse} className="pr-2" /> 288, Nguyen Van Linh, An Khanh, Ninh Kieu, Can Tho
        //                             </p>
        //                         </li>
        //                         <li className="pt-6">
        //                             <a href="/login" className="text-slate-50">
        //                                 <FontAwesomeIcon icon={faEnvelope} className="pr-2" /> inforpetfoster@gmail.com
        //                             </a>
        //                         </li>
        //                         <li className="pt-6">
        //                             <a href="/login" className="text-slate-50">
        //                                 <FontAwesomeIcon icon={faPhone} className="pr-2" /> 0913842870
        //                             </a>
        //                         </li>
        //                     </ul>
        //                 </div>
        //             </Grid>
        //         </div>
        //         <Grid item lg={12}>
        //             <div className=" flex items-center justify-between my-6">
        //                 <span className="h-[1px] w-full bg-white block"></span>
        //                 <div className="w-[100px] h-[100px] relative">
        //                     <Image fill src={'/logo-footer.svg'} alt="logo-footer"></Image>
        //                 </div>
        //             </div>

        //             <p className="text-slate-50 text-base pt-6 flex justify-center my-5">© 2023 PetFoster . All Rights Reserved.</p>
        //         </Grid>
        //     </div>
        // </footer>
        <footer className="bg-[#2F2E2E] pt-20 pb-14 max-w-[100%] overflow-hidden">
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

                <div className="flex items-center mt-24">
                    <span className="bg-white h-[1px] w-full"></span>
                    <img src="/logo-footer.svg" alt="logo-footer.svg" />
                </div>

                <div className="flex items-center justify-center py-14">
                    <p>{dataFooter.coppyRight}</p>
                </div>
            </ContainerContent>
        </footer>
    );
}
