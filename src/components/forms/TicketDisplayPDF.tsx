import React from 'react'
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material'

interface TicketContentProps {
    name: string
    ticketId: string
    qrDataUrl: string
}

const TicketContent: React.FC<TicketContentProps> = ({ name, ticketId, qrDataUrl }) => {
    return (
        <Box
            sx={{
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                color: '#222',
                padding: 4,
                background: '#fff',
                maxWidth: 600,
                mx: 'auto',
                textAlign: 'left'
            }}
        >
            <Typography variant="h5" component="h3" gutterBottom>
                Namaste {name} <span role="img" aria-label="praying hands">🙏</span>
            </Typography>

            <Typography paragraph fontSize={14} lineHeight={1.5}>
                Thank you for registering for the International Day of Yoga 2025 with Athayog,
                <br />
                in association with Shri Tejasvi Surya, Member of Parliament, Bengaluru South.{' '}
                <span role="img" aria-label="praying hands">🙏</span>
            </Typography>

            <Typography paragraph fontSize={14} lineHeight={1.5}>
                We’re honored to have your presence as we unite to celebrate yoga, wellness, and collective harmony on June 21st.
            </Typography>

            <Typography variant="h6" component="h4" gutterBottom>
                Here are your registration details:
            </Typography>

            <Typography paragraph fontSize={14} lineHeight={1.5}>
                📅 <b>Event:</b> International Day of Yoga 2025<br />
                📍 <b>Venue:</b> Kittur Rani Chennamma stadium, Jaynagar<br />
                🕒 <b>Timing:</b> 6:00 am Onwards.
            </Typography>

            <Typography paragraph fontSize={14} lineHeight={1.5}>
                🔐 <b>Registration ID:</b> {ticketId}
            </Typography>

            <Typography paragraph fontSize={14} lineHeight={1.5}>
                Your unique QR code is attached below. Please present it at the registration counter for a seamless check-in experience.
            </Typography>

            <Box
                component="img"
                src={qrDataUrl}
                alt="QR Code"
                sx={{ width: 150, height: 150, mt: 3, mb: 3 }}
            />

            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Important Notes:
            </Typography>

            <List sx={{ pl: 2 }}>
                <ListItem disablePadding>
                    <ListItemText primary="Please arrive 15 minutes early to avoid queues." />
                </ListItem>
                <ListItem disablePadding>
                    <ListItemText primary="Wear comfortable yoga attire and bring your own mat." />
                </ListItem>
                <ListItem disablePadding>
                    <ListItemText primary="Follow us on Instagram for updates and sneak peeks! 📸" />
                </ListItem>
            </List>

            <Typography paragraph fontSize={14} lineHeight={1.5}>
                If you have any questions, feel free to reach out at <b>info@athayogliving.com</b> or WhatsApp us at <b>+91 9535689394</b>.
            </Typography>

            <Typography paragraph fontSize={14} lineHeight={1.5}>
                We can’t wait to see you on the mat! <span role="img" aria-label="person in lotus position">🧘</span>
            </Typography>

            <Typography fontWeight="bold">
                With gratitude, <br />
                Team Athayog <span role="img" aria-label="praying hands">🙏</span>
            </Typography>
        </Box>
    )
}

export default TicketContent
