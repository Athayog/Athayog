import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'

/**
 * Props for `MentalHealthHero`.
 */
export type MentalHealthHeroProps = SliceComponentProps<Content.MentalHealthHeroSlice>

/**
 * Component for "MentalHealthHero" Slices.
 */
const MentalHealthHero = ({ slice }: MentalHealthHeroProps): JSX.Element => {
    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            Placeholder component for mental_health_hero (variation: {slice.variation}) Slices
        </section>
    )
}

export default MentalHealthHero
