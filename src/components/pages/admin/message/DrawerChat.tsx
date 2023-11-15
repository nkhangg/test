import { WrapperAnimation } from '@/components';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Box, Button, Divider, List, ListItem, ListItemButton, ListItemText, SwipeableDrawer } from '@mui/material';
import React from 'react';

export interface IDrawerChatProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function DrawerChat({ open, setOpen }: IDrawerChatProps) {
    const toggleDrawer = () => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event && event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
            return;
        }

        setOpen(!open);
    };

    return (
        <div>
            <React.Fragment>
                <SwipeableDrawer onClose={toggleDrawer()} onOpen={toggleDrawer()} anchor={'right'} open={open}>
                    <div className="md:w-[440px] h-full pt-9 px-5 text-black-main">
                        <div className="flex items-center justify-between font-bold text-xl">
                            <h2>Profile details</h2>
                            <WrapperAnimation onClick={toggleDrawer()} className="text-lg flex items-center justify-center cursor-pointer" hover={{}}>
                                <FontAwesomeIcon icon={faXmark} />
                            </WrapperAnimation>
                        </div>

                        <div className="flex flex-col items-center justify-center w-full mt-9 gap-3">
                            <Avatar
                                sx={{
                                    width: '102px',
                                    height: '102px',
                                    cursor: 'pointer',
                                }}
                                src="https://congluan-cdn.congluan.vn/files/content/2021/09/04/ahn-yu-jin-cuu-ca-si-nhom-izone-va-hang-loat-sao-han-mac-covid-19-224735591.jpg"
                            />
                            <h4 className="font-bold text-xl break-all">Ha Lam </h4>

                            <ul className="w-full flex flex-col justify-start gap-5">
                                <li>
                                    <span className="text-[#797878]">Phone</span>
                                    <p>964909321</p>
                                </li>
                                <li>
                                    <span className="text-[#797878]">Email</span>
                                    <p>hantlpc04927@gmail.com</p>
                                </li>
                                <li>
                                    <span className="text-[#797878]">Address</span>
                                    <p>132 3/2 Street, Hung Loi Ward, Ninh Kieu District</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </SwipeableDrawer>
            </React.Fragment>
        </div>
    );
}
