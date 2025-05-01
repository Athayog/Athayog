'use client';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Typography, Container, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

const Thanks = () => {
    const router = useRouter();

    return (
        <Box
            sx={{
                backgroundColor: '#EAFEDF',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                py: 6,
            }}
        >
            <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
                <CheckCircleIcon sx={{ fontSize: 80, color: '#4CAF50', mb: 3 }} />
                <Typography
                    sx={{
                        fontSize: { xs: '26px', md: '30px' },
                        fontWeight: 600,
                        color: '#2A5200',
                        mb: 2,
                    }}
                >
                    Thank you for reaching out to AthaYog!
                </Typography>
                <Typography sx={{ color: '#4B4B4B', mb: 4 }}>
                    Our team will get in touch with you shortly.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{
                        borderRadius: '8px',
                        textTransform: 'none',
                        px: 4,
                        backgroundColor: '#2A5200',
                        '&:hover': {
                            backgroundColor: '#204100',
                        },
                    }}
                    onClick={() => router.push('/')}
                >
                    Back to Home
                </Button>
            </Container>
        </Box>
    );
};

export default Thanks;
