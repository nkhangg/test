'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Avatar, Box, Menu, Button, IconButton, MenuItem, ListItemIcon, ListItemText } from '@mui/material';

import { IconListCheck, IconMail, IconUser } from '@tabler/icons-react';
import { useAppSelector } from '@/hooks/reduxHooks';
import { RootState } from '@/configs/types';

const Profile = () => {
    const { user } = useAppSelector((state: RootState) => state.userReducer);

    const [anchorEl2, setAnchorEl2] = useState(null);
    const handleClick2 = (event: any) => {
        setAnchorEl2(event.currentTarget);
    };
    const handleClose2 = () => {
        setAnchorEl2(null);
    };

    return (
        <Box>
            <IconButton
                size="large"
                aria-label="show 11 new notifications"
                color="inherit"
                aria-controls="msgs-menu"
                aria-haspopup="true"
                sx={{
                    ...(typeof anchorEl2 === 'object' && {
                        color: 'primary.main',
                    }),
                }}
                onClick={handleClick2}
            >
                <Avatar
                    src={user?.avatar || 'https://kenh14cdn.com/thumb_w/660/203336854389633024/2022/5/27/file-20211105-9897-18ahqx2-16536186456441909489573.jpg'}
                    alt="image"
                    sx={{
                        width: 35,
                        height: 35,
                    }}
                />
            </IconButton>
            {/* ------------------------------------------- */}
            {/* Message Dropdown */}
            {/* ------------------------------------------- */}
            <Menu
                id="msgs-menu"
                anchorEl={anchorEl2}
                keepMounted
                open={Boolean(anchorEl2)}
                onClose={handleClose2}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                sx={{
                    '& .MuiMenu-paper': {
                        width: '200px',
                    },
                }}
            >
                <MenuItem>
                    <ListItemIcon>
                        <IconListCheck width={20} />
                    </ListItemIcon>
                    <ListItemText>
                        <Link href={'/'}>Website</Link>
                    </ListItemText>
                </MenuItem>
                <Box mt={1} py={1} px={2}>
                    <Button href="/authentication/login" variant="outlined" color="primary" component={Link} fullWidth>
                        Logout
                    </Button>
                </Box>
            </Menu>
        </Box>
    );
};

export default Profile;
