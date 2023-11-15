'use client';
import { ChatBody, ChatFooter, ChatItem, WrapperAnimation } from '@/components';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faBars, faBookmark, faChevronDown, faComment, faFaceSmile, faMagnifyingGlass, faPaperPlane, faPhotoFilm } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Grid } from '@mui/material';
import React, { ReactNode, useEffect, useState } from 'react';
import NavChatItem from './nav/NavChatItem';
import DrawerChat from './DrawerChat';

const Filter = () => {
    return (
        <div className="flex items-center justify-between w-full text-[#626262] gap-3 text-sm px-5">
            <div className="cursor-pointer bg-[#F2F2F2] px-5 py-2 rounded flex items-center gap-2 ">
                <span>All chat</span>
                <FontAwesomeIcon icon={faChevronDown} />
            </div>
            <div className="cursor-pointer flex-1 bg-[#F2F2F2] py-2 px-3">
                <div className="flex items-center justify-between  rounded  ">
                    <input placeholder="Search user" className="outline-none border-none bg-transparent flex-1" type="text" />
                    <WrapperAnimation hover={{}} className="w-full h-full flex items-center justify-center">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </WrapperAnimation>
                </div>
            </div>
        </div>
    );
};

const NavContainer = ({
    children,
    head,
}: {
    children: ReactNode;
    head: {
        title: string;
        icon: IconProp;
    };
}) => {
    return (
        <div className="mt-5">
            <div className="flex items-center gap-2 text-[#303B4E] font-medium text-1xl px-5">
                <FontAwesomeIcon icon={head.icon} />
                <h4 className="uppercase">{head.title}</h4>
            </div>
            <div className="mt-5">{children}</div>
        </div>
    );
};

export interface IMessagePageProps {}

export default function MessagePage(props: IMessagePageProps) {
    const style = {
        height: 'calc(100vh - 90px)',
    };

    const [open, setOpen] = useState(false);

    useEffect(() => {
        const html = document.querySelector('html');

        if (!html) return;
        html?.classList.add('drop-scroll');

        return () => {
            html?.classList.remove('drop-scroll');
        };
    }, []);
    return (
        <div style={style} className="w-full max-w-[100%] ">
            <Grid container spacing={1}>
                <Grid item lg={3}>
                    <div className="w-full h-full py-8 flex flex-col justify-between items-center gap-16  border-r border-gray-primary">
                        <h2 className=" px-5 text-center text-2xl font-semibold">CHAT MANAGEMENT</h2>
                        <div style={style} className="w-full flex flex-col gap-8  h-full">
                            <Filter />

                            {/* contents */}

                            <div className="scroll hide-scroll overflow-y-auto w-full h-full">
                                <NavContainer head={{ title: 'BOOKMARKED', icon: faBookmark }}>
                                    <NavChatItem
                                        data={{
                                            name: 'Qian Qian',
                                            content: 'haha',
                                            lastTime: new Date().toDateString(),
                                            avartar:
                                                'https://congluan-cdn.congluan.vn/files/content/2021/09/04/ahn-yu-jin-cuu-ca-si-nhom-izone-va-hang-loat-sao-han-mac-covid-19-224735591.jpg',
                                        }}
                                    />
                                </NavContainer>
                                <NavContainer head={{ title: 'ALL MESSAGES', icon: faComment }}>
                                    <NavChatItem
                                        data={{
                                            name: 'Qian Qian',
                                            content: 'haha',
                                            lastTime: new Date().toDateString(),
                                            avartar:
                                                'https://congluan-cdn.congluan.vn/files/content/2021/09/04/ahn-yu-jin-cuu-ca-si-nhom-izone-va-hang-loat-sao-han-mac-covid-19-224735591.jpg',
                                        }}
                                    />
                                    <NavChatItem
                                        data={{
                                            name: 'Qian Qian',
                                            content: 'haha',
                                            lastTime: new Date().toDateString(),
                                            avartar:
                                                'https://congluan-cdn.congluan.vn/files/content/2021/09/04/ahn-yu-jin-cuu-ca-si-nhom-izone-va-hang-loat-sao-han-mac-covid-19-224735591.jpg',
                                        }}
                                    />
                                    <NavChatItem
                                        data={{
                                            name: 'Qian Qian',
                                            content: 'haha',
                                            lastTime: new Date().toDateString(),
                                            avartar:
                                                'https://congluan-cdn.congluan.vn/files/content/2021/09/04/ahn-yu-jin-cuu-ca-si-nhom-izone-va-hang-loat-sao-han-mac-covid-19-224735591.jpg',
                                        }}
                                    />
                                    <NavChatItem
                                        data={{
                                            name: 'Qian Qian',
                                            content: 'haha',
                                            lastTime: new Date().toDateString(),
                                            avartar:
                                                'https://congluan-cdn.congluan.vn/files/content/2021/09/04/ahn-yu-jin-cuu-ca-si-nhom-izone-va-hang-loat-sao-han-mac-covid-19-224735591.jpg',
                                        }}
                                    />
                                    <NavChatItem
                                        data={{
                                            name: 'Qian Qian',
                                            content: 'haha',
                                            lastTime: new Date().toDateString(),
                                            avartar:
                                                'https://congluan-cdn.congluan.vn/files/content/2021/09/04/ahn-yu-jin-cuu-ca-si-nhom-izone-va-hang-loat-sao-han-mac-covid-19-224735591.jpg',
                                        }}
                                    />
                                    <NavChatItem
                                        data={{
                                            name: 'Qian Qian',
                                            content: 'haha',
                                            lastTime: new Date().toDateString(),
                                            avartar:
                                                'https://congluan-cdn.congluan.vn/files/content/2021/09/04/ahn-yu-jin-cuu-ca-si-nhom-izone-va-hang-loat-sao-han-mac-covid-19-224735591.jpg',
                                        }}
                                    />
                                    <NavChatItem
                                        data={{
                                            name: 'Qian Qian',
                                            content: 'haha',
                                            lastTime: new Date().toDateString(),
                                            avartar:
                                                'https://congluan-cdn.congluan.vn/files/content/2021/09/04/ahn-yu-jin-cuu-ca-si-nhom-izone-va-hang-loat-sao-han-mac-covid-19-224735591.jpg',
                                        }}
                                    />
                                    <NavChatItem
                                        data={{
                                            name: 'Qian Qian',
                                            content: 'haha',
                                            lastTime: new Date().toDateString(),
                                            avartar:
                                                'https://congluan-cdn.congluan.vn/files/content/2021/09/04/ahn-yu-jin-cuu-ca-si-nhom-izone-va-hang-loat-sao-han-mac-covid-19-224735591.jpg',
                                        }}
                                    />
                                    <NavChatItem
                                        data={{
                                            name: 'Qian Qian',
                                            content: 'haha',
                                            lastTime: new Date().toDateString(),
                                            avartar:
                                                'https://congluan-cdn.congluan.vn/files/content/2021/09/04/ahn-yu-jin-cuu-ca-si-nhom-izone-va-hang-loat-sao-han-mac-covid-19-224735591.jpg',
                                        }}
                                    />
                                    <NavChatItem
                                        data={{
                                            name: 'Qian Qian',
                                            content: 'haha',
                                            lastTime: new Date().toDateString(),
                                            avartar:
                                                'https://congluan-cdn.congluan.vn/files/content/2021/09/04/ahn-yu-jin-cuu-ca-si-nhom-izone-va-hang-loat-sao-han-mac-covid-19-224735591.jpg',
                                        }}
                                    />
                                    <NavChatItem
                                        data={{
                                            name: 'Qian Qian',
                                            content: 'haha',
                                            lastTime: new Date().toDateString(),
                                            avartar:
                                                'https://congluan-cdn.congluan.vn/files/content/2021/09/04/ahn-yu-jin-cuu-ca-si-nhom-izone-va-hang-loat-sao-han-mac-covid-19-224735591.jpg',
                                        }}
                                    />
                                    <NavChatItem
                                        data={{
                                            name: 'Qian Qian',
                                            content: 'haha',
                                            lastTime: new Date().toDateString(),
                                            avartar:
                                                'https://congluan-cdn.congluan.vn/files/content/2021/09/04/ahn-yu-jin-cuu-ca-si-nhom-izone-va-hang-loat-sao-han-mac-covid-19-224735591.jpg',
                                        }}
                                    />
                                    <NavChatItem
                                        data={{
                                            name: 'Qian Qian',
                                            content: 'haha',
                                            lastTime: new Date().toDateString(),
                                            avartar:
                                                'https://congluan-cdn.congluan.vn/files/content/2021/09/04/ahn-yu-jin-cuu-ca-si-nhom-izone-va-hang-loat-sao-han-mac-covid-19-224735591.jpg',
                                        }}
                                    />
                                </NavContainer>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item lg={9}>
                    <div style={style} className="w-full flex flex-col items-center justify-between px-8">
                        <div className="w-full flex justify-between items-center">
                            <div className="py-5  flex items-center justify-start w-full gap-2">
                                <Avatar
                                    sx={{ width: '50px', height: '50px', border: '2px solid #ccc' }}
                                    src="https://congluan-cdn.congluan.vn/files/content/2021/09/04/ahn-yu-jin-cuu-ca-si-nhom-izone-va-hang-loat-sao-han-mac-covid-19-224735591.jpg"
                                />
                                <div className="">
                                    <h4 className="font-medium">Yujinuser</h4>
                                    <div className="flex items-center gap-2 text-sm">
                                        <p>online</p> <small className="h-2 w-2 rounded-full block bg-green-5FA503"></small>
                                    </div>
                                </div>
                            </div>
                            <WrapperAnimation onClick={() => setOpen((prev) => !prev)} hover={{}} className="p-3 flex items-center justify-center cursor-pointer">
                                <FontAwesomeIcon icon={faBars} />
                            </WrapperAnimation>

                            <DrawerChat open={open} setOpen={setOpen} />
                        </div>
                        <ChatBody />
                        <ChatFooter />
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}
