'use client';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import WraperDialog from './WraperDialog';
import { DialogActions, DialogContent, DialogContentText, DialogTitle, Rating } from '@mui/material';
import { TextArea } from '..';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEm } from '@fortawesome/free-regular-svg-icons';
export interface IRatingDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function RatingDialog({ open, setOpen }: IRatingDialogProps) {
    const [form, setForm] = useState({
        content: '',
        star: 0,
    });

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setForm({ ...form, content: e.target.value });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(form);
    };

    return (
        <WraperDialog open={open} setOpen={setOpen}>
            <DialogTitle
                sx={{
                    py: '20px',
                }}
                textAlign={'center'}
            >
                {'YOUR OPINION MATTERS TO US!'}
            </DialogTitle>
            <DialogContent
                sx={{
                    backgroundColor: '#EDF2F7',
                    minWidth: { xs: '100%', md: '520px', lg: '520px' },
                }}
            >
                <form onSubmit={handleSubmit} className="w-full h-full flex flex-col items-center gap-4 py-7">
                    <h5>How was quality of the product ?</h5>
                    <Rating
                        name="read-only"
                        value={form.star}
                        onChange={(event, newValue) => {
                            setForm({ ...form, star: newValue || 0 });
                        }}
                        icon={
                            <span className="text-[30px] mx-2">
                                <FontAwesomeIcon icon={faStar} />
                            </span>
                        }
                        emptyIcon={
                            <span className="text-[30px] mx-2">
                                <FontAwesomeIcon icon={faStarEm} />
                            </span>
                        }
                    />
                    <TextArea
                        value={form.content}
                        onChange={handleChange}
                        rounded="rounded-[18px]"
                        className="w-[90%] mt-9 mb-6 mx-6 text-sm"
                        placeholder="Leave a comment here if you want"
                    />

                    <motion.button
                        whileTap={{
                            scale: 0.9,
                        }}
                        whileHover={{
                            y: -4,
                        }}
                        className="bg-[#F87171] py-[8px] max-w-[138px] px-[34px] text-white font-medium rounded-lg mt-5 uppercase min-w-[180px]"
                    >
                        Rate
                    </motion.button>
                </form>
            </DialogContent>
            <DialogActions
                onClick={() => setOpen(false)}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: '20px',
                }}
            >
                <span className="text-cente text-[#989898] cursor-pointer">Maybe later</span>
            </DialogActions>
        </WraperDialog>
    );
}
