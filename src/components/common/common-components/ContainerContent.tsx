import React, { ReactNode } from 'react';
import classNames from 'classnames';

export interface IContainerContentProps {
    children: ReactNode;
    className?: string;
    classNameContainer?: string;
}

export default function ContainerContent({ children, className, classNameContainer }: IContainerContentProps) {
    return (
        <section
            className={classNames('w-full h-full', {
                [classNameContainer ?? '']: !!classNameContainer,
            })}
        >
            <section className="px-10">
                <div
                    className={classNames('xl:w-main max-w-[100%] m-auto', {
                        [className ?? '']: !!className,
                    })}
                >
                    {children}
                </div>
            </section>
        </section>
    );
}
