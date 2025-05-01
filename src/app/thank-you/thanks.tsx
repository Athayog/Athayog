'use client';
import { Box, Typography, Container, Button } from '@mui/material';

const Thanks = () => {
    return (
        <Box sx={{ backgroundColor: '#EAFEDF', minHeight: '700px', display: 'flex', alignItems: 'center' }}>
            <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
                <Typography
                    sx={{
                        fontSize: { xs: '32px', md: '48px' },
                        fontWeight: 700,
                        color: '#2A5200',
                        mb: 2,
                    }}
                >
                    Thank You
                </Typography>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ fontSize: { xs: '16px', md: '18px' }, mb: 4 }}
                >
                    for reaching out to AthaYog. Our team will get in touch with you shortly.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ borderRadius: '8px', textTransform: 'none' }}
                    onClick={() => (window.location.href = '/')}
                >
                    Back to Home
                </Button>
            </Container>
        </Box>
    );
};

export default Thanks;
