'use client';

import { Provider } from 'react-redux';
import { store } from './store';
import { ReactNode } from 'react';

interface IProviders {
    children: ReactNode;
}

export function Providers({ children }: IProviders) {
    return <Provider store={store}>{children}</Provider>;
}
