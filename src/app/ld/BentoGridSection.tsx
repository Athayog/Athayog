import React from 'react'
import Image from 'next/image'
import { Box, Container, Typography, Paper, Grid } from '@mui/material'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

export type CardType = 'title' | 'icon' | 'image' | 'text' | 'icon-text'

export interface GridCard {
    id: string
    type: CardType
    title?: string
    text?: string
    icon?: React.ReactNode
    image?: StaticImport | string
    imageAlt?: string
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
}) => {
    const renderCard = (card: GridCard) => {
        const defaultGridSize = {
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
                                    flexShrink: 0,
                                    '& svg': {
                                        fontSize: { xs: 48, md: 56 },
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
                {/* Bento Grid */}
                <Grid container spacing={{ xs: 2, md: 3 }} alignItems="stretch">
                    {cards.map((card) => renderCard(card))}
                </Grid>
            </Container>
        </Box>
    )
}

export default BentoGridSection
