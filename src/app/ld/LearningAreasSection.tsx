import React from 'react'
import Image from 'next/image'
import { Box, Container, Typography, Grid, Paper } from '@mui/material'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

export interface LearningArea {
    id: string
    title: string
    description: string
    image?: StaticImport | string
    imageAlt?: string
}

export interface LearningAreasSectionProps {
    title: string
    subtitle: string
    learningAreas: LearningArea[]
    backgroundColor?: string
    titleColor?: string
    subtitleColor?: string
    cardBackgroundColor?: string
    overlayGradient?: string // Gradient for text overlay
    titleTextColor?: string
    descriptionTextColor?: string
    layout?: 'grid' | 'list'
}

const LearningAreasSection: React.FC<LearningAreasSectionProps> = ({
    title,
    subtitle,
    learningAreas,
    backgroundColor = '#f5f5e8',
    titleColor = '#3d5a32',
    subtitleColor = '#4a7c2f',
    cardBackgroundColor = 'rgba(200, 240, 200, 0.5)',
    overlayGradient = 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.8) 100%)',
    titleTextColor = '#ffffff',
    descriptionTextColor = 'rgba(255, 255, 255, 0.95)',
    layout = 'list',
}) => {
    const renderCard = (area: LearningArea) => {
        const hasImage = Boolean(area.image)

        if (layout === 'list') {
            // List layout: Full-width card with text overlaid on bottom
            return (
                <Paper
                    key={area.id}
                    elevation={0}
                    sx={{
                        backgroundColor: hasImage ? 'transparent' : cardBackgroundColor,
                        borderRadius: 4,
                        overflow: 'hidden',
                        position: 'relative',
                        height: { xs: '280px', sm: '320px', md: '360px' },
                        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                        '&:hover': {
                            transform: 'translateY(-6px)',
                            boxShadow: '0 12px 32px rgba(0,0,0,0.2)',
                        },
                    }}
                >
                    {/* Image Background */}
                    {hasImage && (
                        <>
                            <Image
                                src={area.image!}
                                alt={area.imageAlt || area.title}
                                fill
                                sizes="(max-width: 600px) 100vw, 1200px"
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
                                    background: overlayGradient,
                                    zIndex: 1,
                                }}
                            />
                        </>
                    )}

                    {/* Text Content - Overlaid on Bottom */}
                    <Box
                        sx={{
                            position: hasImage ? 'absolute' : 'relative',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            p: { xs: 3, sm: 3.5, md: 4 },
                            zIndex: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            height: '100%',
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                color: hasImage ? titleTextColor : '#2a3d23',
                                fontWeight: 700,
                                fontSize: { xs: '1.35rem', sm: '1.5rem', md: '1.75rem' },
                                mb: { xs: 1.5, md: 2 },
                                lineHeight: 1.3,
                                textShadow: hasImage ? '0 2px 8px rgba(0,0,0,0.6)' : 'none',
                            }}
                        >
                            {area.title}
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: hasImage ? descriptionTextColor : '#1a1a1a',
                                fontWeight: 400,
                                fontSize: { xs: '1rem', md: '1.1rem' },
                                lineHeight: 1.6,
                                textShadow: hasImage ? '0 1px 6px rgba(0,0,0,0.5)' : 'none',
                            }}
                        >
                            {area.description}
                        </Typography>
                    </Box>
                </Paper>
            )
        } else {
            // Grid layout: Card with text overlaid on bottom
            return (
                <Grid item xs={12} sm={6} md={4} key={area.id}>
                    <Paper
                        elevation={0}
                        sx={{
                            backgroundColor: hasImage ? 'transparent' : cardBackgroundColor,
                            borderRadius: 4,
                            overflow: 'hidden',
                            position: 'relative',
                            height: { xs: '320px', md: '380px' },
                            transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                            '&:hover': {
                                transform: 'translateY(-8px)',
                                boxShadow: '0 16px 40px rgba(0,0,0,0.2)',
                            },
                        }}
                    >
                        {/* Image Background */}
                        {hasImage && (
                            <>
                                <Image
                                    src={area.image!}
                                    alt={area.imageAlt || area.title}
                                    fill
                                    sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
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
                                        background: overlayGradient,
                                        zIndex: 1,
                                    }}
                                />
                            </>
                        )}

                        {/* Text Content - Overlaid on Bottom */}
                        <Box
                            sx={{
                                position: hasImage ? 'absolute' : 'relative',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                p: { xs: 3, md: 3.5 },
                                zIndex: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-end',
                                height: '100%',
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    color: hasImage ? titleTextColor : '#2a3d23',
                                    fontWeight: 700,
                                    fontSize: { xs: '1.25rem', md: '1.4rem' },
                                    mb: { xs: 1.5, md: 2 },
                                    lineHeight: 1.3,
                                    textShadow: hasImage ? '0 2px 8px rgba(0,0,0,0.6)' : 'none',
                                }}
                            >
                                {area.title}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: hasImage ? descriptionTextColor : '#1a1a1a',
                                    fontWeight: 400,
                                    fontSize: { xs: '0.95rem', md: '1rem' },
                                    lineHeight: 1.6,
                                    textShadow: hasImage ? '0 1px 6px rgba(0,0,0,0.5)' : 'none',
                                }}
                            >
                                {area.description}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
            )
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
                        lineHeight: 1.3,
                    }}
                >
                    {title}
                </Typography>

                {/* Subtitle */}
                <Typography
                    variant="h5"
                    component="h3"
                    sx={{
                        color: subtitleColor,
                        fontWeight: 600,
                        fontSize: { xs: '1.15rem', md: '1.35rem' },
                        textAlign: 'center',
                        mb: { xs: 5, md: 7 },
                    }}
                >
                    {subtitle}
                </Typography>

                {/* Learning Areas */}
                {layout === 'list' ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 3, md: 4 } }}>{learningAreas.map((area) => renderCard(area))}</Box>
                ) : (
                    <Grid container spacing={{ xs: 3, md: 4 }}>
                        {learningAreas.map((area) => renderCard(area))}
                    </Grid>
                )}
            </Container>
        </Box>
    )
}

export default LearningAreasSection
