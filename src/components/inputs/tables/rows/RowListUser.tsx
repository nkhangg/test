import * as React from 'react';
import TableRow from '../TableRow';
import { Avatar, Button, TableCell, Tooltip, Typography } from '@mui/material';
import { formatIndex, formatRole } from '@/utils/format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import classNames from 'classnames';
import { contants } from '@/utils/contants';
import { IProfile } from '@/configs/interface';
import { links } from '@/datas/links';
import { RoleType } from '@/configs/types';

export interface IRowListUserProps {
    data: IProfile;
    index: number;
    handleDeleteUser: (id: string) => void;
}

export default function RowListUser({ data, index, handleDeleteUser }: IRowListUserProps) {
    return (
        <TableRow>
            <TableCell>
                {/* no */}
                <Typography
                    sx={{
                        fontSize: '16px',
                        fontWeight: '500',
                    }}
                >
                    {index + 1}
                </Typography>
            </TableCell>
            {/* avatart */}
            <TableCell align="left">
                <Tooltip title={data.id}>
                    <Avatar src={data.avatar} variant="rounded" />
                </Tooltip>
            </TableCell>

            {/* username */}
            <TableCell>
                <Typography color="textSecondary" variant="subtitle2" fontSize={'16px'} maxWidth={'200px'} fontWeight={400} className="truncate">
                    {data.username}
                </Typography>
            </TableCell>

            {/* fullname */}
            <TableCell align="left">
                <Typography color="textSecondary" variant="subtitle2" fontSize={'16px'} maxWidth={'200px'} fontWeight={400} className="truncate">
                    {data.fullname}
                </Typography>
            </TableCell>
            {/* email */}
            <TableCell align="left">
                <Typography color="textSecondary" variant="subtitle2" fontSize={'16px'} maxWidth={'200px'} fontWeight={400} className="truncate">
                    {data.email}
                </Typography>
            </TableCell>
            {/* gender */}
            <TableCell align="left">
                <Typography color="textSecondary" variant="subtitle2" fontSize={'16px'} maxWidth={'200px'} fontWeight={400} className="truncate">
                    {data.gender ? 'Male' : 'Female'}
                </Typography>
            </TableCell>
            {/* phone */}
            <TableCell align="center">{data.phone || 'Not yet'}</TableCell>
            {/* role */}
            <TableCell align="center">{formatRole((data.role as RoleType) || 'ROLE_USER')}</TableCell>

            <TableCell align="center">
                {(() => {
                    const conditionShowBtn = contants.roles.manageRoles.includes(data.role);
                    return (
                        <Tooltip title={`Delete ${data.username}`}>
                            <Button disabled={conditionShowBtn} onClick={() => handleDeleteUser(data.id as string)}>
                                <FontAwesomeIcon
                                    className={classNames('text-lg', {
                                        'text-red-400': !conditionShowBtn,
                                        'text-gray-400': conditionShowBtn,
                                    })}
                                    icon={faTrash}
                                />
                            </Button>
                        </Tooltip>
                    );
                })()}
                <Link href={links.adminFuntionsLink.users.detail + data.id}>
                    <Tooltip title={'profile ' + data.username}>
                        <Button>
                            <FontAwesomeIcon className="text-lg" icon={faChevronRight} />
                        </Button>
                    </Tooltip>
                </Link>
            </TableCell>
        </TableRow>
    );
}
