import { Content } from '@prismicio/client'
import { PrismicNextLink } from '@prismicio/next'
import { Box, Typography } from '@mui/material'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'
import Button from '@/components/elements/button/Index'

/**
 * Props for `GroupInformation`.
 */
export type GroupInformationProps =
    SliceComponentProps<Content.GroupInformationSlice>

/**
 * Component for "GroupInformation" Slices.
 */
const GroupInformation = ({ slice }: GroupInformationProps): JSX.Element => {
    return (
        <section
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            <Box
                sx={{
                    background:
                        'linear-gradient(to bottom, rgba(100, 188, 202,0.5) 0%, rgba(151, 235, 185,0.5) 50%, rgba(160, 233, 178,0.5) 100%)',
                    height: '100%',
                    padding: { xs: '30px 20px', md: '60px 50px' },
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center',
                        maxWidth: '1400px',
                        margin: '0 auto',
                    }}
                >
                    <Box
                        sx={{
                            fontSize: { xs: '24px', md: '48px' },
                            fontWeight: '700',
                            textAlign: 'center',
                            color: '#2A5200',
                            '&& p': {
                                margin: 0,
                            },
                        }}
                    >
                        <PrismicRichText field={slice.primary.title} />
                    </Box>
                    <PrismicNextLink field={slice.primary.button_link}>
                        <Button
                            variant="contained"
                            sx={{
                                marginTop: '30px',
                                backgroundColor:
                                    'linear-gradient(92deg, #42740E 24.16%, #65B710 166.68%)',
                            }}
                        >
                            {slice.primary.button_text}
                        </Button>
                    </PrismicNextLink>

                    <Box
                        sx={{
                            fontSize: { xs: '18px', md: '24px' },
                            fontWeight: '400',
                            textAlign: 'center',
                            marginTop: '60px',
                            '&& p': {
                                margin: 0,
                            },
                        }}
                    >
                        <PrismicRichText field={slice.primary.description} />
                    </Box>
                </Box>
            </Box>
        </section>
    )
}

export default GroupInformation
