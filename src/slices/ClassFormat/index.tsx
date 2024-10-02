import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'

/**
 * Props for `ClassFormat`.
 */
export type ClassFormatProps = SliceComponentProps<Content.ClassFormatSlice>

/**
 * Component for "ClassFormat" Slices.
 */
const ClassFormat = ({ slice }: ClassFormatProps): JSX.Element => {
    return (
        <section
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            Placeholder component for class_format (variation: {slice.variation}
            ) Slices
        </section>
    )
}

export default ClassFormat
