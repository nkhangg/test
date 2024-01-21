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
    IBrand,
    IRowReviewTable,
    IReviewAdminFillterForm,
    IDataDetailReview,
    IPriceHistories,
    ISearchItem,
    IProduct,
    IReview,
    IReviewHasReplay,
    IProfileMessageManage,
    IProvinceOutside,
    IDistrictOutside,
    IWardOutside,
    IHomepage,
    IPetDetailPageResponse,
    IRequestFilterPet,
    IPet,
    IPetAttribute,
} from './interface';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { RolesName } from './enum';
export type ValidTags = keyof JSX.IntrinsicElements;

export type ApiGetUsers = () => Promise<IUser[]>;

export type ApiLogin = (data: UserFormType) => Promise<ISignDataResponse>;

export type ApiLoginWithFacebook = (data: UserLoginWithFacebookFormType) => Promise<ISignDataResponse>;

export type ApiLoginWithGoogle = (data: UserLoginWithGoogleFormType) => Promise<ISignDataResponse>;

export type TestOrders = () => Promise<ISignDataResponse>;

export type ApiRegister = (data: RegisterFormData) => Promise<ISignDataResponse>;

export type ApiTakeActionType = () => Promise<IBaseResponse<IApiTakeAction>>;

export type ApiDetailProductType = (idProduct: string) => Promise<IBaseResponse<IDetailProduct>>;

export type ApiPetDetailPage = (id: string) => Promise<IBaseResponse<IPetDetailPageResponse>>;

export type ApiPetFavorite = (id: string) => Promise<IBaseResponse<any>>;

export type ApiPetAttributes = () => Promise<IBaseResponse<IPetAttribute>>;

export type ApiFilterPets = (params: IRequestFilterPet) => Promise<IBaseResponse<PagiantionResponse<IPet>>>;

export type ApiReportType = () => Promise<IBaseResponse<IReports>>;

export type ApiSalesOverviewType = (year: string) => Promise<IBaseResponse<ISalesOverviews>>;

export type ApiRevenueDateType = (dates: { start?: string; end?: string }) => Promise<IBaseResponse<IProductRevenue>>;

export type ApiPayment = (data: IPayment) => Promise<IBaseResponse<any>>;

export type ApiCreateOrder = (data: IOrder) => Promise<IBaseResponse<string>>;

export type ApiBestSellerType = (page: number | undefined) => Promise<IBaseResponse<IApiBestSeller>>;

export type ApiHistory = (page?: number | undefined, status?: StateType | string) => Promise<IBaseResponse<IOtherHistories>>;

export type ApiDetailHistory = (id: string | number) => Promise<IBaseResponse<IDetailOrder>>;

export type ApiGetSearchHistories = () => Promise<IBaseResponse<ISearchItem[]>>;

export type ApiActionSearchHistories = (data: ISearchItem) => Promise<IBaseResponse<ISearchItem[]>>;

export type ApiGetRecentViews = () => Promise<IBaseResponse<IProduct[]>>;

export type ApiActionRecentViews = (id: string) => Promise<IBaseResponse<IProduct[]>>;

export type ApiTypesAndBrands = () => Promise<IBaseResponse<TypesAndBrands>>;

export type ApiResetPassword = (email: string) => Promise<IBaseResponse<any>>;

export type ApiChangePassword = (data: IFormChangePassword) => Promise<IBaseResponse<any>>;

export type ApiGetCurUser = () => Promise<IBaseResponse<IProfile>>;

export type ApiFilterPage = (data: IDataRequestFilter) => Promise<IBaseResponse<IDataFilterPage>>;

export type ApiHomePage = () => Promise<IBaseResponse<IHomepage>>;

export type ApiDetailProductManaege = (id: string) => Promise<IBaseResponse<DataProductType>>;

export type ApiDelete = (id: string) => Promise<IBaseResponse<any>>;

export type ApiUpdateProduct = (data: DataProductType) => Promise<IBaseResponse<any>>;

export type ApiCreateProduct = (data: DataProductType) => Promise<IBaseResponse<any>>;

export type ApiProductsManage = (page: number | undefined, filter: any) => Promise<IBaseResponse<PagiantionResponse<IProductManageList>>>;

export type ApiAllUser = (page: number | undefined, filter: any) => Promise<IBaseResponse<PagiantionResponse<IProfile>>>;

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

export type ApiGetPriceHistories = (id: string) => Promise<IBaseResponse<IPriceHistories[]>>;

export type ApiCreateImagesByProduct = (id: string, files: File[]) => Promise<IBaseResponse<any>>;

export type ApiDeleteImagesByProduct = (data: { id: string; idImage: number }) => Promise<IBaseResponse<any>>;

export type ApiUploadImageMessage = (images: ImageType[]) => Promise<IBaseResponse<string[]>>;

export type ApiGetUserManage = (id: string) => Promise<IBaseResponse<IUserManage>>;

export type ApiGetUserProfileMessageManage = (id: string) => Promise<IBaseResponse<IProfileMessageManage>>;

export type ApiUpdateUserManage = (data: IUserManage) => Promise<IBaseResponse<any>>;

export type ApiCreateUserManage = (data: IUserManage) => Promise<IBaseResponse<any>>;

export type ApiUpdateRoleUser = (data: { id: string; roleId: RolesName }) => Promise<IBaseResponse<any>>;

export type ApiHistories = () => Promise<IBaseResponse<IProfile>>;

export type ApiGetOrders = () => Promise<any>;

export type ApiGetFilterOrderAdmin = (data: IOrderAdminFillterForm, page: string | null) => Promise<IBaseResponse<{ orderFilters: IOrderAdminItem[]; pages: number }>>;

export type ApiGetDetailFilterOrderAdmin = (id: number | undefined) => Promise<IBaseResponse<IDetailOrder>>;

export type ApiUpdateStatusOrder = (data: UpdateStatusOrderType) => Promise<IBaseResponse<any>>;

export type ApiGetDefaultAddress = () => Promise<IBaseResponse<IInfoAddress>>;

export type ApiGetAddresses = () => Promise<IBaseResponse<IInfoAddress[]>>;

export type ApiGetAddressesById = (id: number) => Promise<IBaseResponse<IInfoAddress>>;

export type ApiHandleAddresses = (data: IInfoAddress) => Promise<IBaseResponse<IInfoAddress>>;

export type ApiCreateReivew = (data: IRequestReview) => Promise<IBaseResponse<IRequestReview>>;

export type ApiGetCartUser = () => Promise<IBaseResponse<ICart[]>>;

export type ApiUpdateCartUser = (data: ICart[]) => Promise<IBaseResponse<ICart[]>>;

export type ApiCreateCartUser = (data: ICart) => Promise<IBaseResponse<ICart>>;

export type ApiGetBrands = () => Promise<IBaseResponse<IBrand[]>>;

export type ApiGetReviews = (data: IReviewAdminFillterForm, page: string | null) => Promise<IBaseResponse<PagiantionResponse<IRowReviewTable>>>;

export type ApiGetReview = (id: string) => Promise<IBaseResponse<IDataDetailReview>>;

export type ApiReplayReview = (data: IReview) => Promise<IBaseResponse<any>>;

export type ApiFilterReviews = (data: { id: string; noReplay: boolean }) => Promise<IBaseResponse<IReviewHasReplay[]>>;

export type ApiActionBrand = (data: IBrand) => Promise<IBaseResponse<IBrand>>;

export type ApiProvinces<T> = (id?: string | number) => Promise<T>;

export type ApiProvincesOutside = (id?: string | number) => Promise<IProvinceOutside>;

export type ApiDistrictOutside = (data: IProvinceOutside, district: string) => Promise<IDistrictOutside>;

export type ApiWardOutside = (data: IDistrictOutside, ward: string) => Promise<IWardOutside>;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AddressCodeType = {
    province: number | null;
    district: number | null;
    ward: string | null;
};

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

export type UpdateStatusOrderType = {
    id: number;
    status: StateType;
    reason?: string;
};

export type RowOrderSummaryUpdateStatusType = Pick<ICart, 'id' | 'image' | 'name' | 'price' | 'quantity'>;

export type SortType = string | null;

export type LocationTileType = 'center' | 'left' | 'right';

export type PagesProfileType = 'me' | 'history' | 'logout';

export type ValidateType = { message: string; error: boolean };

export type UserFormType = { username: string; password: string };
export type UserLoginWithFacebookFormType = { username: string; uuid: string; avartar: string };
export type UserLoginWithGoogleFormType = { username: string; uuid: string; avartar: string; email: string };

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

export type RoleType = 'ROLE_USER' | 'ROLE_STAFF' | 'ROLE_ADMIN' | 'ROLE_SUPER';

export type StateType = 'placed' | 'shipping' | 'delivered' | 'cancelled' | 'cancelled_by_admin' | 'cancelled_by_customer';

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

export type HeadTabType = {
    title: string;
    icon: IconProp;
    styles?: {
        iconPosition: 'bottom' | 'top' | 'end' | 'start' | undefined;
    };
};

export type TypeNotification = 'success' | 'error' | 'warning' | 'info' | 'none';

export type TippyChooserType = {
    id: string;
    title: string;
};

export type ImageType = {
    link: string;
    data: File | null;
};
