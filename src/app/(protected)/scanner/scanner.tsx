'use client';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect, useCallback } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import { ThemeProvider } from '@mui/material/styles';
import {
    Box, Stack, Typography, TextField, Button, InputAdornment,
    CircularProgress, Chip,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import ReplayIcon from '@mui/icons-material/Replay';
import axios from 'axios';
import type { IDetectedBarcode } from '@yudiel/react-qr-scanner';
import useAuthStore from '@/store/useAuthStore';
import { yogaTheme } from '@/app/yoga-day-26/_components/theme';


type UserDetails = {
    name: string;
    email?: string;
    ticketID?: string;
    phone?: string;
    gender?: string;
    tshirtSize?: string;
    hasYogaExperience?: string;
    heardFrom?: string;
    createdAt?: string;
    scanned?: number;
    [key: string]: any;
};


const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const day = d.getDate();
    const s = (n: number) => {
        if (n >= 11 && n <= 13) return 'th';
        return ['th', 'st', 'nd', 'rd'][n % 10] ?? 'th';
    };
    return `${day}${s(day)} ${d.toLocaleString('default', { month: 'short' })} ${d.getFullYear()}`;
};


const Field = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <Typography sx={{
            fontSize: '10px', fontWeight: 600, color: '#9e9e9e',
            textTransform: 'uppercase', letterSpacing: '0.6px',
        }}>
            {label}
        </Typography>
        <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#1a1a1a', wordBreak: 'break-word' }}>
            {value || '—'}
        </Typography>
    </Box>
);


export const AttendeeCard = ({ userDetails }: { userDetails: UserDetails }) => {
    const isMultiScan = (userDetails.scanned ?? 0) > 1;
    const accent = isMultiScan ? '#d32f2f' : '#4caf50';
    const bgTint = isMultiScan ? '#fff5f5' : '#f6fbf6';
    const statusLabel = isMultiScan ? 'Already Scanned' : 'Entry Allowed';

    return (
        <Box sx={{
            width: '100%',
            bgcolor: '#fff',
            border: '1px solid #e8e8e8',
            borderTop: `3px solid ${accent}`,
            borderRadius: '10px',
            overflow: 'hidden',
        }}>
            {/* Header */}
            <Box sx={{ px: 2, pt: 2, pb: 1.5, bgcolor: bgTint }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Stack direction="row" alignItems="center" spacing={0.75}>
                        <CheckCircleIcon sx={{ fontSize: 17, color: accent }} />
                        <Typography sx={{ fontSize: '13px', fontWeight: 700, color: accent }}>
                            {statusLabel}
                        </Typography>
                    </Stack>
                    <Chip
                        label={`Scanned: ${userDetails.scanned ?? 0}`}
                        size="small"
                        sx={{
                            height: 22,
                            fontSize: '11px',
                            fontWeight: 700,
                            bgcolor: isMultiScan ? '#ffebee' : '#e8f5e9',
                            color: accent,
                            border: `1px solid ${isMultiScan ? '#ffcdd2' : '#c8e6c9'}`,
                            borderRadius: '6px',
                        }}
                    />
                </Stack>
                <Typography sx={{
                    fontFamily: 'var(--font-playfair)',
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#1a1a1a',
                    mt: 1,
                    lineHeight: 1.2,
                }}>
                    {userDetails.name}
                </Typography>
                <Typography sx={{ fontSize: '12px', color: '#757575', fontWeight: 500, mt: 0.25 }}>
                    {userDetails.ticketID ?? '—'}
                </Typography>
            </Box>

            {/* Info Grid */}
            <Box sx={{ px: 2, py: 1.5 }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 16px' }}>
                    <Field label="Email" value={userDetails.email} />
                    <Field label="Phone" value={userDetails.phone} />
                    <Field label="Gender" value={userDetails.gender} />
                    <Field label="T-Shirt" value={userDetails.tshirtSize?.toUpperCase()} />
                    <Field label="Experience" value={userDetails.hasYogaExperience} />
                    <Field label="Heard From" value={userDetails.heardFrom} />
                    <Field label="Registered" value={userDetails.createdAt ? formatDate(userDetails.createdAt) : '—'} />
                </Box>
            </Box>
        </Box>
    );
};


export default function ScannerPage() {
    // ✅ ALL hooks before any early return
    const [phase, setPhase] = useState<'scan' | 'loading' | 'result'>('scan');
    const [scanResult, setScanResult] = useState('');
    const [error, setError] = useState('');
    const [manualId, setManualId] = useState('');
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const isVerifyingRef = useRef(false);
    const { user, handleLogout } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            if (
                !user.email?.includes('athayogliving.com') &&
                !user.phoneNumber?.includes('+918971613155')
            ) {
                router.push('/');
            }
        }
    }, [user, router]);

    const reset = useCallback(() => {
        setScanResult('');
        setError('');
        setUserDetails(null);
        setPhase('scan');
        isVerifyingRef.current = false;
    }, []);

    const verifyTicket = useCallback(async (ticketId: string) => {
        if (isVerifyingRef.current) return;
        isVerifyingRef.current = true;
        setScanResult('');
        setError('');
        setUserDetails(null);
        setPhase('loading');
        try {
            const token = await user?.getIdToken();
            const { data } = await axios.post('/api/yoga-day/', { ticketId }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setScanResult(data.message || 'Entry allowed');
            if (data.user) setUserDetails(data.user);
            setPhase('result');
        } catch (err: any) {
            setError(err?.response?.data?.message || 'Verification failed.');
            setPhase('result');
        } finally {
            isVerifyingRef.current = false;
        }
    }, [user]);

    const handleScan = useCallback(async (detectedCodes: IDetectedBarcode[]) => {
        if (!detectedCodes?.length || isVerifyingRef.current) return;
        let ticketId = detectedCodes[0].rawValue || '';
        try {
            const url = new URL(ticketId);
            ticketId = url.searchParams.get('id') || ticketId;
        } catch { /* raw value fallback */ }
        await verifyTicket(ticketId);
    }, [verifyTicket]);

    const handleManualSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!manualId.trim()) {
            setError('Enter a registration ID.');
            return;
        }
        await verifyTicket('ATH-' + manualId.trim());
    }, [manualId, verifyTicket]);

    // ✅ Early returns AFTER all hooks
    if (!user) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100dvh' }}>
                <CircularProgress size={24} />
            </Box>
        );
    }

    return (
        <ThemeProvider theme={yogaTheme}>
            <Box sx={{
                minHeight: '100dvh',
                bgcolor: '#f5f5f5',
                display: 'flex',
                flexDirection: 'column',
                maxWidth: 480,
                mx: 'auto',
            }}>

                {/* Sticky Top Bar */}
                <Box sx={{
                    px: 2,
                    py: 1.5,
                    bgcolor: '#fff',
                    borderBottom: '1px solid #eeeeee',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    position: 'sticky',
                    top: 0,
                    zIndex: 10,
                }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <QrCodeScannerIcon sx={{ fontSize: 20, color: '#b8892a' }} />
                        <Typography sx={{
                            fontFamily: 'var(--font-playfair)',
                            fontWeight: 700,
                            fontSize: '17px',
                            color: '#1a1a1a',
                        }}>
                            Ticket Scanner
                        </Typography>
                    </Stack>
                    <Typography
                        onClick={handleLogout}
                        sx={{ fontSize: '12px', color: '#9e9e9e', cursor: 'pointer', fontWeight: 500 }}
                    >
                        Logout
                    </Typography>
                </Box>

                {/* Scrollable Body */}
                <Box sx={{ flex: 1, overflow: 'auto', px: 2, pt: 2, pb: 3 }}>
                    <Stack spacing={2}>

                        {/* Phase: Scanner */}
                        {phase === 'scan' && (
                            <Box sx={{
                                borderRadius: '12px',
                                overflow: 'hidden',
                                border: '1px solid #e0e0e0',
                                bgcolor: '#000',
                                aspectRatio: '1 / 1',
                                width: '100%',
                                '& > div': { width: '100% !important', height: '100% !important' },
                            }}>
                                <Scanner
                                    onScan={handleScan}
                                    onError={() => setError('Camera error. Please allow access.')}
                                    constraints={{ facingMode: 'environment' }}
                                />
                            </Box>
                        )}

                        {/* Phase: Loading */}
                        {phase === 'loading' && (
                            <Box sx={{
                                borderRadius: '12px',
                                border: '1px solid #e0e0e0',
                                bgcolor: '#fff',
                                aspectRatio: '1 / 1',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 1.5,
                            }}>
                                <CircularProgress size={32} sx={{ color: '#b8892a' }} />
                                <Typography sx={{ fontSize: '13px', color: '#757575', fontWeight: 500 }}>
                                    Verifying ticket…
                                </Typography>
                            </Box>
                        )}

                        {/* Phase: Result */}
                        {phase === 'result' && (
                            <Stack spacing={1.5}>
                                {error && (
                                    <Box sx={{
                                        borderRadius: '10px',
                                        border: '1px solid #ffcdd2',
                                        bgcolor: '#fff5f5',
                                        px: 2,
                                        py: 1.5,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                    }}>
                                        <ErrorOutlineIcon sx={{ fontSize: 18, color: '#d32f2f', flexShrink: 0 }} />
                                        <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#d32f2f' }}>
                                            {error}
                                        </Typography>
                                    </Box>
                                )}
                                {userDetails && <AttendeeCard userDetails={userDetails} />}
                                <Button
                                    onClick={reset}
                                    startIcon={<ReplayIcon sx={{ fontSize: '18px !important' }} />}
                                    fullWidth
                                    sx={{
                                        bgcolor: '#1a1a1a',
                                        color: '#fff',
                                        borderRadius: '10px',
                                        py: 1.25,
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        textTransform: 'none',
                                        boxShadow: 'none',
                                        fontFamily: 'var(--font-inter)',
                                        '&:hover': { bgcolor: '#333', boxShadow: 'none' },
                                    }}
                                >
                                    Scan Next Ticket
                                </Button>
                            </Stack>
                        )}

                        {/* Scan hint */}
                        {phase === 'scan' && (
                            <Typography sx={{ fontSize: '12px', color: '#9e9e9e', textAlign: 'center' }}>
                                Point camera at a QR code — auto-scans instantly
                            </Typography>
                        )}

                        {/* OR Divider */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Box sx={{ flex: 1, height: '1px', bgcolor: '#e8e8e8' }} />
                            <Typography sx={{
                                fontSize: '11px',
                                color: '#bdbdbd',
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                            }}>
                                or enter ID
                            </Typography>
                            <Box sx={{ flex: 1, height: '1px', bgcolor: '#e8e8e8' }} />
                        </Box>

                        {/* Manual Entry */}
                        <Box
                            component="form"
                            onSubmit={handleManualSubmit}
                            sx={{ display: 'flex', gap: 1 }}
                        >
                            <TextField
                                fullWidth
                                size="small"
                                placeholder="Registration ID"
                                value={manualId}
                                onChange={(e) => setManualId(e.target.value)}
                                disabled={phase === 'loading'}
                                autoComplete="off"
                                inputProps={{ style: { fontSize: '14px', fontFamily: 'var(--font-inter)' } }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Typography sx={{ fontSize: '14px', color: '#757575', fontWeight: 600 }}>
                                                ATH-
                                            </Typography>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '10px',
                                        bgcolor: '#fff',
                                        '& fieldset': { borderColor: '#e0e0e0' },
                                        '&:hover fieldset': { borderColor: '#b8892a' },
                                        '&.Mui-focused fieldset': { borderColor: '#b8892a', borderWidth: '1.5px' },
                                    },
                                }}
                            />
                            <Button
                                type="submit"
                                disabled={phase === 'loading'}
                                sx={{
                                    minWidth: 80,
                                    borderRadius: '10px',
                                    fontSize: '13px',
                                    fontWeight: 700,
                                    fontFamily: 'var(--font-inter)',
                                    bgcolor: '#b8892a',
                                    color: '#fff',
                                    textTransform: 'none',
                                    boxShadow: 'none',
                                    whiteSpace: 'nowrap',
                                    '&:hover': { bgcolor: '#9a7222', boxShadow: 'none' },
                                }}
                            >
                                Verify
                            </Button>
                        </Box>

                    </Stack>
                </Box>
            </Box>
        </ThemeProvider>
    );
}