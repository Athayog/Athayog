'use client';
import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import type { IDetectedBarcode } from '@yudiel/react-qr-scanner';
import { Paper, Stack, CircularProgress, Alert, TextField, Button, InputAdornment, Card, CardContent, Grid, Typography, Divider, Box, Chip, Avatar } from '@mui/material';
import { Container, PaperBox, ScannerBox } from './styles/Scanner';
import useAuthStore from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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
            <PaperBox elevation={6} sx={{ fontFamily: 'var(--font-inter)' }}>
                <Stack spacing={3} alignItems="center">
                    <Typography
                        sx={{
                            fontFamily: 'var(--font-montserrat)',
                            paddingBottom: '10px',
                            width: '100%',
                            textAlign: 'center',
                            fontWeight: 700,
                            padding: '14px 0',
                            fontSize: '24px',
                            color: '#fff',
                            backgroundColor: '#003da8'
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
                            {/* User details */}
                            {userDetails && (
                                <AttendeeCard userDetails={userDetails} />
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
                                        startIcon={<DocumentScannerIcon />}
                                        sx={{ mt: 2, fontFamily: 'var(--font-inter)', width: '100%', borderRadius: '30px', py: '12px', backgroundColor: '#003da8', boxShadow: 'none' }}
                                    > Start Scanning
                                    </Button>
                                </>
                            )}



                            <Typography variant="caption" sx={{ mt: 2, fontFamily: 'var(--font-inter)', color: "#191c27" }}>
                                Allow camera access and scan a valid ticket QR code.
                            </Typography>

                            <Divider sx={{ width: '100%', my: 3 }} />

                            <Typography variant="h6" fontWeight={600} sx={{ alignSelf: 'flex-start', fontFamily: 'var(--font-montserrat)' }}>
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
                                    startIcon={<CheckCircleIcon />}
                                    sx={{ minWidth: 120, width: '100%', borderRadius: '30px', fontSize: '14px', fontWeight: 'normal', fontFamily: 'var(--font-inter)', backgroundColor: '#003da8', boxShadow: 'none' }}
                                >
                                    Verify ID
                                </Button>
                            </Box>
                        </Stack>
                    </Box>
                </Stack>
            </PaperBox>
        </Container>
    );

}

const formatReadableDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    const getDaySuffix = (day: number) => {
        if (day >= 11 && day <= 13) return 'th';
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    };

    return `${day}${getDaySuffix(day)} ${month} ${year}`;
};

const InfoItem = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <Grid item xs={6} sm={6}>
        <Typography sx={{ fontWeight: 600, color: '#444', fontFamily: 'var(--font-montserrat)', fontSize: '12px' }}>
            {label}
        </Typography>
        <Typography
            sx={{
                fontWeight: 800,
                fontFamily: 'var(--font-montserrat)',
                fontSize: '12px',
                wordBreak: 'break-word',
                whiteSpace: 'normal',
                overflowWrap: 'break-word',
                mt: 0.5,
            }}
        >
            {value || 'N/A'}
        </Typography>
    </Grid>
);

export const AttendeeCard = ({ userDetails }: any) => {
    const scanned = userDetails.scanned;
    const tShirtSize = userDetails.tShirtSize?.toUpperCase();

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
                {/* Header Bar */}
                <Box sx={{ backgroundColor: '#003da8', width: '100%', p: 2 }}>
                    <Typography
                        variant="body1"
                        color="#deecfb"
                        fontWeight={800}
                        sx={{ fontSize: '1rem' }}
                    >
                        {userDetails.name}
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

                {/* Grid Info */}
                <Box sx={{ px: 2, py: 2 }}>
                    <Grid container spacing={2}>
                        <InfoItem label="Email" value={userDetails.email} />
                        <InfoItem label="Phone" value={userDetails.phone} />
                        <InfoItem label="Registered On" value={formatReadableDate(userDetails.createdAt)} />
                        <InfoItem label="Event Source" value={userDetails.eventSource} />
                        <InfoItem label="Location" value={userDetails.location} />
                        <InfoItem label="Age" value={userDetails.age} />
                        <InfoItem label="Experience" value={userDetails.experience} />

                        {/* T-Shirt Size as Chip */}
                        <Grid item xs={6} sm={6}>
                            <Typography sx={{ fontWeight: 600, color: '#444', fontFamily: 'var(--font-montserrat)', fontSize: '12px' }}>
                                T-Shirt Size
                            </Typography>
                            <Chip
                                label={tShirtSize || 'N/A'}
                                color="success"
                                size="medium"
                                sx={{ mt: 0.5, fontWeight: 500, fontFamily: 'var(--font-montserrat)' }}
                            />
                        </Grid>

                        {/* Scanned Count as Chip */}
                        <Grid item xs={6} sm={6}>
                            <Typography sx={{ fontWeight: 600, color: '#444', fontFamily: 'var(--font-montserrat)', fontSize: '12px' }}>
                                Scanned Count
                            </Typography>
                            <Chip
                                label={scanned || '0'}
                                sx={{
                                    mt: 0.5,
                                    fontWeight: 500,
                                    fontFamily: 'var(--font-montserrat)',
                                    backgroundColor: '#4f4c4c',
                                    color: '#fff',
                                }}
                                size="medium"
                            />
                        </Grid>
                    </Grid>
                </Box>
            </CardContent>
        </Card>
    );
};
