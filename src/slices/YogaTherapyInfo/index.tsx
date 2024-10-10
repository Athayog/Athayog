import { Box } from '@mui/material'
import { Content } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'

/**
 * Props for `YogaTherapyInfo`.
 */
export type YogaTherapyInfoProps = SliceComponentProps<Content.YogaTherapyInfoSlice>

/**
 * Component for "YogaTherapyInfo" Slices.
 */
const YogaTherapyInfo = ({ slice }: YogaTherapyInfoProps): JSX.Element => {
    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <Box sx={{ background: 'linear-gradient(to bottom, #dffad1, #e5fbd3)', padding: { xs: '30px 10px', md: '60px 50px' }, textAlign: 'center' }}>
                <Box sx={{ margin: '0 auto', maxWidth: '1400px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Box
                        sx={{
                            color: '#00000',
                            fontSize: { xs: '17px', md: '26px' },
                            fontWeight: '400',
                            marginTop: { xs: '14px', md: '26px' },
                        }}
                    >
                        <PrismicRichText field={slice.primary.first_content} />
                    </Box>

                    <Box sx={{ marginTop: '50px' }}>
                        <Box
                            sx={{
                                fontSize: { xs: '24px', md: '48px' },
                                fontWeight: '700',
                                textAlign: 'center',
                                color: '#2A5200',
                                marginBottom: '30px',

                                '&& p': {
                                    margin: 0,
                                },
                            }}
                        >
                            <PrismicRichText field={slice.primary.second_title} />
                        </Box>

                        <Box
                            sx={{
                                color: '#00000',
                                fontSize: { xs: '17px', md: '26px' },
                                fontWeight: '400',
                                marginTop: { xs: '14px', md: '26px' },
                            }}
                        >
                            <PrismicRichText field={slice.primary.second_description} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </section>
    )
}

export default YogaTherapyInfo
