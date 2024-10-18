import { Box } from '@mui/material'
import { Content } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'
// @ts-nocheck
/**
 * Props for `ContentWithImage`.
 */
export type ContentWithImageProps = SliceComponentProps<Content.ContentWithImageSlice>

/**
 * Component for "ContentWithImage" Slices.
 */

const ContentWithImage = ({ slice }: ContentWithImageProps): JSX.Element => {
    console.log(slice)
    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <Box
                sx={{
                    background: '#E7FAE3',
                    height: '100%',
                    padding: { xs: '30px 20px', md: '60px 50px' },
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
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexDirection: { xs: 'column-reverse', md: slice.variation === 'rightContentLeftImage' ? 'row' : 'row-reverse' },
                            position: 'relative',
                            gap: { xs: '20px', md: '50px' },
                        }}
                    >
                        <Box
                            sx={{
                                width: { xs: '341.04px', md: '436px' }, // Smaller width for mobile, larger for desktop
                                height: { xs: '395.02px', md: '505px' }, // Smaller height for mobile, larger for desktop
                                overflow: 'hidden',
                                borderRadius: '270px',
                                position: 'relative',
                                border: '4px solid transparent', // Transparent border to hold the gradient
                                background: 'linear-gradient(45deg, #F8BCC0, #8CCE5F)', // Gradient for border
                                backgroundClip: 'border-box',
                                padding: '0px', // Padding to ensure the gradient border is visible
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    inset: 0,
                                    zIndex: 1,
                                    background: '#fff', // Background color inside the border
                                    borderRadius: '270px',
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    position: 'relative',
                                    zIndex: 2,
                                    width: '100%',
                                    height: '100%',
                                }}
                            >
                                <PrismicNextImage
                                    field={slice.primary.image}
                                    style={{
                                        objectFit: 'cover',
                                        width: '100%',
                                        height: '100%',
                                    }}
                                />
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                flexBasis: { xs: '100%', md: '50%' },
                            }}
                        >
                            {/* @ts-nocheck */}
                            <Box
                                sx={{
                                    fontSize: slice.primary.variant === 'Small Content' ? { xs: '24px', md: '52px' } : { xs: '24px', md: '32px' }, // @ts-nocheck
                                    fontWeight: '700',
                                    textAlign: { xs: 'center', md: slice.variation === 'rightContentLeftImage' ? 'right' : 'left' },
                                    color: '#2A5200',

                                    '&& p': { margin: 0 },
                                }}
                            >
                                <PrismicRichText field={slice.primary.title} />
                            </Box>
                            <Box
                                sx={{
                                    color: '#00000',
                                    fontSize: slice.primary.variant === 'Small Content' ? { xs: '16px', md: '24px' } : { xs: '17px', md: '26px' }, // @ts-nocheck
                                    fontWeight: '400',
                                    lineHeight: slice.primary.variant === 'Small Content' ? { xs: '29px', md: '49px' } : { xs: '16px', md: '34px' }, // @ts-nocheck
                                    textAlign: { xs: 'center', md: slice.variation === 'rightContentLeftImage' ? 'right' : 'left' },
                                    marginTop: { xs: '14px', md: '26px' },
                                }}
                            >
                                <PrismicRichText field={slice.primary.description} />
                            </Box>
                            {/* @ts-nocheck */}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </section>
    )
}

export default ContentWithImage
