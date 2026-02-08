import React from 'react'
import { Box, Container, Typography, Stack } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

export interface LocationFeature {
    id: string
    text: string
}

export interface StudioLocationSectionProps {
    title: string
    subtitle?: string
    features: LocationFeature[]
    backgroundColor?: string
    titleColor?: string
    subtitleColor?: string
    featureTextColor?: string
    iconColor?: string
}

const StudioLocationSection: React.FC<StudioLocationSectionProps> = ({
    title,
    subtitle,
    features,
    backgroundColor = '#f5f5e8',
    titleColor = '#2a3d23',
    subtitleColor = '#4a6741',
    featureTextColor = '#1a1a1a',
    iconColor = '#4a7c2f',
}) => {
    return (
        <Box
            sx={{
                backgroundColor,
                py: { xs: 8, md: 12 },
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
                        fontSize: { xs: '1.75rem', md: '2.5rem' },
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
                            fontWeight: 500,
                            fontSize: { xs: '1.05rem', md: '1.2rem' },
                            textAlign: 'center',
                            mb: { xs: 5, md: 6 },
                            lineHeight: 1.6,
                        }}
                    >
                        {subtitle}
                    </Typography>
                )}

                {/* Features List */}
                <Stack spacing={{ xs: 3, md: 3.5 }}>
                    {features.map((feature) => (
                        <Box
                            key={feature.id}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: { xs: 2.5, md: 3 },
                                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                                borderRadius: 3,
                                p: { xs: 3, md: 3.5 },
                                border: '2px solid rgba(0,0,0,0.04)',
                                transition: 'all 0.2s ease-in-out',
                                '&:hover': {
                                    transform: 'translateX(8px)',
                                    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                                },
                            }}
                        >
                            {/* Icon */}
                            <Box
                                sx={{
                                    flexShrink: 0,
                                    '& svg': {
                                        fontSize: { xs: 32, md: 36 },
                                        color: iconColor,
                                    },
                                }}
                            >
                                <CheckCircleIcon />
                            </Box>

                            {/* Text */}
                            <Typography
                                variant="body1"
                                sx={{
                                    color: featureTextColor,
                                    fontWeight: 500,
                                    fontSize: { xs: '1.1rem', md: '1.2rem' },
                                    lineHeight: 1.6,
                                    flex: 1,
                                }}
                            >
                                {feature.text}
                            </Typography>
                        </Box>
                    ))}
                </Stack>
            </Container>
        </Box>
    )
}

export default StudioLocationSection
