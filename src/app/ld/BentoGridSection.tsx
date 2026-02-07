import React from 'react'
import Image from 'next/image'
import { Box, Container, Typography, Paper, Grid } from '@mui/material'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

export type CardType = 'title' | 'icon' | 'image' | 'text' | 'icon-text' | 'image-text' | 'text-image-side'

export interface GridCard {
    id: string
    type: CardType
    title?: string
    text?: string
    icon?: React.ReactNode
    image?: StaticImport | string
    imageAlt?: string
    imagePosition?: 'left' | 'right'
    gridSize?: {
        xs?: number
        sm?: number
        md?: number
        lg?: number
    }
}

export interface BentoGridSectionProps {
    cards: GridCard[]
    backgroundColor?: string
    titleCardBackgroundColor?: string
    iconCardBackgroundColor?: string
    imageCardBackgroundColor?: string
    textCardBackgroundColor?: string
    textColor?: string
    titleTextColor?: string
    iconColor?: string
    iconBackgroundColor?: string
    autoLayout?: boolean
}

const BentoGridSection: React.FC<BentoGridSectionProps> = ({
    cards,
    backgroundColor = '#f5f5e8',
    titleCardBackgroundColor = 'rgba(200, 240, 200, 0.95)',
    iconCardBackgroundColor = 'rgba(200, 240, 200, 0.7)',
    imageCardBackgroundColor = 'transparent',
    textCardBackgroundColor = 'rgba(200, 240, 200, 0.7)',
    textColor = '#1a1a1a',
    titleTextColor = '#3d5a32',
    iconColor = '#3d5a32',
    iconBackgroundColor = 'rgba(61, 90, 50, 0.12)',
    autoLayout = false,
}) => {
    const getAutoGridSize = (index: number, total: number, cardType: CardType) => {
        if (cardType === 'title') {
            if (total <= 4) return { xs: 12, sm: 12, md: 6, lg: 6 }
            return { xs: 12, sm: 12, md: 4, lg: 4 }
        }

        if (total === 3) {
            return { xs: 12, sm: 6, md: 4, lg: 4 }
        }
        if (total === 4) {
            return { xs: 12, sm: 6, md: 3, lg: 3 }
        }
        if (total === 5) {
            if (index < 2) return { xs: 12, sm: 6, md: 6, lg: 6 }
            return { xs: 12, sm: 6, md: 4, lg: 4 }
        }
        if (total === 6) {
            return { xs: 12, sm: 6, md: 4, lg: 4 }
        }
        if (total === 7 || total === 8) {
            return { xs: 12, sm: 6, md: 3, lg: 3 }
        }
        if (total >= 9) {
            return { xs: 12, sm: 6, md: 3, lg: 3 }
        }

        return { xs: 12, sm: 6, md: 4, lg: 4 }
    }

    const renderCard = (card: GridCard, index: number) => {
        const defaultGridSize = autoLayout
            ? getAutoGridSize(index, cards.length, card.type)
            : {
                  xs: 12,
                  sm: 6,
                  md: 4,
                  lg: 4,
              }

        const gridSize = { ...defaultGridSize, ...card.gridSize }

        const cardContent = () => {
            switch (card.type) {
                case 'title':
                    return (
                        <Paper
                            elevation={0}
                            sx={{
                                backgroundColor: titleCardBackgroundColor,
                                borderRadius: 4,
                                p: { xs: 4, md: 5 },
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minHeight: { xs: '200px', md: '100%' },
                            }}
                        >
                            <Typography
                                variant="h4"
                                component="h2"
                                sx={{
                                    color: titleTextColor,
                                    fontWeight: 700,
                                    fontSize: { xs: '1.75rem', md: '2.25rem', lg: '2.5rem' },
                                    lineHeight: 1.3,
                                    textAlign: 'center',
                                }}
                            >
                                {card.title}
                            </Typography>
                        </Paper>
                    )

                case 'icon':
                    return (
                        <Paper
                            elevation={0}
                            sx={{
                                backgroundColor: iconCardBackgroundColor,
                                borderRadius: 4,
                                p: { xs: 3, md: 4 },
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                                minHeight: { xs: '180px', md: '220px' },
                                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    mb: 2,
                                    '& svg': {
                                        fontSize: { xs: 64, md: 80 },
                                        color: textColor,
                                    },
                                }}
                            >
                                {card.icon}
                            </Box>

                            <Typography
                                variant="body1"
                                sx={{
                                    color: textColor,
                                    fontWeight: 500,
                                    fontSize: { xs: '0.95rem', md: '1rem' },
                                    lineHeight: 1.6,
                                }}
                            >
                                {card.text}
                            </Typography>
                        </Paper>
                    )

                case 'image':
                    return (
                        <Box
                            sx={{
                                backgroundColor: imageCardBackgroundColor,
                                borderRadius: 4,
                                overflow: 'hidden',
                                height: '100%',
                                minHeight: { xs: '250px', md: '300px' },
                                position: 'relative',
                                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                '&:hover': {
                                    transform: 'scale(1.02)',
                                    boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                                },
                            }}
                        >
                            {card.image && (
                                <Image
                                    src={card.image}
                                    alt={card.imageAlt || ''}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    style={{
                                        objectFit: 'cover',
                                        objectPosition: 'center',
                                    }}
                                />
                            )}
                        </Box>
                    )

                case 'image-text':
                    return (
                        <Paper
                            elevation={0}
                            sx={{
                                backgroundColor: textCardBackgroundColor,
                                borderRadius: 4,
                                overflow: 'hidden',
                                height: '100%',
                                minHeight: { xs: '250px', md: '300px' },
                                position: 'relative',
                                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                '&:hover': {
                                    transform: 'scale(1.02)',
                                    boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                                },
                            }}
                        >
                            {card.image && (
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <Image
                                        src={card.image}
                                        alt={card.imageAlt || ''}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        style={{
                                            objectFit: 'cover',
                                            objectPosition: 'center',
                                        }}
                                    />
                                </Box>
                            )}
                            {card.text && (
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        background: 'linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.3), transparent)',
                                        p: { xs: 2.5, md: 3 },
                                    }}
                                >
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: '#ffffff',
                                            fontWeight: 600,
                                            fontSize: { xs: '0.95rem', md: '1.05rem' },
                                            lineHeight: 1.5,
                                        }}
                                    >
                                        {card.text}
                                    </Typography>
                                </Box>
                            )}
                        </Paper>
                    )

                case 'text-image-side':
                    const imageOnRight = card.imagePosition === 'right'
                    return (
                        <Paper
                            elevation={0}
                            sx={{
                                backgroundColor: textCardBackgroundColor,
                                borderRadius: 4,
                                overflow: 'hidden',
                                height: '100%',
                                minHeight: { xs: '200px', md: '240px' },
                                display: 'flex',
                                flexDirection: { xs: 'column', sm: imageOnRight ? 'row' : 'row-reverse' },
                                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                                },
                            }}
                        >
                            {/* Text Side */}
                            <Box
                                sx={{
                                    flex: 1,
                                    p: { xs: 3, md: 3.5 },
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: textColor,
                                        fontWeight: 500,
                                        fontSize: { xs: '0.95rem', md: '1rem' },
                                        lineHeight: 1.6,
                                        textAlign: 'center',
                                    }}
                                >
                                    {card.text}
                                </Typography>
                            </Box>

                            {/* Image Side */}
                            {card.image && (
                                <Box
                                    sx={{
                                        flex: 1,
                                        position: 'relative',
                                        minHeight: { xs: '180px', sm: 'auto' },
                                    }}
                                >
                                    <Image
                                        src={card.image}
                                        alt={card.imageAlt || ''}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        style={{
                                            objectFit: 'cover',
                                            objectPosition: 'center',
                                        }}
                                    />
                                </Box>
                            )}
                        </Paper>
                    )

                case 'text':
                    return (
                        <Paper
                            elevation={0}
                            sx={{
                                backgroundColor: textCardBackgroundColor,
                                borderRadius: 4,
                                p: { xs: 3, md: 4 },
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minHeight: { xs: '150px', md: '180px' },
                                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                                },
                            }}
                        >
                            <Typography
                                variant="body1"
                                sx={{
                                    color: textColor,
                                    fontWeight: 500,
                                    fontSize: { xs: '1rem', md: '1.1rem' },
                                    lineHeight: 1.6,
                                    textAlign: 'center',
                                }}
                            >
                                {card.text}
                            </Typography>
                        </Paper>
                    )

                case 'icon-text':
                    return (
                        <Paper
                            elevation={0}
                            sx={{
                                backgroundColor: iconCardBackgroundColor,
                                borderRadius: 4,
                                p: { xs: 2.5, md: 3 },
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                gap: { xs: 2, md: 2.5 },
                                minHeight: { xs: '120px', md: '140px' },
                                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                '&:hover': {
                                    transform: 'translateX(8px)',
                                    boxShadow: '0 6px 16px rgba(0,0,0,0.1)',
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    mb: 2,
                                    width: { xs: 72, md: 88 },
                                    height: { xs: 72, md: 88 },
                                    borderRadius: '50%',
                                    backgroundColor: iconBackgroundColor,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                    '& svg': {
                                        fontSize: { xs: 40, md: 48 },
                                        color: iconColor,
                                    },
                                }}
                            >
                                {card.icon}
                            </Box>

                            <Typography
                                variant="body1"
                                sx={{
                                    color: textColor,
                                    fontWeight: 500,
                                    fontSize: { xs: '0.95rem', md: '1rem' },
                                    lineHeight: 1.6,
                                }}
                            >
                                {card.text}
                            </Typography>
                        </Paper>
                    )

                default:
                    return null
            }
        }

        return (
            <Grid item {...gridSize} key={card.id}>
                {cardContent()}
            </Grid>
        )
    }

    return (
        <Box
            sx={{
                backgroundColor,
                py: { xs: 6, md: 10 },
            }}
        >
            <Container maxWidth="xl">
                <Grid container spacing={{ xs: 2, md: 3 }} alignItems="stretch">
                    {cards.map((card, index) => renderCard(card, index))}
                </Grid>
            </Container>
        </Box>
    )
}

export default BentoGridSection
