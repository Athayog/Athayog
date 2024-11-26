import Banner from '@/components/_shared/Banner'
import { Box } from '@mui/material'
import { Content } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'

/**
 * Props for `HeroWithCenterText`.
 */
export type HeroWithCenterTextProps = SliceComponentProps<Content.HeroWithCenterTextSlice>

/**
 * Component for "HeroWithCenterText" Slices.
 */
const HeroWithCenterText = ({ slice }: HeroWithCenterTextProps): JSX.Element => {
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
                height={{ xs: '540px', md: '900px' }}
                objectPosition={{ xs: 'bottom', sm: 'bottom', md: 'bottom' }}
                blurHash={slice.primary.blurhash || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII'}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        height: '100%',
                        padding: {
                            xs: '100px 2px',
                            sm: '200px 10px',
                            md: '0px 140px',
                        },
                        '&& p': {
                            margin: 0,
                        },
                    }}
                >
                    <Box
                        sx={{
                            color: slice.primary.text_color || '#255400',
                            fontSize: { xs: '34px', sm: '40px', md: '52px' },
                            textAlign: 'center',
                            fontWeight: '700',
                            maxWidth: '800px',
                            marginTop: { xs: '0%', md: '200px' },
                        }}
                    >
                        <PrismicRichText field={slice.primary.title} />
                    </Box>
                </Box>
            </Banner>
        </section>
    )
}

export default HeroWithCenterText
