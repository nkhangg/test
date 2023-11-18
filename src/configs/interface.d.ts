import exp from 'constants';
import { StateType, UserFormType } from './types';

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
    brand: string;
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
    errors: boolean | {};
    data: T;
}

export interface IApiTakeAction {
    newArrivals: IProduct[];
}

export interface IApiBestSeller {
    data: IProduct[];
    pages: number;
}

// phân trang
export interface IOtherHistory {
    id: string | number;
    datePlace: string | number;
    total: number;
    state: 'buy' | 'cancel' | 'Delivered'; // vd buy | cancel
    stateMessage: string; //vd: Delivery on October 1, 2023
    products: ICart[];
}

export interface IOtherHistories {
    data: IOtherHistory[];
    pages: number; // số lượng trang ( vd: phân được 10 trang )
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

export interface IDataFormPayment {
    fullname: string;
    address: string;
    phone: string;
    shippingFee: number;
    orderProducts: OrderProduct[];
}

export interface OrderProduct {
    productId: string;
    size: number;
    quantity: number;
}

export interface IOrderItem {
    id: number;
    size: number;
    quantity: number;
    total: number;
}

export interface IFilter {
    id: string | number[];
    name: string;
}

export interface TypesAndBrands {
    types: IFilter[];
    brands: IFilter[];
}

export interface IDataFilterPage {
    filterProducts: FilterProduct[];
    pages: number;
}

export interface IDataRequestFilter {
    brand?: string;
    stock?: boolean;
    minPrice?: string;
    maxPrice?: string;
    typeName?: string;
    page?: string;
    sort?: string;
    productName?: string;
}

export interface IProductManageList {
    id: string | number;
    image: string;
    name: string;
    brand: string;
    type: string;
    repo: IRepository[];
}

export interface PagiantionResponse<T> {
    data: T[];
    pages: number;
}

export type DataProductType = {
    id: string;
    name: string;
    type: string;
    brand: string;
    images: File[] | { id: string; image: string }[];
    repo: RepoType[];
    description: string;
};

export interface ProductInfo {
    id?: string;
    name: string;
    brand: string;
    type: string;
    description: string;
}

export interface IImage {
    id: number;
    name: string;
    image: string;
}

export interface IUserManage {
    id: string;
    username: string;
    fullname: string;
    birthday: string;
    gender: boolean;
    phone: string;
    avatar: string;
    email: string;
    role: string;
    createAt: string;
    password: string;
    active: boolean;
}

export interface IReview {
    id: number;
    avatar: string;
    name: string;
    rating: number;
    size: number;
    comment: string;
    createdAt: string;
}
export interface IDetailOrder {
    id: number;
    placedDate: string;
    state: String;
    name: string;
    phone: string;
    address: string;
    paymentMethod: string;
    deliveryMethod: string;
    products: IProductDetailOrders[];
    subTotal: number;
    shippingFee: number;
    total: number;
}

export interface IProductDetailOrders {
    id: string | number;
    image: string;
    name: string;
    brand: string;
    size: string | number;
    price: number;
    quantity: number;
    repo: number;
    isRate?: boolean;
}

export interface ISearchItem {
    id: number | string;
    title: string;
}

// outsite

export interface IProvinces {
    name: string;
    code: number;
    division_type: string;
    codename: string;
    phone_code: number;
    districts: IDistrict[];
}

export interface IDistrict {
    name: string;
    code: number;
    division_type: string;
    codename: string;
    province_code: number;
    wards: Ward[];
}

export interface IWard {
    name: string;
    code: number;
    division_type: string;
    codename: string;
    district_code: number;
}

export interface IAddress {
    province: string;
    district: string;
    ward: string;
    address: string;
}

export interface IInfoAddress {
    id: number;
    name: string;
    phone: string;
    address: IAddress;
    isDefault?: boolean;
}

export interface IFormChangePassword {
    password: string;
    newPassword: string;
    confirmPassword: string;
}

export interface IRowStatusOrders {
    id: number;
    user: string;
    price: number;
    placedData: string;
    status: StateType;
}

export interface IPayment {
    orderId: number;
    amount: number; //2000000
    isPaid: boolean;
    payAt: string; // 20231115224608 <=> yyyyMMddHHmmss,
    transactionNumber: number; // 14182407
    paymentMethod: {
        id: number; // 1 là cash 2 là banking tương ứng trong bảng [payment_method],
        method: string; // ATM cách thức chuyển khoản
    };
}

interface IOrderItem {
    productId: string;
    size: number;
    quantity: number;
}

interface IOrder {
    addressId: number; // id address
    deliveryId: number; // id phuong thuc van chuyen
    methodId: number; // id phuong thuc thanh toan
    ship: number; // phí ship
    orderItems: IOrderItem[];
}
