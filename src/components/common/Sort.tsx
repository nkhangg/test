'use client';
import React, { memo, useEffect, useState } from 'react';
import { Select, TextField } from '..';
import { FormControl, Input, InputLabel, MenuItem, Select as Sl, SelectChangeEvent, capitalize } from '@mui/material';
import { SortType } from '@/configs/types';
import { IFilter } from '@/configs/interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { useDebounce } from '@/hooks';
export interface ISortProps {
    categories: IFilter[];
    sorts: { title: string; value: string }[];
    onCategories?: (value: SortType) => void;
    onSorts?: (value: SortType) => void;
    onSearch?: (value: string) => void;
}

function Sort({ categories, sorts, onCategories, onSorts, onSearch }: ISortProps) {
    const [category, setCategory] = useState('');
    const [sort, setSort] = useState<'high' | 'low'>('low');
    const [search, setSearch] = useState('');

    const searchDebounce = useDebounce(search, 800);

    const handleChangeCategory = (event: SelectChangeEvent<any>) => {
        setCategory(event.target.value as string);
        if (onCategories) {
            onCategories((event.target.value as string) === '' ? null : (event.target.value as string));
        }
    };

    useEffect(() => {
        if (!onSearch) return;
        onSearch(searchDebounce);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchDebounce]);

    useEffect(() => {
        if (!onSorts) return;
        onSorts(sort);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sort]);

    return (
        <div className="flex md:flex-row flex-col justify-between gap-[38px] border-b border-[#DBDBDB] mt-24 pb-[22px]">
            <div className="w-full md:w-[24%] lg:w-[20%] h-full text-black-main select-none">
                <TextField
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                    id="search-pet-1"
                    name="pet"
                    fullWidth
                    size="small"
                    placeholder="Search for pet..."
                />
            </div>
            <div className="flex-1">
                <div className="flex md:items-center flex-row w-full gap-3 justify-between">
                    <div className="flex items-center gap-[10px] flex-1">
                        <h4 className="text-lg">Categories:</h4>
                        <div className="w-full md:max-w-[210px]">
                            <FormControl fullWidth size="small">
                                <Select displayEmpty id="category" value={category} onChange={handleChangeCategory}>
                                    <MenuItem value={''}>{capitalize('all')}</MenuItem>
                                    {categories.map((category) => {
                                        return (
                                            <MenuItem key={category.name} value={category.name}>
                                                {capitalize(category.name)}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </div>
                    </div>

                    <div className="w-[28%] lg:w-[14%] flex items-center justify-end select-none">
                        <div onClick={() => setSort(sort === 'high' ? 'low' : 'high')} className="cursor-pointer flex items-center gap-2 justify-end h-full hover:underline">
                            <span className="text-lg">Sort</span>
                            <FontAwesomeIcon className="text-sm" icon={sort === 'high' ? faChevronUp : faChevronDown} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(Sort);
