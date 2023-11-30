import { StateType } from '@/configs/types';

const baseApiProvince = 'https://provinces.open-api.vn/api/';
const baseApiGHTK = 'https://services.giaohangtietkiem.vn/';

const TOKEN_GHTK = 'dea4f0a9332fcc5d6c34f07a0f157ec6fe51e82e';

export const contants = {
    shopName: 'Pet Foster',
    avartarDefault: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    avartarAdminDefault: 'https://media-cdn-v2.laodong.vn/storage/newsportal/2023/8/15/1229028/Yujin-2.jpeg',
    usernameAdmin: 'management-admin',
    askConditions: [
        'Are you working or still in school?',
        'Have you received consent from your family/host/roommate to adopt your baby?',
        'When you go on a long trip, will you take your baby with you / will you send someone to take care of it?',
        'Are you raising any pet? Pets often like to roam free, so is your home area safe for pet?',
        'If you get a pet, do you intend to keep it on a leash or let it roam around?',
        'Adopting a pet from us requires a commitment to CARE - STERILIZATION - VACCINE. If you violate our commitment, we will unfortunately come and take the baby back & publicize your case on the page.',
    ],

    messages: {
        errors: {
            server: 'Something went wrong !',
            handle: 'There was an error during processing, please try again or contact customer service. Thanks',
            notFound: "Can't found this page.",
        },
        success: {
            payment: 'You have placed your order successfully. Thank you for your trust ❤️❤️❤️',
            review: 'Thank you for rating ❤️❤️❤️',
        },
        review: {
            whenEmpty: 'Let us know your satisfaction with the product',
            whenEmptyReason: 'Please let us know the reason for better service.',
        },
    },
    roles: {
        manageRoles: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN'],
        userRoles: ['ROLE_STAFF', 'ROLE_USER'],
    },
    apis: {
        provinces: baseApiProvince + 'p/',
        districts: (province: number | string) => {
            return baseApiProvince + `p/${province}?depth=2`;
        },
        wards: (district: number | string) => {
            return baseApiProvince + `d/${district}?depth=2`;
        },
        ghtk: {
            token: TOKEN_GHTK,

            shippingFee: baseApiGHTK + 'services/shipment/fee',
        },
    },

    animations: {
        addressForm: {
            custom: 1,

            initial: {
                x: 100,
                opacity: 0,
            },
            animate: {
                x: 0,
                opacity: 1,
            },
            exit: {
                x: -100,
                opacity: 0,
            },
        },
    },

    notify: {
        nonLogin: 'Please login to use !',
    },
    dataCard: [
        { id: 1, title: 'Express (in Can Tho)', business: '4 hours', price: 20000 },
        { id: 2, title: 'GHN', business: '2 - 6 business days', price: 45000 },
    ],
    stateCancel: ['cancelled', 'cancelled_by_admin', 'cancelled_by_customer'] as StateType[],
    styleMessageManagePage: {
        height: 'calc(100vh - 140px)',
    },
};
