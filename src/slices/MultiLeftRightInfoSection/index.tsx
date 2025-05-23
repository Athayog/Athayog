import { backgroundColorExtract } from '@/utils/color'
import { Box, Typography } from '@mui/material'
import { Content } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'

/**
 * Props for `MultiLeftRightInfoSection`.
 */
export type MultiLeftRightInfoSectionProps = SliceComponentProps<Content.MultiLeftRightInfoSectionSlice>

/**
 * Component for "MultiLeftRightInfoSection" Slices.
 */
const MultiLeftRightInfoSection = ({ slice }: MultiLeftRightInfoSectionProps): JSX.Element => {
    const backgroundGradient = backgroundColorExtract(slice.primary.background_color.map((item) => item.color))
    const descriptionAlignmentDesktop =
        slice.primary.description_alignment_on_desktop === 'Align To Left' ? 'left' : slice.primary.description_alignment_on_desktop === 'Align To Right' ? 'right' : null
    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <Box
                sx={{
                    background: backgroundGradient,
                    height: '100%',
                    padding: '30px 20px',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center',
                        maxWidth: '1400px',
                        margin: '0 auto',
                    }}
                >
                    {' '}
                    <Typography
                        sx={{
                            color: '#255400',
                            fontSize: { xs: '34px', sm: '40px', md: '52px' },
                            textAlign: 'center',
                            fontWeight: '700',
                            maxWidth: '1000px',
                            marginBottom: { xs: '20px', md: '70px' },
                        }}
                    >
                        {slice.primary.title}
                    </Typography>
                    <Box>
                        {slice.primary.content.map((item, index) => (
                            <Box
                                key={item.title}
                                sx={{
                                    display: 'flex',
                                    flexDirection: { xs: 'column', md: slice.primary.starting_direction ? (index % 2 === 0 ? 'row-reverse' : 'row') : index % 2 === 0 ? 'row' : 'row-reverse' },
                                    alignItems: 'center',
                                    justifyContent: 'space-between', // Ensures spacing between content
                                    mb: index === slice.primary.content.length - 1 ? 0 : { xs: '50px', md: '100px' },
                                    width: '100%',
                                    flexWrap: { xs: 'wrap', md: 'nowrap' }, // Prevent wrap on desktop
                                    gap: { xs: '0px', md: '50px' },
                                }}
                            >
                                {/* Image Section */}
                                <Box
                                    sx={{
                                        flexBasis: { xs: '100%', md: '50%' }, // Full width on mobile, 50% on desktop
                                        maxWidth: { xs: '100%', md: '50%' }, // Full width on mobile, 50% on desktop
                                        position: 'relative',
                                        height: { xs: '200px', md: '300px' }, // Adjust height for mobile and desktop
                                        overflow: 'hidden',
                                        borderRadius: '20px',
                                        mb: { xs: 1, md: 0 },
                                        flexGrow: 1, // Allow image to grow with space
                                    }}
                                >
                                    <PrismicNextImage
                                        field={item.image}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: '20px',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </Box>

                                {/* Content Section */}
                                <Box
                                    sx={{
                                        flexBasis: { xs: '100%', md: '50%' }, // Full width on mobile, 50% on desktop
                                        maxWidth: { xs: '100%', md: '50%' }, // Full width on mobile, 50% on desktop
                                        p: 0, // Padding for content
                                        flexGrow: 1, // Allow content to grow with space
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: '#000000',
                                            fontSize: { xs: '24px', md: '32px' },
                                            fontWeight: '700',
                                            textAlign: {
                                                xs: slice.primary.description_alignment_on_mobile ? 'center' : 'left',
                                                md: descriptionAlignmentDesktop === null ? (index % 2 === 0 ? 'left' : 'right') : descriptionAlignmentDesktop,
                                            },
                                        }}
                                        gutterBottom
                                    >
                                        {item.title}
                                    </Typography>
                                    <Box
                                        sx={{
                                            color: '#000000',
                                            fontSize: { xs: '17px', md: '26px' },
                                            lineHeight: { xs: '28px', md: '34px' },
                                            fontWeight: '400',

                                            textAlign: {
                                                xs: slice.primary.description_alignment_on_mobile ? 'center' : 'left',
                                                md: descriptionAlignmentDesktop === null ? (index % 2 === 0 ? 'left' : 'right') : descriptionAlignmentDesktop,
                                            },
                                            '&& p': {
                                                margin: 0,
                                                display: { xs: 'inline', md: 'block' },
                                            },
                                        }}
                                    >
                                        <PrismicRichText field={item.description} />
                                    </Box>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
        </section>
    )
}

export default MultiLeftRightInfoSection
