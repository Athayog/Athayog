'use client'
import { FC } from 'react'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { PrismicNextImage } from '@prismicio/next'
import { Box, useMediaQuery } from '@mui/material'
import theme from '@/styles/theme'

/**
 * Props for `HomeBanner`.
 */
export type HomeBannerProps = SliceComponentProps<Content.HomeBannerSlice>

/**
 * Component for "HomeBanner" Slices.
 */
const HomeBanner: FC<HomeBannerProps> = ({ slice }) => {
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const imageField = isMobile ? slice.primary.mobile : slice.primary.desktop
    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <Box
                sx={{
                    width: '100%',
                    maxWidth: '100%',
                    overflow: 'hidden',
                    backgroundColor: 'white',
                }}
            >
                {imageField && (
                    <PrismicNextImage
                        field={imageField}
                        style={{
                            width: '100%',
                            height: 'auto',
                            display: 'block',
                            objectFit: 'contain',
                        }}
                    />
                )}
            </Box>
        </section>
    )
}

export default HomeBanner
