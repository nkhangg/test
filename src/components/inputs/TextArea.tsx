import { TextareaAutosize, TextareaAutosizeProps } from '@mui/material';
import classNames from 'classnames';
import React from 'react';

export default function TextArea({ rounded = 'rounded', ...props }: TextareaAutosizeProps & { rounded?: string }) {
    return (
        <TextareaAutosize
            {...props}
            minRows={props.minLength ? props.minLength : 4}
            className={classNames('border-[#d0cfd4] border resize-none  bg-transparent p-3 outline-none focus:border-[#6366F1] hover:border-[#6366F1]', {
                [rounded]: true,
                [props.className || '']: true,
            })}
        />
    );
}
