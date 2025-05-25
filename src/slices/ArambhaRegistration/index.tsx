import { FC } from 'react'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import ArambhaForm from '@/components/forms/ArambhaForm'
import { Box } from '@mui/material'
import { backgroundColorExtract } from '@/utils/color'

/**
 * Props for `ArambhaRegistration`.
 */
export type ArambhaRegistrationProps = SliceComponentProps<Content.ArambhaRegistrationSlice>

/**
 * Component for "ArambhaRegistration" Slices.
 */
const ArambhaRegistration: FC<ArambhaRegistrationProps> = ({ slice }) => {
    const backgroundGradient = backgroundColorExtract(slice.primary.background_color.map((item) => item.color));

    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <Box
                sx={{
                    background: backgroundGradient,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: { xs: '20px 10px', md: '60px 130px' },
                }}
            >

                <ArambhaForm data={slice.primary} />
            </Box>
        </section>
    )
}

export default ArambhaRegistration
