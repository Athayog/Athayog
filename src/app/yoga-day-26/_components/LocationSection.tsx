import { Box, Button, Container, Link, Typography } from '@mui/material'
import { EyebrowLabel } from './ui'

const LOCATION_ROWS = [
    { label: 'Venue', val: 'Indiranagar Club, Bangalore' },
    { label: 'Date', val: 'Sunday, June 21, 2026' },
    { label: 'Time', val: '6:00 AM – 8:35 AM' },
    { label: 'Organised by', val: 'Atha Yog Living — A Celebration of Yoga' },
]

export function LocationSection() {
    return (
        <Box component="section" sx={{ py: { xs: 6, md: 8 }, bgcolor: '#3d2f1e' }}>
            <Container maxWidth="lg">
                <Box mb={4}>
                    <EyebrowLabel dark>Venue</EyebrowLabel>
                    <Typography variant="h2" sx={{ color: '#fff' }}>
                        Find Us on June 21
                    </Typography>
                </Box>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: '2rem', alignItems: 'start' }}>
                    <Box>
                        {LOCATION_ROWS.map((r) => (
                            <Box key={r.label} sx={{ display: 'flex', gap: '0.9rem', mb: '1rem', alignItems: 'flex-start' }}>
                                <Box>
                                    <Typography sx={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.35)', mb: '0.12rem' }}>{r.label}</Typography>
                                    <Typography sx={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.82)' }}>{r.val}</Typography>
                                </Box>
                            </Box>
                        ))}
                        <Box mt={2}>
                            <Button href="#register" sx={{ bgcolor: '#b8892a', color: '#fff', px: '1.8rem', py: '0.75rem', fontSize: '0.8rem', '&:hover': { bgcolor: '#9a7222' } }}>
                                Register — Free Entry
                            </Button>
                        </Box>
                    </Box>

                    <Box sx={{ bgcolor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', p: '2rem', textAlign: 'center' }}>
                        <Box
                            sx={{
                                aspectRatio: '16/9',
                                bgcolor: 'rgba(255,255,255,0.03)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'rgba(255,255,255,0.2)',
                                fontSize: '0.8rem',
                                mb: '1rem',
                                flexDirection: 'column',
                                gap: 1,
                            }}
                        >
                            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ opacity: 0.25 }}>
                                <circle cx="18" cy="15" r="7" stroke="white" strokeWidth="1.3" />
                                <path d="M18 3C11 3 5 8.6 5 15C5 23.5 18 33 18 33C18 33 31 23.5 31 15C31 8.6 25 3 18 3Z" stroke="white" strokeWidth="1.3" fill="none" />
                            </svg>
                            Indiranagar Club, Bangalore
                        </Box>
                        <Link
                            href="https://maps.app.goo.gl/JpW1wbeDugHRp3ZKA"
                            target="_blank"
                            rel="noopener"
                            sx={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: '#b8892a', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                        >
                            Open in Google Maps
                        </Link>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}
