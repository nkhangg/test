import { IconCopy, IconLayoutDashboard, IconBox, IconDog, IconUser, IconBoxSeam } from '@tabler/icons-react';
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
];

export default Menuitems;
