import React from 'react'
import { Box, Container, Typography, Grid, Paper } from '@mui/material'

export interface SectionCard {
    icon: React.ReactNode
    title: string
    description?: string
}

export interface FeatureSectionProps {
    title: string
    description?: string
    cards: SectionCard[]
    backgroundColor?: string
    sectionLabelColor?: string
    titleColor?: string
    cardBackgroundColor?: string
    cardTextColor?: string
    iconColor?: string
    iconBackgroundColor?: string
}

const FeatureSection: React.FC<FeatureSectionProps> = ({
    title,
    description,
    cards,
    backgroundColor = '#f5f5e8',
    sectionLabelColor = '#d32f2f',
    titleColor = '#4a6741',
    cardBackgroundColor = 'rgba(200, 240, 200, 0.6)',
    cardTextColor = '#1a1a1a',
    iconColor = '#4a7c2f',
    iconBackgroundColor = 'rgba(74, 124, 47, 0.12)',
}) => {
    return (
        <Box
            sx={{
                backgroundColor,
                py: { xs: 6, md: 10 },
            }}
        >
            <Container maxWidth="lg">
                {/* Main Title */}
                <Typography
                    variant="h3"
                    component="h2"
                    sx={{
                        color: titleColor,
                        fontWeight: 700,
                        fontSize: { xs: '1.75rem', md: '2.5rem' },
                        textAlign: 'center',
                        mb: { xs: 2, md: 3 },
                        px: { xs: 2, md: 4 },
                    }}
                >
                    {title}
                </Typography>

                {description && (
                    <Typography
                        variant="body1"
                        component="p"
                        sx={{
                            color: 'text.secondary',
                            fontWeight: 400,
                            fontSize: { xs: '1rem', md: '1.125rem' },
                            lineHeight: 1.7,
                            textAlign: 'center',
                            mx: 'auto',
                            mb: { xs: 4, md: 6 },
                            px: { xs: 2, md: 0 },
                        }}
                    >
                        {description}
                    </Typography>
                )}

                {/* Cards Grid */}
                <Grid container spacing={{ xs: 2, md: 3 }}>
                    {cards.map((card, index) => (
                        <Grid item xs={12} sm={6} md={cards.length >= 5 ? 2.4 : 12 / cards.length} key={index}>
                            <Paper
                                elevation={0}
                                sx={{
                                    backgroundColor: cardBackgroundColor,
                                    borderRadius: 4,
                                    p: { xs: 3, md: 4 },
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                    },
                                }}
                            >
                                {/* Icon with Rounded Background */}
                                <Box
                                    sx={{
                                        mb: 3,
                                        width: { xs: 80, md: 96 },
                                        height: { xs: 80, md: 96 },
                                        borderRadius: '50%',
                                        backgroundColor: iconBackgroundColor,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        transition: 'transform 0.3s ease-in-out',
                                        '&:hover': {
                                            transform: 'scale(1.1)',
                                        },
                                        '& svg': {
                                            fontSize: { xs: 40, md: 48 },
                                            color: iconColor,
                                        },
                                    }}
                                >
                                    {card.icon}
                                </Box>

                                {/* Title */}
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: cardTextColor,
                                        fontWeight: 500,
                                        fontSize: { xs: '0.95rem', md: '1rem' },
                                        lineHeight: 1.6,
                                    }}
                                >
                                    {card.title}
                                </Typography>

                                {/* Optional Description */}
                                {card.description && (
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: cardTextColor,
                                            opacity: 0.8,
                                            mt: 1.5,
                                            fontSize: { xs: '0.85rem', md: '0.9rem' },
                                        }}
                                    >
                                        {card.description}
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

export default FeatureSection
