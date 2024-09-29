import Banner from '@/components/_shared/Banner'
import { Box, Typography } from '@mui/material'
import { Content } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'

/**
 * Props for `PersonalSessionHero`.
 */
export type PersonalSessionHeroProps =
    SliceComponentProps<Content.PersonalSessionHeroSlice>

/**
 * Component for "PersonalSessionHero" Slices.
 */
const PersonalSessionHero = ({
    slice,
}: PersonalSessionHeroProps): JSX.Element => {
    return (
        <section
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            <Banner
                imageSrc={{
                    xs: slice.primary.mobile_image.url,
                    sm: slice.primary.mobile_image.url,
                    md: slice.primary.desktop_image.url,
                }}
                imageAlt="Personal Session"
                height={{ xs: '700px', sm: '700px', md: '900px' }}
                objectPosition={{ xs: 'bottom', sm: 'bottom', md: 'bottom' }}
                blurHash="e8L;gH9F8__N4m?bnOtRRPkXxaRjxuM{xaxuNGxaNGt7ogWAogaekC"
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: { xs: 'flex-start', md: 'center' },
                        height: '100%',
                        padding: {
                            xs: '150px 2px',
                            sm: '200px 10px',
                            md: '0px 140px',
                        },
                    }}
                >
                    <Box
                        sx={{
                            color: '#255400',
                            fontSize: { xs: '30px', sm: '40px', md: '54px' },
                            textAlign: { xs: 'center', sm: 'left', md: 'left' },
                            fontWeight: '700',
                            maxWidth: '800px',
                        }}
                    >
                        <PrismicRichText field={slice.primary.title} />
                    </Box>
                </Box>
            </Banner>
        </section>
    )
}

export default PersonalSessionHero
