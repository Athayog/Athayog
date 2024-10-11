import { Box } from '@mui/material'
import { Content } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'

/**
 * Props for `SimpleTextBlock`.
 */
export type SimpleTextBlockProps = SliceComponentProps<Content.SimpleTextBlockSlice>

/**
 * Component for "SimpleTextBlock" Slices.
 */
const SimpleTextBlock = ({ slice }: SimpleTextBlockProps): JSX.Element => {
    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <Box sx={{ background: slice.primary.background_color, padding: { xs: '30px 10px', md: '60px 50px' }, textAlign: 'center' }}>
                <Box sx={{ margin: '0 auto', maxWidth: '1400px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Box
                        sx={{
                            color: '#00000',
                            fontSize: { xs: '17px', md: '26px' },
                            fontWeight: '400',
                            marginTop: { xs: '14px', md: '26px' },
                        }}
                    >
                        <PrismicRichText field={slice.primary.content} />
                    </Box>
                </Box>
            </Box>
        </section>
    )
}

export default SimpleTextBlock
