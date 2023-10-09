import { TextareaAutosize, TextareaAutosizeProps } from '@mui/material';
import React from 'react';

export default function TextArea(props: TextareaAutosizeProps) {
    return (
        <TextareaAutosize
            {...props}
            minRows={props.minLength ? props.minLength : 4}
            className="border-[#d0cfd4] border resize-none rounded bg-transparent p-3 outline-none focus:border-[#6366F1] hover:border-[#6366F1]"
        />
    );
}
