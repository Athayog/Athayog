import { backgroundColorExtract } from '@/utils/color'
import { Box, Typography } from '@mui/material'
import { Content } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'

/**
 * Props for `WhyToChoose`.
 */
export type WhyToChooseProps = SliceComponentProps<Content.WhyToChooseSlice>

/**
 * Component for "WhyToChoose" Slices.
 */
const WhyToChoose = ({ slice }: WhyToChooseProps): JSX.Element => {
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
                    <PrismicNextImage field={slice.primary.logo} style={{ width: '100px', height: 'auto' }} />
                    <Box sx={{ fontSize: { xs: '28px', md: '56px' }, fontWeight: '700', textAlign: 'center' }}>
                        <PrismicRichText field={slice.primary.title} />
                        <Box sx={{ color: '#617E43' }}>{slice.primary.subtitle}</Box>
                    </Box>
                    {slice.primary.content.map((item, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                flexDirection: { xs: 'column-reverse', md: 'row' },
                                alignItems: 'flex-start',
                                marginTop: { xs: '30px', md: '70px' },
                                gap: { xs: '34px', md: '150px' },
                            }}
                        >
                            <Box sx={{ flex: 1, marginRight: '20px', maxWidth: '600px' }}>
                                <Typography
                                    sx={{
                                        color: '#52772C',
                                        fontSize: { xs: '28px', md: '40px' },
                                        textAlign: 'left',
                                        fontWeight: '700',
                                        marginBottom: { xs: '14px', lg: '30px' },
                                    }}
                                >
                                    {item.title}
                                </Typography>
                                <Box
                                    sx={{
                                        color: '#000000',
                                        fontSize: { xs: '20px', md: '36px' },
                                        textAlign: 'left',
                                        fontWeight: '400',
                                        marginBottom: { xs: '14px', lg: '50px' },
                                    }}
                                >
                                    <PrismicRichText field={item.description} />
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    width: { xs: '360px', md: '458px' }, // Set width based on screen size
                                    height: { xs: '200px', md: '270px' },
                                    position: 'relative',
                                    borderRadius: '15px',
                                    overflow: 'hidden',
                                }}
                            >
                                <PrismicNextImage field={item.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        </section>
    )
}

export default WhyToChoose
