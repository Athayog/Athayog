import React from 'react'
import Image from 'next/image'
import { Box, Container, Typography, Grid, Stack } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

export interface ContentItem {
    id: string
    text: string
    icon?: React.ReactNode
}

export interface SplitContentSectionProps {
    title: string
    items: ContentItem[]
    backgroundColor?: string
    titleBackgroundColor?: string
    titleTextColor?: string
    itemTextColor?: string
    iconColor?: string
    useDefaultIcon?: boolean
    reverseLayout?: boolean
    titleImage?: StaticImport | string  // ← NEW: Optional image for title
    titleImageAlt?: string
}

const SplitContentSection: React.FC<SplitContentSectionProps> = ({
    title,
    items,
    backgroundColor = '#f5f5e8',
    titleBackgroundColor = 'rgba(74, 124, 47, 0.85)',
    titleTextColor = '#ffffff',
    itemTextColor = '#1a1a1a',
    iconColor = '#4a7c2f',
    useDefaultIcon = true,
    reverseLayout = false,
    titleImage,
    titleImageAlt = '',
}) => {
    const TitleColumn = (
        <Grid item xs={12} md={5}>
            <Box
                sx={{
                    backgroundColor: titleImage ? 'transparent' : titleBackgroundColor,
                    borderRadius: 4,
                    overflow: 'hidden',
                    position: 'relative',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: { xs: '280px', md: '100%' },
                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                }}
            >
                {/* Background Image */}
                {titleImage && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            zIndex: 0,
                        }}
                    >
                        <Image
                            src={titleImage}
                            alt={titleImageAlt}
                            fill
                            sizes="(max-width: 768px) 100vw, 40vw"
                            style={{
                                objectFit: 'cover',
                                objectPosition: 'center',
                            }}
                        />
                        {/* Gradient Overlay for Text Readability */}
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'linear-gradient(135deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3))',
                            }}
                        />
                    </Box>
                )}

                {/* Title Text */}
                <Typography
                    variant="h3"
                    component="h2"
                    sx={{
                        color: titleTextColor,
                        fontWeight: 700,
                        fontSize: { xs: '1.75rem', md: '2.25rem', lg: '2.5rem' },
                        lineHeight: 1.3,
                        textAlign: 'center',
                        position: 'relative',
                        zIndex: 1,
                        p: { xs: 4, md: 5 },
                        textShadow: titleImage ? '0 2px 8px rgba(0,0,0,0.3)' : 'none',
                    }}
                >
                    {title}
                </Typography>
            </Box>
        </Grid>
    )

    const ContentColumn = (
        <Grid item xs={12} md={7}>
            <Stack
                spacing={{ xs: 2.5, md: 3 }}
                sx={{
                    height: '100%',
                    justifyContent: 'center',
                }}
            >
                {items.map((item) => (
                    <Box
                        key={item.id}
                        sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: { xs: 2, md: 2.5 },
                            transition: 'transform 0.2s ease-in-out',
                            '&:hover': {
                                transform: reverseLayout ? 'translateX(-8px)' : 'translateX(8px)',
                            },
                        }}
                    >
                        {/* Icon */}
                        <Box
                            sx={{
                                flexShrink: 0,
                                mt: 0.5,
                                '& svg': {
                                    fontSize: { xs: 28, md: 32 },
                                    color: iconColor,
                                },
                            }}
                        >
                            {item.icon || (useDefaultIcon && <CheckCircleIcon />)}
                        </Box>

                        {/* Text */}
                        <Typography
                            variant="body1"
                            sx={{
                                color: itemTextColor,
                                fontWeight: 500,
                                fontSize: { xs: '1.05rem', md: '1.15rem' },
                                lineHeight: 1.7,
                            }}
                        >
                            {item.text}
                        </Typography>
                    </Box>
                ))}
            </Stack>
        </Grid>
    )

    return (
        <Box
            sx={{
                backgroundColor,
                py: { xs: 8, md: 12 },
            }}
        >
            <Container maxWidth="lg">
                <Grid
                    container
                    spacing={{ xs: 4, md: 6 }}
                    alignItems="stretch"
                >
                    {reverseLayout ? (
                        <>
                            {ContentColumn}
                            {TitleColumn}
                        </>
                    ) : (
                        <>
                            {TitleColumn}
                            {ContentColumn}
                        </>
                    )}
                </Grid>
            </Container>
        </Box>
    )
}

export default SplitContentSection
