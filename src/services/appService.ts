import { links } from '@/datas/links';
import { addPreviousUrl } from '@/utils/session';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';

const handleNonLogin = (pathname: string, router: AppRouterInstance) => {
    addPreviousUrl(pathname);
    router.push(links.auth.login);
};

export const appService = { handleNonLogin };
