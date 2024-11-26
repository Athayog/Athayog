'use client'
import { Box } from '@mui/material'
import { Content } from '@prismicio/client'
import Banner from '@/components/_shared/Banner'
import Button from '@/components/elements/button/Index'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'
/**
 * Props for `CareerHero`.
 */
export type CareerHeroProps = SliceComponentProps<Content.CareerHeroSlice>

/**
 * Component for "CareerHero" Slices.
 */
const CareerHero = ({ slice }: CareerHeroProps): JSX.Element => {
    const mobileUrl = slice.primary.backgroud_image_mobile ? slice.primary.backgroud_image_mobile.url : slice.primary.background_image.url
    const handleScrollToForm = () => {
        const element = document.getElementById('career-scroll-target')
        if (element) {
            const elementPosition = element.getBoundingClientRect().top + window.scrollY
            const offset = 200 // Adjust this value as needed
            window.scrollTo({
                top: elementPosition - offset,
                behavior: 'smooth',
            })
        }
    }
    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <Banner
                imageSrc={{
                    xs: mobileUrl,
                    sm: mobileUrl,
                    md: slice.primary.background_image.url,
                }}
                imageAlt={slice.primary.background_image.alt}
                height={{ xs: '320px', sm: '500px', md: '600px', lg: '830px' }}
                objectPosition={{ xs: 'bottom', sm: 'bottom', md: 'bottom' }}
                blurHash={slice.primary.blurhash || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII'}
            >
                <Box
                    sx={{
                        display: { xs: 'none', md: 'flex' },
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
                                color: '#417A07',
                                fontSize: { xs: '32px', md: '42px', lg: '52px' },
                                textAlign: { xs: 'center', md: 'left' },
                                fontWeight: '700',
                                lineHeight: { xs: '56px', lg: '77px' },
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
                            {slice.primary.subtitle}
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '30px', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                            <Button
                                onClick={handleScrollToForm}
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
                                {slice.primary.button_text}
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Banner>
            <Box
                sx={{
                    backgroundColor: '#EAFEDF',
                    display: { xs: 'flex', md: 'none' },
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
                        display: { xs: 'inline', lg: 'block' },
                        wordWrap: 'break-word',
                        whiteSpace: 'initial',
                    },
                }}
            >
                <Box sx={{ width: { xs: '100%', md: 'max-content', lg: '100%' } }}>
                    <Box
                        sx={{
                            color: '#417A07',
                            fontSize: { xs: '38px', md: '42px', lg: '52px' },
                            textAlign: { xs: 'center', md: 'left' },
                            fontWeight: '700',
                            marginTop: '10px',
                            lineHeight: { xs: '56px', lg: '86px' },
                            '&& p': {
                                margin: 0,
                                display: { xs: 'inline', lg: 'block' },
                                wordWrap: 'break-word',
                                whiteSpace: 'initial',
                            },
                            br: {
                                display: 'none',
                            },
                        }}
                    >
                        <PrismicRichText field={slice.primary.title} />
                    </Box>
                    <Box
                        sx={{
                            fontSize: { xs: '18px', md: '20px', lg: '27px' },
                            lineHeight: { xs: '30px', lg: '46px' },
                            marginTop: '0px',
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
                        {slice.primary.subtitle}
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                        <Button
                            onClick={handleScrollToForm}
                            sx={{
                                fontSize: '26px',
                                padding: '16px 33.501px;',
                                width: '257px',
                                height: '60px',
                                backgroundColor: '#47820D',
                                boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.44)',
                                color: '#fff',
                            }}
                        >
                            {slice.primary.button_text}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </section>
    )
}

export default CareerHero
