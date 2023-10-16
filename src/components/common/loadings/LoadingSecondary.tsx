import { CircularProgress } from '@mui/material';
import * as React from 'react';

export interface ILoadingSecondaryProps {}

export default function LoadingSecondary(props: ILoadingSecondaryProps) {
    return (
        <div className="w-full h-full flex items-center justify-center min-h-[400px]">
            <CircularProgress sx={{ color: '#86EFAC' }} />
        </div>
    );
}
