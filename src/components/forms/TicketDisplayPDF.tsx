import { Box, Typography, Button, Divider, Grid } from '@mui/material'
import Link from 'next/link'
import React from 'react'

interface TicketContentProps {
    name: string
    ticketId: string
    qrDataUrl: string
    downloadUrl: string
    title?: string
    date?: string
    venue?: string
    email?: string
    phone?: string
    hideDownload?: boolean
}

const TicketContent: React.FC<TicketContentProps> = ({
    name,
    ticketId,
    qrDataUrl,
    downloadUrl,
    title = 'Yoga Arambha 2026',
    date = 'June 21, 2026, 6:00 AM',
    venue = 'Indiranagar Club, Bangalore',
    email,
    phone,
    hideDownload = false
}) => {
    return (
        <Box
            sx={{
                fontFamily: 'var(--font-inter), sans-serif',
                '& *': { fontFamily: 'inherit' },
                color: '#222',
                background: '#fff',
                display: 'flex',
                flexDirection: 'column',
                mx: 'auto',
                px: { xs: 2, sm: 4 },
                py: { xs: 3, sm: 4 },
                textAlign: 'center',
                borderRadius: 2,
                border: '1px solid #eee',
                maxWidth: 750,
            }}
        >
            <Typography variant="subtitle2" fontWeight="bold" color="text.secondary" gutterBottom sx={{ fontFamily: 'var(--font-inter)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                🧘 Athayog Presents
            </Typography>

            <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ fontFamily: 'var(--font-playfair)', mt: 1 }}>
                Yoga Arambha 2026
            </Typography>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ fontFamily: 'var(--font-playfair)', color: '#4f6148' }}>
                International Day of Yoga Celebration
            </Typography>
            <Typography fontSize={14} color="text.secondary" sx={{ fontFamily: 'var(--font-inter)', mb: 1 }}>
                21st June 2026 | Sunday • Indiranagar Club, Bengaluru
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Grid container spacing={3} textAlign="left">
                {/* QR Code Column (Moves to top on Mobile, left on Desktop) */}
                <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRight: { md: '1px dashed #ddd' } }}>
                    <Typography variant="subtitle2" fontWeight="bold" gutterBottom textAlign="center">
                        Your Entry Pass
                    </Typography>
                    <Box
                        component="img"
                        src={qrDataUrl}
                        alt="QR Code"
                        sx={{ width: 150, height: 150, display: 'block', mx: 'auto', mb: 2 }}
                    />
                    {!hideDownload && downloadUrl && (
                        <Link href={downloadUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', width: '100%' }}>
                            <Button fullWidth variant="contained" sx={{ bgcolor: '#b8892a', color: '#fff', '&:hover': { bgcolor: '#9a7222' }, py: 1, fontSize: '0.8rem', borderRadius: 0, boxShadow: 'none' }}>
                                Download PDF
                            </Button>
                        </Link>
                    )}
                </Grid>

                {/* Details Column */}
                <Grid item xs={12} md={8}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2" fontWeight="bold" gutterBottom color="#b8892a">
                                Participant
                            </Typography>
                            <Typography fontSize={13} mb={0.5}><b>Name:</b> {name}</Typography>
                            {email && <Typography fontSize={13} mb={0.5}><b>Email:</b> {email}</Typography>}
                            {phone && <Typography fontSize={13} mb={0.5}><b>Phone:</b> {phone}</Typography>}
                            <Typography fontSize={13}><b>ID:</b> {ticketId}</Typography>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2" fontWeight="bold" gutterBottom color="#b8892a">
                                Event Schedule
                            </Typography>
                            <Typography fontSize={13} mb={0.5}><b>Reporting:</b> 6:00 AM</Typography>
                            <Typography fontSize={13} mb={0.5}><b>Mass Yoga:</b> 7:00 AM – 8:30 AM</Typography>
                            <Typography fontSize={13}><b>Refreshments:</b> 8:30 AM onwards</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="subtitle2" fontWeight="bold" gutterBottom color="#b8892a" mt={1}>
                                Distinguished Guests
                            </Typography>
                            <Typography fontSize={13} mb={0.5}><b>Chief Guest:</b> Shri P. C. Mohan, Hon’ble Member of Parliament</Typography>
                            <Typography fontSize={13}><b>Guest of Honour:</b> Shri B.N.S. Reddy (Ex-IPS), President – Indiranagar Club</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle2" fontWeight="bold" gutterBottom textAlign="left" color="#b8892a">
                Important Instructions
            </Typography>
            <Grid container spacing={1} textAlign="left" component="ul" sx={{ pl: 2, m: 0 }}>
                <Grid item xs={12} sm={6} component="li"><Typography fontSize={12}>Carry this pass on event day</Typography></Grid>
                <Grid item xs={12} sm={6} component="li"><Typography fontSize={12}>Present QR code at registration desk</Typography></Grid>
                <Grid item xs={12} sm={6} component="li"><Typography fontSize={12}>Wear appropriate yoga attire</Typography></Grid>
                <Grid item xs={12} sm={6} component="li"><Typography fontSize={12}>Bring yoga mat & water bottle</Typography></Grid>
                <Grid item xs={12} sm={6} component="li"><Typography fontSize={12}>Arrive 15 mins before reporting time</Typography></Grid>
                <Grid item xs={12} sm={6} component="li"><Typography fontSize={12}>Complimentary T-shirt, refreshments & saplings</Typography></Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Box textAlign="center" color="text.secondary" display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="center" gap={{ xs: 1, sm: 3 }}>
                <Typography fontSize={12} fontWeight="bold" color="#4f6148">Organized by Athayog</Typography>
                <Typography fontSize={12}>www.athayogliving.com</Typography>
                <Typography fontSize={12}>info@athayogliving.com</Typography>
                <Typography fontSize={12}>+91 8690333111</Typography>
            </Box>
        </Box>
    )
}

export default TicketContent
