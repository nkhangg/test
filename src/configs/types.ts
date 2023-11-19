import { store } from '@/redux/store';

import {
    IOtherHistories,
    IApiBestSeller,
    IApiTakeAction,
    IBaseResponse,
    IDataFormPayment,
    IDetailProduct,
    IOrderItem,
    IProductRevenue,
    IProfile,
    IReports,
    ISalesOverviews,
    ISignDataResponse,
    IUser,
    TypesAndBrands,
    IDataFilterPage,
    IDataRequestFilter,
    PagiantionResponse,
    IProductManageList,
    DataProductType,
    ProductInfo,
    IImage,
    IUserManage,
    IInfoAddress,
    IFormChangePassword,
    IDetailOrder,
    IPayment,
    IOrder,
    IDataReview,
    IRequestReview,
    IOrderAdminItem,
    IOrderAdminFillterForm,
    ICart,
} from './interface';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
export type ValidTags = keyof JSX.IntrinsicElements;

export type ApiGetUsers = () => Promise<IUser[]>;

export type ApiLogin = (data: UserFormType) => Promise<ISignDataResponse>;

export type TestOrders = () => Promise<ISignDataResponse>;

export type ApiRegister = (data: RegisterFormData) => Promise<ISignDataResponse>;

export type ApiTakeActionType = () => Promise<IBaseResponse<IApiTakeAction>>;

export type ApiDetailProductType = (idProduct: string) => Promise<IBaseResponse<IDetailProduct>>;

export type ApiReportType = () => Promise<IBaseResponse<IReports>>;

export type ApiSalesOverviewType = (year: string) => Promise<IBaseResponse<ISalesOverviews>>;

export type ApiRevenueDateType = (dates: { start?: string; end?: string }) => Promise<IBaseResponse<IProductRevenue>>;

export type ApiPayment = (data: IPayment) => Promise<IBaseResponse<any>>;

export type ApiCreateOrder = (data: IOrder) => Promise<IBaseResponse<string>>;

export type ApiBestSellerType = (page: number | undefined) => Promise<IBaseResponse<IApiBestSeller>>;

export type ApiHistory = (page: number | undefined, status: StateType | string) => Promise<IBaseResponse<IOtherHistories>>;

export type ApiDetailHistory = (id: string | number) => Promise<IBaseResponse<IDetailOrder>>;

export type ApiTypesAndBrands = () => Promise<IBaseResponse<TypesAndBrands>>;

export type ApiResetPassword = (email: string) => Promise<IBaseResponse<any>>;

export type ApiChangePassword = (data: IFormChangePassword) => Promise<IBaseResponse<any>>;

export type ApiGetCurUser = () => Promise<IBaseResponse<IProfile>>;

export type ApiFilterPage = (data: IDataRequestFilter) => Promise<IBaseResponse<IDataFilterPage>>;

export type ApiDetailProductManaege = (id: string) => Promise<IBaseResponse<DataProductType>>;

export type ApiDelete = (id: string) => Promise<IBaseResponse<any>>;

export type ApiUpdateProduct = (data: DataProductType) => Promise<IBaseResponse<any>>;

export type ApiCreateProduct = (data: DataProductType) => Promise<IBaseResponse<any>>;

export type ApiProductsManage = (page: number | undefined) => Promise<IBaseResponse<PagiantionResponse<IProductManageList>>>;

export type ApiAllUser = (page: number | undefined) => Promise<IBaseResponse<PagiantionResponse<IProfile>>>;

export type ApiVerifyCode = (code: string) => Promise<IBaseResponse<any>>;

export type ApiRefreshVerifyCode = (code: string) => Promise<IBaseResponse<any>>;

export type ApiUpdateProductWithInfo = (id: string, data: ProductInfo) => Promise<IBaseResponse<ProductInfo>>;

export type ApiGetProductInfo = (id: string) => Promise<IBaseResponse<ProductInfo>>;

export type ApiUpdateCurUser = (data: DataRequestUpdateUser) => Promise<IBaseResponse<IProfile>>;

export type ApiGetRepositories = (id: string) => Promise<IBaseResponse<RepoType[]>>;

export type ApiAddARepository = (id: string, data: RepoType) => Promise<IBaseResponse<RepoType>>;

export type ApiUpdateARepository = (data: RepoType) => Promise<IBaseResponse<RepoType>>;

export type ApiDeleteARepository = (id: number) => Promise<IBaseResponse<RepoType>>;

export type ApiGetImagesByProduct = (id: string) => Promise<IBaseResponse<IImage[]>>;

export type ApiCreateImagesByProduct = (id: string, files: File[]) => Promise<IBaseResponse<any>>;

export type ApiDeleteImagesByProduct = (data: { id: string; idImage: number }) => Promise<IBaseResponse<any>>;

export type ApiGetUserManage = (id: string) => Promise<IBaseResponse<IUserManage>>;

export type ApiUpdateUserManage = (data: IUserManage) => Promise<IBaseResponse<any>>;

export type ApiCreateUserManage = (data: IUserManage) => Promise<IBaseResponse<any>>;

export type ApiHistories = () => Promise<IBaseResponse<IProfile>>;

export type ApiGetOrders = () => Promise<any>;

export type ApiGetFilterOrderAdmin = (data: IOrderAdminFillterForm) => Promise<IBaseResponse<IOrderAdminItem[]>>;

export type ApiGetDefaultAddress = () => Promise<IBaseResponse<IInfoAddress>>;

export type ApiGetAddresses = () => Promise<IBaseResponse<IInfoAddress[]>>;

export type ApiGetAddressesById = (id: number) => Promise<IBaseResponse<IInfoAddress>>;

export type ApiHandleAddresses = (data: IInfoAddress) => Promise<IBaseResponse<IInfoAddress>>;

export type ApiCreateReivew = (data: IRequestReview) => Promise<IBaseResponse<IRequestReview>>;

export type ApiGetCartUser = () => Promise<IBaseResponse<ICart[]>>;

export type ApiUpdateCartUser = (data: ICart[]) => Promise<IBaseResponse<ICart[]>>;

export type ApiCreateCartUser = (data: ICart) => Promise<IBaseResponse<ICart>>;

export type ApiProvinces<T> = (id?: string | number) => Promise<T>;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type RegisterFormData = {
    username: string;
    gender: string | boolean;
    fullname: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export type ProfileType = {
    fullname: string;
    email: string;
    phone: string;
    gender: string;
    birthday: string;
};

export type DataRequestUpdateUser = {
    fullname: string;
    email: string;
    phone: string;
    gender: string;
    birthday: string;
    avatar?: string;
};

export type RowOrderSummaryUpdateStatusType = Pick<ICart, 'id' | 'image' | 'name' | 'price' | 'quantity'>;

export type SortType = string | null;

export type LocationTileType = 'center' | 'left' | 'right';

export type PagesProfileType = 'me' | 'history' | 'logout';

export type ValidateType = { message: string; error: boolean };

export type UserFormType = { username: string; password: string };

export type RepoType = {
    id?: number;
    size: number;
    quantity: number;
    inPrice: number;
    outPrice: number;
};
export type RepoTypeErrors = {
    size: string;
    quantity: string;
    inPrice: string;
    outPrice: string;
};

export type ModeType = 'create' | 'update';

export type RoleType = 'ROLE_USER' | 'ROLE_STAFF' | 'ROLE_ADMIN' | 'ROLE_SUPER_ADMIN';

export type StateType = 'placed' | 'shipping' | 'delivered' | 'cancelled';

export type StatusColor = {
    placed: string;
    shipping: string;
    delivered: string;
    cancelled: string;
};

export type PaymentMethod = 'cash' | 'pre-payment';

export type MenuHeaderType = {
    title: string;
    href: string;
    icon: IconProp;
};
