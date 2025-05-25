import { FC } from 'react'
import { Content } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'
import { backgroundColorExtract } from '@/utils/color'
import { Box, Typography, Container, Button, Grid } from '@mui/material'
import Image from 'next/image'

/**
 * Props for `ArambhaRegister`.
 */
export type ArambhaRegisterProps = SliceComponentProps<Content.ArambhaRegisterSlice>

/**
 * Component for "ArambhaRegister" Slices.
 */
const ArambhaRegister: FC<ArambhaRegisterProps> = ({ slice }) => {
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
                <Container maxWidth="md">
                    <Grid container spacing={4} alignItems="center" justifyContent="center">
                        {/* Left Image */}
                        <Grid item xs={12} md={3}>
                            <Image
                                src={slice.primary.leftimage.url || '/placeholder.png'}
                                alt="Yoga Pose Left"
                                width={200}
                                height={200}
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </Grid>

                        {/* Center Content */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="h4" align="center" gutterBottom sx={{ color: '#007B48' }}>
                                {slice.primary.title}
                            </Typography>
                            <Typography variant="h6" align="center" gutterBottom color="primary">
                                {slice.primary.subtitle}
                            </Typography>
                            <Box sx={{ mb: 2 }}>
                                <PrismicRichText field={slice.primary.description} />
                                <PrismicRichText field={slice.primary.dates} />
                            </Box>

                            <Box display="flex" justifyContent="center" mb={4}>
                                <Button variant="contained" color="error" size="large">
                                    <Box>
                                        <Typography sx={{ fontWeight: 700, fontFamily: 'var(--font-montserrat)' }}>
                                            {slice.primary.registration_button_title}
                                        </Typography>
                                        <Typography sx={{ fontWeight: 600 }}>
                                            {slice.primary.registration_button_subtitle}
                                        </Typography>
                                    </Box>
                                </Button>
                            </Box>
                        </Grid>

                        {/* Right Image */}
                        <Grid item xs={12} md={3}>
                            <Image
                                src={slice.primary.rightimage.url || '/placeholder.png'}
                                alt="Yoga Pose Right"
                                width={200}
                                height={200}
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </Grid>
                    </Grid>

                    {/* Line Art Image */}
                    <Box my={4} display="flex" justifyContent="center">
                        <Image
                            src={slice.primary.lineart.url || '/placeholder.png'}
                            alt="Yoga Line Art"
                            width={300}
                            height={300}
                            style={{ width: '100%', maxWidth: 300, height: 'auto' }}
                        />
                    </Box>

                    {/* About the Event */}
                    <Box>
                        <Typography variant="h5" align="center" gutterBottom>
                            {slice.primary.abouteventtitle}
                        </Typography>
                        <Box sx={{ textAlign: 'center' }}>
                            <PrismicRichText field={slice.primary.abouteventdescription} />
                        </Box>
                    </Box>
                </Container>
            </Box>
        </section>
    )
}


export default ArambhaRegister
