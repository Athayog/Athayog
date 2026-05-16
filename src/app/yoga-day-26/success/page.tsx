'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ThemeProvider } from '@mui/material/styles'
import { Box, Container, Typography, CircularProgress, List, ListItem, ListItemText, Button, Grid } from '@mui/material'
import { yogaTheme } from '../_components/theme'

const T = {
    earth: '#1a2016',
    sage: '#38660a',
    sageL: '#f1f5ee',
    gold: '#38660a',
    goldL: '#f1f5ee',
    cream: '#fcfdfc',
    border: '#dce3d5',
    ink: '#1c1c1c',
    ink2: '#444',
    ink3: '#666',
    white: '#fff',
}

function SuccessPageContent() {
    const searchParams = useSearchParams()
    const ticketID = searchParams.get('ticketID')

    const [ticketData, setTicketData] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        if (!ticketID) { setLoading(false); return }
        ; (async () => {
            try {
                const res = await fetch('/api/verify-yoga-day', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ticketID }),
                })
                const data = await res.json()
                if (!res.ok) { setError(data.message || 'Could not fetch ticket.'); return }
                setTicketData(data.data)
            } catch {
                setError('Failed to fetch ticket info.')
            } finally {
                setLoading(false)
            }
        })()
    }, [ticketID])

    const handleDownload = (e: React.MouseEvent) => {
        if (!ticketData?.fileUrl) return;
        e.preventDefault();
        const downloadUrl = `/api/download-ticket?url=${encodeURIComponent(ticketData.fileUrl)}&name=${encodeURIComponent(`Athayog-Yoga-Day-Ticket-${ticketData.ticketID}.pdf`)}`;
        window.location.href = downloadUrl;
    };

    if (loading) {
        return (
            <Box sx={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: T.cream }}>
                <CircularProgress sx={{ color: T.gold }} />
            </Box>
        )
    }

    if (error) {
        return (
            <Box sx={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', bgcolor: T.cream }}>
                <Typography color="error" variant="h6">{error}</Typography>
                <Button component={Link} href="/yoga-day-26" sx={{ mt: 2, bgcolor: T.earth, color: T.white }}>Go Back</Button>
            </Box>
        )
    }

    if (!ticketData) return null;

    return (
        <ThemeProvider theme={yogaTheme}>
            <Box sx={{ minHeight: '100dvh', bgcolor: T.cream, pt: { xs: 12, md: 16 }, pb: { xs: 4, md: 8 }, fontFamily: 'var(--font-inter)' }}>
                <Container maxWidth="md">

                    {/* Main Ticket Card */}
                    <Box sx={{
                        bgcolor: T.white,
                        borderRadius: 3,
                        boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>

                        {/* HEADER - Solid Color Band */}
                        <Box sx={{
                            bgcolor: '#2b3524', // Elegant Green instead of Earth Black
                            color: T.white,
                            p: { xs: 3, sm: 4 },
                            textAlign: 'center',
                            position: 'relative'
                        }}>
                            <Typography variant="overline" sx={{ color: T.gold, fontWeight: 700, letterSpacing: 3 }}>Athayog Presents</Typography>
                            <Typography variant="h3" sx={{ fontFamily: 'var(--font-playfair)', mt: 1, mb: 1, fontWeight: 600, fontSize: { xs: '2rem', md: '2.5rem' } }}>Yoga Arambha 2026</Typography>
                            <Typography variant="subtitle1" sx={{ color: T.sageL, fontWeight: 500, mb: 2 }}>International Day of Yoga Celebration</Typography>

                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap', color: T.white }}>
                                <Typography variant="subtitle2" sx={{ bgcolor: 'rgba(255,255,255,0.1)', px: 2, py: 0.5, borderRadius: 1 }}>21st June 2026 | Sunday</Typography>
                                <Typography variant="subtitle2" sx={{ bgcolor: 'rgba(255,255,255,0.1)', px: 2, py: 0.5, borderRadius: 1 }}>Indiranagar Club, Bengaluru</Typography>
                            </Box>
                        </Box>

                        {/* BODY - Split Layout on Desktop */}
                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>

                            {/* LEFT COLUMN: Details & Information */}
                            <Box sx={{
                                flex: 1,
                                p: { xs: 3, sm: 4 },
                                borderRight: { md: `2px dashed ${T.border}` },
                                borderBottom: { xs: `2px dashed ${T.border}`, md: 'none' }
                            }}>

                                <Box mb={4}>
                                    <Typography variant="h6" sx={{ fontFamily: 'var(--font-playfair)', color: T.sage, mb: 2, fontWeight: 600, borderBottom: `1px solid ${T.border}`, pb: 1 }}>Participant Details</Typography>
                                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '130px 1fr' }, gap: { xs: 1, sm: 1.5 } }}>
                                        <Typography sx={{ color: T.ink3, fontWeight: 500 }}>Name:</Typography>
                                        <Typography sx={{ color: T.ink, fontWeight: 500 }}>{ticketData.name}</Typography>
                                        <Typography sx={{ color: T.ink3, fontWeight: 500 }}>Email:</Typography>
                                        <Typography sx={{ color: T.ink, wordBreak: 'break-all' }}>{ticketData.email}</Typography>
                                        <Typography sx={{ color: T.ink3, fontWeight: 500 }}>Phone:</Typography>
                                        <Typography sx={{ color: T.ink }}>{ticketData.phone}</Typography>
                                        <Typography sx={{ color: T.ink3, fontWeight: 500, mt: 1 }}>Registration ID:</Typography>
                                        <Typography sx={{ color: T.earth, fontWeight: 700, mt: 1 }}>{ticketData.ticketID}</Typography>
                                    </Box>
                                </Box>

                                <Box mb={4}>
                                    <Typography variant="h6" sx={{ fontFamily: 'var(--font-playfair)', color: T.sage, mb: 2, fontWeight: 600, borderBottom: `1px solid ${T.border}`, pb: 1 }}>Event Schedule</Typography>
                                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '200px 1fr' }, gap: { xs: 1, sm: 1.5 } }}>
                                        <Typography sx={{ color: T.ink3, fontWeight: 500 }}>Reporting & Registration:</Typography>
                                        <Typography sx={{ color: T.ink }}>6:00 AM onwards</Typography>
                                        <Typography sx={{ color: T.ink3, fontWeight: 500 }}>Mass Yoga Session:</Typography>
                                        <Typography sx={{ color: T.ink }}>7:00 AM – 8:30 AM</Typography>
                                        <Typography sx={{ color: T.ink3, fontWeight: 500 }}>Refreshments & Networking:</Typography>
                                        <Typography sx={{ color: T.ink }}>8:30 AM onwards</Typography>
                                    </Box>
                                </Box>

                                <Box mb={4}>
                                    <Typography variant="h6" sx={{ fontFamily: 'var(--font-playfair)', color: T.sage, mb: 2, fontWeight: 600, borderBottom: `1px solid ${T.border}`, pb: 1 }}>Distinguished Guests</Typography>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6}>
                                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                                <Box
                                                    component="img"
                                                    src="/images/26/PC_MOHAN.jpg"
                                                    alt="Shri P. C. Mohan"
                                                    sx={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', border: `1px solid ${T.border}` }}
                                                />
                                                <Box>
                                                    <Typography sx={{ color: T.ink3, fontWeight: 500, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: 1 }}>Presided by</Typography>
                                                    <Typography sx={{ color: T.ink, fontWeight: 600 }}>Shri P. C. Mohan</Typography>
                                                    <Typography sx={{ color: T.ink2, fontSize: '0.85rem' }}>Hon’ble Member of Parliament</Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                                <Box
                                                    component="img"
                                                    src="/images/26/BNS-Reddy.webp"
                                                    alt="Shri B.N.S. Reddy"
                                                    sx={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', border: `1px solid ${T.border}` }}
                                                />
                                                <Box>
                                                    <Typography sx={{ color: T.ink3, fontWeight: 500, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: 1 }}>Guest of Honour</Typography>
                                                    <Typography sx={{ color: T.ink, fontWeight: 600 }}>Shri B.N.S. Reddy (Ex-IPS)</Typography>
                                                    <Typography sx={{ color: T.ink2, fontSize: '0.85rem' }}>President – Indiranagar Club</Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>

                                <Box>
                                    <Typography variant="h6" sx={{ fontFamily: 'var(--font-playfair)', color: T.sage, mb: 1, fontWeight: 600 }}>Important Instructions</Typography>
                                    <List sx={{ pt: 0, '& .MuiListItem-root': { py: 0.25, px: 0 } }}>
                                        {[
                                            "Carry this pass on event day",
                                            "Present QR code at registration desk",
                                            "Wear appropriate yoga attire",
                                            "Bring yoga mat & water bottle",
                                            "Arrive 15 minutes before reporting time",
                                            "Complimentary T-shirt, refreshments & saplings provided"
                                        ].map((instruction, index) => (
                                            <ListItem key={index} sx={{ alignItems: 'flex-start' }}>
                                                <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: T.gold, mr: 1.5, mt: 1, flexShrink: 0 }} />
                                                <ListItemText primary={instruction} sx={{ m: 0, '& .MuiListItemText-primary': { color: T.ink2, fontSize: '0.9rem' } }} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Box>

                            </Box>

                            {/* RIGHT COLUMN: QR Code & Actions */}
                            <Box sx={{
                                width: { xs: '100%', md: '340px' },
                                bgcolor: T.cream,
                                p: { xs: 3, sm: 4 },
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>

                                <Typography variant="h6" sx={{ fontFamily: 'var(--font-playfair)', color: T.earth, mb: 3, fontWeight: 600, textAlign: 'center' }}>Your Entry Pass</Typography>

                                {ticketData.qrDataUrl ? (
                                    <Box sx={{ p: 2, display: 'inline-block', border: `1px solid ${T.border}`, borderRadius: 3, bgcolor: T.white, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                                        <img src={ticketData.qrDataUrl} alt="Entry QR Code" width={220} height={220} style={{ display: 'block' }} />
                                    </Box>
                                ) : (
                                    <Box sx={{ width: 220, height: 220, border: `1px solid ${T.border}`, mx: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: T.white, borderRadius: 3 }}>
                                        <Typography sx={{ color: T.ink3 }}>QR Code</Typography>
                                    </Box>
                                )}

                                <Typography sx={{ mt: 3, color: T.sage, fontSize: '0.9rem', fontWeight: 600, textAlign: 'center' }}>Scan at registration desk</Typography>

                                {ticketData.fileUrl && (
                                    <Box textAlign="center" mt={4} width="100%">
                                        <Button
                                            component="a"
                                            href={ticketData.fileUrl}
                                            onClick={handleDownload}
                                            download={`Athayog-Yoga-Day-Ticket-${ticketData.ticketID}.pdf`}
                                            rel="noopener noreferrer"
                                            variant="contained"
                                            fullWidth
                                            disableElevation
                                            sx={{
                                                bgcolor: T.gold,
                                                color: T.white,
                                                py: 1.5,
                                                fontWeight: 600,
                                                borderRadius: 2,
                                                textTransform: 'none',
                                                fontSize: '1rem',
                                                '&:hover': { bgcolor: '#2b3524' }
                                            }}
                                        >
                                            Download PDF Ticket
                                        </Button>

                                        <Button
                                            component={Link}
                                            href="/yoga-day-26"
                                            variant="text"
                                            fullWidth
                                            sx={{
                                                mt: 2,
                                                color: T.sage,
                                                fontWeight: 500,
                                                textTransform: 'none',
                                                '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' }
                                            }}
                                        >
                                            ← Register Another Person / Go Back
                                        </Button>
                                    </Box>
                                )}

                                <Box textAlign="center" mt={5} pt={3} borderTop={`1px solid ${T.border}`} width="100%">
                                    <Typography sx={{ color: T.ink3, fontSize: '0.75rem', mb: 0.5, textTransform: 'uppercase', letterSpacing: 1 }}>Organized by</Typography>
                                    <Typography sx={{ fontFamily: 'var(--font-playfair)', color: T.earth, fontSize: '1.1rem', mb: 1.5, fontWeight: 600 }}>Athayog</Typography>

                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, fontSize: '0.85rem' }}>
                                        <Link href="https://www.athayogliving.com" target="_blank" style={{ color: T.gold, textDecoration: 'none', fontWeight: 500 }}>www.athayogliving.com</Link>
                                        <Link href="mailto:info@athayogliving.com" style={{ color: T.gold, textDecoration: 'none', fontWeight: 500 }}>info@athayogliving.com</Link>
                                        <Typography sx={{ color: T.ink2, fontWeight: 500 }}>+91 8690333111</Typography>
                                    </Box>
                                </Box>

                            </Box>

                        </Box>
                    </Box>

                </Container>
            </Box>
        </ThemeProvider>
    )
}

export default function YogaDay26SuccessPage() {
    return (
        <Suspense fallback={
            <Box sx={{ display: 'flex', minHeight: '100dvh', bgcolor: T.cream, alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress sx={{ color: T.gold }} />
            </Box>
        }>
            <SuccessPageContent />
        </Suspense>
    )
}