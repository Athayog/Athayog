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
        <Box component="section" sx={{ py: { xs: 6, md: 10 }, bgcolor: '#2b3524' }}>
            <Container maxWidth="lg">
                <Box mb={4}>
                    <EyebrowLabel sx={{ color: 'rgba(255,255,255,0.7) !important' }}>Venue</EyebrowLabel>
                    <Typography variant="h2" sx={{ color: '#fff', fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' }, whiteSpace: { md: 'nowrap' } }}>
                        Find Us on June 21
                    </Typography>
                </Box>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: '2rem', alignItems: 'start' }}>
                    <Box>
                        {LOCATION_ROWS.map((r) => (
                            <Box key={r.label} sx={{ display: 'flex', gap: '0.9rem', mb: '1rem', alignItems: 'flex-start' }}>
                                <Box>
                                    <Typography sx={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.55)', mb: '0.12rem' }}>{r.label}</Typography>
                                    <Typography sx={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.82)' }}>{r.val}</Typography>
                                </Box>
                            </Box>
                        ))}
                        <Box mt={2}>
                            <Button href="#register" sx={{ bgcolor: '#38660a', color: '#fff', px: '1.8rem', py: '0.75rem', fontSize: '0.8rem', '&:hover': { bgcolor: '#2b3524' } }}>
                                Register — Free Entry
                            </Button>
                        </Box>
                    </Box>

                    <Box sx={{ border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                        <Box
                            component="iframe"
                            src="https://maps.google.com/maps?q=Indiranagar+Club+Bangalore&output=embed&z=16"
                            sx={{
                                display: 'block',
                                width: '100%',
                                aspectRatio: '16/9',
                                border: 'none',
                                filter: 'grayscale(20%) contrast(1.05)',
                            }}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Indiranagar Club, Bangalore"
                        />
                        <Box sx={{ p: '0.75rem 1rem', bgcolor: 'rgba(255,255,255,0.04)', textAlign: 'center' }}>
                            <Link
                                href="https://maps.app.goo.gl/JpW1wbeDugHRp3ZKA"
                                target="_blank"
                                rel="noopener"
                                sx={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: '#fff', opacity: 0.85, textDecoration: 'none', '&:hover': { opacity: 1, textDecoration: 'underline' } }}
                            >
                                ↗ Open in Google Maps
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}
