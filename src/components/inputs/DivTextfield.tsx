'use client';
import React, { InputHTMLAttributes, useEffect, useState } from 'react';
import { TextField } from '..';
import { MenuItem, TextFieldProps } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export interface IDivTextfieldProps {
    label: string;
    showEye?: boolean;
    dataSelect?: { id: string; name: string }[];
    propsInput?: TextFieldProps & {
        message?: string;
    };
}

export default function DivTextfield({ label, propsInput, dataSelect, showEye }: IDivTextfieldProps) {
    const [hideEye, setHideEye] = useState(true);

    return (
        <div className="flex flex-col justify-between gap-2 w-full">
            <label className="text-sm font-medium">{label}</label>
            {!dataSelect && !showEye && <TextField spellCheck={false} id={label.toLowerCase().replaceAll(' ', '-')} {...propsInput} fullWidth size="small" />}

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

            {propsInput?.type === 'password' && showEye && (
                <div className="relative">
                    <TextField spellCheck={false} id={label.toLowerCase().replaceAll(' ', '-')} {...propsInput} type={!hideEye ? 'text' : 'password'} fullWidth size="small" />
                    <div onClick={() => setHideEye(!hideEye)} className="absolute right-[14px] top-[50%] translate-y-[-50%] cursor-pointer">
                        <FontAwesomeIcon icon={hideEye ? faEye : faEyeSlash} />
                    </div>
                </div>
            )}
        </div>
    );
}
