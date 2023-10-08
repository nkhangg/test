import { Backdrop, CircularProgress } from '@mui/material';
import * as React from 'react';

export interface ILoadingPrimaryProps {}

export default function LoadingPrimary(props: ILoadingPrimaryProps) {
    return (
        <Backdrop sx={{ color: '#fff', zIndex: 999 }} open={true}>
            <CircularProgress sx={{ color: '#86EFAC' }} />
        </Backdrop>
    );
}
