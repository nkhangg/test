import exp from 'constants';
import { StateType, TypeNotification, UserFormType } from './types';
import { Timestamp } from 'firebase/firestore';

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
    displayName: string;
    provider: string;
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
    reviews: number;
    reviewItems: IReviewHasReplay[];
}

export interface IDataReview {
    star: number;
    content: string;
}

export interface IRequestReview extends IDataReview {
    orderId: number;
    productId: string;
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
    containVideo?: boolean;
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

export interface IHomepage {
    impactOfYear: any;
    pets: IPet[];
    postsPreview: IPost[];
}

export interface IPetDetail extends IPet {
    color: string;
    images: string[];
}

export interface IPetDetailPageResponse {
    pet: IPetDetail;
    orthers: IPet[];
}

// phân trang
export interface IOtherHistory {
    id: string | number;
    datePlace: string | number;
    total: number;
    state: 'buy' | 'cancel' | 'Delivered'; // vd buy | cancel
    stateMessage: string; //vd: Delivery on October 1, 2023
    isTotalRate: boolean;
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

export interface IDetailOrder {
    id: number;
    placedDate: string;
    state: String;
    name: string;
    phone: string;
    address: string;
    description: string;
    paymentMethod: string;
    deliveryMethod: string;
    products: IProductDetailOrders[];
    subTotal: number;
    shippingFee: number;
    total: number;
    expectedTime: string | null;
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

export interface IOrderItem {
    productId: string;
    size: number;
    quantity: number;
}

export interface IOrder {
    addressId: number; // id address
    deliveryId: number; // id phuong thuc van chuyen
    methodId: number; // id phuong thuc thanh toan
    ship: number; // phí ship
    orderItems: IOrderItem[];
}

export interface IOrderAdminItem {
    orderId: number;
    username: string;
    total: number;
    placedDate: string;
    status: string;
}

export interface IOrderAdminFillterForm {
    search: string;
    sort: string;
    dateStart: string;
    dateEnd: string;
    status: string;
}

export interface IReviewAdminFillterForm {
    search: string;
    sort: string;
    minStar: string;
    maxStar: string;
}

export interface IBrand {
    id: number;
    brand: string;
    createdAt?: string;
}

export interface IRowReviewTable {
    productId: string;
    productName: string;
    image: string;
    rate: number;
    lastest: string;
    reviews: number;
    commentNoRep: number;
}

export interface IReview {
    id: number;
    avatar: string;
    name: string;
    rating: number | null;
    sizes: number[] | null;
    comment: string;
    createAt: string;
}

export interface IReviewHasReplay extends IReview {
    replayItems: IReviewHasReplay[] | null;
}

export interface IDataDetailReview {
    id: string;
    name: string;
    image: string;
    rate: number;
    totalRate: number;
    detailRate: {
        five: number;
        four: number;
        three: number;
        two: number;
        one: number;
    };
    reviews: IReviewHasReplay[];
}

export interface IPriceHistories {
    id: number;
    newInPrice: number;
    newOutPrice: number;
    oldInPrice: number;
    oldOutPrice: number;
    updateAt: string;
    size: number;
    user: {
        id: string;
        fullname: string;
        avartar: string;
    };
}

export interface IConversation {
    users: string[];
    newMessage: string;
    sendAt: Timestamp;
    gim: boolean;
    seenMessage: boolean;
}

export interface IConversationId extends IConversation {
    id: string;
}

export interface IMessage {
    id: string;
    convertsationId: string;
    message: string;
    sendAt: Date;
    username: string;
    currentUser: string;
    recall: boolean;
    seen: boolean;
    images?: string[];
}

export interface IUserFirebase {
    username: string;
    avartar: string;
    lassSeen: Date;
    online?: boolean;
    keywords: string[];
    conversationId?: string;
    displayname?: string;
}

export interface INavChatItemData extends IUserFirebase {
    id: string;
    messages: string;
}

export interface IProfileMessageManage extends Pick<IProfile, 'id' | 'avatar' | 'username' | 'fullname' | 'phone' | 'email'> {
    address: string;
}

export interface IProvinceOutside {
    ProvinceID: number;
    ProvinceName: string;
    CountryID: number;
    Code: string;
    NameExtension: string[];
    IsEnable: number;
    RegionID: number;
    RegionCPN: number;
    UpdatedBy: number;
    CreatedAt: string;
    UpdatedAt: string;
    CanUpdateCOD: boolean;
    Status: number;
    UpdatedIP: string;
    UpdatedEmployee: number;
    UpdatedSource: string;
    UpdatedDate: string;
}

export interface IDistrictOutside {
    DistrictID: number;
    ProvinceID: number;
    DistrictName: string;
    Code: string;
    Type: number;
    SupportType: number;
    NameExtension: string[];
    IsEnable: number;
    UpdatedBy: number;
    CreatedAt: string;
    UpdatedAt: string;
    CanUpdateCOD: boolean;
    Status: number;
    PickType: number;
    DeliverType: number;
    ReasonCode: string;
    ReasonMessage: string;
    OnDates: any;
    UpdatedDate: string;
}

export interface IWardOutside {
    WardCode: string;
    DistrictID: number;
    WardName: string;
    NameExtension: string[];
    IsEnable: number;
    CanUpdateCOD: boolean;
    UpdatedBy: number;
    CreatedAt: string;
    UpdatedAt: string;
    SupportType: number;
    PickType: number;
    DeliverType: number;
    Status: number;
    ReasonCode: string;
    ReasonMessage: string;
    OnDates: any;
}

export interface INotification {
    id: string;
    title: string;
    content: string;
    createdAt: Timestamp | Date;
    deleted: boolean;
    photourl: string;
    read: string[];
    target: string[];
    type: TypeNotification;
    link: string | null;
    public?: boolean;
    options?: {
        start?: number | null;
        end?: number | null;
    };
}

export interface IImageDefaultNotification {
    id: string;
    type: TypeNotification;
    photourl: string;
    createdAt: Timestamp | Date;
    updatedAt: Timestamp | Date;
    file?: File;
}
