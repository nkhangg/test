import { IOtherHistories, IOtherHistory } from '@/configs/interface';

export const dataOrtherHistory = {
    data: [
        {
            id: 1235,
            datePlace: new Date().toDateString(), // string dang Sun Oct 15 2023 or '12/2/2023'
            state: 'buy',
            stateMessage: 'Delivery on October 2, 2023',
            total: 100000,
            products: [
                {
                    id: 1,
                    brand: 'Royal Canin',
                    size: 200,
                    image: 'https://bizweb.dktcdn.net/100/362/345/products/xsmalladult-a81506df-ac29-4e87-8bd8-153192be5792.jpg?v=1571057515367',
                    name: 'Hạt Royal Canin X-Small Adult Cho Chó Trưởng Thành Giống Siêu Nhỏ',
                    price: 27000,
                    quantity: 1,
                    repo: 10,
                },
                {
                    id: 2,
                    brand: 'Zenith',
                    size: 200,
                    image: 'https://bizweb.dktcdn.net/100/438/021/products/56f71624-5d8b-4bcb-87ad-c23832bd1c46.jpg?v=1640251015190',
                    name: 'Hạt Mềm Cho Chó Trưởng Thành Zenith Adult',
                    price: 27000,
                    quantity: 1,
                    repo: 10,
                },
            ],
        },
        {
            id: 1236,
            datePlace: new Date().toDateString(),
            stateMessage: 'Delivery on October 2, 2023 ',
            state: 'cancel',
            total: 100000,
            products: [
                {
                    id: 2,
                    brand: 'Zenith',
                    size: 200,
                    image: 'https://bizweb.dktcdn.net/100/438/021/products/56f71624-5d8b-4bcb-87ad-c23832bd1c46.jpg?v=1640251015190',
                    name: 'Hạt Mềm Cho Chó Trưởng Thành Zenith Adult',
                    price: 27000,
                    quantity: 1,
                    repo: 10,
                },
            ],
        },
    ],
    pages: 10,
} as IOtherHistories;
