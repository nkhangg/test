import * as React from 'react';
import { DashboardCard } from '.';
import { Box, Card, CardContent, Stack, SvgIconTypeMap, Typography } from '@mui/material';
import classNames from 'classnames';
import { OverridableComponent } from '@mui/material/OverridableComponent';

export interface ILabelCardProps {
    title: string;
    data: { value: string | number; percentYesterday?: number };
    underlineColor?: string;
    showPersnet?: boolean;
    Icon?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
}

export default function LabelCard({ title, data, underlineColor = '#505DE8', showPersnet = true, Icon }: ILabelCardProps) {
    return (
        <Card sx={{ padding: 0, overflow: 'hidden' }} elevation={9} variant={'elevation'}>
            <CardContent sx={{ p: '20px', display: 'flex', flexDirection: 'column', gap: '18px', letterSpacing: '1.4px' }}>
                <Stack direction="row" spacing={2} justifyContent="space-between" alignItems={'center'}>
                    <Box>
                        {title ? (
                            <Typography variant="subtitle1" sx={{ fontSize: '18px' }}>
                                {title}
                            </Typography>
                        ) : (
                            ''
                        )}
                    </Box>
                </Stack>
                <Stack direction={'row'} spacing={'10px'} sx={{ alignItems: 'center' }}>
                    {Icon && <Icon sx={{ fontSize: 60, lineHeight: 60, color: underlineColor }} />}
                    <div className="min-h-[54px] flex flex-col justify-center">
                        <Typography variant="h5" fontWeight="600">
                            {data.value}
                        </Typography>

                        {showPersnet && (
                            <Typography variant="subtitle2" fontWeight="600" sx={{ color: '#ccc', mt: '10px' }}>
                                {data.percentYesterday || 0}% yesterday
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
