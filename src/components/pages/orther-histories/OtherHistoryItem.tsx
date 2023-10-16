/* eslint-disable @next/next/no-img-element */
import { WrapperAnimation } from '@/components';
import { IOtherHistory } from '@/configs/interface';
import { links } from '@/datas/links';
import { stringToUrl, toCurrency, toGam } from '@/utils/format';
import { faCheckCircle, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import * as React from 'react';

export interface IOtherHistoryItemProps {
    data: IOtherHistory;
}

const _Li = ({ title, value }: { title: string; value: string | number }) => {
    return (
        <li className="flex flex-col text-black-main">
            <span>{title}</span>
            <p className="text-sm text-gray-primary">{value}</p>
        </li>
    );
};

export default function OtherHistoryItem({ data }: IOtherHistoryItemProps) {
    return (
        <div className="w-full rounded-lg max-w-full">
            <div className="py-3 px-4 md:px-10 bg-[#F2F2F2] text-sm md:text-1xl flex items-center justify-between rounded-t-lg">
                <ul className="flex items-center gap-4 md:gap-24">
                    <_Li title="Order ID" value={'#' + data.id} />
                    <_Li title="Date Place" value={data.datePlace} />
                    <_Li title="Total Amount" value={toCurrency(data.total)} />
                </ul>
                <Link href={'/'} className="text-violet-primary hover:underline">
                    View details
                </Link>
            </div>

            <div className="pt-10 flex flex-col gap-3  px-5 border border-gray-primary rounded-b-lg border-t-0">
                {data.products.map((item) => {
                    return (
                        <div key={item.id + (item.size + '')} className="flex items-center justify-between border-gray-primary pb-3 border-b ">
                            <div className=" w-full flex gap-8">
                                <div className=" w-[100px] h-[100px] md:w-[10%]">
                                    <img className="w-full h-full object-cover" loading="lazy" src={item.image} alt={item.image} />
                                </div>
                                <div className="flex flex-col gap-[10px]">
                                    <h2 className="text-sm md:text-1xl">{item.name}</h2>

                                    <div className="flex items-center text-sm ">
                                        <span className="">{item.brand}</span>
                                        <span className="h-5 bg-[#666666] w-[1px] mx-3"></span>
                                        <span>{toGam(item.size as number)}</span>
                                    </div>
                                    <p>{toCurrency(item.price * item.quantity)}</p>
                                </div>
                            </div>

                            <WrapperAnimation
                                hover={{
                                    y: -2,
                                }}
                            >
                                <Link
                                    href={links.produt + `${item.id}/${stringToUrl(item.name)}`}
                                    className=" bg-violet-primary py-2 px-3 flex items-center justify-center text-xs md:text-sm text-white rounded-lg max-h-[40px] w-[120px] md:w-[150px]"
                                >
                                    <span>View product</span>
                                </Link>
                            </WrapperAnimation>
                        </div>
                    );
                })}

                <div className=" py-4 flex items-center text-sm gap-[10px] rounded-lg">
                    {data.state && (data.state === 'buy' || (data.state.toLocaleLowerCase() === 'delivered' && <FontAwesomeIcon color="#65A30D" icon={faCheckCircle} />))}
                    {(!data.state || data.state === 'cancel') && <FontAwesomeIcon color="#EF4444" icon={faCircleXmark} />}
                    <p>{data.stateMessage || 'Delivery on October 2, 2023'}</p>
                </div>
            </div>
        </div>
    );
}
