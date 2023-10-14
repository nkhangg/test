'use client';
import React, { InputHTMLAttributes, useEffect, useState } from 'react';
import { TextField } from '..';
import { MenuItem, TextFieldProps } from '@mui/material';

export interface IDivTextfieldProps {
    label: string;
    dataSelect?: { id: string; name: string }[];
    propsInput?: TextFieldProps & {
        message?: string;
    };
}

export default function DivTextfield({ label, propsInput, dataSelect }: IDivTextfieldProps) {
    return (
        <div className="flex flex-col justify-between gap-2 w-full">
            <label className="text-sm font-medium">{label}</label>
            {!dataSelect && <TextField spellCheck={false} id={label.toLowerCase().replaceAll(' ', '-')} {...propsInput} fullWidth size="small" />}

            {dataSelect && dataSelect.length && (
                <TextField select spellCheck={false} id={label.toLowerCase().replaceAll(' ', '-')} {...propsInput} fullWidth size="small">
                    {dataSelect.map((item) => {
                        return (
                            <MenuItem key={item.id} value={item.id} sx={{ fontSize: '14px !important' }}>
                                {item.name}
                            </MenuItem>
                        );
                    })}
                </TextField>
            )}
        </div>
    );
}
