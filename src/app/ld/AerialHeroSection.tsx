import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Box, Container, Typography, Button, Stack } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

export interface CTAButton {
    text: string
    href?: string
    onClick?: () => void
}

export interface AerialHeroSectionProps {
    h1: string
    subheadline: string
    trustPoints: string[]
    primaryCTA: CTAButton
    secondaryCTA?: CTAButton
    // Background options
    backgroundImage?: StaticImport | string // ← NEW: Optional background image
    backgroundImageAlt?: string
    backgroundColor?: string // Used as overlay if image provided, or solid if no image
    overlayOpacity?: number // ← NEW: Control overlay darkness (0-1)
    // Text colors
    h1Color?: string
    subheadlineColor?: string
    trustPointColor?: string
    // Button colors
    primaryButtonColor?: string
    primaryButtonTextColor?: string
    secondaryButtonColor?: string
    secondaryButtonTextColor?: string
}

const AerialHeroSection: React.FC<AerialHeroSectionProps> = ({
    h1,
    subheadline,
    trustPoints,
    primaryCTA,
    secondaryCTA,
    backgroundImage,
    backgroundImageAlt = 'Hero background',
    backgroundColor = 'linear-gradient(135deg, #4a7c2f 0%, #2a3d23 100%)',
    overlayOpacity = 0.7,
    h1Color = '#ffffff',
    subheadlineColor = 'rgba(255, 255, 255, 0.9)',
    trustPointColor = 'rgba(255, 255, 255, 0.95)',
    primaryButtonColor = '#ffffff',
    primaryButtonTextColor = '#2a3d23',
    secondaryButtonColor = 'transparent',
    secondaryButtonTextColor = '#ffffff',
}) => {
    return (
        <Box
            sx={{
                position: 'relative',
                overflow: 'hidden',
                background: backgroundImage ? 'transparent' : backgroundColor,
                py: { xs: 16, md: 22 },
            }}
        >
            {/* Background Image */}
            {backgroundImage && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 0,
                    }}
                >
                    <Image
                        src={backgroundImage}
                        alt={backgroundImageAlt}
                        fill
                        priority
                        quality={90}
                        sizes="100vw"
                        style={{
                            objectFit: 'cover',
                            objectPosition: 'center',
                        }}
                    />

                    {/* Gradient Overlay */}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: backgroundColor,
                            opacity: overlayOpacity,
                        }}
                    />
                </Box>
            )}

            {/* Content Container */}
            <Container
                maxWidth="lg"
                sx={{
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                {/* H1 Title */}
                <Typography
                    variant="h1"
                    component="h1"
                    sx={{
                        color: h1Color,
                        fontWeight: 800,
                        fontSize: { xs: '2rem', sm: '2.75rem', md: '3.5rem' },
                        lineHeight: 1.2,
                        textAlign: 'center',
                        mb: { xs: 3, md: 4 },
                        px: { xs: 2, md: 0 },
                        textShadow: backgroundImage ? '0 2px 10px rgba(0,0,0,0.5)' : 'none',
                    }}
                >
                    {h1}
                </Typography>

                {/* Subheadline */}
                <Typography
                    variant="h5"
                    component="p"
                    sx={{
                        color: subheadlineColor,
                        fontWeight: 400,
                        fontSize: { xs: '1.15rem', md: '1.4rem' },
                        lineHeight: 1.6,
                        textAlign: 'center',
                        mb: { xs: 5, md: 6 },
                        maxWidth: '800px',
                        mx: 'auto',
                        px: { xs: 2, md: 0 },
                        textShadow: backgroundImage ? '0 2px 8px rgba(0,0,0,0.4)' : 'none',
                    }}
                >
                    {subheadline}
                </Typography>

                {/* Trust Points */}
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 3 }} justifyContent="center" alignItems="center" sx={{ mb: { xs: 5, md: 6 } }}>
                    {trustPoints.map((point, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.5,
                                backgroundColor: backgroundImage ? 'rgba(0, 0, 0, 0.3)' : 'transparent',
                                px: backgroundImage ? 2 : 0,
                                py: backgroundImage ? 1 : 0,
                                borderRadius: backgroundImage ? 2 : 0,
                                backdropFilter: backgroundImage ? 'blur(4px)' : 'none',
                            }}
                        >
                            <CheckCircleIcon
                                sx={{
                                    color: '#7cb342',
                                    fontSize: { xs: 24, md: 26 },
                                    filter: backgroundImage ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))' : 'none',
                                }}
                            />
                            <Typography
                                sx={{
                                    color: trustPointColor,
                                    fontWeight: 500,
                                    fontSize: { xs: '0.95rem', md: '1.05rem' },
                                    textShadow: backgroundImage ? '0 2px 6px rgba(0,0,0,0.5)' : 'none',
                                }}
                            >
                                {point}
                            </Typography>
                        </Box>
                    ))}
                </Stack>

                {/* CTA Buttons */}
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 3 }} justifyContent="center" alignItems="center">
                    {/* Primary CTA */}
                    <Button
                        component={primaryCTA.href ? Link : 'button'}
                        href={primaryCTA.href}
                        onClick={primaryCTA.onClick}
                        variant="contained"
                        size="large"
                        sx={{
                            backgroundColor: primaryButtonColor,
                            color: primaryButtonTextColor,
                            px: { xs: 5, md: 6 },
                            py: { xs: 1.75, md: 2 },
                            fontSize: { xs: '1.05rem', md: '1.15rem' },
                            fontWeight: 700,
                            borderRadius: 3,
                            textTransform: 'none',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                            '&:hover': {
                                backgroundColor: primaryButtonColor,
                                transform: 'translateY(-2px)',
                                boxShadow: '0 6px 24px rgba(0,0,0,0.4)',
                            },
                            transition: 'all 0.3s ease-in-out',
                        }}
                    >
                        {primaryCTA.text}
                    </Button>

                    {/* Secondary CTA */}
                    {secondaryCTA && (
                        <Button
                            component={secondaryCTA.href ? Link : 'button'}
                            href={secondaryCTA.href}
                            onClick={secondaryCTA.onClick}
                            variant="outlined"
                            size="large"
                            sx={{
                                backgroundColor: secondaryButtonColor,
                                color: secondaryButtonTextColor,
                                borderColor: secondaryButtonTextColor,
                                borderWidth: 2,
                                px: { xs: 5, md: 6 },
                                py: { xs: 1.75, md: 2 },
                                fontSize: { xs: '1.05rem', md: '1.15rem' },
                                fontWeight: 700,
                                borderRadius: 3,
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                    borderColor: secondaryButtonTextColor,
                                    borderWidth: 2,
                                    transform: 'translateY(-2px)',
                                },
                                transition: 'all 0.3s ease-in-out',
                            }}
                        >
                            {secondaryCTA.text}
                        </Button>
                    )}
                </Stack>
            </Container>
        </Box>
    )
}

export default AerialHeroSection
