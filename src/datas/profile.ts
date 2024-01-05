import { faBell, faClockRotateLeft, faLocationDot, faLock, faRightFromBracket, faUserPen } from '@fortawesome/free-solid-svg-icons';

export const profileUiData = {
    listMethod: [
        {
            title: 'my profile',
            icon: faUserPen,
            link: '/profile',
        },
        {
            title: 'CHANGE PASSWORD',
            icon: faLock,
            link: '/profile/change-password',
        },
        {
            title: 'NOTIFICATION',
            icon: faBell,
            link: '/profile/notification',
        },
        {
            title: 'ADDRESS',
            icon: faLocationDot,
            link: '/profile/addresses',
        },
        {
            title: 'ORDER HISTORY',
            icon: faClockRotateLeft,
            link: '/other-history',
        },
        {
            title: 'LOG OUT',
            icon: faRightFromBracket,
            link: '/log-out',
        },
    ],
};
