import { CircularProgress } from '@mui/material';
import * as React from 'react';

export interface IMiniLoadingProps {
    size?: string;
}

export default function MiniLoading({ size = '20px' }: IMiniLoadingProps) {
    return (
        <div className="w-full h-full flex items-center justify-center min-h-[60px]">
            <CircularProgress sx={{ color: '#86EFAC' }} size={size} />
        </div>
    );
}
