import Banner from '@/components/_shared/Banner'
import { Box, Typography } from '@mui/material'
import { Content } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'

/**
 * Props for `AboutUsHero`.
 */
export type AboutUsHeroProps = SliceComponentProps<Content.AboutUsHeroSlice>

/**
 * Component for "AboutUsHero" Slices.
 */
const AboutUsHero = ({ slice }: AboutUsHeroProps): JSX.Element => {
    const mobileUrl = slice.primary.backgroud_image_mobile ? slice.primary.backgroud_image_mobile.url : slice.primary.backgroud_image.url
    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <Banner
                imageSrc={{
                    xs: mobileUrl,
                    sm: mobileUrl,
                    md: slice.primary.backgroud_image.url,
                }}
                imageAlt={slice.primary.backgroud_image.alt}
                height={{ xs: '638px', sm: '700px', md: '900px' }}
                objectPosition={{ xs: 'bottom', sm: 'bottom', md: 'bottom' }}
                blurHash="eNPibd%gjENHxu~CIUM_xuM{8_RixbRkkBRjR*RjofWXxts:WBays;"
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: { xs: 'flex-start', md: 'center' },
                        height: '100%',
                        color: '#2A5200',
                        padding: {
                            xs: '150px 20px',
                            sm: '200px 20px',
                            md: '0px 140px',
                        },
                    }}
                >
                    <Box
                        sx={{
                            fontSize: { xs: '40px', sm: '40px', md: '54px' },
                            textAlign: { xs: 'left', sm: 'left', md: 'left' },
                            fontWeight: '700',
                            maxWidth: '800px',
                        }}
                    >
                        <Box
                            sx={{
                                fontSize: { xs: '40px', sm: '40px', md: '54px' },
                                fontWeight: '700',
                                textAlign: 'left',
                                color: '#2A5200',
                                lineHeight: { xs: '64px', md: '66px' },
                                '&& p': {
                                    margin: 0,
                                },
                            }}
                        >
                            <PrismicRichText field={slice.primary.title} />
                        </Box>
                        <Box
                            sx={{
                                fontSize: { xs: '23px', md: '44px' },
                                fontWeight: '500',
                                lineHeight: { xs: '47px', md: '70px' },
                                '&& p': {
                                    margin: 0,
                                },
                            }}
                        >
                            <PrismicRichText field={slice.primary.subtitle} />
                        </Box>
                    </Box>
                </Box>
            </Banner>
        </section>
    )
}

export default AboutUsHero
