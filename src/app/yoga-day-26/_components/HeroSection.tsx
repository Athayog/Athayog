import { Box, Button, Container, Stack, Typography } from '@mui/material'
import { DIGNITARIES } from './data'

export function HeroSection() {
    return (
        <Box component="section" sx={{ bgcolor: '#3d2f1e', py: { xs: '3.5rem', md: '10rem' }, pb: { xs: '2.5rem', md: '4.5rem' }, position: 'relative', overflow: 'hidden' }}>
            <Container maxWidth="lg">
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr auto' }, gap: '3rem', alignItems: 'start' }}>
                    {/* Left */}
                    <Box>
                        <Box
                            sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.6rem',
                                border: '1px solid rgba(184,137,42,0.4)',
                                px: '1rem',
                                py: '0.35rem',
                                fontSize: '0.68rem',
                                letterSpacing: '0.14em',
                                textTransform: 'uppercase',
                                color: '#b8892a',
                                mb: '1.4rem',
                            }}
                        >
                            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                                <path d="M5.5 1L6.8 4.2H10.3L7.5 6.3L8.5 9.5L5.5 7.5L2.5 9.5L3.5 6.3L0.7 4.2H4.2Z" stroke="#b8892a" strokeWidth="1" fill="rgba(184,137,42,.15)" />
                            </svg>
                            International Day of Yoga 2026
                        </Box>

                        <Typography variant="h1" sx={{ color: '#fff', fontSize: { xs: '2.4rem', md: '4rem' }, mb: '0.6rem' }}>
                            Yoga Arambha
                            <br />
                            <Box component="span" sx={{ color: '#b8892a', fontStyle: 'italic' }}>2026</Box>
                        </Typography>

                        <Typography sx={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', fontSize: { xs: '1rem', md: '1.25rem' }, color: 'rgba(255,255,255,0.5)', mb: '1.8rem' }}>
                            &ldquo;Yoga for Wellness, Wisdom &amp; World Peace&rdquo;
                        </Typography>

                        <Stack direction={{ xs: 'column', sm: 'row' }} flexWrap="wrap" gap="1.2rem" mb="2.2rem">
                            {[
                                { label: <><strong style={{ color: '#fff' }}>June 21, 2026</strong> — Sunday</> },
                                { label: <><strong style={{ color: '#fff' }}>Indiranagar Club</strong>, Bangalore</> },
                                { label: <>6:00 AM — 8:30 AM</> },
                            ].map((m, i) => (
                                <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.65)' }}>
                                    {m.label}
                                </Box>
                            ))}
                        </Stack>

                        <Stack direction="row" flexWrap="wrap" gap="0.8rem" alignItems="center">
                            <Button href="#register" sx={{ bgcolor: '#b8892a', color: '#fff', px: '2.4rem', py: '0.95rem', fontSize: '0.85rem', '&:hover': { bgcolor: '#9a7222' } }}>
                                Register Now
                            </Button>
                            <Button
                                href="#schedule"
                                sx={{ border: '1.5px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)', px: '1.8rem', py: '0.75rem', '&:hover': { borderColor: 'rgba(255,255,255,0.5)', color: '#fff' } }}
                            >
                                View Schedule
                            </Button>
                            <Box sx={{ display: 'inline-block', bgcolor: '#f5edd8', color: '#b8892a', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', px: '0.8rem', py: '0.25rem', border: '1px solid rgba(184,137,42,0.3)' }}>
                                Free &amp; For Everyone
                            </Box>
                        </Stack>
                    </Box>

                    {/* Side dignitary box — hidden on mobile */}
                    <Box sx={{ display: { xs: 'none', md: 'block' }, bgcolor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', p: '1.5rem 1.8rem', minWidth: 210 }}>
                        <Typography sx={{ fontSize: '0.62rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', mb: '0.8rem' }}>Organised by</Typography>
                        <Typography sx={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1rem', color: '#fff', mb: '0.2rem' }}>Atha Yog Living</Typography>
                        <Typography sx={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.4)', mb: '1.2rem' }}>A Celebration of Yoga</Typography>
                        <Box sx={{ height: '1px', bgcolor: 'rgba(255,255,255,0.1)', mb: '1.2rem' }} />
                        {DIGNITARIES.map((d, i) => (
                            <Box key={d.name} sx={{ mt: i > 0 ? '1rem' : 0, pt: i > 0 ? '1rem' : 0, borderTop: i > 0 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                                <Typography sx={{ fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#b8892a', mb: '0.4rem' }}>{d.tag}</Typography>
                                <Typography sx={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.05rem', color: '#fff' }}>{d.name}</Typography>
                                <Typography sx={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.38)', fontStyle: 'italic' }}>{d.role}</Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}
