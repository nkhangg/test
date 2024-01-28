'use client';
import React, { MouseEvent, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import WraperDialog from '../WraperDialog';
import { AddressItem, AddressTippy, LoadingSecondary, MapWraper, SocialButton, WrapperAnimation } from '@/components';
import { IAddress, IDistrict, IInfoAddress, IMessage, IProvinces, IWard } from '@/configs/interface';
import { getDistrichts, getProvinces, getWards } from '@/apis/outside';
import { useQuery } from '@tanstack/react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCompass, faLocationDot, faMap, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';
import { Tooltip } from '@mui/material';
import Markers from './Markers';
import { Point, RootState } from '@/configs/types';
import { Address } from '@/components/inputs/address/Address';
import { geocodeByAddress, geocodeByLatLng, getLatLng } from 'react-google-places-autocomplete';
import Directions from './Directions';
import { getAddresses } from '@/apis/user';
import { ChatFooterContext } from '@/components/chats/ChatFooter';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { contants } from '@/utils/contants';
import { getAddressesWithUsernameByAdmin } from '@/apis/admin/addresses';
import firebaseService from '@/services/firebaseService';
import { toast } from 'react-toastify';
import { clearDataMap } from '@/redux/slice/chatSlice';
import { delay } from '@/utils/funtionals';
export interface IMapDialogProps {
    open: boolean;
    setOpen: (v: boolean) => void;
}

const initAddress = {
    district: {
        code: 0,
        codename: '',
        name: '',
        province_code: 0,
    },
    province: {
        code: 0,
        codename: '',
        name: '',
        phone_code: 1,
    },
    ward: {
        code: 0,
        codename: '',
        district_code: 0,
    },
} as Address;

export default function MapDialog({ open, setOpen }: IMapDialogProps) {
    const { params, conversationId } = useContext(ChatFooterContext);

    // redux
    const dispath = useAppDispatch();
    const dataChatItem = useAppSelector((state: RootState) => state.chatReducer);
    const { user } = useAppSelector((state: RootState) => state.userReducer);

    //use Query
    const { data } = useQuery({
        queryKey: ['getProvinces'],
        queryFn: () => getProvinces(),
    });

    //use Query
    const dataAddress = useQuery({
        queryKey: ['getAddresses', params],
        queryFn: () => {
            if (params && user && contants.roles.manageRoles.includes(user.role)) {
                return getAddressesWithUsernameByAdmin(params.username);
            }

            return getAddresses();
        },
    });

    const [districhs, setDistrichs] = useState<IDistrict[] | undefined | null>(undefined);
    const [wards, setWards] = useState<IWard[] | undefined | null>(undefined);

    const [loading, setLoading] = useState(true);

    const [openNav, setOpenNav] = useState(false);

    const [coordes, setCoordes] = useState<null | Point>(null);

    const position = { lat: Number(process.env.NEXT_PUBLIC_LAT), lng: Number(process.env.NEXT_PUBLIC_LNG) };

    const [toDirection, setToDirection] = useState<string | null>(null);

    const [address, setAddress] = useState<Address | null>({
        province: undefined,
        district: undefined,
        ward: undefined,
    });

    const [iniDataAddress, setIniDataAddress] = useState<Address | null>(null);

    const [curAddressLocation, setCurAddressLocation] = useState<string | null>(null);

    const handleToogle = () => {
        setOpenNav((prev) => !prev);
    };

    const getLocation = async (value: string) => {
        const results = await geocodeByAddress(value);

        const latLng = await getLatLng(results[0]);

        return latLng;
    };

    const adddressToString = () => {
        if (!address) return '';
        const names = [address.ward?.name, address.district?.name, address.province?.name];

        return names.join(', ');
    };

    const validate = () => {
        if (!address) return true;
        return Object.values(address).some((item) => !item);
    };

    const handleGetYourLocaiton = async () => {
        if (!curAddressLocation) {
            navigator.geolocation.getCurrentPosition(async ({ coords: { latitude, longitude } }) => {
                setCoordes({
                    lat: latitude,
                    lng: longitude,
                } as Point);

                const results = await geocodeByLatLng({ lat: latitude, lng: longitude });

                if (results[0] && results[0]?.formatted_address) {
                    setCurAddressLocation(results[0]?.formatted_address);

                    requestIdleCallback(() => {
                        setAddress(null);
                    });
                }
            });
        } else {
            handleClearCurLocation();
        }
    };

    const handleClearCurLocation = () => {
        setCurAddressLocation(null);
    };

    const hocValidateFN = (callback: Function) => {
        if (validate()) return;

        callback();
    };

    const handleShowOnMap = async () => {
        hocValidateFN(async () => {
            const { lat, lng } = await getLocation(adddressToString());

            setCoordes({ lat, lng } as Point);
        });
    };

    const handleShowDirection = async () => {
        if (curAddressLocation) {
            return setToDirection(curAddressLocation);
        }

        hocValidateFN(() => {
            setToDirection(adddressToString());
        });
    };

    const handleClickAddressItem = async (e?: MouseEvent<HTMLSpanElement>, data?: IInfoAddress) => {
        if (!data) return;

        const names = [data.address.ward, data.address.district, data.address.province];

        const { lat, lng } = await getLocation(names.join(', '));

        setCoordes({ lat, lng } as Point);

        const { province, district, ward } = initAddress;

        setIniDataAddress({
            province: { ...province, name: data.address.province } as IProvinces,
            district: { ...district, name: data.address.district } as IDistrict,
            ward: { ...ward, name: data.address.ward } as IWard,
        });

        requestIdleCallback(handleClearCurLocation);
    };

    const handleSendMap = async () => {
        const valid = validate();

        if (valid && !curAddressLocation) return;
        if (!user || !conversationId || !coordes) return;

        const data = {
            location: {
                ...coordes,
                yourLocation: !!curAddressLocation,
            } as Point,
            address: (valid
                ? curAddressLocation
                : {
                      province: address?.province?.name,
                      district: address?.district?.name,
                      ward: address?.ward?.name,
                      address: '',
                  }) as IMessage['address'],
        };

        try {
            const res = await firebaseService.handleSendMap(conversationId, user?.username, data, contants.roles.manageRoles.includes(user.role));
            if (!res) {
                return toast.warn(contants.messages.errors.handle);
            }

            setOpen(false);
        } catch (error) {
            console.log('Mapdialog/handleSendMap', error);
        }
    };

    const handleClose = () => {
        dispath(clearDataMap());
    };

    const center = useMemo(() => {
        if (dataChatItem.location && !coordes) {
            return dataChatItem.location;
        }

        return coordes || position;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataChatItem, coordes]);

    useEffect(() => {
        (async () => {
            if (!dataChatItem.address || !dataChatItem.location || loading) return;
            await delay(200);

            requestIdleCallback(() => {
                setOpenNav(true);
                // setCoordes(dataChatItem.location as Point);

                if (typeof dataChatItem.address === 'string' && dataChatItem.location?.yourLocation) {
                    setCurAddressLocation(dataChatItem.address);
                } else {
                    const { province, district, ward } = initAddress;

                    setIniDataAddress({
                        province: { ...province, name: (dataChatItem.address as IAddress).province } as IProvinces,
                        district: { ...district, name: (dataChatItem.address as IAddress).district } as IDistrict,
                        ward: { ...ward, name: (dataChatItem.address as IAddress).ward } as IWard,
                    });
                }
            });
        })();
    }, [dataChatItem, loading]);

    return (
        <WraperDialog
            sx={{
                '& .MuiPaper-root': {
                    borderRadius: '18px',
                },
            }}
            fullWidth={true}
            maxWidth={'xl'}
            open={open}
            setOpen={setOpen}
            onClose={handleClose}
        >
            <AnimatePresence>
                <div className="flex flex-col h-[76vh] w-full max-w-full overflow-hidden">
                    <div className="w-full h-full">
                        <MapWraper
                            onTilesLoaded={() => {
                                setLoading(false);
                            }}
                            fullscreenControl={false}
                            mapTypeControl={false}
                            mapId={process.env.NEXT_PUBLIC_MAP_ID}
                            center={center}
                            zoom={10}
                        >
                            <Markers point={position as Point} isShop={true} />

                            {coordes && <Markers point={coordes} isShop={Boolean(params && params.username && params.id) || false} />}
                            {dataChatItem.address && dataChatItem.location && (
                                <Markers
                                    username={dataChatItem.username || undefined}
                                    point={dataChatItem.location as Point}
                                    avartar={dataChatItem.avatar || undefined}
                                    isShop={dataChatItem.username === contants.usernameAdmin}
                                />
                            )}
                            {toDirection && <Directions to={toDirection} />}
                        </MapWraper>
                    </div>

                    {loading && (
                        <div className="absolute inset-0 w-full h-full bg-black-040 z-30">
                            <LoadingSecondary />
                        </div>
                    )}

                    <WrapperAnimation
                        onClick={handleToogle}
                        hover={{}}
                        className={classNames('absolute top-3 left-3 bg-white z-20 w-14 h-14 flex items-center justify-center rounded-full text-xl cursor-pointer', {})}
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </WrapperAnimation>

                    <AnimatePresence>
                        {openNav && (
                            <motion.div
                                initial={{
                                    x: -80,
                                    opacity: 0,
                                }}
                                exit={{
                                    x: -80,
                                    opacity: 0,
                                }}
                                animate={{
                                    x: 0,
                                    opacity: 1,
                                }}
                                className="absolute bg-transparent min-w-[400px]  max-w-[540px] h-full p-3"
                            >
                                <div className="rounded-xl bg-white w-full h-full flex items-center flex-col">
                                    <div className="text-center h-14 flex items-center justify-center text-lg font-medium  px-4">
                                        <span>Map</span>
                                    </div>

                                    <div className="overflow-x-hidden scroll flex flex-col gap-5 pb-5">
                                        {!curAddressLocation && (
                                            <div className="flex flex-col items-center gap-5 w-full justify-start mt-5 px-4">
                                                <ul className="flex flex-col gap-2 list-disc px-5 pr-1 w-full max-w-full">
                                                    <li className="text-xs italic text-gray-primary break-all">
                                                        For security and accuracy reasons, the exact address will not be displayed
                                                    </li>
                                                </ul>
                                                <AddressTippy
                                                    initData={(iniDataAddress && iniDataAddress.province?.name) || undefined}
                                                    name="province"
                                                    onValue={async (value) => {
                                                        setAddress({
                                                            ...address,
                                                            province: value as IProvinces,
                                                            district: undefined,
                                                            ward: undefined,
                                                        });

                                                        if (!value) {
                                                            setDistrichs(null);
                                                            setWards(null);
                                                            return;
                                                        }

                                                        try {
                                                            const response = await getDistrichts(value.code);

                                                            setDistrichs(null);
                                                            setWards(null);
                                                            if (response) {
                                                                setDistrichs(response.districts);
                                                                return;
                                                            }

                                                            setDistrichs(null);
                                                            setWards(null);
                                                        } catch (error) {
                                                            console.log(error);
                                                        }
                                                    }}
                                                    data={data}
                                                    label="Province"
                                                />
                                                <AddressTippy
                                                    initData={(iniDataAddress && iniDataAddress.district?.name) || undefined}
                                                    name="district"
                                                    messageUndefined="Please choose your province"
                                                    onValue={async (value) => {
                                                        if (!address) return;
                                                        setAddress({
                                                            ...address,
                                                            district: value as IDistrict,
                                                            ward: undefined,
                                                        });

                                                        if (!value) {
                                                            setWards(null);
                                                            return;
                                                        }

                                                        try {
                                                            const response = await getWards(value.code);

                                                            setWards(null);
                                                            if (response) {
                                                                setWards(response.wards);
                                                                return;
                                                            }
                                                            setWards(null);
                                                        } catch (error) {
                                                            console.log(error);
                                                        }
                                                    }}
                                                    data={districhs}
                                                    label="District"
                                                />
                                                <AddressTippy
                                                    name="ward"
                                                    initData={(iniDataAddress && iniDataAddress.ward?.name) || undefined}
                                                    messageUndefined="Please choose your district"
                                                    onValue={(value) => {
                                                        if (!address) return;

                                                        setAddress({
                                                            ...address,
                                                            ward: value as IWard,
                                                        });
                                                    }}
                                                    data={wards}
                                                    label="Ward"
                                                />
                                            </div>
                                        )}

                                        {curAddressLocation && (
                                            <div className="px-4 max-w-full mt-5 flex flex-col gap-3">
                                                <span className="text-1xl">Your location</span>
                                                <ul className="flex flex-col gap-2 list-disc px-5 w-full max-w-full">
                                                    <li className="text-xs italic text-gray-primary break-all">
                                                        The address displayed may not be accurate for your location. This information is only for illustration purpose
                                                    </li>
                                                    <li className="text-xs italic text-gray-primary">We do not store this data</li>
                                                </ul>
                                                <p className="text-1xl">{curAddressLocation}</p>
                                            </div>
                                        )}
                                        <div className="w-full mt-4  px-4">
                                            <div className="flex items-center justify-end text-xl gap-3">
                                                <Tooltip placement="top" title={'Show direction'}>
                                                    <div
                                                        onClick={handleShowDirection}
                                                        className={classNames('cursor-pointer active:scale-95 transition-all ease-linear ', {
                                                            ['text-black-main']: validate() || !toDirection,
                                                            ['text-red-primary']: !validate() && toDirection,
                                                        })}
                                                    >
                                                        <FontAwesomeIcon icon={faCompass} />
                                                    </div>
                                                </Tooltip>
                                                <Tooltip placement="top" title={'Get your location'}>
                                                    <div
                                                        onClick={handleGetYourLocaiton}
                                                        className={classNames('cursor-pointer active:scale-95 transition-all ease-linear', {
                                                            ['text-black-main']: !curAddressLocation,
                                                            ['text-red-primary']: curAddressLocation,
                                                        })}
                                                    >
                                                        <FontAwesomeIcon icon={faLocationDot} />
                                                    </div>
                                                </Tooltip>
                                            </div>
                                            <div className="flex items-center justify-between gap-4">
                                                <div className="flex-1">
                                                    <SocialButton onClick={handleShowOnMap} title="Show on map" maxWidth="max-w-full" background="#374151" icon={faMap} />
                                                </div>
                                                <div className="w-1/3">
                                                    <SocialButton
                                                        onClick={handleSendMap}
                                                        title="Send"
                                                        maxWidth="max-w-full"
                                                        disabled={validate() && !curAddressLocation}
                                                        background="#374151"
                                                        icon={faPaperPlane}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {dataAddress && dataAddress?.data && (
                                            <div className="w-full  px-4">
                                                {dataAddress.data.data.length > 0 ? (
                                                    dataAddress.data.data.map((address) => {
                                                        return <AddressItem handleClick={handleClickAddressItem} disableControll={true} key={address.id} data={address} />;
                                                    })
                                                ) : (
                                                    <div className="flex items-center justify-center h-[133px] border-b border-gray-primary">
                                                        <span>{"You don't have a delivery address yet"}</span>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </AnimatePresence>
        </WraperDialog>
    );
}
