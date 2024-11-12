import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'

/**
 * Props for `MentalHealthContent`.
 */
export type MentalHealthContentProps = SliceComponentProps<Content.MentalHealthContentSlice>

/**
 * Component for "MentalHealthContent" Slices.
 */
const MentalHealthContent = ({ slice }: MentalHealthContentProps): JSX.Element => {
    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            Placeholder component for mental_health_content (variation: {slice.variation}) Slices
        </section>
    )
}

export default MentalHealthContent
