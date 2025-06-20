'use client'
import { Fab } from '@mui/material';
import { usePathname } from 'next/navigation';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import React from 'react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const WhatsAppWidget: React.FC = () => {
    const pathname = usePathname();
    const handleWhatsAppClick = () => {
        const phoneNumber = '+919611771434';
        const whatsappUrl = `https://wa.me/${phoneNumber}`;
        window.open(whatsappUrl, '_blank');
    };
    if (pathname === '/scanner') return null
    return (
        <div
            style={{
                position: 'fixed',
                bottom: 16,
                right: 16,
                zIndex: 1000,
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
            }}
        >
            <Fab
                color="success"
                aria-label="whatsapp"
                data-gtm="whatsapp-click"
                onClick={handleWhatsAppClick}
            >
                <WhatsAppIcon />
            </Fab>
            <Fab
                sx={{
                    backgroundColor: '#fefefe',
                    color: '#000',
                    '&:hover': {
                        backgroundColor: '#f0f0f0',
                    },
                }}
                aria-label="phone"
                data-gtm="phone-click"
                onClick={() => {
                    const phoneNumber = '+919611771434'; // Replace with your phone number
                    window.open(`tel:${phoneNumber}`, '_self');
                }}
            >
                <LocalPhoneIcon />
            </Fab>
        </div>
    );
};

export default WhatsAppWidget;