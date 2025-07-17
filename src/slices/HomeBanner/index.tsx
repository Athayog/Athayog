import { FC } from 'react'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { PrismicNextImage } from '@prismicio/next'
import { Box, useMediaQuery } from '@mui/material'

/**
 * Props for `HomeBanner`.
 */
export type HomeBannerProps = SliceComponentProps<Content.HomeBannerSlice>

/**
 * Component for "HomeBanner" Slices.
 */
const HomeBanner: FC<HomeBannerProps> = ({ slice }) => {
    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <Box sx={{ width: '100%', maxWidth: '100%', overflow: 'hidden', backgroundColor: '#faf5ef', paddingTop: 5 }}>
                {slice.primary.mobile && (
                    <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                        <PrismicNextImage
                            field={slice.primary.mobile}
                            style={{
                                width: '100%',
                                height: 'auto',
                                display: 'block',
                                objectFit: 'contain',
                            }}
                        />
                    </Box>
                )}
                {slice.primary.desktop && (
                    <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                        <PrismicNextImage
                            field={slice.primary.desktop}
                            style={{
                                width: '100%',
                                height: 'auto',
                                display: 'block',
                                objectFit: 'contain',
                            }}
                        />
                    </Box>
                )}
            </Box>
        </section>
    )
}

export default HomeBanner
