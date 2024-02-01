const commonAdmin = '/admin/dashboard';
const commonPet = '/pet/';

export const links = {
    home: '/',
    pet: commonPet,
    produt: '/product/',
    products: '/take-action/',
    admin: commonAdmin + '/',
    adminMidleware: commonAdmin,
    adminFuntionsLink: {
        product: {
            create: commonAdmin + '/product/create',
            index: commonAdmin + '/product',
        },
        users: {
            detail: commonAdmin + '/users/',
            create: commonAdmin + '/users/create',
        },
        pets: {
            create: commonAdmin + '/pets/create',
            detail: commonAdmin + '/pets/',
            index: commonAdmin + '/pet',
        },
        orders: {
            index: commonAdmin + '/orders',
        },
        feedbacks: {
            index: commonAdmin + '/feedbacks',
        },
    },
    auth: {
        login: '/login',
        register: '/register',
        resetPassword: '/reset-password',
    },
    users: {
        payment: '/payment',
        cart: '/cart',
        profile: '/profile',
    },
    history: {
        orderHistory: '/other-history',
    },
    reviews: {
        management: commonAdmin + '/reviews',
    },
    message: commonAdmin + '/message',
    profile: {
        notification: '/profile/notification',
    },
    pets: {
        adopt: commonPet + 'adopt',
        adoptPage: '/adopt',
        ask: '/ask-condition',
    },
};
