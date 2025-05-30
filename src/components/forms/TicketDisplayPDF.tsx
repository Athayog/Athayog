import { Box, Typography, Button } from '@mui/material'
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
                maxWidth: 500,
                mx: 'auto',
                px: 3,
                py: 4,
                textAlign: 'left',
                borderRadius: 2,
                boxShadow: '0 1px 8px rgba(0,0,0,0.04)',
            }}
        >
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

            <Box
                component="img"
                src={qrDataUrl}
                alt="QR Code"
                sx={{ width: 130, height: 130, display: 'block', mx: 'auto', my: 2 }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button onClick={() => {
                    if (downloadUrl) {
                        const link = document.createElement('a');
                        link.href = downloadUrl;
                        link.download = 'entry-pass.pdf';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    } else {
                        alert('No file available yet!');
                    }
                }} variant="outlined" sx={{ display: 'flex', justifyContent: 'center' }}>Download Ticket</Button>
            </Box>
        </Box>


    )
}

export default TicketContent
