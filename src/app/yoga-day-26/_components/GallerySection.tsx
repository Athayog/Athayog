'use client'

import { Box, Container, Typography } from '@mui/material'
import Image from 'next/image'
import { useState } from 'react'
import { SectionHeader } from './ui'
import { GALLERY_ITEMS } from './data'

function GalleryCard({ item }: { item: (typeof GALLERY_ITEMS)[number] }) {
    const [loaded, setLoaded] = useState(false)

    return (
        <Box
            sx={{
                position: 'relative',
                aspectRatio: '1 / 1',
                overflow: 'hidden',
                cursor: 'pointer',
                bgcolor: '#e8e4de', // placeholder bg while loading
                '&:hover .img': { transform: 'scale(1.05)' },
                '&:hover .overlay': { opacity: 1 },
            }}
        >
            <Box
                className="img"
                sx={{
                    position: 'absolute',
                    inset: 0,
                    transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1), filter 0.6s ease',
                    // blur clears once loaded
                    filter: loaded ? 'blur(0px)' : 'blur(12px)',
                    transform: loaded ? 'scale(1)' : 'scale(1.08)', // slightly zoomed while blurred so edges don't show
                }}
            >
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 600px) 50vw, (max-width: 900px) 33vw, 25vw"
                    style={{ objectFit: 'cover' }}
                    loading="lazy"
                    onLoad={() => setLoaded(true)}
                />
            </Box>

            {/* Hover overlay — only show once image is loaded */}
            {loaded && (
                <Box
                    className="overlay"
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        bgcolor: 'rgba(14,20,10,0.6)',
                        opacity: 0,
                        transition: 'opacity 0.35s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        p: '1.2rem',
                        zIndex: 2,
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: '0.64rem',
                            fontWeight: 700,
                            letterSpacing: '0.14em',
                            textTransform: 'uppercase',
                            color: '#7dc040',
                            mb: '0.3rem',
                            fontFamily: 'var(--font-inter)',
                        }}
                    >
                        {item.category}
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: 'var(--font-playfair), Georgia, serif',
                            fontSize: '1rem',
                            fontWeight: 500,
                            color: '#fff',
                            lineHeight: 1.3,
                        }}
                    >
                        {item.title}
                    </Typography>
                </Box>
            )}
        </Box>
    )
}

export function GallerySection() {
    return (
        <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#faf7f2' }}>
            <Container maxWidth="lg">
                <SectionHeader
                    eyebrow="From Our Events"
                    title="Glimpses of Yoga Arambha"
                    subtitle="Vibrant energy, peaceful practices, and deep community connections from our International Day of Yoga celebrations."
                />

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: 'repeat(2, 1fr)',
                            sm: 'repeat(3, 1fr)',
                            md: 'repeat(4, 1fr)',
                        },
                        gap: '2px',
                        mt: 5,
                    }}
                >
                    {GALLERY_ITEMS.map((item, index) => (
                        <GalleryCard key={index} item={item} />
                    ))}
                </Box>
            </Container>
        </Box>
    )
}
