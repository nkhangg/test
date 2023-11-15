import React, { ReactNode } from 'react';

export interface ILayoutMessageProps {
    children: ReactNode;
}

export default function LayoutMessage({ children }: ILayoutMessageProps) {
    return <div className="md:mx-[-10%] ">{children}</div>;
}
