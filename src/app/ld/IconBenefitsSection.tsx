import React from 'react'
import { Box, Container, Typography, Grid, Paper } from '@mui/material'

export interface Benefit {
    id: string
    icon: React.ReactNode
    title: string
    description?: string
}

export interface IconBenefitsSectionProps {
    title: string
    subtitle?: string
    benefits: Benefit[]
    backgroundColor?: string
    titleColor?: string
    subtitleColor?: string
    cardBackgroundColor?: string
    iconBackgroundColor?: string
    iconColor?: string
    benefitTitleColor?: string
    benefitDescriptionColor?: string
}

const IconBenefitsSection: React.FC<IconBenefitsSectionProps> = ({
    title,
    subtitle,
    benefits,
    backgroundColor = '#f5f5e8',
    titleColor = '#2a3d23',
    subtitleColor = '#4a6741',
    cardBackgroundColor = 'rgba(255, 255, 255, 0.8)',
    iconBackgroundColor = 'rgba(74, 124, 47, 0.12)',
    iconColor = '#4a7c2f',
    benefitTitleColor = '#2a3d23',
    benefitDescriptionColor = '#555555',
}) => {
    // Calculate grid sizing based on number of benefits
    const getGridSize = () => {
        const count = benefits.length
        if (count === 1) return { xs: 12, sm: 12, md: 6, lg: 4 } // 1 item: centered medium card
        if (count === 2) return { xs: 12, sm: 6, md: 6, lg: 4 } // 2 items: half width each
        if (count === 3) return { xs: 12, sm: 6, md: 4 } // 3 items: thirds
        return { xs: 12, sm: 6, md: 3 } // 4+ items: quarters
    }

    const gridSize = getGridSize()

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
                        px: { xs: 2, md: 0 },
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
                            px: { xs: 2, md: 0 },
                        }}
                    >
                        {subtitle}
                    </Typography>
                )}

                {/* Benefits Grid - Always Centered */}
                <Grid
                    container
                    spacing={{ xs: 3, md: 4 }}
                    justifyContent="center" // Always center items
                    alignItems="stretch"
                >
                    {benefits.map((benefit) => (
                        <Grid
                            item
                            {...gridSize}
                            key={benefit.id}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <Paper
                                elevation={0}
                                sx={{
                                    backgroundColor: cardBackgroundColor,
                                    borderRadius: 4,
                                    p: { xs: 3.5, md: 4 },
                                    height: '100%',
                                    width: '100%',
                                    maxWidth: benefits.length === 1 ? '400px' : '100%', // Limit single card width
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    border: '2px solid rgba(0,0,0,0.04)',
                                    transition: 'all 0.3s ease-in-out',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: '0 12px 28px rgba(0,0,0,0.12)',
                                    },
                                }}
                            >
                                {/* Icon */}
                                <Box
                                    sx={{
                                        width: { xs: 72, md: 80 },
                                        height: { xs: 72, md: 80 },
                                        borderRadius: '50%',
                                        backgroundColor: iconBackgroundColor,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        mb: { xs: 2.5, md: 3 },
                                        '& svg': {
                                            fontSize: { xs: 36, md: 40 },
                                            color: iconColor,
                                        },
                                    }}
                                >
                                    {benefit.icon}
                                </Box>

                                {/* Title */}
                                <Typography
                                    variant="h6"
                                    component="h3"
                                    sx={{
                                        color: benefitTitleColor,
                                        fontWeight: 700,
                                        fontSize: { xs: '1.15rem', md: '1.25rem' },
                                        mb: benefit.description ? { xs: 1.5, md: 2 } : 0,
                                        lineHeight: 1.3,
                                    }}
                                >
                                    {benefit.title}
                                </Typography>

                                {/* Description */}
                                {benefit.description && (
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: benefitDescriptionColor,
                                            fontWeight: 400,
                                            fontSize: { xs: '0.9rem', md: '0.95rem' },
                                            lineHeight: 1.6,
                                        }}
                                    >
                                        {benefit.description}
                                    </Typography>
                                )}
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    )
}

export default IconBenefitsSection
