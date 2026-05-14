import { Box, Button, Container, Typography } from '@mui/material'

export function FinalCtaSection() {
    return (
        <Box component="section" sx={{ py: { xs: 6, md: 8 }, bgcolor: '#4f6148', textAlign: 'center' }}>
            <Container maxWidth="lg">
                <Typography sx={{ display: 'block', fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', mb: '0.5rem', fontWeight: 500 }}>
                    June 21, 2026 &middot; Bangalore
                </Typography>
                <Typography variant="h2" sx={{ color: '#fff', maxWidth: 540, mx: 'auto', mb: '1rem' }}>
                    Join Thousands Celebrating
                    <br />
                    <em>International Day of Yoga</em>
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.65)', maxWidth: 420, mx: 'auto', mb: '2rem', fontSize: '0.9rem' }}>
                    Move. Breathe. Connect. One for Yoga, Yoga for All. Free for everyone at Indiranagar Club, Bangalore.
                </Typography>
                <Button href="#register" sx={{ bgcolor: '#b8892a', color: '#fff', px: '2.4rem', py: '0.95rem', fontSize: '0.85rem', '&:hover': { bgcolor: '#9a7222' } }}>
                    Register Now &mdash; It&apos;s Free
                </Button>
            </Container>
        </Box>
    )
}
