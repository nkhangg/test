import { DialogDateChooser, SearchInput, TippyChooser } from '@/components';
import { IDialogDateChooserProps } from '@/components/dialogs/DialogDateChooser';
import { ISearchInputProps } from '@/components/inputs/SearchInput';
import { ITippyChooserProps } from '@/components/inputs/tippys/TippyChooser';
import React, { ReactNode } from 'react';

export interface ISortAdminProps {
    searchProps: ISearchInputProps;
    sortProps: ITippyChooserProps;
    dateProps?: IDialogDateChooserProps;
    children?: ReactNode;
}

export default function SortAdmin({ searchProps, sortProps, dateProps, children }: ISortAdminProps) {
    return (
        <div className="flex items-center justify-between text-1xl mb-10 w-full">
            <div className="flex items-center gap-5 md:gap-10">
                <SearchInput {...searchProps} />

                <TippyChooser {...sortProps} />

                {children && children}
            </div>

            {dateProps && <DialogDateChooser {...dateProps} />}
        </div>
    );
}
