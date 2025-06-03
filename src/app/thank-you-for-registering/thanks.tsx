'use client';

import React, { useEffect, useState } from 'react';
import TicketDisplay from '@/components/forms/TicketDisplayPDF';
import { useSearchParams } from 'next/navigation';
import { Skeleton, Box, Typography } from '@mui/material';
import Button from '@/components/elements/button/Index';
import Link from 'next/link';

const ThankYou: React.FC = () => {
    const searchParams = useSearchParams();
    const ticketID = searchParams.get('ticketID');

    const [ticketData, setTicketData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTicket = async () => {
            if (!ticketID) return;

            try {
                const res = await fetch('/api/verify-yoga-day', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ticketID }),
                });

                const data = await res.json();

                if (!res.ok) {
                    setError(data.message || 'Error fetching data');
                    setLoading(false);
                    return;
                }

                setTicketData(data.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch ticket info.');
                setLoading(false);
            }
        };

        fetchTicket();
    }, [ticketID]);

    if (loading) {
        return (
            <Box sx={{ p: 4, mt: '100px', minHeight: '100vh', }}>
                <Skeleton variant="rectangular" width="100%" height={200} sx={{ mt: 2 }} />
            </Box>
        );
    }

    if (error) {
        return <Box sx={{ p: 4, mt: '100px', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6" color="error"> Ticket Not Found</Typography>
        </Box>
    }

    if (!ticketData) return null;

    return (
        <Box sx={{ mt: '150px', py: 4, bg: 'lightgreen', minHeight: '100vh', maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center', mx: 'auto' }}>
            <Typography sx={{ fontSize: { xs: '26px', md: '32px' }, mb: 2, textAlign: 'center', fontWeight: 'bold', color: '#333' }}>
                Thank You for Registering!
            </Typography>
            <TicketDisplay
                name={ticketData.name}
                ticketId={ticketData.ticketID}
                qrDataUrl={ticketData.qrDataUrl || ''}
                downloadUrl={ticketData.fileUrl || ''}
            />
            <Link href="/yoga-arambha-25" style={{ textDecoration: 'none', marginTop: '20px' }}>
                <Button variant='contained' size='small'>Register Another</Button>
            </Link>
        </Box>
    );
};

export default ThankYou;
