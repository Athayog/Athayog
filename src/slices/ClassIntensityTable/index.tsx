import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'

/**
 * Props for `ClassIntensityTable`.
 */
export type ClassIntensityTableProps =
    SliceComponentProps<Content.ClassIntensityTableSlice>

/**
 * Component for "ClassIntensityTable" Slices.
 */
const ClassIntensityTable = ({
    slice,
}: ClassIntensityTableProps): JSX.Element => {
    return (
        <section
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            Placeholder component for class_intensity_table (variation:{' '}
            {slice.variation}) Slices
        </section>
    )
}

export default ClassIntensityTable
