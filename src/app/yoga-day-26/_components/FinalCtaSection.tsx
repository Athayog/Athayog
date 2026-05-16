import { Box, Button, Container, Typography } from '@mui/material'

export function FinalCtaSection() {
    return (
        <Box component="section" sx={{ py: { xs: 8, md: 14 }, bgcolor: '#2b3524', textAlign: 'center' }}>
            <Container maxWidth="lg">
                <Typography sx={{ display: 'block', fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', mb: '0.5rem', fontWeight: 500 }}>
                    June 21, 2026 &middot; Bangalore
                </Typography>
                <Typography variant="h2" sx={{ color: '#fff', maxWidth: 700, mx: 'auto', mb: '1.2rem', fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.2rem' }, lineHeight: 1.2 }}>
                    Join Thousands Celebrating
                    <br />
                    <em>International Day of Yoga</em>
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.65)', maxWidth: 460, mx: 'auto', mb: '2.5rem', fontSize: '0.94rem', lineHeight: 1.6 }}>
                    Move. Breathe. Connect. One for Yoga, Yoga for All. Free for everyone at Indiranagar Club, Bangalore.
                </Typography>
                <Button
                    href="#register"
                    endIcon={
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    }
                    sx={{
                        bgcolor: '#47820D',
                        color: '#fff',
                        px: '2.4rem',
                        py: '0.95rem',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        textTransform: 'none',
                        '&:hover': {
                            bgcolor: '#3d6b0a',
                            '& .MuiButton-endIcon': { transform: 'translateX(4px)' }
                        },
                        '& .MuiButton-endIcon': { transition: 'transform 0.3s ease' }
                    }}
                >
                    Register Now &mdash; It&apos;s Free
                </Button>
            </Container>
        </Box>
    )
}
