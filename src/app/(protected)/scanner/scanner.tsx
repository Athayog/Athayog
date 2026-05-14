'use client';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect, useCallback } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import { ThemeProvider } from '@mui/material/styles';
import { Box, Stack, Typography, TextField, Button, InputAdornment, CircularProgress } from '@mui/material';
import axios from 'axios';
import type { IDetectedBarcode } from '@yudiel/react-qr-scanner';
import useAuthStore from '@/store/useAuthStore';
import { yogaTheme } from '@/app/yoga-day-26/_components/theme';


// ─── Design tokens (from yoga-arambha-2026.html) ──────────────────────────────
const T = {
    earth: '#3d2f1e',
    sage: '#4f6148',
    sageL: '#e8ede6',
    gold: '#b8892a',
    cream: '#faf7f2',
    border: '#e2ddd5',
    ink: '#1c1c1c',
    ink2: '#555',
    ink3: '#888',
    white: '#fff',
    errorBg: '#fff5f5',
    errorBdr: '#ffcdd2',
    errorText: '#c62828',
    successBg: '#f4f7f2',
    successBdr: '#c8d4c4',
}


// ─── Inline SVG icons ─────────────────────────────────────────────────────────
const ScanIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" />
        <rect x="7" y="7" width="10" height="10" rx="1" />
    </svg>
)

const ReplayIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
    </svg>
)

const CheckIcon = ({ color }: { color: string }) => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <polyline points="9 12 11 14 15 10" />
    </svg>
)

const ErrorIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={T.errorText} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
)

const VerifyIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
)


// ─── Types ────────────────────────────────────────────────────────────────────
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


// ─── Field ────────────────────────────────────────────────────────────────────
const Field = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <Box>
        <Typography sx={{
            fontSize: '0.62rem', fontWeight: 500, color: T.ink3,
            textTransform: 'uppercase', letterSpacing: '0.14em',
            fontFamily: 'var(--font-inter)', mb: '2px',
        }}>
            {label}
        </Typography>
        <Typography sx={{
            fontSize: '0.84rem', fontWeight: 500, color: T.ink,
            fontFamily: 'var(--font-inter)', wordBreak: 'break-word',
            lineHeight: 1.4,
        }}>
            {value || '—'}
        </Typography>
    </Box>
);


// ─── Attendee card ────────────────────────────────────────────────────────────
export const AttendeeCard = ({ userDetails }: { userDetails: UserDetails }) => {
    const isMultiScan = (userDetails.scanned ?? 0) > 1;
    const accent = isMultiScan ? T.errorText : T.sage;
    const accentBg = isMultiScan ? T.errorBg : T.successBg;
    const accentBdr = isMultiScan ? T.errorBdr : T.successBdr;
    const statusLabel = isMultiScan ? 'Already Scanned' : 'Entry Allowed';

    return (
        <Box sx={{
            width: '100%',
            bgcolor: T.white,
            border: `1px solid ${T.border}`,
            borderTop: `3px solid ${accent}`,
        }}>
            {/* Status header */}
            <Box sx={{
                px: 2, pt: 2, pb: 1.5,
                bgcolor: accentBg,
                borderBottom: `1px solid ${accentBdr}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                    <CheckIcon color={accent} />
                    <Typography sx={{
                        fontSize: '0.78rem', fontWeight: 600, color: accent,
                        fontFamily: 'var(--font-inter)', letterSpacing: '0.02em',
                    }}>
                        {statusLabel}
                    </Typography>
                </Box>
                {/* Scanned count badge */}
                <Box sx={{
                    px: 1, py: '2px',
                    bgcolor: T.white,
                    border: `1px solid ${accentBdr}`,
                    display: 'flex', alignItems: 'center', gap: 0.5,
                }}>
                    <Typography sx={{
                        fontSize: '0.68rem', fontWeight: 600, color: accent,
                        fontFamily: 'var(--font-inter)', letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                    }}>
                        Scanned {userDetails.scanned ?? 0}×
                    </Typography>
                </Box>
            </Box>

            {/* Name + ticket ID */}
            <Box sx={{ px: 2, pt: 2, pb: 1.5, borderBottom: `1px solid ${T.border}` }}>
                <Typography sx={{
                    fontFamily: 'var(--font-playfair)',
                    fontSize: 'clamp(1.1rem, 4vw, 1.35rem)',
                    fontWeight: 400,
                    color: T.earth,
                    lineHeight: 1.2,
                    mb: 0.25,
                }}>
                    {userDetails.name}
                </Typography>
                <Typography sx={{
                    fontSize: '0.72rem', color: T.gold, fontWeight: 500,
                    fontFamily: 'var(--font-inter)', letterSpacing: '0.08em',
                }}>
                    {userDetails.ticketID ?? '—'}
                </Typography>
            </Box>

            {/* Info grid */}
            <Box sx={{
                px: 2, py: 2,
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '14px 20px',
            }}>
                <Field label="Email" value={userDetails.email} />
                <Field label="Phone" value={userDetails.phone} />
                <Field label="Gender" value={userDetails.gender} />
                <Field label="T-Shirt" value={userDetails.tshirtSize?.toUpperCase()} />
                <Field label="Experience" value={userDetails.hasYogaExperience} />
                <Field label="Heard From" value={userDetails.heardFrom} />
                <Field label="Registered" value={userDetails.createdAt ? formatDate(userDetails.createdAt) : '—'} />
            </Box>
        </Box>
    );
};


// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ScannerPage() {
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
        setScanResult(''); setError(''); setUserDetails(null);
        setPhase('scan'); isVerifyingRef.current = false;
    }, []);

    const verifyTicket = useCallback(async (ticketId: string) => {
        if (isVerifyingRef.current) return;
        isVerifyingRef.current = true;
        setScanResult(''); setError(''); setUserDetails(null);
        setPhase('loading');
        try {
            const token = await user?.getIdToken();
            const { data } = await axios.post('/api/yoga-day/', { ticketId }, {
                headers: { Authorization: `Bearer ${token}` },
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
        if (!manualId.trim()) { setError('Enter a registration ID.'); return; }
        await verifyTicket('ATH-' + manualId.trim());
    }, [manualId, verifyTicket]);

    if (!user) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100dvh', bgcolor: T.cream }}>
                <CircularProgress size={22} sx={{ color: T.gold }} />
            </Box>
        );
    }

    return (
        <ThemeProvider theme={yogaTheme}>
            <Box sx={{
                minHeight: '100dvh',
                bgcolor: T.cream,
                display: 'flex',
                flexDirection: 'column',
                maxWidth: 480,
                mx: 'auto',
            }}>

                {/* ── Top bar ── */}
                <Box sx={{
                    px: 2, py: 1.5,
                    bgcolor: T.earth,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    position: 'sticky',
                    top: 0,
                    zIndex: 10,
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ color: T.gold }}><ScanIcon /></Box>
                        <Typography sx={{
                            fontFamily: 'var(--font-playfair)',
                            fontWeight: 400,
                            fontSize: '1rem',
                            color: T.white,
                            letterSpacing: '0.01em',
                        }}>
                            Ticket Scanner
                        </Typography>
                    </Box>
                    <Typography
                        onClick={handleLogout}
                        sx={{
                            fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)',
                            cursor: 'pointer', fontFamily: 'var(--font-inter)',
                            letterSpacing: '0.08em', textTransform: 'uppercase',
                            '&:hover': { color: 'rgba(255,255,255,0.7)' },
                            transition: 'color 0.2s ease',
                        }}
                    >
                        Logout
                    </Typography>
                </Box>

                {/* ── Body ── */}
                <Box sx={{ flex: 1, overflow: 'auto', px: 2, pt: 2.5, pb: 4 }}>
                    <Stack spacing={2}>

                        {/* Scanner */}
                        {phase === 'scan' && (
                            <Box sx={{
                                border: `1px solid ${T.border}`,
                                bgcolor: '#000',
                                aspectRatio: '1 / 1',
                                width: '100%',
                                overflow: 'hidden',
                                '& > div': { width: '100% !important', height: '100% !important' },
                            }}>
                                <Scanner
                                    onScan={handleScan}
                                    onError={() => setError('Camera error. Please allow camera access.')}
                                    constraints={{ facingMode: 'environment' }}
                                />
                            </Box>
                        )}

                        {/* Loading */}
                        {phase === 'loading' && (
                            <Box sx={{
                                border: `1px solid ${T.border}`,
                                bgcolor: T.white,
                                aspectRatio: '1 / 1',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 1.5,
                            }}>
                                <CircularProgress size={28} sx={{ color: T.gold }} />
                                <Typography sx={{
                                    fontSize: '0.8rem', color: T.ink2,
                                    fontFamily: 'var(--font-inter)',
                                    fontStyle: 'italic',
                                }}>
                                    Verifying ticket…
                                </Typography>
                            </Box>
                        )}

                        {/* Result */}
                        {phase === 'result' && (
                            <Stack spacing={0} sx={{ border: `1px solid ${T.border}`, bgcolor: T.white }}>
                                {error && (
                                    <Box sx={{
                                        px: 2, py: 1.5,
                                        bgcolor: T.errorBg,
                                        borderBottom: `1px solid ${T.errorBdr}`,
                                        display: 'flex', alignItems: 'center', gap: 1,
                                    }}>
                                        <Box sx={{ flexShrink: 0 }}><ErrorIcon /></Box>
                                        <Typography sx={{
                                            fontSize: '0.84rem', fontWeight: 500,
                                            color: T.errorText, fontFamily: 'var(--font-inter)',
                                        }}>
                                            {error}
                                        </Typography>
                                    </Box>
                                )}
                                {userDetails && <AttendeeCard userDetails={userDetails} />}
                                {/* Scan next — flat, full width, matches .btn-p */}
                                <Box
                                    onClick={reset}
                                    sx={{
                                        display: 'flex', alignItems: 'center',
                                        justifyContent: 'center', gap: 1,
                                        py: '0.75rem',
                                        bgcolor: T.sage,
                                        color: T.white,
                                        cursor: 'pointer',
                                        fontFamily: 'var(--font-inter)',
                                        fontSize: '0.8rem',
                                        fontWeight: 500,
                                        letterSpacing: '0.05em',
                                        transition: 'background 0.22s ease',
                                        '&:hover': { bgcolor: '#3d4e38' },
                                        borderTop: `1px solid ${T.border}`,
                                    }}
                                >
                                    <ReplayIcon />
                                    Scan Next Ticket
                                </Box>
                            </Stack>
                        )}

                        {/* Hint */}
                        {phase === 'scan' && (
                            <Typography sx={{
                                fontSize: '0.72rem', color: T.ink3,
                                textAlign: 'center', fontFamily: 'var(--font-inter)',
                                fontStyle: 'italic',
                            }}>
                                Point camera at a QR code — auto-scans instantly
                            </Typography>
                        )}

                        {/* OR divider */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Box sx={{ flex: 1, height: '1px', bgcolor: T.border }} />
                            <Typography sx={{
                                fontSize: '0.62rem', color: T.ink3, fontWeight: 500,
                                textTransform: 'uppercase', letterSpacing: '0.14em',
                                fontFamily: 'var(--font-inter)',
                            }}>
                                or enter ID
                            </Typography>
                            <Box sx={{ flex: 1, height: '1px', bgcolor: T.border }} />
                        </Box>

                        {/* Manual entry */}
                        <Box component="form" onSubmit={handleManualSubmit} sx={{ display: 'flex', gap: '1.5px', bgcolor: T.border }}>
                            <TextField
                                fullWidth size="small"
                                placeholder="Registration ID"
                                value={manualId}
                                onChange={(e) => setManualId(e.target.value)}
                                disabled={phase === 'loading'}
                                autoComplete="off"
                                inputProps={{ style: { fontSize: '0.84rem', fontFamily: 'var(--font-inter)' } }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Typography sx={{
                                                fontSize: '0.84rem', color: T.gold,
                                                fontWeight: 600, fontFamily: 'var(--font-inter)',
                                            }}>
                                                ATH-
                                            </Typography>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 0,
                                        bgcolor: T.white,
                                        '& fieldset': { borderColor: 'transparent' },
                                        '&:hover fieldset': { borderColor: 'transparent' },
                                        '&.Mui-focused fieldset': { borderColor: 'transparent' },
                                        '&.Mui-focused': { bgcolor: T.cream },
                                    },
                                }}
                            />
                            <Button
                                type="submit"
                                disabled={phase === 'loading'}
                                startIcon={<VerifyIcon />}
                                sx={{
                                    borderRadius: 0,
                                    px: '1.4rem',
                                    fontSize: '0.8rem',
                                    fontWeight: 500,
                                    letterSpacing: '0.05em',
                                    fontFamily: 'var(--font-inter)',
                                    bgcolor: T.gold,
                                    color: T.white,
                                    textTransform: 'none',
                                    boxShadow: 'none',
                                    whiteSpace: 'nowrap',
                                    '&:hover': { bgcolor: '#9a7222', boxShadow: 'none' },
                                    '&.Mui-disabled': { bgcolor: T.border, color: T.ink3 },
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