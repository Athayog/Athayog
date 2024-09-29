'use client'
import { PCOSLayout } from '@/components/_shared/PCOSLayout'
import { Title } from '@/components/_shared/Typography/PCOS'
import theme from '@/styles/theme'
import { Box, Typography } from '@mui/material'
import { Content } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { SliceComponentProps } from '@prismicio/react'
/**
 * Props for `WhyJoin`.
 */
export type WhyJoinProps = SliceComponentProps<Content.WhyJoinSlice>

/**
 * Component for "WhyJoin" Slices.
 */
const WhyJoin = ({ slice }: WhyJoinProps): JSX.Element => {
    return (
        <section
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            <Box
                sx={{
                    background:
                        'linear-gradient(to bottom, #FFD6E0,#ffe8ee,#FFD6E0)',
                }}
            >
                <PCOSLayout>
                    {' '}
                    <Box
                        sx={{
                            width: '100%',
                            padding: '20px',
                        }}
                    >
                        <Title sx={{ textAlign: 'center' }}>
                            {slice.primary.title}
                        </Title>
                        <Box
                            component="ul"
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '20px',
                                justifyContent: 'center',
                                padding: 0,
                                listStyle: 'none',
                            }}
                        >
                            {slice.primary.content.map((item, index) => {
                                return (
                                    <Box
                                        key={index}
                                        sx={{
                                            borderRadius: ' 109.432px',
                                            background:
                                                'rgba(146, 103, 201, 0.15)',
                                            width: '100%',
                                            maxWidth: ' 500px',
                                            height: '67px',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            fontSize: '24px',
                                            gap: '5px',
                                            alignItems: 'center',
                                            svg: {
                                                height: '50px',
                                                width: '50px',
                                            },
                                            flexBasis: 'calc(50% - 20px)', // 2 items per row with a gap of 20px
                                            padding: '20px 30px',

                                            [theme.breakpoints.down('md')]: {
                                                flexBasis: '100%', // 1 item per row on small screens
                                                fontSize: '17px',
                                                width: 'min-content',
                                                svg: {
                                                    height: '47px',
                                                    width: '47px',
                                                },
                                            },
                                            [theme.breakpoints.down('sm')]: {
                                                flexBasis: '100%', // 1 item per row on small screens
                                            },
                                        }}
                                    >
                                        <PrismicNextImage
                                            width={30}
                                            field={item.icon}
                                        />
                                        <Typography
                                            sx={{
                                                [theme.breakpoints.down('md')]:
                                                    {
                                                        fontSize: '17px',
                                                    },
                                            }}
                                        >
                                            {item.label}
                                        </Typography>
                                    </Box>
                                )
                            })}
                        </Box>
                    </Box>
                </PCOSLayout>
            </Box>
        </section>
    )
}

export default WhyJoin
