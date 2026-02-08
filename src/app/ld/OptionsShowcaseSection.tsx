import React from 'react'
import { Box, Container, Typography, Grid, Paper, Stack } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

export interface OptionItem {
    id: string
    text: string
}

export interface Option {
    title: string
    items: OptionItem[]
    featured?: boolean
}

export interface OptionsShowcaseSectionProps {
    mainTitle: string
    subtitle?: string
    options: Option[]
    backgroundColor?: string
    mainTitleColor?: string
    subtitleColor?: string
    // Normal option colors
    optionCardBackgroundColor?: string
    optionTitleColor?: string
    optionItemColor?: string
    optionIconColor?: string
    // Featured option colors
    featuredCardBackgroundColor?: string
    featuredTitleColor?: string
    featuredItemColor?: string
    featuredIconColor?: string
}

const OptionsShowcaseSection: React.FC<OptionsShowcaseSectionProps> = ({
    mainTitle,
    subtitle,
    options,
    backgroundColor = '#f5f5e8',
    mainTitleColor = '#2a3d23',
    subtitleColor = '#4a6741',
    // Normal option styling
    optionCardBackgroundColor = 'rgba(200, 240, 200, 0.4)',
    optionTitleColor = '#2a3d23',
    optionItemColor = '#1a1a1a',
    optionIconColor = '#4a7c2f',
    // Featured option styling
    featuredCardBackgroundColor = 'rgba(74, 124, 47, 0.15)',
    featuredTitleColor = '#2a3d23',
    featuredItemColor = '#1a1a1a',
    featuredIconColor = '#4a7c2f',
}) => {
    const getGridSize = () => {
        const count = options.length
        if (count === 2) return { xs: 12, sm: 6, md: 6 }
        if (count === 3) return { xs: 12, sm: 6, md: 4 }
        if (count === 4) return { xs: 12, sm: 6, md: 3 }
        return { xs: 12, sm: 6, md: 4 }
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
                {/* Main Title */}
                <Typography
                    variant="h3"
                    component="h2"
                    sx={{
                        color: mainTitleColor,
                        fontWeight: 700,
                        fontSize: { xs: '1.75rem', md: '2.5rem' },
                        textAlign: 'center',
                        mb: subtitle ? { xs: 2, md: 3 } : { xs: 6, md: 8 },
                        lineHeight: 1.3,
                        px: { xs: 2, md: 0 },
                    }}
                >
                    {mainTitle}
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

                {/* Options Grid */}
                <Grid container spacing={{ xs: 3, md: 4 }}>
                    {options.map((option, index) => {
                        const isFeatured = option.featured === true

                        return (
                            <Grid item {...gridSize} key={index}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        backgroundColor: isFeatured
                                            ? featuredCardBackgroundColor
                                            : optionCardBackgroundColor,
                                        borderRadius: 4,
                                        p: { xs: 4, md: 4.5 },
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        position: 'relative',
                                        border: isFeatured ? '3px solid' : '2px solid',
                                        borderColor: isFeatured ? featuredIconColor : 'rgba(0,0,0,0.06)',
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
                                                left: '50%',
                                                transform: 'translateX(-50%)',
                                                backgroundColor: featuredIconColor,
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
                                            Popular
                                        </Box>
                                    )}

                                    {/* Option Title */}
                                    <Typography
                                        variant="h5"
                                        component="h3"
                                        sx={{
                                            color: isFeatured ? featuredTitleColor : optionTitleColor,
                                            fontWeight: 700,
                                            fontSize: { xs: '1.35rem', md: '1.5rem' },
                                            mb: { xs: 3, md: 4 },
                                            textAlign: 'center',
                                            lineHeight: 1.3,
                                            mt: isFeatured ? 1 : 0,
                                        }}
                                    >
                                        {option.title}
                                    </Typography>

                                    {/* Items List */}
                                    <Stack spacing={{ xs: 2.5, md: 3 }} sx={{ flex: 1 }}>
                                        {option.items.map((item) => (
                                            <Box
                                                key={item.id}
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'flex-start',
                                                    gap: 2,
                                                }}
                                            >
                                                {/* Icon */}
                                                <Box
                                                    sx={{
                                                        flexShrink: 0,
                                                        mt: 0.25,
                                                        '& svg': {
                                                            fontSize: { xs: 24, md: 26 },
                                                            color: isFeatured
                                                                ? featuredIconColor
                                                                : optionIconColor,
                                                        },
                                                    }}
                                                >
                                                    <CheckCircleIcon />
                                                </Box>

                                                {/* Text */}
                                                <Typography
                                                    variant="body1"
                                                    sx={{
                                                        color: isFeatured
                                                            ? featuredItemColor
                                                            : optionItemColor,
                                                        fontWeight: 500,
                                                        fontSize: { xs: '1rem', md: '1.05rem' },
                                                        lineHeight: 1.7,
                                                        flex: 1,
                                                    }}
                                                >
                                                    {item.text}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Stack>
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </Box>
    )
}

export default OptionsShowcaseSection
