import React from 'react'
import Link from 'next/link'
import { Box, Container, Typography, Stack, Paper, Chip, Button } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

export interface OverviewItem {
    id: string
    text: string
}

export interface OverviewSection {
    title: string
    subtitle?: string
    items: OverviewItem[]
    note?: string
}

export interface ClassOverviewSectionProps {
    mainTitle: string
    highlights?: string[]
    sections: OverviewSection[]
    backgroundColor?: string
    mainTitleColor?: string
    highlightChipBackgroundColor?: string
    highlightChipTextColor?: string
    sectionTitleColor?: string
    sectionSubtitleColor?: string
    itemTextColor?: string
    itemIconColor?: string
    noteTextColor?: string
    noteBackgroundColor?: string
    // CTA Props
    ctaText?: string
    ctaHref?: string
    ctaOnClick?: () => void
    ctaButtonColor?: string
    ctaButtonTextColor?: string
    ctaVariant?: 'contained' | 'outlined'
}

const ClassOverviewSection: React.FC<ClassOverviewSectionProps> = ({
    mainTitle,
    highlights = [],
    sections,
    backgroundColor = '#f5f5e8',
    mainTitleColor = '#2a3d23',
    highlightChipBackgroundColor = 'rgba(74, 124, 47, 0.15)',
    highlightChipTextColor = '#2a3d23',
    sectionTitleColor = '#3d5a32',
    sectionSubtitleColor = '#4a6741',
    itemTextColor = '#1a1a1a',
    itemIconColor = '#4a7c2f',
    noteTextColor = '#555555',
    noteBackgroundColor = 'rgba(255, 193, 7, 0.1)',
    ctaText,
    ctaHref,
    ctaOnClick,
    ctaButtonColor = '#4a7c2f',
    ctaButtonTextColor = '#ffffff',
    ctaVariant = 'contained',
}) => {
    const renderCTA = () => {
        if (!ctaText) return null

        const buttonStyles = {
            px: { xs: 5, md: 6 },
            py: { xs: 1.75, md: 2 },
            fontSize: { xs: '1.05rem', md: '1.15rem' },
            fontWeight: 600,
            borderRadius: 3,
            textTransform: 'none' as const,
            boxShadow: ctaVariant === 'contained' ? '0 4px 14px rgba(74, 124, 47, 0.3)' : 'none',
            transition: 'all 0.3s ease-in-out',
            ...(ctaVariant === 'contained' && {
                backgroundColor: ctaButtonColor,
                color: ctaButtonTextColor,
                '&:hover': {
                    backgroundColor: ctaButtonColor,
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(74, 124, 47, 0.4)',
                },
            }),
            ...(ctaVariant === 'outlined' && {
                borderColor: ctaButtonColor,
                color: ctaButtonColor,
                borderWidth: 2,
                '&:hover': {
                    borderColor: ctaButtonColor,
                    borderWidth: 2,
                    backgroundColor: `${ctaButtonColor}10`,
                    transform: 'translateY(-2px)',
                },
            }),
        }

        if (ctaHref) {
            return (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: { xs: 6, md: 8 } }}>
                    <Button
                        component={Link}
                        href={ctaHref}
                        variant={ctaVariant}
                        size="large"
                        sx={buttonStyles}
                    >
                        {ctaText}
                    </Button>
                </Box>
            )
        }

        if (ctaOnClick) {
            return (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: { xs: 6, md: 8 } }}>
                    <Button
                        onClick={ctaOnClick}
                        variant={ctaVariant}
                        size="large"
                        sx={buttonStyles}
                    >
                        {ctaText}
                    </Button>
                </Box>
            )
        }

        return null
    }

    return (
        <Box
            sx={{
                backgroundColor,
                py: { xs: 8, md: 12 },
            }}
        >
            <Container maxWidth="md">
                {/* Main Title */}
                <Typography
                    variant="h3"
                    component="h2"
                    sx={{
                        color: mainTitleColor,
                        fontWeight: 700,
                        fontSize: { xs: '1.75rem', md: '2.5rem' },
                        textAlign: 'center',
                        mb: highlights.length > 0 ? { xs: 3, md: 4 } : { xs: 6, md: 8 },
                        lineHeight: 1.3,
                        px: { xs: 2, md: 0 },
                    }}
                >
                    {mainTitle}
                </Typography>

                {/* Highlight Chips */}
                {highlights.length > 0 && (
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            gap: { xs: 1.5, md: 2 },
                            mb: { xs: 6, md: 8 },
                            px: { xs: 2, md: 0 },
                        }}
                    >
                        {highlights.map((highlight, index) => (
                            <Chip
                                key={index}
                                label={highlight}
                                sx={{
                                    backgroundColor: highlightChipBackgroundColor,
                                    color: highlightChipTextColor,
                                    fontWeight: 600,
                                    fontSize: { xs: '0.9rem', md: '0.95rem' },
                                    px: { xs: 1, md: 1.5 },
                                    py: { xs: 2.5, md: 3 },
                                    borderRadius: 2,
                                    '&:hover': {
                                        backgroundColor: highlightChipBackgroundColor,
                                        transform: 'translateY(-2px)',
                                    },
                                    transition: 'transform 0.2s ease-in-out',
                                }}
                            />
                        ))}
                    </Box>
                )}

                {/* Sections */}
                <Stack spacing={{ xs: 6, md: 8 }}>
                    {sections.map((section, sectionIndex) => (
                        <Paper
                            key={sectionIndex}
                            elevation={0}
                            sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                                borderRadius: 4,
                                p: { xs: 4, md: 5 },
                                border: '2px solid rgba(0,0,0,0.04)',
                            }}
                        >
                            {/* Section Title */}
                            <Typography
                                variant="h4"
                                component="h3"
                                sx={{
                                    color: sectionTitleColor,
                                    fontWeight: 700,
                                    fontSize: { xs: '1.5rem', md: '1.85rem' },
                                    mb: section.subtitle ? { xs: 1.5, md: 2 } : { xs: 3, md: 4 },
                                    lineHeight: 1.3,
                                }}
                            >
                                {section.title}
                            </Typography>

                            {/* Section Subtitle */}
                            {section.subtitle && (
                                <Typography
                                    variant="h6"
                                    component="p"
                                    sx={{
                                        color: sectionSubtitleColor,
                                        fontWeight: 500,
                                        fontSize: { xs: '1.05rem', md: '1.15rem' },
                                        mb: { xs: 3, md: 4 },
                                        lineHeight: 1.6,
                                    }}
                                >
                                    {section.subtitle}
                                </Typography>
                            )}

                            {/* Items List */}
                            <Stack spacing={{ xs: 2.5, md: 3 }}>
                                {section.items.map((item) => (
                                    <Box
                                        key={item.id}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            gap: { xs: 2, md: 2.5 },
                                        }}
                                    >
                                        {/* Icon */}
                                        <Box
                                            sx={{
                                                flexShrink: 0,
                                                mt: 0.25,
                                                '& svg': {
                                                    fontSize: { xs: 26, md: 28 },
                                                    color: itemIconColor,
                                                },
                                            }}
                                        >
                                            <CheckCircleIcon />
                                        </Box>

                                        {/* Text */}
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                color: itemTextColor,
                                                fontWeight: 500,
                                                fontSize: { xs: '1.05rem', md: '1.1rem' },
                                                lineHeight: 1.7,
                                                flex: 1,
                                            }}
                                        >
                                            {item.text}
                                        </Typography>
                                    </Box>
                                ))}
                            </Stack>

                            {/* Section Note */}
                            {section.note && (
                                <Box
                                    sx={{
                                        mt: { xs: 3, md: 4 },
                                        p: { xs: 2.5, md: 3 },
                                        backgroundColor: noteBackgroundColor,
                                        borderRadius: 3,
                                        borderLeft: '4px solid',
                                        borderLeftColor: itemIconColor,
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: noteTextColor,
                                            fontWeight: 500,
                                            fontSize: { xs: '0.95rem', md: '1rem' },
                                            lineHeight: 1.6,
                                            fontStyle: 'italic',
                                        }}
                                    >
                                        {section.note}
                                    </Typography>
                                </Box>
                            )}
                        </Paper>
                    ))}
                </Stack>

                {/* CTA Button */}
                {renderCTA()}
            </Container>
        </Box>
    )
}

export default ClassOverviewSection
