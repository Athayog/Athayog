'use client'
import { Content } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'
import React from 'react'
import theme from '@/styles/theme'
import { Box, Typography } from '@mui/material'
import { Title } from '@/components/_shared/Typography/PCOS'
import { PCOSLayout } from '@/components/_shared/PCOSLayout'
import { PrismicNextImage } from '@prismicio/next'

export type CausesOfPcosProps = SliceComponentProps<Content.CausesOfPcosSlice>

const CausesOfPcos = ({ slice }: CausesOfPcosProps): JSX.Element => {
    return (
        <section
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            <Box
                sx={{
                    background: '#FFD6E0',
                }}
            >
                <PCOSLayout>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: '50px',
                            flexDirection: 'row',
                            alignItems: 'center',
                            height: '100%',
                            [theme.breakpoints.down('md')]: {
                                flexDirection: 'column',
                            },
                        }}
                    >
                        <Box
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '20px',
                                width: '50%',
                                [theme.breakpoints.down('md')]: {
                                    width: '100%',
                                },
                            }}
                        >
                            <Title>
                                <PrismicRichText field={slice.primary.title} />
                            </Title>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '20px',
                                }}
                            >
                                {slice.primary.causes.map((item, index) => (
                                    <Box key={index}>
                                        <Typography
                                            sx={{
                                                color: '#99163E',
                                                fontSize: '24px',
                                                fontWeight: '600',
                                                [theme.breakpoints.down('md')]:
                                                    {
                                                        fontSize: '18px',
                                                    },
                                            }}
                                        >
                                            {item.cause_title}
                                        </Typography>
                                        <Box
                                            sx={{
                                                fontSize: '24px',
                                                fontWeight: '600',
                                                [theme.breakpoints.down('md')]:
                                                    {
                                                        fontSize: '18px',
                                                    },
                                            }}
                                        >
                                            <PrismicRichText
                                                field={item.casue_description}
                                            />
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                flexBasis: '50%',
                                maxWidth: '600px',
                                position: 'relative',
                                height: 'auto',
                                overflow: 'hidden',
                            }}
                        >
                            <PrismicNextImage
                                field={slice.primary.image}
                                layout="responsive"
                                height={500}
                                width={600}
                            />
                        </Box>
                    </Box>
                </PCOSLayout>
            </Box>
        </section>
    )
}

export default CausesOfPcos
