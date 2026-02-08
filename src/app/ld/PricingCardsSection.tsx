import React from 'react'
import Link from 'next/link'
import { Box, Container, Typography, Grid, Paper, Button, Stack } from '@mui/material'

export interface PricingCard {
    title: string
    price: string
    note?: string
    features?: string[]
    ctaText: string
    ctaHref?: string
    ctaOnClick?: () => void
    featured?: boolean
}

export interface PricingCardsSectionProps {
    title: string
    subtitle?: string
    pricingCards: PricingCard[]
    trustNote?: string
    backgroundColor?: string
    titleColor?: string
    subtitleColor?: string
    cardBackgroundColor?: string
    featuredCardBackgroundColor?: string
    priceColor?: string
    ctaButtonColor?: string
    ctaButtonTextColor?: string
    trustNoteColor?: string
}

const PricingCardsSection: React.FC<PricingCardsSectionProps> = ({
    title,
    subtitle,
    pricingCards,
    trustNote,
    backgroundColor = '#ffffff',
    titleColor = '#2a3d23',
    subtitleColor = '#4a6741',
    cardBackgroundColor = 'rgba(245, 245, 232, 0.6)',
    featuredCardBackgroundColor = 'rgba(74, 124, 47, 0.1)',
    priceColor = '#2a3d23',
    ctaButtonColor = '#4a7c2f',
    ctaButtonTextColor = '#ffffff',
    trustNoteColor = '#4a7c2f',
}) => {
    return (
        <Box
            sx={{
                backgroundColor,
                py: { xs: 8, md: 12 },
            }}
        >
            <Container maxWidth="lg">
                {/* Title */}
                <Typography
                    variant="h3"
                    component="h2"
                    sx={{
                        color: titleColor,
                        fontWeight: 700,
                        fontSize: { xs: '1.75rem', md: '2.5rem' },
                        textAlign: 'center',
                        mb: subtitle ? { xs: 2, md: 3 } : { xs: 6, md: 8 },
                        lineHeight: 1.3,
                    }}
                >
                    {title}
                </Typography>

                {/* Subtitle */}
                {subtitle && (
                    <Typography
                        variant="h6"
                        component="p"
                        sx={{
                            color: subtitleColor,
                            fontWeight: 500,
                            fontSize: { xs: '1.05rem', md: '1.2rem' },
                            textAlign: 'center',
                            mb: { xs: 6, md: 8 },
                            lineHeight: 1.6,
                        }}
                    >
                        {subtitle}
                    </Typography>
                )}

                {/* Pricing Cards */}
                <Grid container spacing={{ xs: 3, md: 4 }} justifyContent="center">
                    {pricingCards.map((card, index) => {
                        const isFeatured = card.featured === true

                        return (
                            <Grid 
                                item 
                                xs={12} 
                                sm={pricingCards.length === 2 ? 6 : 12}
                                md={pricingCards.length === 2 ? 5 : 4} 
                                key={index}
                            >
                                <Paper
                                    elevation={0}
                                    sx={{
                                        backgroundColor: isFeatured
                                            ? featuredCardBackgroundColor
                                            : cardBackgroundColor,
                                        borderRadius: 4,
                                        p: { xs: 4, md: 5 },
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        position: 'relative',
                                        border: isFeatured ? '3px solid' : '2px solid',
                                        borderColor: isFeatured ? ctaButtonColor : 'rgba(0,0,0,0.06)',
                                        transition: 'all 0.3s ease-in-out',
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            boxShadow: isFeatured
                                                ? '0 12px 32px rgba(74, 124, 47, 0.2)'
                                                : '0 8px 24px rgba(0,0,0,0.12)',
                                        },
                                    }}
                                >
                                    {/* Featured Badge */}
                                    {isFeatured && (
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: -12,
                                                backgroundColor: ctaButtonColor,
                                                color: '#ffffff',
                                                px: 3,
                                                py: 0.75,
                                                borderRadius: 2,
                                                fontSize: '0.8rem',
                                                fontWeight: 700,
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.5px',
                                                boxShadow: '0 4px 12px rgba(74, 124, 47, 0.3)',
                                            }}
                                        >
                                            Best Value
                                        </Box>
                                    )}

                                    {/* Title */}
                                    <Typography
                                        variant="h5"
                                        component="h3"
                                        sx={{
                                            color: titleColor,
                                            fontWeight: 700,
                                            fontSize: { xs: '1.35rem', md: '1.5rem' },
                                            mb: { xs: 2, md: 2.5 },
                                            textAlign: 'center',
                                            mt: isFeatured ? 1 : 0,
                                        }}
                                    >
                                        {card.title}
                                    </Typography>

                                    {/* Price */}
                                    <Typography
                                        variant="h2"
                                        component="div"
                                        sx={{
                                            color: priceColor,
                                            fontWeight: 800,
                                            fontSize: { xs: '2.5rem', md: '3rem' },
                                            mb: card.note ? 0.5 : { xs: 3, md: 4 },
                                            lineHeight: 1,
                                        }}
                                    >
                                        {card.price}
                                    </Typography>

                                    {/* Note */}
                                    {card.note && (
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: subtitleColor,
                                                fontWeight: 500,
                                                fontSize: '0.9rem',
                                                mb: { xs: 3, md: 4 },
                                            }}
                                        >
                                            {card.note}
                                        </Typography>
                                    )}

                                    {/* Features */}
                                    {card.features && card.features.length > 0 && (
                                        <Stack spacing={1.5} sx={{ mb: { xs: 3, md: 4 }, width: '100%' }}>
                                            {card.features.map((feature, fIndex) => (
                                                <Typography
                                                    key={fIndex}
                                                    variant="body2"
                                                    sx={{
                                                        color: titleColor,
                                                        fontWeight: 500,
                                                        fontSize: '0.95rem',
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    {feature}
                                                </Typography>
                                            ))}
                                        </Stack>
                                    )}

                                    {/* CTA Button */}
                                    <Button
                                        component={card.ctaHref ? Link : 'button'}
                                        href={card.ctaHref}
                                        onClick={card.ctaOnClick}
                                        variant="contained"
                                        fullWidth
                                        sx={{
                                            backgroundColor: ctaButtonColor,
                                            color: ctaButtonTextColor,
                                            py: { xs: 1.5, md: 1.75 },
                                            fontSize: { xs: '1rem', md: '1.1rem' },
                                            fontWeight: 700,
                                            borderRadius: 3,
                                            textTransform: 'none',
                                            boxShadow: '0 4px 14px rgba(74, 124, 47, 0.3)',
                                            '&:hover': {
                                                backgroundColor: ctaButtonColor,
                                                transform: 'translateY(-2px)',
                                                boxShadow: '0 6px 20px rgba(74, 124, 47, 0.4)',
                                            },
                                            transition: 'all 0.3s ease-in-out',
                                        }}
                                    >
                                        {card.ctaText}
                                    </Button>
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>

                {/* Trust Note */}
                {trustNote && (
                    <Typography
                        variant="body2"
                        sx={{
                            color: trustNoteColor,
                            fontWeight: 600,
                            fontSize: { xs: '0.95rem', md: '1rem' },
                            textAlign: 'center',
                            mt: { xs: 4, md: 5 },
                        }}
                    >
                        {trustNote}
                    </Typography>
                )}
            </Container>
        </Box>
    )
}

export default PricingCardsSection
