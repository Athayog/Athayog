import Banner from '@/components/_shared/Banner'
import Button from '@/components/elements/button/Index'
import { Box } from '@mui/material'

import { Content } from '@prismicio/client'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'
import Mandela from '/public/images/Mandela.svg'
import MandelDesktop from '/public/images/MadelaDesktop.svg'

/**
 * Props for `WeightLossHero`.
 */
export type WeightLossHeroProps = SliceComponentProps<Content.WeightLossHeroSlice>

/**
 * Component for "WeightLossHero" Slices.
 */
const WeightLossHero = ({ slice }: WeightLossHeroProps): JSX.Element => {
    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <Banner
                imageSrc={{
                    xs: slice.primary.background_image.url,
                    sm: slice.primary.background_image.url,
                    md: slice.primary.background_image.url,
                }}
                imageAlt={slice.primary.background_image.alt}
                height={{ xs: '1000px', md: '700px', lg: '830px' }}
                objectPosition={{ xs: 'bottom', sm: 'bottom', md: 'bottom' }}
                blurHash={
                    slice.primary.backgroud_image_blurhash ||
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII'
                }
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: { xs: 'center', md: 'space-between' },
                        alignItems: 'center',
                        height: '100%',
                        maxWidth: '1400px',
                        flexDirection: { xs: 'column', md: 'row' },
                        margin: '0 auto',
                        padding: {
                            xs: '10px 20px 10px 20px',
                            md: '0px 50px',
                        },
                        '&& p': {
                            margin: 0,
                        },
                    }}
                >
                    <Box sx={{ width: { xs: '100%', md: 'max-content', lg: '100%' } }}>
                        <Box
                            sx={{
                                color: '#255400',
                                fontSize: { xs: '32px', md: '42px', lg: '52px' },
                                textAlign: { xs: 'center', md: 'left' },
                                fontWeight: '700',
                                lineHeight: { xs: '56px', lg: '86px' },
                            }}
                        >
                            <PrismicRichText field={slice.primary.title} />
                        </Box>
                        <Box
                            sx={{
                                fontSize: { xs: '18px', md: '20px', lg: '27px' },
                                lineHeight: { xs: '30px', lg: '46px' },
                                marginTop: '24px',
                                textAlign: { xs: 'center', md: 'left' },
                                color: '#000',
                                '&& p': {
                                    display: { xs: 'inline', lg: 'block' },
                                    wordWrap: 'break-word',
                                    whiteSpace: 'initial',
                                    margin: 0,
                                },
                            }}
                        >
                            <PrismicRichText field={slice.primary.subtitle} />
                        </Box>

                        <Box sx={{ display: { xs: 'flex', md: 'none', marginTop: '20px' }, position: 'relative', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <Box
                                sx={{
                                    width: '100%',
                                    height: 'auto', // Maintain aspect ratio
                                    position: 'absolute',
                                    zIndex: 0,
                                    margin: '0 auto',
                                    opacity: 0.4,
                                }}
                            >
                                <Mandela />
                            </Box>

                            <Box
                                sx={{
                                    width: { xs: '300px', md: '500px', lg: '600px' }, // Responsive width
                                    height: 'auto', // Maintain aspect ratio
                                    zIndex: 2,
                                    position: 'relative',
                                    maxWidth: 'max-content',
                                    margin: '0 auto',
                                }}
                            >
                                <PrismicNextImage field={slice.primary.person_image} style={{ width: '100%', height: 'auto' }} />
                            </Box>
                        </Box>

                        <PrismicNextLink field={slice.primary.button_link}>
                            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '30px', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                                <Button
                                    sx={{
                                        fontSize: '26px',
                                        padding: '17.467px 23.289px',
                                        width: '257px',
                                        height: '60px',
                                        backgroundColor: '#47820D',
                                        boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.44)',
                                        color: '#fff',
                                    }}
                                >
                                    {slice.primary.button_link.text}
                                </Button>
                            </Box>
                        </PrismicNextLink>
                    </Box>

                    <Box sx={{ display: { xs: 'none', md: 'block' }, position: 'relative', width: { xs: 'max-content', md: '100%', lg: '100%' }, height: '100%' }}>
                        <Box
                            sx={{
                                width: { xs: '400px', md: '100%' }, // Responsive width
                                height: 'auto', // Maintain aspect ratio
                                position: 'absolute',
                                right: '0',
                                zIndex: 0,
                                bottom: 0,
                                opacity: 0.4,
                            }}
                        >
                            <MandelDesktop />
                        </Box>

                        {/* Responsive wrapper for Person image */}
                        <Box
                            sx={{
                                width: '100%',
                                height: 'auto', // Maintain aspect ratio
                                zIndex: 2,
                                position: 'absolute',

                                bottom: 0,
                                right: '10%',
                            }}
                        >
                            <PrismicNextImage field={slice.primary.person_image} style={{ width: '100%', height: 'auto' }} />
                        </Box>
                    </Box>
                </Box>
            </Banner>
        </section>
    )
}

export default WeightLossHero
