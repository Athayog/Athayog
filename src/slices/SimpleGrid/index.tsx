import { backgroundColorExtract } from '@/utils/color'
import { Box, Typography, Grid } from '@mui/material'
import { Content } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'

/**
 * Props for `SimpleGrid`.
 */
export type SimpleGridProps = SliceComponentProps<Content.SimpleGridSlice>

/**
 * Component for "SimpleGrid" Slices.
 */
const SimpleGrid = ({ slice }: SimpleGridProps): JSX.Element => {
    const backgroundGradient = backgroundColorExtract(slice.primary.background_color.map((item) => item.color))

    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <Box
                sx={{
                    background: backgroundGradient,
                    padding: { xs: '30px 10px', md: '60px 100px' },
                    width: '100%',
                }}
            >
                <Box
                    sx={{
                        maxWidth: '1400px',
                        margin: '0 auto',
                        textAlign: 'center',
                    }}
                >
                    <Typography
                        sx={{
                            color: '#255400',
                            fontSize: { xs: '34px', sm: '40px', md: '52px' },
                            fontWeight: '700',
                            maxWidth: '800px',
                            marginBottom: { xs: '20px', md: '50px' },
                            margin: '0 auto',
                        }}
                    >
                        <PrismicRichText field={slice.primary.title} />
                    </Typography>

                    {/* Responsive Grid */}
                    <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent="center">
                        {slice.primary.grid.map((item, index) => (
                            <Grid
                                item
                                xs={4} // For mobile, 2 columns per row
                                sm={4} // For small screens, 4 columns per row
                                md={5} // For medium screens and above, 4 items per row (12 / 3 = 4 items)
                                key={index}
                                gap={{ xs: '10px', md: '40px' }}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                }}
                            >
                                {/* Image Section */}
                                <Box
                                    sx={{
                                        width: '100%',
                                        height: { xs: '200px', md: '325px' },
                                        position: 'relative',
                                        borderRadius: '15px',
                                        overflow: 'hidden',
                                    }}
                                >
                                    <PrismicNextImage
                                        field={item.image}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            borderRadius: '15px',
                                        }}
                                    />
                                </Box>
                                {/* Title */}
                                <Typography
                                    sx={{
                                        color: '#000',
                                        fontSize: { xs: '19px', md: '32px' },
                                        fontWeight: '600',
                                        marginTop: '10px',
                                    }}
                                >
                                    {item.title}
                                </Typography>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </section>
    )
}

export default SimpleGrid
