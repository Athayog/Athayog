import Button from '@/components/elements/button/Index'
import { Box } from '@mui/material'
import { Content } from '@prismicio/client'
import { PrismicNextLink } from '@prismicio/next'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'
import { url } from 'inspector'

/**
 * Props for `CoursesCta`.
 */
export type CoursesCtaProps = SliceComponentProps<Content.CoursesCtaSlice>

/**
 * Component for "CoursesCta" Slices.
 */
const CoursesCta = ({ slice }: CoursesCtaProps): JSX.Element => {
    let dynamicFontSize = { xs: '28px', md: '48px' }
    if (slice.variation === 'withSmallTitle') {
        dynamicFontSize = {
            xs: '28px',
            md: '39px',
        }
    }
    if (slice.variation === 'withSubtext') {
        dynamicFontSize = {
            xs: '30px',
            md: '44px',
        }
    }

    let dynamicFontColor = '#000'
    if (slice.variation === 'withPrice') {
        dynamicFontColor = '#505050'
    }
    if (slice.variation === 'withSubtext') {
        dynamicFontColor = '#468803'
    }
    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <Box
                sx={{
                    position: 'relative',
                    padding: { xs: '30px 20px', md: '60px 50px' },
                    backgroundColor: '#E1F9E5',
                    textAlign: 'center',
                    '&&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        opacity: '0.4',
                        width: '100%',
                        height: '100%',
                        filter: 'blur(100px)',
                        backgroundSize: 'contain',
                        zIndex: 0,
                        backgroundImage: `url(${slice.primary.backgroud_image.url})`,
                    },
                }}
            >
                {/* Content Box */}
                <Box
                    sx={{
                        position: 'relative',
                        zIndex: 1, // Bring content above the background
                        maxWidth: '1440px',
                        margin: '0 auto',
                    }}
                >
                    {/* Title */}
                    <Box
                        sx={{
                            fontSize: dynamicFontSize,
                            fontWeight: slice.variation === 'withPrice' ? '400' : '700',
                            textAlign: 'center',
                            color: dynamicFontColor,
                            lineHeight: { xs: '38px', lg: 'normal' },
                            display: 'inline',
                            '&& p': {
                                display: 'inline',
                            },
                        }}
                    >
                        <PrismicRichText field={slice.primary.title} />
                        <span style={{ color: '#528B16', marginLeft: '12px' }}>{slice.primary.highlighted_text}</span>
                    </Box>

                    {/* Description */}
                    <Box
                        sx={{
                            fontSize: {
                                xs: '18px',
                                md: '32px',
                            },
                            marginTop: '20px',
                            '&& p,h2,h3,h4,h5,h6': {
                                fontSize: {
                                    xs: '18px',
                                    md: '32px',
                                },
                                lineHeight: { xs: '28px', lg: '44px' },
                            },
                        }}
                    >
                        <PrismicRichText field={slice.primary.description} />
                    </Box>

                    {/* Button */}
                    <PrismicNextLink field={slice.primary.button}>
                        <Button
                            sx={{
                                margin: '30px auto 0px auto',
                                backgroundColor: '#47820D',
                                boxShadow: 'none',
                                alignSelf: 'flex-end',
                                color: '#fff',
                            }}
                        >
                            {slice.primary.button.text}
                        </Button>
                    </PrismicNextLink>
                    <Box
                        sx={{
                            fontSize: {
                                xs: '18px',
                                md: '32px',
                            },
                            marginTop: { xs: '24px', lg: '30px' },
                            '&& p,h2,h3,h4,h5,h6': {
                                fontSize: {
                                    xs: '22px',
                                    md: '32px',
                                },
                                lineHeight: { xs: '28px', lg: '44px' },
                            },
                        }}
                    >
                        {slice.variation === 'withSubtext' && slice.primary.subtext}
                    </Box>
                </Box>
            </Box>
        </section>
    )
}

export default CoursesCta
