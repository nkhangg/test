import * as React from 'react';
import TableRow from '../TableRow';
import { Avatar, Rating, TableCell, Typography } from '@mui/material';
import Link from 'next/link';
import { links } from '@/datas/links';
import { IRowReviewTable } from '@/configs/interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEm } from '@fortawesome/free-regular-svg-icons';
export interface IRowReviewProps {
    index: number;
    data: IRowReviewTable;
}

export default function RowReview({ index, data }: IRowReviewProps) {
    return (
        <TableRow>
            <TableCell align="center">
                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                    {index + 1}
                </Typography>
            </TableCell>

            <TableCell align="center">
                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                    {data.productId}
                </Typography>
            </TableCell>
            <TableCell align="center">
                <span className="whitespace-normal"> {data.productName}</span>
            </TableCell>
            <TableCell align="center">
                <Avatar
                    sx={{
                        mixBlendMode: 'multiply',
                    }}
                    variant="square"
                    src={data.image}
                />
            </TableCell>
            <TableCell align="center">
                <Rating
                    name="read-only"
                    readOnly
                    value={data.rate}
                    icon={
                        <span className="text-[16px] mx-2">
                            <FontAwesomeIcon icon={faStar} />
                        </span>
                    }
                    emptyIcon={
                        <span className="text-[16px] mx-2">
                            <FontAwesomeIcon icon={faStarEm} />
                        </span>
                    }
                />
            </TableCell>
            <TableCell align="center">
                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                    {data.lastest}
                </Typography>
            </TableCell>
            <TableCell align="center">
                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                    x{data.reviews}
                </Typography>
            </TableCell>
            <TableCell align="center">
                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                    x{data.commentNoRep}
                </Typography>
            </TableCell>
            <TableCell align="center">
                <Link href={links.reviews.management + `/${data.productId}`} className="text-violet-primary hover:underline cursor-pointer font-medium">
                    Open
                </Link>
            </TableCell>
        </TableRow>
    );
}
