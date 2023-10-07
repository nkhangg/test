import * as React from 'react';
import { WrapperAnimation } from '..';
import { Button, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import classNames from 'classnames';

export interface ISocialButtonProps {
    title: string;
    icon: IconProp;
    background?: string;
    mt?: string;
}

export default function SocialButton({ title, icon, background = '#0284C7', mt = 'mt-4' }: ISocialButtonProps) {
    return (
        <WrapperAnimation
            hover={{ y: -2 }}
            tag={{}}
            className={classNames('flex items-center justify-center md:justify-start  w-full max-w-[250px]', {
                [mt]: true,
            })}
        >
            <Button
                sx={{
                    backgroundColor: background,
                    px: '20px',
                    color: '#fff',
                    '&:hover': {
                        backgroundColor: background,
                        color: '#fff',
                    },
                    borderRadius: '6px',
                    textTransform: 'none',
                    width: '100%',
                }}
            >
                <FontAwesomeIcon className="text-[20px] mr-2" icon={icon} />
                <Typography>{title}</Typography>
            </Button>
        </WrapperAnimation>
    );
}
