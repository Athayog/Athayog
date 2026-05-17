'use client'

import { Box, Container, Typography } from '@mui/material'
import Image from 'next/image'
import { SectionHeader } from './ui'
import { GALLERY_ITEMS } from './data'

export function GallerySection() {
    return (
        <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#faf7f2' }}>
            <Container maxWidth="lg">
                <SectionHeader
                    eyebrow="Memories from Last Year"
                    title="Glimpses of Yoga Arambha"
                    subtitle="Relive the vibrant energy, peaceful practices, and deep community connections that defined our International Day of Yoga celebration last year. This is a glance at what awaits you."
                />
                
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: 'repeat(2, 1fr)',
                            md: 'repeat(3, 1fr)',
                        },
                        gap: '1.5rem',
                        mt: 4,
                    }}
                >
                    {GALLERY_ITEMS.map((item, index) => (
                        <Box
                            key={index}
                            sx={{
                                position: 'relative',
                                aspectRatio: { xs: '4/3', sm: '1/1', md: '4/3' },
                                overflow: 'hidden',
                                border: '1px solid #e2ddd5',
                                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                                '&:hover': {
                                    boxShadow: '0 12px 30px rgba(61, 47, 30, 0.08)',
                                    borderColor: '#38660a',
                                    '& .gallery-img': {
                                        transform: 'scale(1.06)',
                                    },
                                    '& .gallery-overlay': {
                                        background: 'linear-gradient(to top, rgba(26,32,22,0.95) 0%, rgba(26,32,22,0.65) 50%, rgba(26,32,22,0.1) 100%)',
                                    },
                                    '& .gallery-desc': {
                                        maxHeight: '100px',
                                        opacity: 1,
                                        mt: '0.6rem',
                                    },
                                },
                            }}
                        >
                            {/* Image Component */}
                            <Box
                                className="gallery-img"
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    position: 'relative',
                                    transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                                }}
                            >
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                                    style={{ objectFit: 'cover' }}
                                    loading="lazy"
                                />
                            </Box>

                            {/* Floating Text Overlay */}
                            <Box
                                className="gallery-overlay"
                                sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    p: '2rem 1.5rem 1.5rem',
                                    zIndex: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-end',
                                    background: 'linear-gradient(to top, rgba(26,32,22,0.85) 0%, rgba(26,32,22,0.4) 60%, rgba(26,32,22,0) 100%)',
                                    transition: 'background 0.4s ease',
                                }}
                            >
                                {/* Category Label */}
                                <Typography
                                    sx={{
                                        fontSize: '0.72rem',
                                        fontWeight: 700,
                                        letterSpacing: '0.12em',
                                        textTransform: 'uppercase',
                                        color: '#b8892a',
                                        fontFamily: 'var(--font-inter)',
                                        mb: '0.3rem',
                                    }}
                                >
                                    {item.category}
                                </Typography>

                                {/* Title */}
                                <Typography
                                    variant="h3"
                                    sx={{
                                        fontFamily: 'var(--font-playfair), Georgia, serif',
                                        fontSize: '1.25rem',
                                        fontWeight: 500,
                                        color: '#fff',
                                        lineHeight: 1.25,
                                    }}
                                >
                                    {item.title}
                                </Typography>

                                {/* Description (smooth slide up on hover) */}
                                <Box
                                    className="gallery-desc"
                                    sx={{
                                        maxHeight: 0,
                                        opacity: 0,
                                        overflow: 'hidden',
                                        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: '0.85rem',
                                            color: 'rgba(255, 255, 255, 0.8)',
                                            lineHeight: 1.5,
                                            fontFamily: 'var(--font-inter)',
                                        }}
                                    >
                                        {item.description}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    )
}
