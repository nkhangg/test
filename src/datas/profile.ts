import { faClockRotateLeft, faPersonRunning, faUserPen } from '@fortawesome/free-solid-svg-icons';

export const profileUiData = {
    listMethod: [
        {
            title: 'my profile',
            icon: faUserPen,
            link: '/profile',
        },
        {
            title: 'ORDER HISTORY',
            icon: faClockRotateLeft,
            link: '/other-history',
        },
        {
            title: 'LOG OUT',
            icon: faPersonRunning,
            link: '/log-out',
        },
    ],
};
