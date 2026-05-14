'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ThemeProvider } from '@mui/material/styles'
import { Box, Button, Container, Skeleton, Typography } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { yogaTheme } from '../_components/theme'
import TicketDisplay from '@/components/forms/TicketDisplayPDF'
import { EyebrowLabel } from '../_components/ui'

export default function YogaDay26SuccessPage() {
    const searchParams = useSearchParams()
    const ticketID = searchParams.get('ticketID')

    const [ticketData, setTicketData] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchTicket = async () => {
            if (!ticketID) return

            try {
                const res = await fetch('/api/verify-yoga-day', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ticketID }),
                })

                const data = await res.json()

                if (!res.ok) {
                    setError(data.message || 'Error fetching data')
                    setLoading(false)
                    return
                }

                setTicketData(data.data)
                setLoading(false)
            } catch (err) {
                setError('Failed to fetch ticket info.')
                setLoading(false)
            }
        }

        fetchTicket()
    }, [ticketID])

    return (
        <ThemeProvider theme={yogaTheme}>
            <Box sx={{ minHeight: '100vh', bgcolor: '#faf7f2', pt: { xs: 12, md: 16 }, pb: 8 }}>
                <Container maxWidth="md">
                    <Box sx={{ 
                        bgcolor: '#fff', 
                        border: '1px solid #e2ddd5', 
                        p: { xs: 3, md: 6 }, 
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <CheckCircleOutlineIcon sx={{ fontSize: 64, color: '#4f6148', mb: 2 }} />
                        <EyebrowLabel>Registration Confirmed</EyebrowLabel>
                        <Typography variant="h2" sx={{ mb: 1 }}>
                            You&apos;re Registered!
                        </Typography>
                        <Typography sx={{ color: '#555', mb: 4, maxWidth: 500 }}>
                            Thank you for joining Yoga Arambha 2026. A confirmation email with your ticket has been sent to your inbox.
                        </Typography>

                        {loading && (
                            <Box sx={{ width: '100%', mb: 4 }}>
                                <Skeleton variant="rectangular" width="100%" height={250} sx={{ borderRadius: 2 }} />
                            </Box>
                        )}

                        {error && (
                            <Typography color="error" sx={{ mb: 4, p: 2, bgcolor: '#fff5f5', border: '1px solid #ffcdd2', borderRadius: 1 }}>
                                {error}
                            </Typography>
                        )}

                        {ticketData && (
                            <Box sx={{ mb: 4, width: '100%' }}>
                                <TicketDisplay
                                    name={ticketData.name}
                                    ticketId={ticketData.ticketID}
                                    qrDataUrl={ticketData.qrDataUrl || ''}
                                    downloadUrl={ticketData.fileUrl || ''}
                                />
                            </Box>
                        )}

                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
                            {ticketData?.fileUrl && (
                                <Button
                                    component="a"
                                    href={ticketData.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    variant="contained"
                                    startIcon={<FileDownloadIcon />}
                                    sx={{ 
                                        bgcolor: '#b8892a', 
                                        color: '#fff', 
                                        '&:hover': { bgcolor: '#9a7222' },
                                        px: 4,
                                        py: 1.5
                                    }}
                                >
                                    Download Ticket
                                </Button>
                            )}

                            <Button
                                component={Link}
                                href="/yoga-day-26"
                                variant="outlined"
                                startIcon={<ArrowBackIcon />}
                                sx={{ 
                                    borderColor: '#4f6148', 
                                    color: '#4f6148',
                                    '&:hover': { borderColor: '#3d2f1e', bgcolor: '#f4f7f2' },
                                    px: 4,
                                    py: 1.5
                                }}
                            >
                                Register Another Person
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </ThemeProvider>
    )
}
