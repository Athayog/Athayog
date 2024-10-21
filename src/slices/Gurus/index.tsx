import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { backgroundColorExtract } from '@/utils/color'
import { Box, Grid2, Typography } from '@mui/material'
import { PrismicNextImage } from '@prismicio/next'

export type GurusProps = SliceComponentProps<Content.GurusSlice>

const Gurus = ({ slice }: GurusProps): JSX.Element => {
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
                    <Typography
                        sx={{
                            fontSize: { xs: '24px', md: '52px' },
                            fontWeight: '700',
                            textAlign: 'center',
                            color: '#000',
                        }}
                    >
                        {slice.primary.title}
                    </Typography>
                    <Grid2 container spacing={5} sx={{ marginTop: { xs: '23px', md: '53px' } }}>
                        {slice.primary.guru.map((item, index) => (
                            <Grid2 key={index} size={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Box
                                    sx={{
                                        width: { xs: '100%', sm: '250px', md: '400px' }, // Adjust container width
                                        display: 'flex',
                                        flexDirection: 'column', // Ensure vertical alignment
                                        alignItems: 'center',
                                        textAlign: 'center',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: { xs: '150px', sm: '250px', md: '368px' },
                                            height: { xs: '150px', sm: '250px', md: '368px' },
                                            overflow: 'hidden',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginBottom: { xs: '10px', sm: '15px', md: '20px' }, // Adjust space between image and text
                                        }}
                                    >
                                        <PrismicNextImage
                                            field={item.guru_image}
                                            style={{
                                                objectFit: 'cover',
                                                width: '100%',
                                                height: '100%',
                                                borderRadius: '50%',
                                            }}
                                        />
                                    </Box>
                                    <Typography
                                        sx={{
                                            color: '#000',
                                            lineHeight: { xs: '16px', sm: '30px', md: '52px' },
                                            fontSize: { xs: '10px', sm: '18px', md: '32px' },
                                            fontWeight: '700',
                                            marginBottom: { xs: '5px', md: '10px' }, // Space between name and designation
                                        }}
                                    >
                                        {item.name}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: '#000',
                                            lineHeight: { xs: '16px', sm: '30px', md: '52px' },
                                            fontSize: { xs: '10px', sm: '18px', md: '32px' },
                                            fontWeight: '400',
                                        }}
                                    >
                                        {item.designation}
                                    </Typography>
                                </Box>
                            </Grid2>
                        ))}
                    </Grid2>
                </Box>
            </Box>
        </section>
    )
}

export default Gurus
