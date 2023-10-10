import * as React from 'react';
import { DashboardCard } from '.';
import { Box, Card, CardContent, Stack, SvgIconTypeMap, Typography } from '@mui/material';
import { capitalize, toCurrency } from '@/utils/format';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import classNames from 'classnames';
import { OverridableComponent } from '@mui/material/OverridableComponent';

export interface ILabelCardProps {
    title: string;
    data: { content: string; persent: string };
    underlineColor?: string;
    showPersnet?: boolean;
    Icon?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
}

export default function LabelCard({ title, data, underlineColor = '#505DE8', showPersnet = true, Icon }: ILabelCardProps) {
    return (
        <Card sx={{ padding: 0, overflow: 'hidden' }} elevation={9} variant={'elevation'}>
            <CardContent sx={{ p: '30px' }}>
                <Stack direction="row" spacing={2} justifyContent="space-between" alignItems={'center'}>
                    <Box>{title ? <Typography variant="h6">{title}</Typography> : ''}</Box>
                </Stack>
                <Stack direction={'row'} spacing={'10px'} sx={{ alignItems: 'center' }}>
                    {Icon && <Icon sx={{ fontSize: 40, lineHeight: 40, color: underlineColor }} />}
                    <div className="min-h-[54px] flex flex-col justify-center">
                        <Typography variant="h5" fontWeight="700">
                            {data.content}
                        </Typography>

                        {showPersnet && (
                            <Typography variant="subtitle2" fontWeight="600" sx={{ color: '#ccc' }}>
                                {data.persent}% yesterday
                            </Typography>
                        )}
                    </div>
                </Stack>
            </CardContent>
            <div
                style={{
                    backgroundColor: underlineColor,
                }}
                key={title}
                className={classNames('border-underline h-[4px]  w-full')}
            ></div>
        </Card>
    );
}
