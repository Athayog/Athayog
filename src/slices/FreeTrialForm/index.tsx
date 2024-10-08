import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'

/**
 * Props for `FreeTrialForm`.
 */
export type FreeTrialFormProps = SliceComponentProps<Content.FreeTrialFormSlice>

/**
 * Component for "FreeTrialForm" Slices.
 */
const FreeTrialForm = ({ slice }: FreeTrialFormProps): JSX.Element => {
    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            Placeholder component for free_trial_form (variation: {slice.variation}) Slices
        </section>
    )
}

export default FreeTrialForm
