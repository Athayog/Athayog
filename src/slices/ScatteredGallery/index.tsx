import BackgroundColorLayout from '@/components/_shared/BackgroundColorLayout'
import { Content } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { SliceComponentProps } from '@prismicio/react'

/**
 * Props for `ScatteredGallery`.
 */
export type ScatteredGalleryProps = SliceComponentProps<Content.ScatteredGallerySlice>

/**
 * Component for "ScatteredGallery" Slices.
 */
const ScatteredGallery = ({ slice }: ScatteredGalleryProps): JSX.Element => {
    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <BackgroundColorLayout background_color={slice.primary.background_color}>
                <PrismicNextImage field={slice.primary.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </BackgroundColorLayout>
        </section>
    )
}

export default ScatteredGallery
