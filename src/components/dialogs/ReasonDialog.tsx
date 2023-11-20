'use client';
import React, { useState } from 'react';
import WraperDialog from './WraperDialog';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { reasons } from '@/datas/reason';
import { WrapperAnimation } from '..';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Validate from '@/utils/validate';
import { contants } from '@/utils/contants';

export interface IReasonDialogProps {
    handleAfterClickSend?: (reason: string) => void;
    onClose?: () => void;
}

export default function ReasonDialog({ handleAfterClickSend, onClose }: IReasonDialogProps) {
    const [isOpen, setIsOpen] = useState(true);
    const [reason, setReason] = useState('');
    const [error, setError] = useState(false);

    const handleClickSend = () => {
        console.log(reason);
        if (!handleAfterClickSend) return;

        if (validate()) return;

        handleAfterClickSend(reason);
        handleClose();
    };

    const handleClose = () => {
        setIsOpen(false);

        if (!onClose) return;
        onClose();
    };

    const validate = () => {
        if (Validate.isBlank(reason)) {
            setError(true);
            return true;
        } else {
            setError(false);
            return false;
        }
    };

    return (
        <WraperDialog
            sx={{
                '& .MuiPaper-root': {
                    borderRadius: '18px',
                },
            }}
            setOpen={setIsOpen}
            open={isOpen}
        >
            <div className="py-6 px-8 relative">
                <h4 className="text-xl text-[#303B4E] font-semibold text-center mb-5">LET US KNOW THE REASON FOR CANCELING ?</h4>

                <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="female" name="radio-buttons-group">
                    {reasons.map((item) => {
                        return <FormControlLabel onClick={() => setReason(item)} key={item} value={item} control={<Radio />} label={item} />;
                    })}

                    {error && <span className="text-xs text-red-primary">{contants.messages.review.whenEmptyReason}</span>}
                </RadioGroup>

                <div className="w-full flex items-center justify-center mt-5">
                    <WrapperAnimation
                        onClick={handleClickSend}
                        hover={{}}
                        className="flex items-center justify-center text-white bg-[#666666] rounded-lg py-1 px-10 uppercase font-medium"
                    >
                        <span>Send</span>
                    </WrapperAnimation>
                </div>

                <WrapperAnimation onClick={handleClose} hover={{}} className="absolute top-0 right-0 flex items-center justify-center text-lg py-3 px-4 cursor-pointer">
                    <FontAwesomeIcon icon={faXmark} />
                </WrapperAnimation>
            </div>
        </WraperDialog>
    );
}
