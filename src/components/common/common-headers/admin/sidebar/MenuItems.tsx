import { IconAperture, IconCopy, IconLayoutDashboard, IconLogin, IconMoodHappy, IconTypography, IconUserPlus } from '@tabler/icons-react';

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
        subheader: 'manage',
    },
    {
        id: 2,
        title: 'Products',
        icon: IconTypography,
        href: '/admin/dashboard/product',
    },
    {
        id: 3,
        title: 'Pets',
        icon: IconCopy,
        href: '/admin/dashboard/pet',
    },
];

export default Menuitems;
