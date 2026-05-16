'use client'

import { useState } from 'react'
import { Box, Container, Typography } from '@mui/material'
import { EyebrowLabel } from './ui'
import { FAQS } from './data'

export function FaqSection() {
    return (
        <Box component="section" id="faq" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#e8ede6', scrollMarginTop: '80px' }}>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <EyebrowLabel>FAQ</EyebrowLabel>
                    <Typography variant="h2" sx={{ fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' }, whiteSpace: { md: 'nowrap' } }}>
                        Common Questions
                    </Typography>
                </Box>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 0 }}>
                    {FAQS.map((item, idx) => (
                        <FaqTile key={idx} item={item} idx={idx} />
                    ))}
                </Box>
            </Container>
        </Box>
    )
}

function FaqTile({ item, idx }: { item: { q: string; a: string }; idx: number }) {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const [isHovered, setIsHovered] = useState(false)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        })
    }

    return (
        <Box
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            sx={{
                py: '2rem',
                px: { xs: 2, sm: 0 },
                borderBottom: '1px solid #e2ddd5',
                pr: idx % 2 === 0 ? { md: '3rem' } : { xs: 2, md: '1.5rem' },
                pl: idx % 2 !== 0 ? { md: '3rem' } : { xs: 2, md: '1.5rem' },
                borderLeft: idx % 2 !== 0 ? { md: '1px solid #e2ddd5' } : 'none',
                position: 'relative',
                transition: 'all 0.3s ease',
                bgcolor: 'transparent',
                overflow: 'hidden',
                '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.3)',
                }
            }}
        >
            {/* Windows 11 Reveal Effect Spotlight */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.4s ease',
                    pointerEvents: 'none',
                    background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(184, 137, 42, 0.08), transparent)`,
                }}
            />
            
            <Typography sx={{ 
                fontFamily: 'var(--font-playfair),Georgia,serif', 
                fontSize: '1.05rem', 
                fontWeight: 600,
                color: '#3d2f1e', 
                mb: '0.6rem',
                position: 'relative',
                zIndex: 1
            }}>
                {item.q}
            </Typography>
            <Typography sx={{ 
                fontSize: '0.9rem', 
                color: '#555', 
                lineHeight: 1.7,
                position: 'relative',
                zIndex: 1,
                fontFamily: 'var(--font-inter)'
            }}>
                {item.a}
            </Typography>
        </Box>
    )
}
