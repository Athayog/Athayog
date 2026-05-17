import { Box, Button, Container, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import { DIGNITARIES } from './data'

export function HeroSection() {
    return (
        <Box
            component="section"
            sx={{
                bgcolor: '#1a2410',
                py: { xs: '6rem', md: '10rem' },
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Background Image — lower opacity, objectPosition centres on crowd */}
            <Image
                src="/images/yoga-day-26/Framesbyadrian-35.jpg"
                alt="Yoga Arambha Mass Crowd Gathering"
                fill
                priority
                sizes="100vw"
                style={{
                    objectFit: 'cover',
                    objectPosition: 'center 30%',
                    opacity: 0.55,
                    zIndex: 0,
                }}
            />

            {/*
             * Diagonal gradient — dark bottom-left (text side) fades to
             * semi-transparent top-right (image visible in corner).
             * Two-layer approach:
             *   1. Base radial vignette adds depth around edges
             *   2. Directional linear keeps left/bottom locked solid
             */}
            <Box
                aria-hidden="true"
                sx={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 0,
                    background: 'linear-gradient(155deg, rgba(18,26,10,0.97) 0%, rgba(26,38,14,0.88) 35%, rgba(36,50,20,0.55) 60%, rgba(36,50,20,0.1) 100%)',
                }}
            />

            {/* Subtle top edge fade so header nav blends cleanly */}
            <Box
                aria-hidden="true"
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '120px',
                    background: 'linear-gradient(to bottom, rgba(18,26,10,0.6) 0%, transparent 100%)',
                    zIndex: 0,
                }}
            />

            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: '1fr auto' },
                        gap: { xs: '3rem', md: '4rem' },
                        alignItems: 'start',
                    }}
                >
                    {/* ── Left column ── */}
                    <Box>
                        {/* Event badge */}
                        <Box
                            sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.55rem',
                                border: '1px solid rgba(255,255,255,0.18)',
                                bgcolor: 'rgba(255,255,255,0.05)',
                                px: '0.9rem',
                                py: '0.38rem',
                                fontSize: '0.72rem',
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase',
                                color: 'rgba(255,255,255,0.75)',
                                mb: '1.6rem',
                                backdropFilter: 'blur(8px)',
                                WebkitBackdropFilter: 'blur(8px)',
                            }}
                        >
                            <svg width="10" height="10" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                                <path d="M5.5 1L6.8 4.2H10.3L7.5 6.3L8.5 9.5L5.5 7.5L2.5 9.5L3.5 6.3L0.7 4.2H4.2Z" stroke="rgba(255,255,255,0.6)" strokeWidth="1" fill="rgba(255,255,255,0.12)" />
                            </svg>
                            International Day of Yoga 2026
                        </Box>

                        {/* Headline */}
                        <Typography
                            variant="h1"
                            sx={{
                                color: '#fff',
                                fontSize: { xs: '2.8rem', sm: '3.6rem', md: '4.8rem' },
                                fontWeight: 700,
                                mb: '0.5rem',
                                lineHeight: 1.08,
                                letterSpacing: '-0.02em',
                                textShadow: '0 2px 24px rgba(0,0,0,0.4)',
                            }}
                        >
                            Yoga Arambha
                            <br />
                            <Box
                                component="span"
                                sx={{
                                    color: '#7dc040',
                                    fontStyle: 'italic',
                                    // subtle text glow so green reads on varied backgrounds
                                    textShadow: '0 0 40px rgba(111,163,59,0.35)',
                                }}
                            >
                                2026
                            </Box>
                        </Typography>

                        {/* Tagline */}
                        <Typography
                            sx={{
                                fontFamily: 'var(--font-playfair), Georgia, serif',
                                fontStyle: 'italic',
                                fontSize: { xs: '1.05rem', md: '1.2rem' },
                                // bumped from 0.75 → 0.88 for WCAG AA
                                color: 'rgba(255,255,255,0.88)',
                                mb: '2.2rem',
                                lineHeight: 1.5,
                            }}
                        >
                            &ldquo;Yoga for Wellness, Wisdom &amp; World Peace&rdquo;
                        </Typography>

                        {/* Meta row */}
                        <Stack direction={{ xs: 'column', sm: 'row' }} flexWrap="wrap" gap="1.2rem" mb="2.4rem">
                            {[
                                {
                                    label: (
                                        <>
                                            <strong style={{ color: '#fff', fontWeight: 600 }}>June 21, 2026</strong>
                                            &nbsp;— Sunday
                                        </>
                                    ),
                                    icon: <path d="M3 4H13V13H3V4ZM3 4V3H4V4H12V3H13V4M3 7H13M6 2V4M10 2V4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />,
                                },
                                {
                                    label: (
                                        <>
                                            <strong style={{ color: '#fff', fontWeight: 600 }}>Indiranagar Club</strong>, Bangalore
                                        </>
                                    ),
                                    icon: (
                                        <path
                                            d="M8 14C8 14 13 10 13 6.5C13 3.74 10.76 1.5 8 1.5S3 3.74 3 6.5C3 10 8 14 8 14ZM8 8.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
                                            stroke="currentColor"
                                            strokeWidth="1.3"
                                            strokeLinecap="round"
                                        />
                                    ),
                                },
                                {
                                    label: <>6:00 AM — 8:30 AM</>,
                                    icon: <path d="M8 14.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13ZM8 4.5V8.5l3 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />,
                                },
                            ].map((m, i) => (
                                <Box
                                    key={i}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.6rem',
                                        fontSize: '0.92rem',
                                        // bumped from 0.7 → 0.82
                                        color: 'rgba(255,255,255,0.82)',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 30,
                                            height: 30,
                                            borderRadius: '50%',
                                            bgcolor: 'rgba(111,163,59,0.15)',
                                            border: '1px solid rgba(111,163,59,0.25)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0,
                                            color: '#7dc040',
                                        }}
                                    >
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                            {m.icon}
                                        </svg>
                                    </Box>
                                    {m.label}
                                </Box>
                            ))}
                        </Stack>

                        {/* CTAs */}
                        <Stack direction="row" flexWrap="wrap" gap="0.9rem" alignItems="center">
                            <Button
                                href="#register"
                                sx={{
                                    bgcolor: '#4a8a12',
                                    color: '#fff',
                                    px: '2.2rem',
                                    py: '0.9rem',
                                    fontSize: '0.85rem',
                                    fontWeight: 600,
                                    letterSpacing: '0.04em',
                                    borderRadius: 0,
                                    boxShadow: '0 4px 20px rgba(74,138,18,0.35)',
                                    '&:hover': {
                                        bgcolor: '#3a6e0e',
                                        boxShadow: '0 4px 28px rgba(74,138,18,0.5)',
                                    },
                                }}
                            >
                                Register Now
                            </Button>
                            <Button
                                href="#schedule"
                                sx={{
                                    border: '1.5px solid rgba(255,255,255,0.28)',
                                    color: 'rgba(255,255,255,0.82)',
                                    px: '1.8rem',
                                    py: '0.75rem',
                                    fontSize: '0.85rem',
                                    borderRadius: 0,
                                    backdropFilter: 'blur(6px)',
                                    WebkitBackdropFilter: 'blur(6px)',
                                    '&:hover': {
                                        borderColor: 'rgba(255,255,255,0.55)',
                                        color: '#fff',
                                        bgcolor: 'rgba(255,255,255,0.06)',
                                    },
                                }}
                            >
                                View Schedule
                            </Button>
                            <Box
                                sx={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.4rem',
                                    bgcolor: 'rgba(125,192,64,0.12)',
                                    color: '#7dc040',
                                    fontSize: '0.72rem',
                                    fontWeight: 700,
                                    letterSpacing: '0.1em',
                                    textTransform: 'uppercase',
                                    px: '0.9rem',
                                    py: '0.4rem',
                                    border: '1px solid rgba(125,192,64,0.3)',
                                }}
                            >
                                {/* checkmark dot */}
                                <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true">
                                    <circle cx="4.5" cy="4.5" r="4.5" fill="rgba(125,192,64,0.25)" />
                                    <path d="M2.5 4.5L4 6L6.5 3" stroke="#7dc040" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Free &amp; For Everyone
                            </Box>
                        </Stack>
                    </Box>

                    {/* ── Right column — dignitary card ── */}
                    <Box
                        sx={{
                            bgcolor: 'rgba(10,16,6,0.82)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            // thin left accent line in brand green
                            borderLeft: '3px solid rgba(125,192,64,0.5)',
                            p: '1.6rem 1.8rem',
                            minWidth: { md: 248 },
                            mt: { xs: 0, md: 0 },
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '0.68rem',
                                letterSpacing: '0.18em',
                                textTransform: 'uppercase',
                                color: 'rgba(255,255,255,0.45)',
                                mb: '0.6rem',
                            }}
                        >
                            Organised by
                        </Typography>
                        <Typography
                            sx={{
                                fontFamily: "'Playfair Display', Georgia, serif",
                                fontSize: '1.1rem',
                                color: '#fff',
                                mb: '0.15rem',
                                lineHeight: 1.3,
                            }}
                        >
                            Atha Yog Living
                        </Typography>
                        <Typography sx={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.45)', mb: '1.2rem' }}>A Celebration of Yoga</Typography>

                        <Box sx={{ height: '1px', bgcolor: 'rgba(255,255,255,0.08)', mb: '1.4rem' }} />

                        <Stack gap="1.4rem">
                            {DIGNITARIES.map((d, i) => (
                                <Box
                                    key={d.name}
                                    sx={{
                                        pt: i > 0 ? '1.1rem' : 0,
                                        borderTop: i > 0 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                                    }}
                                >
                                    <Box sx={{ display: 'flex', gap: '0.9rem', alignItems: 'center' }}>
                                        {d.image && (
                                            <Box
                                                component="img"
                                                src={d.image}
                                                alt={d.name}
                                                sx={{
                                                    width: 48,
                                                    height: 48,
                                                    borderRadius: '50%',
                                                    objectFit: 'cover',
                                                    border: '1.5px solid rgba(184,137,42,0.4)',
                                                    flexShrink: 0,
                                                }}
                                            />
                                        )}
                                        <Box>
                                            <Typography
                                                sx={{
                                                    fontSize: '0.68rem',
                                                    letterSpacing: '0.15em',
                                                    textTransform: 'uppercase',
                                                    // bumped from 0.7 → 0.82
                                                    color: 'rgba(255,255,255,0.82)',
                                                    mb: '0.15rem',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                {d.tag}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontFamily: "'Playfair Display', Georgia, serif",
                                                    fontSize: '1rem',
                                                    color: '#fff',
                                                    lineHeight: 1.25,
                                                }}
                                            >
                                                {d.name}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontSize: '0.72rem',
                                                    color: 'rgba(255,255,255,0.42)',
                                                    fontStyle: 'italic',
                                                    mt: '0.2rem',
                                                }}
                                            >
                                                {d.role}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            ))}
                        </Stack>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}
