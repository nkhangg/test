import { ICart } from '@/configs/interface';

const keyCart: string = 'cart-user';

export const addCartTolocal = (data: ICart[]) => {
    localStorage.setItem(keyCart, JSON.stringify(data));
};

export const getCartFromLocal = () => {
    if (typeof window === 'undefined') {
        return [];
    }
    const store = localStorage?.getItem(keyCart);

    if (!store) {
        return [];
    }

    return JSON.parse(store);
};
