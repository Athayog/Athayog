import React from 'react'
import { Box, Container, Typography, Button, Grid, Paper } from '@mui/material'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'

export interface Testimonial {
    id: string
    text: string
    author?: string
}

export interface TestimonialCTASectionProps {
    ctaButtonText: string
    ctaButtonHref?: string
    onCtaClick?: () => void
    sectionTitle: string
    testimonials: Testimonial[]
    finalText: string
    backgroundColor?: string
    ctaButtonBackgroundColor?: string
    ctaButtonTextColor?: string
    sectionTitleColor?: string
    testimonialCardBackgroundColor?: string
    testimonialTextColor?: string
    finalTextColor?: string
}

const TestimonialCTASection: React.FC<TestimonialCTASectionProps> = ({
    ctaButtonText,
    ctaButtonHref,
    onCtaClick,
    sectionTitle,
    testimonials,
    finalText,
    backgroundColor = '#f5f5e8',
    ctaButtonBackgroundColor = '#4a7c2f',
    ctaButtonTextColor = '#ffffff',
    sectionTitleColor = '#3d5a32',
    testimonialCardBackgroundColor = 'rgba(200, 240, 200, 0.6)',
    testimonialTextColor = '#1a1a1a',
    finalTextColor = '#3d5a32',
}) => {
    const handleCtaClick = () => {
        if (onCtaClick) {
            onCtaClick()
        }
    }

    return (
        <Box
            sx={{
                backgroundColor,
                py: { xs: 8, md: 12 },
            }}
        >
            <Container maxWidth="lg">
                {/* CTA Button */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mb: { xs: 6, md: 8 },
                    }}
                >
                    <Button
                        variant="contained"
                        size="large"
                        href={ctaButtonHref}
                        onClick={handleCtaClick}
                        sx={{
                            backgroundColor: ctaButtonBackgroundColor,
                            color: ctaButtonTextColor,
                            px: { xs: 4, md: 6 },
                            py: { xs: 1.5, md: 2 },
                            fontSize: { xs: '1rem', md: '1.15rem' },
                            fontWeight: 600,
                            borderRadius: 8,
                            textTransform: 'none',
                            boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                            transition: 'all 0.3s ease-in-out',
                            '&:hover': {
                                backgroundColor: ctaButtonBackgroundColor,
                                transform: 'translateY(-2px)',
                                boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
                            },
                        }}
                    >
                        {ctaButtonText}
                    </Button>
                </Box>

                {/* Section Title */}
                <Typography
                    variant="h3"
                    component="h2"
                    sx={{
                        color: sectionTitleColor,
                        fontWeight: 700,
                        fontSize: { xs: '1.75rem', md: '2.5rem' },
                        textAlign: 'center',
                        mb: { xs: 4, md: 6 },
                    }}
                >
                    {sectionTitle}
                </Typography>

                {/* Testimonials Grid */}
                <Grid container spacing={{ xs: 3, md: 4 }} sx={{ mb: { xs: 6, md: 8 } }}>
                    {testimonials.map((testimonial) => (
                        <Grid item xs={12} md={4} key={testimonial.id}>
                            <Paper
                                elevation={0}
                                sx={{
                                    backgroundColor: testimonialCardBackgroundColor,
                                    borderRadius: 4,
                                    p: { xs: 3, md: 4 },
                                    height: '100%',
                                    position: 'relative',
                                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                    '&:hover': {
                                        transform: 'translateY(-6px)',
                                        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                                    },
                                }}
                            >
                                {/* Quote Icon */}
                                <Box
                                    sx={{
                                        mb: 2,
                                        opacity: 0.3,
                                    }}
                                >
                                    <FormatQuoteIcon
                                        sx={{
                                            fontSize: { xs: 36, md: 42 },
                                            color: testimonialTextColor,
                                        }}
                                    />
                                </Box>

                                {/* Testimonial Text */}
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: testimonialTextColor,
                                        fontSize: { xs: '1rem', md: '1.05rem' },
                                        lineHeight: 1.7,
                                        fontStyle: 'italic',
                                        mb: testimonial.author ? 2 : 0,
                                    }}
                                >
                                    {testimonial.text}
                                </Typography>

                                {/* Author (optional) */}
                                {testimonial.author && (
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: testimonialTextColor,
                                            fontWeight: 600,
                                            fontSize: { xs: '0.9rem', md: '0.95rem' },
                                            mt: 2,
                                        }}
                                    >
                                        — {testimonial.author}
                                    </Typography>
                                )}
                            </Paper>
                        </Grid>
                    ))}
                </Grid>

                {/* Final Text */}
                <Typography
                    variant="h5"
                    component="p"
                    sx={{
                        color: finalTextColor,
                        fontWeight: 600,
                        fontSize: { xs: '1.25rem', md: '1.5rem' },
                        textAlign: 'center',
                        lineHeight: 1.5,
                    }}
                >
                    {finalText}
                </Typography>
            </Container>
        </Box>
    )
}

export default TestimonialCTASection
