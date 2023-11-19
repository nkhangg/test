'use client';
import React, { ReactNode, useEffect } from 'react';

export interface IInitStateProps {
    children: ReactNode;
}

export default function InitState({ children }: IInitStateProps) {
    return <>{children}</>;
}
