'use client';

import { Provider } from 'react-redux';
import { store } from './store';
import { ReactNode } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

interface IProviders {
    children: ReactNode;
}

export function Providers({ children }: IProviders) {
    const peristor = persistStore(store);
    return <Provider store={store}>{children}</Provider>;
}
