import { Box } from '@mui/material'
import { Content } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'
import BackgroundColorLayout from '@/components/_shared/BackgroundColorLayout'

/**
 * Props for `BulletedContent`.
 */
export type BulletedContentProps = SliceComponentProps<Content.BulletedContentSlice>

/**
 * Component for "BulletedContent" Slices.
 */
const BulletedContent = ({ slice }: BulletedContentProps): JSX.Element => {
    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <BackgroundColorLayout background_color={slice.primary.background_color}>
                <Box
                    sx={{
                        fontSize: { xs: '26px', md: '48px' },
                        fontWeight: '700',
                        textAlign: 'center',
                        color: '#2A5200',

                        '&& p': { margin: 0 },
                    }}
                >
                    <PrismicRichText field={slice.primary.title} />
                </Box>
                <Box
                    sx={{
                        fontSize: { xs: '18px', md: '20px', lg: '24px' },
                        lineHeight: { xs: '30px', lg: '46px' },
                        marginTop: { xs: '10px', md: '20px' },
                        textAlign: { xs: 'center', md: 'left' },
                        color: '#000',
                        '&& p': {
                            display: { xs: 'inline', lg: 'block' },
                            wordWrap: 'break-word',
                            whiteSpace: 'initial',
                            margin: 0,
                        },
                    }}
                >
                    {slice.primary.subtitle}
                </Box>
                <Box
                    sx={{
                        color: '#00000',
                        fontSize: { xs: '18px', md: '20px', lg: '24px' },
                        fontWeight: '400',
                        lineHeight: { xs: '30px', lg: '45px' },
                        textAlign: 'left',
                        marginTop: { xs: '21px', md: '45px' },
                        ul: {
                            paddingLeft: '12px',
                        },
                    }}
                >
                    <PrismicRichText field={slice.primary.bulleted} />
                </Box>
            </BackgroundColorLayout>
        </section>
    )
}

export default BulletedContent
