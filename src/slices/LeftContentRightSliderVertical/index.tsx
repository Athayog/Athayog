import WhyAthayog from '@/components/WhyAthayog'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'

/**
 * Props for `LeftContentRightSliderVertical`.
 */
export type LeftContentRightSliderVerticalProps = SliceComponentProps<Content.LeftContentRightSliderVerticalSlice>

/**
 * Component for "LeftContentRightSliderVertical" Slices.
 */
const LeftContentRightSliderVertical = ({ slice }: LeftContentRightSliderVerticalProps): JSX.Element => {
    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <WhyAthayog title={slice.primary.title} content={slice.primary.content} />
        </section>
    )
}

export default LeftContentRightSliderVertical
