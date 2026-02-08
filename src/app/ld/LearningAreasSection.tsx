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
    titleTextColor = '#2a3d23',
    descriptionTextColor = '#1a1a1a',
    layout = 'list',
}) => {
    const renderCard = (area: LearningArea) => {
        const hasImage = Boolean(area.image)

        if (layout === 'list') {
            // List layout: Image on left (if exists), content on right
            return (
                <Paper
                    key={area.id}
                    elevation={0}
                    sx={{
                        backgroundColor: cardBackgroundColor,
                        borderRadius: 4,
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: hasImage ? 'row' : 'column' },
                        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                        '&:hover': {
                            transform: 'translateX(8px)',
                            boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
                        },
                    }}
                >
                    {/* Image (if exists) */}
                    {hasImage && (
                        <Box
                            sx={{
                                position: 'relative',
                                width: { xs: '100%', sm: '200px', md: '240px' },
                                height: { xs: '180px', sm: 'auto' },
                                minHeight: { sm: '160px' },
                                flexShrink: 0,
                            }}
                        >
                            <Image
                                src={area.image!}
                                alt={area.imageAlt || area.title}
                                fill
                                sizes="(max-width: 600px) 100vw, 240px"
                                style={{
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                }}
                            />
                        </Box>
                    )}

                    {/* Content */}
                    <Box
                        sx={{
                            p: { xs: 3, md: 3.5 },
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                color: titleTextColor,
                                fontWeight: 600,
                                fontSize: { xs: '1.1rem', md: '1.25rem' },
                                mb: 1,
                                lineHeight: 1.3,
                            }}
                        >
                            {area.title}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: descriptionTextColor,
                                fontWeight: 400,
                                fontSize: { xs: '0.95rem', md: '1rem' },
                                lineHeight: 1.6,
                            }}
                        >
                            {area.description}
                        </Typography>
                    </Box>
                </Paper>
            )
        } else {
            // Grid layout: Image on top (if exists), content below
            return (
                <Grid item xs={12} sm={6} md={4} key={area.id}>
                    <Paper
                        elevation={0}
                        sx={{
                            backgroundColor: cardBackgroundColor,
                            borderRadius: 4,
                            overflow: 'hidden',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                            },
                        }}
                    >
                        {/* Image (if exists) */}
                        {hasImage && (
                            <Box
                                sx={{
                                    position: 'relative',
                                    width: '100%',
                                    height: '180px',
                                }}
                            >
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
                            </Box>
                        )}

                        {/* Content */}
                        <Box
                            sx={{
                                p: { xs: 3, md: 3.5 },
                                flex: 1,
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    color: titleTextColor,
                                    fontWeight: 600,
                                    fontSize: { xs: '1.1rem', md: '1.2rem' },
                                    mb: 1.5,
                                    lineHeight: 1.3,
                                }}
                            >
                                {area.title}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: descriptionTextColor,
                                    fontWeight: 400,
                                    fontSize: { xs: '0.9rem', md: '0.95rem' },
                                    lineHeight: 1.6,
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
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2.5, md: 3 } }}>
                        {learningAreas.map((area) => renderCard(area))}
                    </Box>
                ) : (
                    <Grid container spacing={{ xs: 2.5, md: 3 }}>
                        {learningAreas.map((area) => renderCard(area))}
                    </Grid>
                )}
            </Container>
        </Box>
    )
}

export default LearningAreasSection
