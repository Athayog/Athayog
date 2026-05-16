import { Box, Button, Container, Stack, Typography } from '@mui/material'
import { DIGNITARIES } from './data'

export function HeroSection() {
    return (
        <Box component="section" sx={{ bgcolor: '#2b3524', pt: { xs: '8rem', md: '10rem' }, pb: { xs: '2.5rem', md: '4.5rem' }, position: 'relative', overflow: 'hidden' }}>
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
                                color: '#47820D',
                                mb: '1.4rem',
                            }}
                        >
                            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                                <path d="M5.5 1L6.8 4.2H10.3L7.5 6.3L8.5 9.5L5.5 7.5L2.5 9.5L3.5 6.3L0.7 4.2H4.2Z" stroke="#47820D" strokeWidth="1" fill="rgba(71,130,13,.15)" />
                            </svg>
                            International Day of Yoga 2026
                        </Box>

                        <Typography variant="h1" sx={{ color: '#fff', fontSize: { xs: '2.8rem', sm: '3.5rem', md: '4.5rem' }, mb: '0.6rem', lineHeight: 1.1 }}>
                            Yoga Arambha
                            <br />
                            <Box component="span" sx={{ color: '#47820D', fontStyle: 'italic' }}>2026</Box>
                        </Typography>

                        <Typography sx={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontStyle: 'italic', fontSize: { xs: '1.1rem', md: '1.25rem' }, color: 'rgba(255,255,255,0.5)', mb: '2rem' }}>
                            &ldquo;Yoga for Wellness, Wisdom &amp; World Peace&rdquo;
                        </Typography>

                        <Stack direction={{ xs: 'column', sm: 'row' }} flexWrap="wrap" gap="1.4rem" mb="2.2rem">
                            {[
                                {
                                    label: <><strong style={{ color: '#fff' }}>June 21, 2026</strong> — Sunday</>,
                                    icon: <path d="M3 4H13V13H3V4ZM3 4V3H4V4H12V3H13V4M3 7H13M6 2V4M10 2V4" stroke="currentColor" strokeWidth="1.2" />
                                },
                                {
                                    label: <><strong style={{ color: '#fff' }}>Indiranagar Club</strong>, Bangalore</>,
                                    icon: <path d="M8 14C8 14 13 10 13 6.5C13 3.73858 10.7614 1.5 8 1.5C5.23858 1.5 3 3.73858 3 6.5C3 10 8 14 8 14ZM8 8.5C9.10457 8.5 10 7.60457 10 6.5C10 5.39543 9.10457 4.5 8 4.5C6.89543 4.5 6 5.39543 6 6.5C6 7.60457 6.89543 8.5 8 8.5Z" stroke="currentColor" strokeWidth="1.2" />
                                },
                                {
                                    label: <>6:00 AM — 8:30 AM</>,
                                    icon: <path d="M8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5ZM8 4.5V8.5L11 10.5" stroke="currentColor" strokeWidth="1.2" />
                                },
                            ].map((m, i) => (
                                <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: '0.7rem', fontSize: '0.95rem', color: 'rgba(255,255,255,0.7)' }}>
                                    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" style={{ opacity: 0.9 }}>
                                        {m.icon}
                                    </svg>
                                    {m.label}
                                </Box>
                            ))}
                        </Stack>

                        <Stack direction="row" flexWrap="wrap" gap="0.8rem" alignItems="center">
                            <Button href="#register" sx={{ bgcolor: '#47820D', color: '#fff', px: '2.4rem', py: '0.95rem', fontSize: '0.85rem', '&:hover': { bgcolor: '#3d6b0a' } }}>
                                Register Now
                            </Button>
                            <Button
                                href="#schedule"
                                sx={{ border: '1.5px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)', px: '1.8rem', py: '0.75rem', '&:hover': { borderColor: 'rgba(255,255,255,0.5)', color: '#fff' } }}
                            >
                                View Schedule
                            </Button>
                            <Box sx={{ display: 'inline-block', bgcolor: '#f1f5ee', color: '#47820D', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', px: '0.8rem', py: '0.25rem', border: '1px solid rgba(71,130,13,0.3)' }}>
                                Free &amp; For Everyone
                            </Box>
                        </Stack>
                    </Box>

                    {/* Side dignitary box */}
                    <Box sx={{
                        display: 'block',
                        bgcolor: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        p: '1.5rem 1.8rem',
                        minWidth: { md: 240 },
                        mt: { xs: 4, md: 0 }
                    }}>
                        <Typography sx={{ fontSize: '0.62rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', mb: '0.8rem' }}>Organised by</Typography>
                        <Typography sx={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1rem', color: '#fff', mb: '0.2rem' }}>Atha Yog Living</Typography>
                        <Typography sx={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.4)', mb: '1.2rem' }}>A Celebration of Yoga</Typography>
                        <Box sx={{ height: '1px', bgcolor: 'rgba(255,255,255,0.1)', mb: '1.2rem' }} />

                        <Stack gap="1.5rem">
                            {DIGNITARIES.map((d, i) => (
                                <Box key={d.name} sx={{ pt: i > 0 ? '1rem' : 0, borderTop: i > 0 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                                    <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                        {d.image && (
                                            <Box
                                                component="img"
                                                src={d.image}
                                                alt={d.name}
                                                sx={{
                                                    width: 50,
                                                    height: 50,
                                                    borderRadius: '50%',
                                                    objectFit: 'cover',
                                                    border: '1px solid rgba(184,137,42,0.3)'
                                                }}
                                            />
                                        )}
                                        <Box>
                                            <Typography sx={{ fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#47820D', mb: '0.2rem' }}>{d.tag}</Typography>
                                            <Typography sx={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.05rem', color: '#fff', lineHeight: 1.2 }}>{d.name}</Typography>
                                            <Typography sx={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.38)', fontStyle: 'italic', mt: 0.3 }}>{d.role}</Typography>
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
