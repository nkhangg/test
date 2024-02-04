import * as React from 'react';

export interface IDetailPetManagementProps {
    params: { id: string };
}

export default function DetailPetManagement({ params }: IDetailPetManagementProps) {
    return <div>This is detail {params.id}</div>;
}
