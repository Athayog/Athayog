import React from 'react'
import Image from 'next/image'
import { Box, Container, Typography, Grid, Paper, Stack } from '@mui/material'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

export interface FeatureItem {
    icon: React.ReactNode
    text: string
}

export interface ImageFeatureSectionProps {
    title: string
    description?: string
    image: StaticImport | string
    imageAlt: string
    features: FeatureItem[]
    backgroundColor?: string
    titleColor?: string
    featureCardBackgroundColor?: string
    featureTextColor?: string
    imagePriority?: boolean
    imageQuality?: number
    reverseLayout?: boolean
    iconColor?: string
    iconBackgroundColor?: string
}

const ImageFeatureSection: React.FC<ImageFeatureSectionProps> = ({
    title,
    image,
    description,
    imageAlt,
    features,
    backgroundColor = '#f5f5e8',
    titleColor = '#4a6741',
    featureCardBackgroundColor = 'rgba(200, 240, 200, 0.7)',
    iconBackgroundColor = 'rgba(74, 124, 47, 0.12)',
    iconColor = '#4a7c2f',
    featureTextColor = '#1a1a1a',
    imagePriority = false,
    imageQuality = 85,
    reverseLayout = false,
}) => {
    const ImageColumn = (
        <Grid item xs={12} md={6}>
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    minHeight: { xs: '300px', md: '100%' },
                    borderRadius: 4,
                    overflow: 'hidden',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                }}
            >
                <Image
                    src={image}
                    alt={imageAlt}
                    fill
                    priority={imagePriority}
                    quality={imageQuality}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                    }}
                />
            </Box>
        </Grid>
    )

    const FeaturesColumn = (
        <Grid item xs={12} md={6}>
            <Stack spacing={{ xs: 2, md: 2.5 }} sx={{ height: '100%' }}>
                {features.map((feature, index) => (
                    <Paper
                        key={index}
                        elevation={0}
                        sx={{
                            backgroundColor: featureCardBackgroundColor,
                            borderRadius: 3,
                            p: { xs: 2.5, md: 3 },
                            display: 'flex',
                            alignItems: 'center',
                            gap: { xs: 2, md: 2.5 },
                            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                            '&:hover': {
                                transform: reverseLayout ? 'translateX(-8px)' : 'translateX(8px)',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            },
                        }}
                    >
                        {/* Icon with Circular Background */}
                        <Box
                            sx={{
                                flexShrink: 0,
                                width: { xs: 56, md: 64 },
                                height: { xs: 56, md: 64 },
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
                                    fontSize: { xs: 28, md: 32 },
                                    color: iconColor,
                                },
                            }}
                        >
                            {feature.icon}
                        </Box>

                        {/* Text */}
                        <Typography
                            variant="body1"
                            sx={{
                                color: featureTextColor,
                                fontWeight: 500,
                                fontSize: { xs: '0.95rem', md: '1.05rem' },
                                lineHeight: 1.6,
                                flex: 1,
                            }}
                        >
                            {feature.text}
                        </Typography>
                    </Paper>
                ))}
            </Stack>
        </Grid>
    )

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

                {/* Two Column Layout: Image + Features */}
                <Grid container spacing={{ xs: 4, md: 6 }} alignItems="stretch">
                    {reverseLayout ? (
                        <>
                            {FeaturesColumn}
                            {ImageColumn}
                        </>
                    ) : (
                        <>
                            {ImageColumn}
                            {FeaturesColumn}
                        </>
                    )}
                </Grid>
            </Container>
        </Box>
    )
}

export default ImageFeatureSection
