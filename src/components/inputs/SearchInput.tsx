import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ChangeEvent, memo } from 'react';
import { WrapperAnimation } from '..';

export interface ISearchInputProps {
    value: string;
    placeholder?: string;
    handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    handleClose?: () => void;
}

function SearchInput({ value, placeholder, handleChange, handleClose }: ISearchInputProps) {
    return (
        <div className="flex items-center border border-gray-primary rounded py-2 px-4">
            <input value={value} onChange={handleChange} name="search" className="flex-1 outline-none mr-2" placeholder={placeholder || 'Search for'} type="text" />
            <WrapperAnimation onClick={handleClose} hover={{}} className="flex items-center justify-center cursor-pointer">
                <FontAwesomeIcon className="text-[#A4A4A4] h-4 w-4" icon={value.length > 0 ? faXmark : faMagnifyingGlass} />
            </WrapperAnimation>
        </div>
    );
}
export default memo(SearchInput);
