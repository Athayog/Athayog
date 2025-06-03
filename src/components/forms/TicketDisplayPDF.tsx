import { Box, Typography, Button } from '@mui/material'
import Link from 'next/link'
import React from 'react'

interface TicketContentProps {
    name: string
    ticketId: string
    qrDataUrl: string
    downloadUrl: string
}

const TicketContent: React.FC<TicketContentProps> = ({ name, ticketId, qrDataUrl, downloadUrl }) => {
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
                    Athayog Yoga Day 2025
                </Typography>

                <Typography fontSize={14} mb={1.5}>
                    👤 <b>{name}</b>
                </Typography>

                <Typography fontSize={14} mb={1.5}>
                    🔐 <b>Ticket ID:</b> {ticketId}
                </Typography>

                <Typography fontSize={14} mb={1.5}>
                    📅 <b>Date:</b> June 21, 6:00 AM
                </Typography>

                <Typography fontSize={14} mb={2}>
                    📍 <b>Venue:</b> Kittur Rani Chennamma Stadium, Jayanagar
                </Typography>
            </Box>
            <Box
                component="img"
                src={qrDataUrl}
                alt="QR Code"
                sx={{ width: 130, height: 130, display: 'block', mx: 'auto', my: 2 }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {downloadUrl && <Link href={downloadUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outlined" sx={{ display: 'flex', justifyContent: 'center' }}>Download Ticket</Button>
                </Link>
                }
            </Box>
        </Box>


    )
}

export default TicketContent
