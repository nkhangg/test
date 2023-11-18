import { IReview } from '@/configs/interface';

export const reviews = [
    {
        id: 1,
        name: 'An Yujin',
        rating: 5,
        sizes: [200],
        avatar: 'https://i.bloganchoi.com/bloganchoi.com/wp-content/uploads/2023/04/ahn-yujin1.jpeg?fit=640%2C20000&quality=95&ssl=1',
        comment: 'The product quality is amazing. I was really pleased with the overall shopping experience',
        createAt: new Date().toDateString(),
    },
    {
        id: 2,
        name: 'An Yujin',
        rating: 5,
        sizes: [200],
        comment: 'The product quality is amazing. I was really pleased with the overall shopping experience',
        avatar: 'https://i.bloganchoi.com/bloganchoi.com/wp-content/uploads/2023/04/ahn-yujin1.jpeg?fit=640%2C20000&quality=95&ssl=1',
        createAt: new Date().toDateString(),
    },
    {
        id: 3,
        name: 'An Yujin',
        rating: 5,
        sizes: [200],
        comment: 'The product quality is amazing. I was really pleased with the overall shopping experience',
        avatar: 'https://i.bloganchoi.com/bloganchoi.com/wp-content/uploads/2023/04/ahn-yujin1.jpeg?fit=640%2C20000&quality=95&ssl=1',
        createAt: new Date().toDateString(),
    },
    {
        id: 4,
        name: 'An Yujin',
        rating: 2,
        sizes: [200],
        comment: 'The product quality is amazing. I was really pleased with the overall shopping experience',
        avatar: 'https://i.bloganchoi.com/bloganchoi.com/wp-content/uploads/2023/04/ahn-yujin1.jpeg?fit=640%2C20000&quality=95&ssl=1',
        createAt: new Date().toDateString(),
    },
    {
        id: 5,
        name: 'An Yujin',
        rating: 5,
        sizes: [200],
        comment: 'The product quality is amazing. I was really pleased with the overall shopping experience',
        avatar: 'https://i.bloganchoi.com/bloganchoi.com/wp-content/uploads/2023/04/ahn-yujin1.jpeg?fit=640%2C20000&quality=95&ssl=1',
        createAt: new Date().toDateString(),
    },
    {
        id: 6,
        name: 'An Yujin',
        rating: 5,
        sizes: [200],
        comment: 'The product quality is amazing. I was really pleased with the overall shopping experience',
        avatar: 'https://i.bloganchoi.com/bloganchoi.com/wp-content/uploads/2023/04/ahn-yujin1.jpeg?fit=640%2C20000&quality=95&ssl=1',
        createAt: new Date().toDateString(),
    },
    {
        id: 7,
        name: 'An Yujin',
        rating: 3,
        sizes: [200],
        comment: 'The product quality is amazing. I was really pleased with the overall shopping experience',
        avatar: 'https://i.bloganchoi.com/bloganchoi.com/wp-content/uploads/2023/04/ahn-yujin1.jpeg?fit=640%2C20000&quality=95&ssl=1',
        createAt: new Date().toDateString(),
    },
    {
        id: 8,
        name: 'An Yujin',
        rating: 4,
        sizes: [200],
        comment: 'The product quality is amazing. I was really pleased with the overall shopping experience',
        avatar: 'https://i.bloganchoi.com/bloganchoi.com/wp-content/uploads/2023/04/ahn-yujin1.jpeg?fit=640%2C20000&quality=95&ssl=1',
        createAt: new Date().toDateString(),
    },
] as IReview[];

interface IDataFormReview {
    productId: string;
    orderId: number;
    comment: string;
    rate: number; // 1 < rate <= 5
}

const formReview: IDataFormReview = {
    productId: 'SP001',
    orderId: 20,
    comment: 'good product !!!',
    rate: 5,
};
