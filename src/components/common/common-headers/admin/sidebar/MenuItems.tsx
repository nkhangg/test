import { IconStars } from '@tabler/icons-react';
import { IconLayoutDashboard, IconBox, IconDog, IconUser, IconBoxSeam, IconMessage, IconBrandCake } from '@tabler/icons-react';
const Menuitems = [
    {
        navlabel: true,
        subheader: 'Home',
    },

    {
        id: 1,
        title: 'Dashboard',
        icon: IconLayoutDashboard,
        href: '/admin/dashboard',
    },
    {
        navlabel: true,
        subheader: 'management',
    },
    {
        id: 2,
        title: 'Products',
        icon: IconBox,
        href: '/admin/dashboard/product',
    },
    {
        id: 3,
        title: 'Pets',
        icon: IconDog,
        href: '/admin/dashboard/pet',
    },
    {
        id: 4,
        title: 'Users',
        icon: IconUser,
        href: '/admin/dashboard/users',
    },
    {
        navlabel: true,
        subheader: 'payment',
    },
    {
        id: 5,
        title: 'Orders',
        icon: IconBoxSeam,
        href: '/admin/dashboard/orders',
    },
    {
        id: 6,
        title: 'Reviews',
        icon: IconStars,
        href: '/admin/dashboard/reviews',
    },
    {
        navlabel: true,
        subheader: 'Message Management',
    },
    {
        id: 7,
        title: 'Message',
        icon: IconMessage,
        href: '/admin/dashboard/message/no-one',
    },
    {
        navlabel: true,
        subheader: 'Orther Management',
    },
    {
        id: 8,
        title: 'Brand',
        icon: IconBrandCake,
        href: '/admin/dashboard/brand',
    },
];

export default Menuitems;
