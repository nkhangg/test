import { faBox, faBoxesStacked, faCarSide, faCircleCheck, faCircleXmark, faHeart, faRightFromBracket, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';

export const navbar = [
    { title: 'Home', href: '/' },
    { title: 'About', href: '/about' },
    { title: 'Take Action', href: '/take-action' },
    { title: 'Adopt', href: '/adopt' },
    { title: 'Contact', href: '/contact' },
    { title: 'Donation', href: '/donation', style: { border: true } },
];

export const listProfile = [
    {
        title: 'Profile',
        href: '/profile',
        icon: faUser,
    },
    {
        title: 'Cart',
        href: '/cart',
        style: { badge: true },
        icon: faShoppingCart,
    },
    {
        title: 'Favorite',
        href: '/favorite',
        icon: faHeart,
    },
    {
        title: 'Log out',
        href: '/log-out',
        icon: faRightFromBracket,
    },
];

export const dataHeadHistory = [
    {
        title: 'All order',
        icon: faBoxesStacked,
    },
    {
        title: 'Placed',
        icon: faBox,
    },
    {
        title: 'Shipping',
        icon: faCarSide,
    },
    {
        title: 'Delivered',
        icon: faCircleCheck,
    },
    {
        title: 'Cancelled',
        icon: faCircleXmark,
    },
];
