import { Box, Typography, Button } from '@mui/material'
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
    hideDownload?: boolean
}

const TicketContent: React.FC<TicketContentProps> = ({ 
    name, 
    ticketId, 
    qrDataUrl, 
    downloadUrl,
    title = 'Athayog Yoga Day 2025',
    date = 'June 21, 6:00 AM',
    venue = 'Kittur Rani Chennamma Stadium, Jayanagar',
    hideDownload = false
}) => {
    return (
        <Box
            sx={{
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                color: '#222',
                background: '#fff',
                display: 'flex',
                flexWrap: 'wrap',
                mx: 'auto',
                px: 3,
                py: 4,
                textAlign: 'left',
                borderRadius: 2,
            }}
        >

            <Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {title}
                </Typography>

                <Typography fontSize={14} mb={1.5}>
                    👤 <b>{name}</b>
                </Typography>

                <Typography fontSize={14} mb={1.5}>
                    🔐 <b>Ticket ID:</b> {ticketId}
                </Typography>

                <Typography fontSize={14} mb={1.5}>
                    📅 <b>Date:</b> {date}
                </Typography>

                <Typography fontSize={14} mb={2}>
                    📍 <b>Venue:</b> {venue}
                </Typography>
            </Box>
            <Box
                component="img"
                src={qrDataUrl}
                alt="QR Code"
                sx={{ width: 130, height: 130, display: 'block', mx: 'auto', my: 2 }}
            />

            {!hideDownload && (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    {downloadUrl && <Link href={downloadUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="outlined" sx={{ display: 'flex', justifyContent: 'center' }}>Download Ticket</Button>
                    </Link>}
                </Box>
            )}
        </Box>


    )
}

export default TicketContent
