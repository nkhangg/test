import { useDebounce } from '@/hooks';
import Tippy from '@tippyjs/react/headless';
import React, { ChangeEvent, forwardRef, useCallback, useEffect, useRef, useState, Ref, FocusEvent, memo } from 'react';
import TextField from '../TextField';
import { IDistrict, IProvinces, IWard } from '@/configs/interface';
import classNames from 'classnames';
import Validate from '@/utils/validate';
import { capitalize } from '@mui/material';

export interface IAddressItemProps {
    data: IProvinces[] | IDistrict[] | IWard[] | undefined | null;
    placeholder?: string;
    title: string;
    messageUndefined?: string;
    initData?: string;
    name: 'province' | 'district' | 'ward';
    onValue?: (value: IProvinces | IDistrict | IWard | undefined) => void;
    onValidate?: (validateFuc: () => boolean) => void;
}

function AddressItem({ data, placeholder, title, messageUndefined, initData, name, onValue, onValidate }: IAddressItemProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [showPopup, setShowPopup] = useState(false);
    const [value, setValue] = useState(initData || '');
    const [width, setWidth] = useState(0);
    const [error, setError] = useState('');

    const debounceValue = useDebounce(value, 500);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const handleClickItem = (item: string) => {
        setValue(item);
        setShowPopup(false);
        setError('');
    };

    const validate = () => {
        const { error, message } = Validate.address(value, capitalize(name));

        setError(message);

        return error;
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        const { error, message } = Validate.address(e.target.value, capitalize(name));

        setError(message);
    };

    useEffect(() => {
        if (!ref.current) return;

        setWidth(ref.current.clientWidth);
    }, [ref]);

    useEffect(() => {
        if (!onValue) return;

        if (!data) return;

        const item = data.find((i) => {
            return i.name === debounceValue;
        });

        onValue(item);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounceValue]);

    useEffect(() => {
        if (data === null) {
            setValue('');
        }
    }, [data]);

    useEffect(() => {
        if (!onValidate) return;

        onValidate(validate);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [validate]);

    const renderData = useCallback(() => {
        if (!data) return <li className="text-center">{messageUndefined || 'Please choose ' + (placeholder && placeholder.toLowerCase())}</li>;

        let curData = [...data];

        if (debounceValue.length > 0) {
            curData = data.filter((item) => {
                return item.name.toLowerCase().includes(debounceValue.toLowerCase());
            });
        }

        if (!curData.length) {
            return <li className="text-center">No results</li>;
        }

        return curData.map((item) => {
            return (
                <li onClick={() => handleClickItem(item.name)} className={classNames('py-[6px] hover:bg-[rgba(93,135,255,0.08)] px-[14px] text-sm cursor-pointer')} key={item.code}>
                    {item.name}
                </li>
            );
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounceValue, data]);
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">{title}</label>
            <Tippy
                interactive
                visible={showPopup}
                placement="bottom-start"
                onClickOutside={() => setShowPopup(false)}
                render={(attr) => {
                    return (
                        <div style={{ width: width }} tabIndex={-1} {...attr} className={'h-[240px] bg-white border border-gray-primary rounded py-2'}>
                            <ul
                                className={classNames('scroll overflow-y-auto w-full h-full', {
                                    'flex items-center justify-center': !data,
                                })}
                            >
                                {renderData()}
                            </ul>
                        </div>
                    );
                }}
            >
                <div ref={ref} className="w-full ">
                    <TextField
                        message={error}
                        autoComplete={name}
                        onBlur={!showPopup ? handleBlur : undefined}
                        name={name}
                        value={value}
                        onChange={handleChange}
                        placeholder={placeholder}
                        onClick={() => setShowPopup(true)}
                        size="small"
                    />
                </div>
            </Tippy>
        </div>
    );
}

export default memo(AddressItem);
