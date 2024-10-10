import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import HeroComponent from '@/components/Hero'
import { LinkToMediaField } from '@prismicio/types'

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice> &
    LinkToMediaField & {
        slice: {
            primary: {
                video_background_link: {
                    url: string
                }
            }
        }
    }

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <HeroComponent
                title={slice.primary.title}
                subtitle={slice.primary.subtitle}
                actionButtonText={slice.primary.button_text}
                actionButtonLink={slice.primary.button_link}
                videoUrl={slice.primary.video_background_link.url}
            />
        </section>
    )
}

export default Hero
