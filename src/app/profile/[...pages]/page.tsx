import { ProfilePage } from '@/components/pages';

import React from 'react';

export interface IProfileProps {
    params: { pages: [string] };
}

export default function Profile({ params }: IProfileProps) {
    return <ProfilePage pages={params.pages} />;
}
