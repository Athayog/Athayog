'use client'
import { PCOSLayout } from '@/components/_shared/PCOSLayout'
import { Title } from '@/components/_shared/Typography/PCOS'
import RegisterButton from '@/components/elements/button/RegisterButton'
import theme from '@/styles/theme'
import { Box, Typography } from '@mui/material'
import { Content } from '@prismicio/client'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import { SliceComponentProps } from '@prismicio/react'

/**
 * Props for `EnrollSection`.
 */
export type EnrollSectionProps = SliceComponentProps<Content.EnrollSectionSlice>

/**
 * Component for "EnrollSection" Slices.
 */
const EnrollSection = ({ slice }: EnrollSectionProps): JSX.Element => {
    return (
        <section
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            <Box
                sx={{
                    background: 'linear-gradient(to bottom, #FFD6E0,#e9fdde)',
                }}
            >
                <PCOSLayout>
                    {' '}
                    <Box
                        sx={{
                            display: 'flex',
                            justfyContent: 'center',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Title sx={{ textAlign: 'center' }}>
                            {slice.primary.title}
                        </Title>
                        <Typography
                            sx={{
                                color: '#202020',
                                fontSize: '28px',
                                fontWeight: '500',
                                textAlign: 'center',
                                [theme.breakpoints.down('md')]: {
                                    fontSize: '18px',
                                },
                            }}
                        >
                            {slice.primary.subtitle}
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                justfyContent: 'center',
                                flexDirection: 'row',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                gap: '30px',
                                marginTop: '40px',
                                [theme.breakpoints.down('md')]: {
                                    justifyContent: 'center',
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    borderRadius: '46px',
                                    backgroundColor: '#FFF',
                                    width: 'max-content',
                                    height: '35px',
                                    padding: '10px 20px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: '#202020',
                                    fontWeigh: '600',
                                    [theme.breakpoints.down('md')]: {
                                        fontSize: '16px',
                                        height: '37.833px',
                                        wdith: '159.394px',
                                    },
                                }}
                            >
                                {slice.primary.date}
                            </Box>
                            <Box
                                sx={{
                                    borderRadius: '46px',
                                    backgroundColor: '#FFF',
                                    width: 'max-content',
                                    height: '35px',
                                    padding: '10px 20px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: '#202020',
                                    fontWeigh: '600',
                                    [theme.breakpoints.down('md')]: {
                                        fontSize: '16px',
                                        height: '37.833px',
                                        wdith: '159.394px',
                                    },
                                }}
                            >
                                {slice.primary.price}
                            </Box>
                            <Box
                                sx={{
                                    borderRadius: '46px',
                                    backgroundColor: '#FFF',
                                    width: 'max-content',
                                    height: '35px',
                                    padding: '10px 20px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: '#202020',
                                    fontWeigh: '600',
                                    [theme.breakpoints.down('md')]: {
                                        fontSize: '16px',
                                        height: '37.833px',
                                        wdith: '159.394px',
                                    },
                                }}
                            >
                                {slice.primary.time_and_week}
                            </Box>
                        </Box>
                        <PrismicNextLink field={slice.primary.join_button_link}>
                            <RegisterButton
                                sx={{
                                    marginTop: '80px',
                                    background:
                                        'linear-gradient(0deg, #C32A58 0%, #C32A58 100%)',
                                    '&:hover': {
                                        background:
                                            'linear-gradient(0deg, #B22952 0%, #B22952 100%)',
                                        color: 'white',
                                    },
                                }}
                            >
                                {slice.primary.join_button_text}
                            </RegisterButton>
                        </PrismicNextLink>
                    </Box>
                </PCOSLayout>
            </Box>
        </section>
    )
}

export default EnrollSection
