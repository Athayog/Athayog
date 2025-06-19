'use client';
import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import type { IDetectedBarcode } from '@yudiel/react-qr-scanner';
import { Paper, Stack, CircularProgress, Alert, TextField, Button, InputAdornment, Card, CardContent, Grid, Typography, Divider, Box, Chip } from '@mui/material';
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

    // useEffect(() => {
    //     if (user) {
    //         if (!user.email?.includes('athayogliving.com') && !user.phoneNumber?.includes('+918971613155')) {
    //             router.push('/')
    //         }
    //     }
    // }, [user, router])

    // if (!user) {
    //     return (
    //         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    //             <Typography variant="h5">Please Wait...</Typography>
    //         </Box>
    //     )
    // }


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
            <PaperBox elevation={6} sx={{ fontFamily: 'var(--font-inter)' }}>
                <Stack spacing={3} alignItems="center">
                    <Typography
                        sx={{
                            fontFamily: 'var(--font-montserrat)',
                            borderBottom: '2px solid #ddd',
                            paddingBottom: '10px',
                            width: '100%',
                            textAlign: 'center',
                            fontWeight: 700,
                            fontSize: '24px'
                        }}>
                        Event Ticket Scanner
                    </Typography>

                    <Box sx={{ padding: '20px' }}>
                        <Stack spacing={3} alignItems="center">
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
                                    <Typography sx={{ fontFamily: 'var(--font-inter)' }} color="primary">Verifying Details...</Typography>
                                </Stack>
                            )}

                            {/* Show success or error result */}
                            {!loading && (scanResult || error) && (
                                <>
                                    {scanResult && (
                                        <Alert severity="success" sx={{ width: '100%', textAlign: 'center', fontFamily: 'var(--font-inter)' }}>
                                            {scanResult}
                                        </Alert>
                                    )}
                                    {error && (
                                        <Alert severity="error" sx={{ width: '100%', textAlign: 'center', fontFamily: 'var(--font-inter)' }}>
                                            {error}
                                        </Alert>
                                    )}
                                    <Button
                                        variant="contained"
                                        onClick={resetStates}
                                        sx={{ mt: 2, fontFamily: 'var(--font-inter)', borderRadius: '2.5px', backgroundColor: '#003da8', boxShadow: 'none' }}
                                    >
                                        SCAN AGAIN
                                    </Button>
                                </>
                            )}

                            {/* User details */}
                            {userDetails && (
                                <AttendeeCard userDetails={userDetails} />
                            )}

                            <Typography variant="caption" color="text.secondary" sx={{ mt: 2, fontFamily: 'var(--font-inter)' }}>
                                Allow camera access and scan a valid ticket QR code.
                            </Typography>

                            <Divider sx={{ width: '100%', my: 3 }} />

                            <Typography variant="h6" fontWeight={600} sx={{ alignSelf: 'flex-start', fontFamily: 'var(--font-inter)' }}>
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
                                    sx={{ fontFamily: 'var(--font-inter)' }}
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
                                    sx={{ minWidth: 120, fontSize: '14px', fontWeight: 'bold', fontFamily: 'var(--font-inter)', borderRadius: '2.5px', backgroundColor: '#003da8', boxShadow: 'none' }}
                                >
                                    VERIFY
                                </Button>
                            </Box>
                        </Stack>
                    </Box>
                </Stack>
            </PaperBox>
        </Container>
    );

}

const AttendeeCard = ({ userDetails }: any) => {
    const fields = [
        { label: 'Name', value: userDetails.name },
        { label: 'Email', value: userDetails.email },
        { label: 'Phone', value: userDetails.phone },
        { label: 'Age', value: userDetails.age },
        { label: 'Gender', value: userDetails.gender },
        {
            label: 'Registration Date',
            value: userDetails.createdAt
                ? new Date(userDetails.createdAt).toLocaleDateString()
                : 'N/A',
        },
        { label: 'Location', value: userDetails.location },
    ];

    const tShirtSize = userDetails.tShirtSize?.toUpperCase();
    const scanned = userDetails.scanned;

    return (
        <Card
            variant="outlined"
            sx={{
                mt: 3,
                boxShadow: 'none',
                border: 'none',
                fontFamily: 'var(--font-inter)',
                backgroundColor: '#ebf3fe',
                overflow: 'hidden',
                width: '100%',
            }}
        >

            <CardContent sx={{ p: 0 }}>
                <Box display="flex" flexDirection="column" gap={2}>
                    <Box sx={{ backgroundColor: '#003da8', width: '100%', p: 2 }}>
                        <Typography
                            variant="caption"
                            color="#deecfb"
                            sx={{ fontSize: '0.75rem' }}
                        >
                            Scanned Ticket ID
                        </Typography>
                        <Typography
                            variant="body1"
                            color="#ecbc57"
                            fontWeight={800}
                            sx={{ fontSize: '1rem' }}
                        >
                            {userDetails.ticketID || 'N/A'}
                        </Typography>
                    </Box>
                    {fields.map((field, index) => (
                        <Box key={index}>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ fontSize: '0.75rem' }}
                            >
                                {field.label}
                            </Typography>
                            <Typography
                                variant="body1"
                                fontWeight={500}
                                sx={{ fontSize: '1rem' }}
                            >
                                {field.value || 'N/A'}
                            </Typography>
                        </Box>
                    ))}

                    <Box>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ fontSize: '0.75rem' }}
                        >
                            T-Shirt Size
                        </Typography>
                        {tShirtSize ? (
                            <Chip
                                label={tShirtSize}
                                color="secondary"
                                size="small"
                                sx={{ mt: 0.5, fontWeight: 500 }}
                            />
                        ) : (
                            <Typography
                                variant="body1"
                                fontWeight={500}
                                sx={{ fontSize: '1rem' }}
                            >
                                N/A
                            </Typography>
                        )}
                    </Box>

                    {typeof scanned !== 'undefined' && (
                        <Box>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ fontSize: '0.75rem' }}
                            >
                                Check-ins
                            </Typography>
                            <Typography
                                variant="body1"
                                fontWeight={500}
                                sx={{ fontSize: '1rem' }}
                            >
                                {scanned}
                            </Typography>
                        </Box>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};
