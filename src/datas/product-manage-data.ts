import { toGam } from '@/utils/format';

export const productManageData = {
    types: [
        {
            id: 'BF001',
            name: 'Bird food',
        },
        {
            id: 'CF001',
            name: 'Cat food',
        },
        {
            id: 'DF001',
            name: 'Dog food',
        },
        {
            id: 'MF001',
            name: 'Mouse food',
        },
        {
            id: 'PA001',
            name: 'Pet accessories',
        },
    ],
    branhs: [
        { id: 'Royal Canin', name: 'Royal Canin' },
        { id: 'Zenith', name: 'Zenith' },
    ],
    sizes: [
        {
            id: 100,
            name: toGam(100),
        },
        {
            id: 200,
            name: toGam(200),
        },
        {
            id: 300,
            name: toGam(300),
        },
        {
            id: 400,
            name: toGam(400),
        },
        {
            id: 1000,
            name: toGam(1000),
        },
    ],
};
