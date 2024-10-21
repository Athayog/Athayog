import { Content } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { backgroundColorExtract } from '@/utils/color'
import { Box, Grid2, Typography } from '@mui/material'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'

export type AccommodationProps = SliceComponentProps<Content.AccommodationSlice>
const Accommodation = ({ slice }: AccommodationProps): JSX.Element => {
    const backgroundGradient = backgroundColorExtract(slice.primary.background_color.map((item) => item.color))

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
                <Typography
                    sx={{
                        color: '#000',
                        fontSize: { xs: '22px', md: '50px' },
                        fontStyle: 'normal',
                        fontWeight: 700,
                        lineHeight: 'normal',
                    }}
                >
                    {slice.primary.title}
                </Typography>
                <Box
                    sx={{
                        color: '#000',
                        textAlign: 'center',
                        fontSize: { xs: '12px', md: '32px' },
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: { xs: '17px', md: '44px' },
                        marginTop: { xs: '18px', md: '29px' },
                    }}
                >
                    <PrismicRichText field={slice.primary.subtitle} />
                </Box>
                <Grid2 container spacing={2} sx={{ marginTop: { xs: '23px', md: '53px' } }}>
                    {slice.primary.gallery.map((item, index) => (
                        <Grid2 key={index} size={4}>
                            <Box
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}
                            >
                                <PrismicNextImage field={item.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </Box>
                        </Grid2>
                    ))}
                </Grid2>
            </Box>
        </section>
    )
}

export default Accommodation
