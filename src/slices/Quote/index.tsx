import BackgroundColorLayout from '@/components/_shared/BackgroundColorLayout'
import { Box, Typography } from '@mui/material'
import { Content } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'

/**
 * Props for `Quote`.
 */
export type QuoteProps = SliceComponentProps<Content.QuoteSlice>

/**
 * Component for "Quote" Slices.
 */
const Quote = ({ slice }: QuoteProps): JSX.Element => {
    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <BackgroundColorLayout background_color={slice.primary.background_color}>
                <Box
                    sx={{
                        fontSize: { xs: '25px', md: '45px' },
                        fontWeight: '700',
                        lineHeight: { xs: '30px', md: '70px' },
                        '&& p': {
                            margin: 0,
                        },
                    }}
                >
                    <PrismicRichText field={slice.primary.quote} />
                </Box>
                <Typography sx={{ fontSize: { xs: '20px', md: '32px' }, textAlign: 'right', alignSelf: 'flex-end' }}>- {slice.primary.person_name}</Typography>
            </BackgroundColorLayout>
        </section>
    )
}

export default Quote
