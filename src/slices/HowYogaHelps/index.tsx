'use client'
import { PCOSLayout } from '@/components/_shared/PCOSLayout'
import { Title } from '@/components/_shared/Typography/PCOS'
import theme from '@/styles/theme'
import { Box, Typography } from '@mui/material'
import { Content } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'

/**
 * Props for `HowYogaHelps`.
 */
export type HowYogaHelpsProps = SliceComponentProps<Content.HowYogaHelpsSlice>

/**
 * Component for "HowYogaHelps" Slices.
 */
const HowYogaHelps = ({ slice }: HowYogaHelpsProps): JSX.Element => {
    return (
        <section
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            <Box sx={{ background: '#FFD6E0' }}>
                <PCOSLayout>
                    <Box
                        sx={{
                            width: '100%',
                            padding: '20px',
                        }}
                    >
                        <Title>{slice.primary.title}</Title>
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '20px',
                                justifyContent: 'space-between',
                            }}
                        >
                            {slice.primary.content.map((item, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        flexBasis: 'calc(33.333% - 20px)', // Ensure 3 items per row with a gap of 20px
                                        flexGrow: 1,
                                        borderRadius: '14px',
                                        border: '2.5px solid #e3a6bd',
                                        padding: '20px 30px',
                                        background:
                                            'linear-gradient(180deg, rgba(240, 162, 195, 0.30) 0%, rgba(237, 161, 250, 0.30) 100%)',
                                        [theme.breakpoints.down('md')]: {
                                            flexBasis: 'calc(50% - 20px)', // 2 items per row on medium screens
                                        },
                                        [theme.breakpoints.down('sm')]: {
                                            flexBasis: '100%', // 1 item per row on small screens
                                        },
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: '#99163E',
                                            fontSize: '24px',
                                            fontWeight: '700',
                                            [theme.breakpoints.down('md')]: {
                                                fontSize: '18px',
                                            },
                                        }}
                                    >
                                        {item.content_title}
                                    </Typography>
                                    <Box
                                        sx={{
                                            fontSize: '24px',
                                            fontWeight: '600',
                                            marginTop: '10px',
                                            [theme.breakpoints.down('md')]: {
                                                fontSize: '18px',
                                            },
                                        }}
                                    >
                                        <PrismicRichText
                                            field={item.content_description}
                                        />
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </PCOSLayout>
            </Box>
        </section>
    )
}

export default HowYogaHelps
