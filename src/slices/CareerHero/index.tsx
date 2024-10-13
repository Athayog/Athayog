import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'

/**
 * Props for `CareerHero`.
 */
export type CareerHeroProps = SliceComponentProps<Content.CareerHeroSlice>

/**
 * Component for "CareerHero" Slices.
 */
const CareerHero = ({ slice }: CareerHeroProps): JSX.Element => {
    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            Placeholder component for career_hero (variation: {slice.variation}) Slices
        </section>
    )
}

export default CareerHero
