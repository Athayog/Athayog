import React from 'react'
import { Box, Container, Typography, Grid, Paper, Stack } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

export interface ComparisonItem {
    id: string
    text: string
}

export interface ComparisonColumn {
    title: string
    items: ComparisonItem[]
    isHighlighted?: boolean
}

export interface ComparisonSectionProps {
    mainTitle: string
    subtitle?: string
    leftColumn: ComparisonColumn
    rightColumn: ComparisonColumn
    backgroundColor?: string
    mainTitleColor?: string
    subtitleColor?: string
    // Left column (negative) colors
    leftColumnBackgroundColor?: string
    leftColumnTitleColor?: string
    leftColumnItemColor?: string
    leftIconColor?: string
    // Right column (positive) colors
    rightColumnBackgroundColor?: string
    rightColumnTitleColor?: string
    rightColumnItemColor?: string
    rightIconColor?: string
}

const ComparisonSection: React.FC<ComparisonSectionProps> = ({
    mainTitle,
    subtitle,
    leftColumn,
    rightColumn,
    backgroundColor = '#f5f5e8',
    mainTitleColor = '#2a3d23',
    subtitleColor = '#4a6741',
    // Left column (negative/neutral)
    leftColumnBackgroundColor = 'rgba(189, 189, 189, 0.15)',
    leftColumnTitleColor = '#666666',
    leftColumnItemColor = '#555555',
    leftIconColor = '#999999',
    // Right column (positive/highlighted)
    rightColumnBackgroundColor = 'rgba(74, 124, 47, 0.12)',
    rightColumnTitleColor = '#2a3d23',
    rightColumnItemColor = '#1a1a1a',
    rightIconColor = '#4a7c2f',
}) => {
    const renderColumn = (
        column: ComparisonColumn,
        isRight: boolean,
    ) => {
        const isHighlighted = column.isHighlighted !== false // Default true for right

        return (
            <Grid item xs={12} md={6}>
                <Paper
                    elevation={0}
                    sx={{
                        backgroundColor: isRight 
                            ? rightColumnBackgroundColor 
                            : leftColumnBackgroundColor,
                        borderRadius: 4,
                        p: { xs: 4, md: 5 },
                        height: '100%',
                        position: 'relative',
                        overflow: 'hidden',
                        border: isRight ? '3px solid' : '2px solid',
                        borderColor: isRight ? rightIconColor : 'rgba(0,0,0,0.08)',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                            transform: isRight ? 'translateY(-8px)' : 'translateY(-4px)',
                            boxShadow: isRight 
                                ? '0 12px 32px rgba(74, 124, 47, 0.2)' 
                                : '0 8px 24px rgba(0,0,0,0.1)',
                        },
                    }}
                >
                    {/* Recommended Badge (Right Column Only) */}
                    {isRight && (
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 16,
                                right: 16,
                                backgroundColor: rightIconColor,
                                color: '#ffffff',
                                px: 2,
                                py: 0.75,
                                borderRadius: 2,
                                fontSize: '0.8rem',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                            }}
                        >
                            Recommended
                        </Box>
                    )}

                    {/* Column Title */}
                    <Typography
                        variant="h5"
                        component="h3"
                        sx={{
                            color: isRight ? rightColumnTitleColor : leftColumnTitleColor,
                            fontWeight: 700,
                            fontSize: { xs: '1.35rem', md: '1.6rem' },
                            mb: { xs: 3, md: 4 },
                            pr: isRight ? 10 : 0,
                            lineHeight: 1.3,
                        }}
                    >
                        {column.title}
                    </Typography>

                    {/* Items List */}
                    <Stack spacing={{ xs: 2.5, md: 3 }}>
                        {column.items.map((item) => (
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
                                            fontSize: { xs: 24, md: 28 },
                                            color: isRight ? rightIconColor : leftIconColor,
                                        },
                                    }}
                                >
                                    {isRight ? <CheckCircleIcon /> : <CloseIcon />}
                                </Box>

                                {/* Text */}
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: isRight ? rightColumnItemColor : leftColumnItemColor,
                                        fontWeight: isRight ? 500 : 400,
                                        fontSize: { xs: '1rem', md: '1.1rem' },
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
    }

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
                            fontSize: { xs: '1.1rem', md: '1.25rem' },
                            textAlign: 'center',
                            mb: { xs: 6, md: 8 },
                            lineHeight: 1.6,
                            px: { xs: 2, md: 0 },
                        }}
                    >
                        {subtitle}
                    </Typography>
                )}

                {/* VS Divider */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mb: { xs: 4, md: 5 },
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: mainTitleColor,
                            color: '#ffffff',
                            width: { xs: 56, md: 64 },
                            height: { xs: 56, md: 64 },
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: { xs: '1.5rem', md: '1.75rem' },
                            fontWeight: 700,
                            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                            position: 'relative',
                            zIndex: 1,
                        }}
                    >
                        VS
                    </Box>
                </Box>

                {/* Comparison Columns */}
                <Grid container spacing={{ xs: 3, md: 4 }} alignItems="stretch">
                    {renderColumn(leftColumn, false)}
                    {renderColumn(rightColumn, true)}
                </Grid>
            </Container>
        </Box>
    )
}

export default ComparisonSection
