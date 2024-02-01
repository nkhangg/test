'use client';
import { delay } from '@/utils/funtionals';
import React, { useRef, useState } from 'react';
import useIntersectionObserver from './useIntersectionObserver';

export default function useInfinities() {
    const refCountPage = useRef<number>(1);
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(true);

    const fetchPosts = async (skip = 0, limit = 10) => {
        setLoading(true);

        // test loading
        await delay(2000);
        const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);

        const data = await res.json();

        if (data.total <= skip + limit) setHasNextPage(false);
        setLoading(false);

        return data.products;
    };

    const lastDataRef = useIntersectionObserver<HTMLDivElement>(() => {
        refCountPage.current += 1;
        fetchPosts(refCountPage.current).then((newData) => setData((data) => [...data, ...newData]));
    }, [hasNextPage, !loading]);

    React.useEffect(() => {
        fetchPosts().then(setData);
    }, []);

    return {
        lastDataRef,
        data,
        loading,
        hasNextPage,
    };
}
