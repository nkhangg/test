import { DialogDateChooser, SearchInput, TippyChooser } from '@/components';
import { IDialogDateChooserProps } from '@/components/dialogs/DialogDateChooser';
import { ISearchInputProps } from '@/components/inputs/SearchInput';
import { ITippyChooserProps } from '@/components/inputs/tippys/TippyChooser';
import * as React from 'react';

export interface ISortAdminProps {
    searchProps: ISearchInputProps;
    sortProps: ITippyChooserProps;
    dateProps?: IDialogDateChooserProps;
}

export default function SortAdmin({ searchProps, sortProps, dateProps }: ISortAdminProps) {
    return (
        <div className="flex items-center justify-between text-1xl mb-10 w-full">
            <div className="flex items-center gap-5 md:gap-10">
                <SearchInput {...searchProps} />

                <TippyChooser {...sortProps} />
            </div>

            {dateProps && <DialogDateChooser {...dateProps} />}
        </div>
    );
}
