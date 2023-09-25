'use client';
import React, { memo, useEffect, useState } from 'react';
import { Select, TextField } from '..';
import { FormControl, Input, InputLabel, MenuItem, Select as Sl, SelectChangeEvent, capitalize } from '@mui/material';
import { SortType } from '@/configs/types';
export interface ISortProps {
    categories: { title: string; value: string }[];
    sorts: { title: string; value: string }[];
    onCategories?: (value: SortType) => void;
    onSorts?: (value: SortType) => void;
    onSearch?: (value: string) => void;
}

function Sort({ categories, sorts, onCategories, onSorts, onSearch }: ISortProps) {
    const [category, setCategory] = useState('');
    const [sort, setSort] = useState('');
    const [search, setSearch] = useState('');

    const handleChangeCategory = (event: SelectChangeEvent<any>) => {
        setCategory(event.target.value as string);
        if (onCategories) {
            onCategories((event.target.value as string) === '' ? null : (event.target.value as string));
        }
    };
    const handleChangeSort = (event: SelectChangeEvent<any>) => {
        setSort(event.target.value as string);
        if (onSorts) {
            onSorts((event.target.value as string) === '' ? null : (event.target.value as string));
        }
    };

    useEffect(() => {
        if (!onSearch) return;
        onSearch(search);
    }, [search, onSearch]);

    return (
        <div className="flex md:flex-row flex-col justify-between gap-[38px] border-b border-[#DBDBDB] mt-24 pb-[22px]">
            <div className="w-full md:w-[24%] lg:w-[20%] h-full text-black-main select-none">
                <TextField
                    autoFocus
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
                                    {categories.map((category) => {
                                        return (
                                            <MenuItem key={category.value} value={category.value}>
                                                {capitalize(category.title)}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </div>
                    </div>

                    <div className="w-[28%] lg:w-[14%]">
                        <FormControl fullWidth size="small">
                            <Sl
                                sx={{
                                    '.MuiOutlinedInput-notchedOutline': { border: 0 },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        border: '1px solid transparent',
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'transparent',
                                    },
                                }}
                                displayEmpty
                                id="sorts"
                                value={sort}
                                onChange={handleChangeSort}
                            >
                                {sorts.map((sort) => {
                                    return (
                                        <MenuItem key={sort.value} value={sort.value}>
                                            {capitalize(sort.title)}
                                        </MenuItem>
                                    );
                                })}
                            </Sl>
                        </FormControl>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(Sort);
