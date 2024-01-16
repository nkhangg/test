import React from 'react';
import BoxPost from './BoxPost';
import classNames from 'classnames';
import { Post } from '@/components';

export interface IBoxPostHighlightProps {
    data: any[];
    title: string;
    options?: {
        captialize?: boolean | undefined;
        tracking?: string;
    };
}

export default function BoxPostHighlight({ data, title, options }: IBoxPostHighlightProps) {
    return (
        <BoxPost options={options} title={title}>
            <div
                className={classNames('grid', {
                    ['lg:grid-cols-5 gap-6 py-4']: true,
                    ['md:grid-cols-3']: true,
                })}
            >
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
            </div>
        </BoxPost>
    );
}
