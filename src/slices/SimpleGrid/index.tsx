import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'

/**
 * Props for `SimpleGrid`.
 */
export type SimpleGridProps = SliceComponentProps<Content.SimpleGridSlice>

/**
 * Component for "SimpleGrid" Slices.
 */
const SimpleGrid = ({ slice }: SimpleGridProps): JSX.Element => {
    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            Placeholder component for simple_grid (variation: {slice.variation}) Slices
        </section>
    )
}

export default SimpleGrid
