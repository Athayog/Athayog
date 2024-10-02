import Banner from '@/components/_shared/Banner'
import { Box } from '@mui/material'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'

/**
 * Props for `GroupClassHero`.
 */
export type GroupClassHeroProps =
    SliceComponentProps<Content.GroupClassHeroSlice>

/**
 * Component for "GroupClassHero" Slices.
 */
const GroupClassHero = ({ slice }: GroupClassHeroProps): JSX.Element => {
    return (
        <section
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            <Banner
                imageSrc={{
                    xs: slice.primary.image.url,
                    sm: slice.primary.image.url,
                    md: slice.primary.image.url,
                }}
                blurHash="LROCv,%gM|t6~qkCaJRjMcWBIoof"
                imageAlt={slice.primary.image.alt}
                height={{ xs: '750px', sm: '750px', md: '750px' }}
                objectPosition={{ xs: 'bottom', sm: 'bottom', md: 'bottom' }}
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
                ></Box>
            </Banner>
        </section>
    )
}

export default GroupClassHero
