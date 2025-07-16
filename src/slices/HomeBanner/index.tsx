import { FC } from 'react'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { PrismicNextImage } from '@prismicio/next'
import { Box } from '@mui/material'

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
            <Box
                sx={{
                    width: '100%',
                    maxWidth: '100%',
                    overflow: 'hidden',
                    backgroundColor: 'white',
                }}
            >
                {slice?.primary?.desktop?.url && (
                    <PrismicNextImage
                        field={slice.primary.desktop}
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
