import { UserFormType } from './types';

export interface Action<T, P> {
    readonly type: T;
    readonly data?: P;
}

export interface IUser {
    id?: number;
    username: string;
    password: string;
    email?: string;
}
export interface ISignDataResponse {
    message: string;
    token: string;
    errors: UserFormType | null;
}

export interface IProfile {
    id: string;
    username: string;
    fullname: string;
    birthday: string; // Cứ trả về Date trong java bình thường
    gender: boolean;
    phone: string;
    address: string;
    email: string;
    avatar: string;
    role: string;
    createAt: string;
}

export interface IInitAppStoreState {
    numberCart: number;
    user: IUser | null;
    notifycation: INotifycationProps;
}

export interface IPet {
    id: string | number;
    name: string;
    image: string;
    breed: string;
    type: string;
    size: string;
    sex: string;
    fostered: string | number;
    description: string;
    fosterDate: number;
    like: boolean;
}
export interface IProduct {
    id: string | number;
    name: string;
    image: string;
    brand: string;
    size: string[] | number[];
    rating: number;
    price: number;
    oldPrice: number;
    discount: number;
}

export interface IDetailProduct {
    id: string;
    brand: string;
    discount: number;
    image: string;
    name: string;
    rating: number;
    images: string[];
    desciption: string;
    sizeAndPrice: SizeAndPrice[];
    suggestions: IProduct[];
}

export interface ISizeAndPrice {
    size: number;
    price: number;
    oldPrice: number;
    repo: number;
}

export interface IPost {
    id: number | string;
    title: string;
    thumbnail: string;
    contents: string;
    createdAt: string | number;
    updatedAt: string | number;
}

export interface IPostsPreview {
    primary: IPost;
    propose: IPost[];
}

export interface ICart {
    id: string | number;
    image: string;
    name: string;
    branch: string;
    size: string | number;
    price: number;
    quantity: number;
    repo: number;
    checked?: boolean;
}

export interface IChart {
    title: string[]; // mảng các tháng
    data: {
        name: string; // tên mảng dữ liệu
        data: number[]; // mảng dữ liệu
    };
}
export interface IImpactOfYear {
    title: string; // mảng các tháng
    data: number;
}

export interface IStatisDashboard {
    revenue: ICart;
    product: IChart;
    impactOfYear: IImpactOfYear[];
}

export interface IBaseResponse<T> {
    message: string;
    status: number;
    errors: boolean;
    data: T;
}

export interface ApiTakeAction {
    newArrivals: IProduct[];
}

export interface ApiBestSeller {
    data: IProduct[];
    pages: number;
}

// phân trang
export interface IOtherHistory {
    id: string | number;
    datePlace: string | number;
    total: number;
    state: 'buy' | 'cancel'; // vd buy | cancel
    stateMessage: string; //vd: Delivery on October 1, 2023
    products: ICart[];
}

export interface IOtherHistories {
    data: IOtherHistory[];
    paginationTotal: 10; // số lượng trang ( vd: phân được 10 trang )
}

export interface IDashboard {
    reports: {
        dailyOrders: IReport;
        dailyRevenue: IReport;
        users: IReport;
    };
    salesOverview: {
        revenue: IDataCharts;
        productRevenueByType: IDataCharts;
    };
    productRevenueByDate: {
        data: IProductRevenueTableItem[];
        total: number;
    };
}

export interface IReports {
    reports: {
        dailyOrders: IReport;
        dailyRevenue: IReport;
        users: IReport;
    };
}

export interface ISalesOverviews {
    salesOverview: {
        revenue: IDataCharts;
        productRevenueByType: IDataCharts;
    };
}

export interface IProductRevenue {
    productRevenueByDate: {
        data: IProductRevenueTableItem[];
        total: number;
    };
}

export interface IProductRevenueTableItem {
    id: string | number;
    name: string;
    brand: string;
    quantity: number;
    size: number;
    revenue: number;
}

export interface IReport {
    value: number;
    percentYesterday?: number;
}

export interface IDataCharts {
    categories: string[];
    data: IDataChart[];
    total: number;
}

export interface IDataChart {
    name: string;
    data: number[];
}

export interface IRepository {
    size: number;
    quantity: number;
    inPrice: number;
    outPrice: number;
}
