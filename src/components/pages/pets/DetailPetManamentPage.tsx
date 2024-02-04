import { BoxTitle } from '@/components';
import * as React from 'react';

export interface IDetailPetManagementPageProps {
    id: string;
}

export default function DetailPetManagementPage({ id }: IDetailPetManagementPageProps) {
    return <BoxTitle title="CREATE PET">{id}</BoxTitle>;
}
