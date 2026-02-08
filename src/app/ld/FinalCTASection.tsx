import React from 'react'
import Link from 'next/link'
import { Box, Container, Typography, Button, Stack } from '@mui/material'

export interface CTAButton {
    text: string
    href?: string
    onClick?: () => void
}

export interface FinalCTASectionProps {
    title: string
    subtitle?: string
    primaryCTA: CTAButton
    secondaryCTA?: CTAButton
    backgroundColor?: string
    titleColor?: string
    subtitleColor?: string
    primaryButtonColor?: string
    primaryButtonTextColor?: string
    secondaryButtonColor?: string
    secondaryButtonTextColor?: string
}

const FinalCTASection: React.FC<FinalCTASectionProps> = ({
    title,
    subtitle,
    primaryCTA,
    secondaryCTA,
    backgroundColor = 'linear-gradient(135deg, #4a7c2f 0%, #2a3d23 100%)',
    titleColor = '#ffffff',
    subtitleColor = 'rgba(255, 255, 255, 0.9)',
    primaryButtonColor = '#ffffff',
    primaryButtonTextColor = '#2a3d23',
    secondaryButtonColor = 'transparent',
    secondaryButtonTextColor = '#ffffff',
}) => {
    return (
        <Box
            sx={{
                background: backgroundColor,
                py: { xs: 10, md: 12 },
            }}
        >
            <Container maxWidth="md">
                {/* Title */}
                <Typography
                    variant="h3"
                    component="h2"
                    sx={{
                        color: titleColor,
                        fontWeight: 700,
                        fontSize: { xs: '2rem', md: '2.75rem' },
                        textAlign: 'center',
                        mb: subtitle ? { xs: 2, md: 3 } : { xs: 5, md: 6 },
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
                            fontWeight: 400,
                            fontSize: { xs: '1.1rem', md: '1.25rem' },
                            textAlign: 'center',
                            mb: { xs: 5, md: 6 },
                            lineHeight: 1.6,
                        }}
                    >
                        {subtitle}
                    </Typography>
                )}

                {/* CTA Buttons */}
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 2, sm: 3 }}
                    justifyContent="center"
                    alignItems="center"
                >
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

export default FinalCTASection
