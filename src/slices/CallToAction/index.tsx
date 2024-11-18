import { Content } from '@prismicio/client'
import { Box, Typography } from '@mui/material'
import { backgroundColorExtract } from '@/utils/color'
import Button from '@/components/elements/button/Index'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'
/**
 * Props for `CallToAction`.
 */
export type CallToActionProps = SliceComponentProps<Content.CallToActionSlice>

/**
 * Component for "CallToAction" Slices.
 */
const CallToAction = ({ slice }: CallToActionProps): JSX.Element => {
    const backgroundGradient = backgroundColorExtract(slice.primary.background_color.map((item) => item.color))
    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <Box
                sx={{
                    background: backgroundGradient,
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
                    {slice.variation === 'default' && (
                        <>
                            {slice.primary.title && (  
                                <Typography
                                sx={{
                                    color: '#255400',
                                    fontSize: { xs: '34px', sm: '40px', md: '52px' },
                                    textAlign: 'center',
                                    fontWeight: '700',
                                    maxWidth: '800px',
                                    marginBottom: { xs: '20px', md: '70px' },
                                }}
                            >
                                {slice.primary.title}
                            </Typography>
                            )}  
                            <Box
                                sx={{
                                    borderRadius: '20px',
                                    border: '1.5px solid #4F900A',
                                    backgroundColor: '#FFF',
                                    boxShadow: '2px 4px 4px 0px rgba(0, 0, 0, 0.18)',
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    gap: { xs: '0px', md: '50px' },
                                    flexDirection: { xs: 'column', md: 'row' }, // Column on mobile, row on desktop
                                    flexWrap: 'nowrap',
                                    width: '100%',
                                    padding: { xs: '0px', md: '20px' },
                                }}
                            >
                                {/* Image Section */}
                                <Box
                                    sx={{
                                        position: 'relative',
                                        zIndex: 2,
                                        width: { xs: '100%', md: '40%' }, // Full width on mobile, fixed width on desktop
                                        height: { xs: '200px', md: '312px' }, // Auto height on mobile, fixed on desktop
                                        overflow: 'hidden',
                                        borderRadius: {
                                            xs: '20px 20px 0 0', // Top-left and top-right rounded on mobile
                                            md: '20px', // Full border-radius on desktop
                                        },
                                    }}
                                >
                                    <PrismicNextImage
                                        field={slice.primary.image}
                                        style={{
                                            objectFit: 'cover', // Ensures the image fills the entire container
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    />
                                </Box>

                                {/* Content Section */}
                                <Box
                                    sx={{
                                        width: { xs: '100%', md: '60%' }, // Full width on mobile, auto on desktop
                                        textAlign: { xs: 'left', md: 'left' }, // Center content on mobile
                                        display: 'flex',
                                        flexDirection: 'column',
                                        padding: { xs: '20px', md: '20px' },
                                        height: '100%',
                                    }}
                                >
                                    <Box>
                                        {' '}
                                        <Typography
                                            sx={{
                                                fontWeight: '700',
                                                lineHeight: '34px',
                                                fontSize: { xs: '22px', md: '34px' },
                                                color: '#000',
                                            }}
                                        >
                                            {slice.primary.cta_title}
                                        </Typography>
                                        <Box
                                            sx={{
                                                fontSize: { xs: '18px', md: '24px' },
                                                lineHeight: '44px',
                                                '&& p': {
                                                    margin: 0,
                                                },
                                            }}
                                        >
                                            <PrismicRichText field={slice.primary.cta_info} />
                                        </Box>
                                    </Box>

                                    <PrismicNextLink field={slice.primary.button_link} style={{ alignSelf: 'flex-end' }}>
                                        <Button
                                            sx={{
                                                backgroundColor: '#47820D',
                                                boxShadow: 'none',
                                                alignSelf: 'flex-end',
                                                color: '#fff',
                                                mt: { xs: 2, md: 0 }, // Add top margin on mobile
                                            }}
                                        >
                                            {slice.primary.button_text}
                                        </Button>
                                    </PrismicNextLink>
                                </Box>
                            </Box>
                        </>
                    )}
                    {slice.variation === 'withJustTitle' && (
                        <>
                            <Typography
                                sx={{
                                    color: '#255400',
                                    fontSize: { xs: '24px', md: '42px', lg: '52px' },
                                    textAlign: 'center',
                                    fontWeight: '700',
                                    lineHeight: { xs: '34px', lg: '64px' },
                                }}
                            >
                                {slice.primary.title}
                            </Typography>
                            <PrismicNextLink field={slice.primary.button_link}>
                                <Button
                                    sx={{
                                        fontSize: '26px',
                                        padding: '17.467px 23.289px',
                                        width: '257px',
                                        height: '60px',
                                        marginTop: { xs: '20px', md: '40px' },
                                        backgroundColor: '#47820D',
                                        boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.44)',
                                        color: '#fff',
                                    }}
                                >
                                    {slice.primary.button_link.text}
                                </Button>
                            </PrismicNextLink>
                        </>
                    )}
                </Box>
            </Box>
        </section>
    )
}

export default CallToAction
