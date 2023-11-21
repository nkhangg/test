'use client';
import { BorderLinearProgress, RatingStar, Review, TippyChooser } from '@/components';
import { contants } from '@/utils/contants';
import { Avatar, Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { detailReivewAdmin } from '@/datas/comments';
import { getReview } from '@/apis/admin/reviews';
import { error } from 'console';
import { toast } from 'react-toastify';
import { notFound } from 'next/navigation';

export interface IReviewProductDetailPageProps {
    id: string;
}

export default function ReviewProductDetailPage({ id }: IReviewProductDetailPageProps) {
    const reviews = useQuery({
        queryKey: ['getReview/reviewProductDetailPage', id],
        queryFn: () => getReview(id),
    });

    const handleError = () => {
        toast.warn(contants.messages.errors.notFound);
        notFound();
    };

    if (reviews.error) {
        handleError();
    }

    const data = reviews.data?.data;

    // if (!data) {
    //     handleError();
    //     return;
    // }

    return (
        <div className="text-black-main">
            <h3 className="text-2xl font-medium">Ratings & Reviews Of {`" ${id} "`}</h3>

            <Grid pt={'3.4rem'} container spacing={4}>
                <Grid sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} item lg={2}>
                    <Avatar
                        sx={{
                            width: '200px',
                            height: '200px',
                            '& .MuiAvatar-root': {
                                mixBlendMode: 'multiply',
                            },
                        }}
                        variant="rounded"
                        src={data?.image}
                    />
                </Grid>
                <Grid item lg={5}>
                    <div className="flex flex-col items-center justify-center w-full h-full">
                        <div className="flex items-start justify-center flex-col gap-4">
                            <span className="text-fill-heart text-[2.2rem] font-bold text-left ">{data?.rate.toFixed(1)}</span>
                            <RatingStar sx={{ ml: '-12px' }} readOnly defaultValue={Math.round(data?.rate || 5)} precision={0.2} />
                            <p className="text-lg ">{data?.totalRate} ratings</p>
                        </div>
                    </div>
                </Grid>
                <Grid item lg={5}>
                    <ul className="w-full flex-col flex items-center justify-center gap-3">
                        <li className="flex items-center justify-between text-sm gap-4">
                            <RatingStar defaultValue={5} readOnly className="text-xl mx-1" name="12312" />
                            <div className="flex-1 min-w-[200px] w-full">
                                <BorderLinearProgress variant="determinate" value={((data?.detailRate.five || 0) * 100) / (data?.totalRate || 0)} />
                            </div>
                            <span className="text-lg">{data?.detailRate.five}</span>
                        </li>
                        <li className="flex items-center justify-between text-sm gap-4">
                            <RatingStar defaultValue={4} readOnly className="text-xl mx-1" name="12312" />
                            <div className="flex-1 min-w-[200px] w-full">
                                <BorderLinearProgress variant="determinate" value={((data?.detailRate.four || 0) * 100) / (data?.totalRate || 0)} />
                            </div>
                            <span className="text-lg">{data?.detailRate.four}</span>
                        </li>
                        <li className="flex items-center justify-between text-sm gap-4">
                            <RatingStar defaultValue={3} readOnly className="text-xl mx-1" name="12312" />
                            <div className="flex-1 min-w-[200px] w-full">
                                <BorderLinearProgress variant="determinate" value={((data?.detailRate.three || 0) * 100) / (data?.totalRate || 0)} />
                            </div>
                            <span className="text-lg">{data?.detailRate.three}</span>
                        </li>
                        <li className="flex items-center justify-between text-sm gap-4">
                            <RatingStar defaultValue={2} readOnly className="text-xl mx-1" name="12312" />
                            <div className="flex-1 min-w-[200px] w-full">
                                <BorderLinearProgress variant="determinate" value={((data?.detailRate.two || 0) * 100) / (data?.totalRate || 0)} />
                            </div>
                            <span className="text-lg">{data?.detailRate.two}</span>
                        </li>
                        <li className="flex items-center justify-between text-sm gap-4">
                            <RatingStar defaultValue={1} readOnly className="text-xl mx-1" name="12312" />
                            <div className="flex-1 min-w-[200px] w-full">
                                <BorderLinearProgress variant="determinate" value={((data?.detailRate.one || 0) * 100) / (data?.totalRate || 0)} />
                            </div>
                            <span className="text-lg">{data?.detailRate.one}</span>
                        </li>
                    </ul>
                </Grid>
            </Grid>

            <div className="flex items-center justify-between py-4 px-5 border-t border-b border-gray-primary mt-[4%]">
                <h2 className="text-xl font-medium">Product Reivews</h2>
                <div className="flex items-center justify-between gap-5">
                    <div className="flex items-center justify-between gap-2">
                        <div className="w-6 h-6 bg-[#D9D9D9] rounded"></div>
                        <p className="whitespace-nowrap">No reply</p>
                    </div>

                    <TippyChooser title="Sort by" data={[]} />
                </div>
            </div>

            {data && data.reviews && data.reviews.length ? (
                <div className="mt-9 flex flex-col gap-5">
                    {data.reviews.map((item) => {
                        return (
                            <Review
                                key={item.id}
                                data={item}
                                option={{
                                    replay: true,
                                }}
                            />
                        );
                    })}
                </div>
            ) : (
                <div className="flex items-center justify-center border border-gray-primary py-[100px] w-full rounded-xl mt-9">
                    <span className="text-violet-primary text-xl font-semibold">No review for {id}</span>
                </div>
            )}
        </div>
    );
}
