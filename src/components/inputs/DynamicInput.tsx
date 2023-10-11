'use client';
import { Box, Button, MenuItem, Stack, TextFieldProps, Typography } from '@mui/material';
import React, { ChangeEvent, useRef, useState } from 'react';
import { TextField } from '..';

export interface IDynamicInputProps {
    title: string;
    type?: string;
    propsInput?: TextFieldProps & {
        message?: string;
    };
    dataSelect: { id: string | number; name: string }[];
}

export default function DynamicInput({ title, type, propsInput, dataSelect }: IDynamicInputProps) {
    const [state, setState] = useState(false);

    const handleClick = () => {
        setState(!state);
    };
    return (
        <Stack>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }} mb={'10px'}>
                <Typography sx={{ fontWeight: '500', fontSize: '14px' }}>{title}</Typography>
                <Typography
                    sx={{
                        fontWeight: '500',
                        fontSize: '14px',
                        color: '#5587ff',
                        textTransform: 'uppercase',
                        '&:hover': { textDecoration: 'underline' },
                        cursor: 'pointer',
                        userSelect: 'none',
                    }}
                    onClick={handleClick}
                >
                    Other
                </Typography>
            </Box>
            <Stack direction={'row'} alignItems={'center'} spacing={2} sx={{ position: 'relative' }}>
                {!state && (
                    <TextField select {...propsInput} fullWidth size="small">
                        {dataSelect.map((item, index) => {
                            return (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.name}
                                </MenuItem>
                            );
                        })}
                    </TextField>
                )}
                {state && <TextField size="small" {...propsInput} type={type} />}
            </Stack>
        </Stack>
    );
}
