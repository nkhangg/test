'use client';
import React, { InputHTMLAttributes, useEffect, useState } from 'react';
import { TextField } from '..';

export interface IDivTextfieldProps {
    label: string;
    type?: InputHTMLAttributes<unknown>['type'];
    name: string;
    onValue?: (value: string) => void;
}

export default function DivTextfield({ label, type = 'text', name, onValue }: IDivTextfieldProps) {
    const [value, setValue] = useState('');

    useEffect(() => {
        if (!onValue) return;

        onValue(value);
    }, [value, onValue]);

    return (
        <div className="flex flex-col justify-between gap-2 w-full">
            <label className="text-sm font-medium">{label}</label>
            <TextField
                value={value}
                spellCheck={false}
                autoFocus
                onChange={(e) => setValue(e.target.value)}
                id={label.toLowerCase().replaceAll(' ', '-')}
                type={type}
                name={name}
                fullWidth
                size="small"
            />
        </div>
    );
}
