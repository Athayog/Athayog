'use client';
import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import type { IDetectedBarcode } from '@yudiel/react-qr-scanner';
import { Box, Typography, Paper, Stack, CircularProgress, Alert, TextField, Button, Divider, InputAdornment, } from '@mui/material';
import { Container, PaperBox, ScannerBox } from './styles/Scanner';
import useAuthStore from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';

type UserDetails = {
    name: string;
    email?: string;
    ticketId?: string;
    [key: string]: any;
};

export default function ScannerPage() {
    const [scanResult, setScanResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [manualId, setManualId] = useState('');
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const isVerifyingRef = useRef(false);
    const { user, handleLogout } = useAuthStore()
    const router = useRouter();

    useEffect(() => {
        if (user) {
            if (!user.email?.includes('athayogliving.com') && !user.phoneNumber?.includes('+918971613155')) {
                router.push('/')
            }
        }
    }, [user, router])

    if (!user) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography variant="h5">Please Wait...</Typography>
            </Box>
        )
    }


    const resetStates = () => {
        setScanResult('');
        setError('');
        setUserDetails(null);
    };

    const verifyTicket = async (ticketId: string) => {
        if (isVerifyingRef.current) return;
        isVerifyingRef.current = true;
        resetStates();
        setLoading(true);

        try {
            const { data } = await axios.post('/api/yoga-day/', { ticketId });
            setScanResult(data.message || 'Entry allowed');
            if (data.user) setUserDetails(data.user);
        } catch (err: any) {
            setError(err?.response?.data?.message || 'Verification failed.');
        } finally {
            setLoading(false);
            isVerifyingRef.current = false;
        }
    };

    const handleScan = async (detectedCodes: IDetectedBarcode[]) => {
        if (!detectedCodes?.length || isVerifyingRef.current) return;

        let ticketId = detectedCodes[0].rawValue || '';
        try {
            const url = new URL(ticketId);
            ticketId = url.searchParams.get('id') || ticketId;
        } catch {
            // Not a URL, fallback to raw value
        }

        await verifyTicket(ticketId);
    };

    const handleManualSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!manualId.trim()) return setError('Please enter a registration ID.');
        await verifyTicket('ATH-' + manualId.trim());
    };

    const handleError = (err: any) => {
        console.error(err);
        setError('Error accessing camera or scanning QR code.');
    };

    return (
        <Container>
            <PaperBox elevation={6}>
                <Stack spacing={3} alignItems="center">
                    <Typography variant="h4" fontWeight={700}>
                        Event Ticket Scanner
                    </Typography>

                    {/* Show scanner if no result and no error */}
                    {!scanResult && !error && (
                        <ScannerBox>
                            <Scanner
                                onScan={handleScan}
                                onError={handleError}
                                constraints={{ facingMode: 'environment' }}
                            />
                        </ScannerBox>
                    )}

                    {/* While verifying */}
                    {loading && (
                        <Stack direction="row" spacing={1} alignItems="center">
                            <CircularProgress size={20} />
                            <Typography color="primary">Verifying Details...</Typography>
                        </Stack>
                    )}

                    {/* Show success or error result */}
                    {!loading && (scanResult || error) && (
                        <>
                            {scanResult && (
                                <Alert severity="success" sx={{ width: '100%', textAlign: 'center' }}>
                                    {scanResult}
                                </Alert>
                            )}
                            {error && (
                                <Alert severity="error" sx={{ width: '100%', textAlign: 'center' }}>
                                    {error}
                                </Alert>
                            )}
                            <Button
                                variant="contained"
                                onClick={resetStates}
                                sx={{ mt: 2 }}
                            >
                                SCAN AGAIN
                            </Button>
                        </>
                    )}

                    {/* User details */}
                    {userDetails && (
                        <Paper variant="outlined" sx={{ p: 2, mt: 2, width: '100%' }}>
                            <Typography variant="h6" fontWeight={600} gutterBottom>
                                Attendee Details
                            </Typography>
                            <Stack spacing={1} >
                                <Typography><strong>TicketID:</strong> {userDetails.ticketID || 'N/A'}</Typography>
                                <Typography><strong>Name:</strong> {userDetails.name || 'N/A'}</Typography>
                                <Typography><strong>Email:</strong> {userDetails.email || 'N/A'}</Typography>
                                <Typography><strong>Ticket ID:</strong> {userDetails.ticketID || 'N/A'}</Typography>
                                <Typography><strong>Phone:</strong> {userDetails.phone || 'N/A'}</Typography>
                                <Typography><strong>Location:</strong> {userDetails.location || 'N/A'}</Typography>
                                <Typography><strong>T Shirt Size:</strong> {userDetails.tShirtSize.toUpperCase() || 'N/A'}</Typography>
                            </Stack>

                        </Paper>
                    )}

                    <Typography variant="caption" color="text.secondary" sx={{ mt: 2 }}>
                        Allow camera access and scan a valid ticket QR code.
                    </Typography>

                    <Divider sx={{ width: '100%', my: 3 }} />

                    <Typography variant="h6" fontWeight={600} sx={{ alignSelf: 'flex-start' }}>
                        Or enter registration ID manually:
                    </Typography>

                    <Box
                        component="form"
                        onSubmit={handleManualSubmit}
                        sx={{ width: '100%', display: 'flex', gap: 2 }}
                    >

                        <TextField
                            fullWidth
                            size="small"
                            label="Registration ID"
                            variant="outlined"
                            value={manualId}
                            onChange={(e) => setManualId(e.target.value)}
                            disabled={loading}
                            autoComplete="off"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        ATH-
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={loading}
                            sx={{ minWidth: 120, fontSize: '14px', fontWeight: 'bold' }}
                        >
                            VERIFY
                        </Button>
                    </Box>
                </Stack>
            </PaperBox>
        </Container>
    );

}
