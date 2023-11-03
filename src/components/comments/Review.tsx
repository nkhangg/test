import { Review } from '@/configs/interface';
import { toGam } from '@/utils/format';
import { Avatar, Grid, Rating, Typography } from '@mui/material';
import moment from 'moment';
import * as React from 'react';

export interface IReviewProps {
    data: Review;
}

export default function Review({ data }: IReviewProps) {
    return (
        <div className="text-black-main">
            <Grid container spacing={2}>
                <Grid
                    item
                    lg={1}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Avatar src={data.avatar} />
                </Grid>
                <Grid item lg={9}>
                    <h2 className="font-semibold text-1xl">{data.name}</h2>
                    <div className="flex items-center gap-4">
                        <Rating
                            sx={{
                                '& .MuiSvgIcon-root': {
                                    fontSize: '16px',
                                },
                            }}
                            name="read-only"
                            value={data.rating}
                            readOnly
                        />
                        <span className="text-sm italic text-grey-secondary">Size: {toGam(data.size)}</span>
                    </div>
                    <p className="text-sm">{data.comment}</p>
                </Grid>
                <Grid item lg={2}>
                    <p className="text-sm text-grey-secondary">{moment(data.createdAt).fromNow()}</p>
                </Grid>
            </Grid>
        </div>
    );
}
