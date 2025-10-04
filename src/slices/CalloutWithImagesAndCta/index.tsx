import { FC } from 'react'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { PrismicRichText } from '@prismicio/react'
import { asLink } from '@prismicio/helpers'
import { Box, Typography, Button, Container, Grid } from '@mui/material'
import Image from 'next/image'

export type CalloutWithImagesAndCtaProps = SliceComponentProps<Content.CalloutWithImagesAndCtaSlice>

const CalloutWithImagesAndCta: FC<CalloutWithImagesAndCtaProps> = ({ slice }) => {
    const { title, description, cta_button, left_image, right_image } = slice.primary
    const ctaUrl = asLink(cta_button)

    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <Box sx={{
                background: 'linear-gradient(180deg, #EAFEDF 5.61%, #EAFEDF 34.53%, #FFF4EA 79.33%)',
                padding: { xs: '30px', md: '50px' },
            }}>

                <Container maxWidth="xl">
                    <Grid container spacing={4} alignItems="center">
                        {/* Left Image */}
                        {left_image?.url && (
                            <Grid item xs={12} md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
                                <Box sx={{
                                    position: 'relative',
                                    width: '100%',
                                    height: { xs: '200px', md: '300px' },
                                    borderRadius: 2,
                                    overflow: 'hidden'
                                }}>
                                    <Image
                                        src={left_image.url}
                                        alt=""
                                        fill
                                        style={{ objectFit: 'contain' }}
                                    />
                                </Box>
                            </Grid>
                        )}

                        {/* Center Content */}
                        <Grid item xs={12} md={6} >
                            <Box sx={{ textAlign: 'center', py: 4 }}>
                                {/* Title */}
                                <PrismicRichText
                                    field={title}
                                    components={{
                                        heading2: ({ children }) => (
                                            <Typography
                                                variant="h2"
                                                component="h1"
                                                sx={{
                                                    fontWeight: 700,
                                                    fontSize: { xs: '24px', md: '38px' },
                                                    mb: 3,
                                                    color: 'text.primary',
                                                    lineHeight: 1.2
                                                }}
                                            >
                                                {children}
                                            </Typography>
                                        )
                                    }}
                                />

                                {/* Description */}
                                <PrismicRichText
                                    field={description}
                                    components={{
                                        paragraph: ({ children }) => (
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontWeight: 400,
                                                    fontSize: { xs: '24px', md: '30px' },
                                                    lineHeight: 1.6,
                                                    mb: { xs: 2, md: 4 },
                                                    color: '#000'
                                                }}
                                            >
                                                {children}
                                            </Typography>
                                        )
                                    }}
                                />

                                {/* CTA Button */}
                                {ctaUrl && (
                                    <Button
                                        variant="contained"
                                        size="medium"
                                        href={ctaUrl}
                                        sx={{
                                            px: '58.67px',
                                            py: '14.67px',
                                            fontSize: {
                                                xs: "20px",
                                                md: "26px"
                                            },
                                            fontWeight: 600,
                                            boxShadow: 0,
                                            borderRadius: "88.01px",
                                            textTransform: 'none',
                                            width: "283.34px",
                                            height: "57.34px",
                                            '&:hover': {
                                                boxShadow: 6,
                                                transform: 'translateY(-2px)',
                                            },
                                            transition: 'all 0.3s ease',
                                        }}
                                    >
                                        {cta_button.text || 'Register Now'}
                                    </Button>
                                )}
                            </Box>
                        </Grid>

                        {/* Right Image */}
                        {right_image?.url && (
                            <Grid item xs={12} md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
                                <Box sx={{
                                    position: 'relative',
                                    width: '100%',
                                    height: { xs: '200px', md: '300px' },
                                    borderRadius: 2,
                                    overflow: 'hidden'
                                }}>
                                    <Image
                                        src={right_image.url}
                                        alt=""
                                        fill
                                        style={{ objectFit: 'contain' }}
                                    />
                                </Box>
                            </Grid>
                        )}
                    </Grid>
                    <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 2, justifyContent: 'center', alignItems: 'center' }}>
                        {left_image?.url && (
                            <Box sx={{
                                position: 'relative',
                                width: { xs: '150px', md: '300px' },
                                height: { xs: '200px', md: '300px' },
                                borderRadius: 2,
                                overflow: 'hidden',
                                flexShrink: 0
                            }}>
                                <Image
                                    src={left_image.url}
                                    alt=""
                                    fill
                                    style={{ objectFit: 'contain' }}
                                />
                            </Box>
                        )}

                        {right_image?.url && (
                            <Box sx={{
                                position: 'relative',
                                width: { xs: '150px', md: '300px' },
                                height: { xs: '200px', md: '300px' },
                                borderRadius: 2,
                                overflow: 'hidden',
                                flexShrink: 0
                            }}>
                                <Image
                                    src={right_image.url}
                                    alt=""
                                    fill
                                    style={{ objectFit: 'contain' }}
                                />
                            </Box>
                        )}
                    </Box>
                </Container>
            </Box >
        </section >
    )
}

export default CalloutWithImagesAndCta