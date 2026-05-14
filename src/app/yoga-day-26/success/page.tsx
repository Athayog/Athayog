'use client'

import React, { useEffect, useState, useRef, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ThemeProvider } from '@mui/material/styles'
import { Box, Button, Container, Skeleton, Typography, CircularProgress } from '@mui/material'
import { yogaTheme } from '../_components/theme'
import TicketDisplay from '@/components/forms/TicketDisplayPDF'


// ─── Design tokens ────────────────────────────────────────────────────────────
const T = {
    earth: '#3d2f1e',
    sage: '#4f6148',
    sageL: '#e8ede6',
    gold: '#b8892a',
    goldL: '#f5edd8',
    cream: '#faf7f2',
    border: '#e2ddd5',
    ink: '#1c1c1c',
    ink2: '#555',
    ink3: '#888',
    white: '#fff',
}


// ─── Inline SVG icons ─────────────────────────────────────────────────────────
const CalendarIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={T.gold} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
)

const ClockIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={T.gold} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <polyline points="12 7 12 12 15.5 12" />
    </svg>
)

const PinIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={T.gold} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
        <circle cx="12" cy="9" r="2.5" />
    </svg>
)

const DownloadIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v13M7 11l5 5 5-5" />
        <line x1="5" y1="21" x2="19" y2="21" />
    </svg>
)

const PersonAddIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <line x1="19" y1="8" x2="19" y2="14" />
        <line x1="16" y1="11" x2="22" y2="11" />
    </svg>
)


// ─── One-shot confetti ────────────────────────────────────────────────────────
function useConfetti(trigger: boolean) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    useEffect(() => {
        if (!trigger || !canvasRef.current) return
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')!
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const COLORS = [T.gold, T.sage, '#d4a843', '#7a9e6e', '#e8d5a3', T.sageL]
        const particles = Array.from({ length: 80 }, () => ({
            x: Math.random() * canvas.width,
            y: -10 - Math.random() * 80,
            r: 4 + Math.random() * 4,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            vx: (Math.random() - 0.5) * 2.5,
            vy: 2 + Math.random() * 2.5,
            angle: Math.random() * Math.PI * 2,
            spin: (Math.random() - 0.5) * 0.12,
            rect: Math.random() > 0.5,
        }))

        let raf: number
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            let alive = false
            for (const p of particles) {
                p.x += p.vx; p.y += p.vy; p.vy += 0.04; p.angle += p.spin
                if (p.y < canvas.height + 20) alive = true
                ctx.save()
                ctx.globalAlpha = Math.max(0, 1 - p.y / canvas.height)
                ctx.translate(p.x, p.y)
                ctx.rotate(p.angle)
                ctx.fillStyle = p.color
                if (p.rect) { ctx.fillRect(-p.r, -p.r / 2, p.r * 2, p.r) }
                else { ctx.beginPath(); ctx.arc(0, 0, p.r, 0, Math.PI * 2); ctx.fill() }
                ctx.restore()
            }
            if (alive) raf = requestAnimationFrame(draw)
        }
        raf = requestAnimationFrame(draw)
        return () => cancelAnimationFrame(raf)
    }, [trigger])
    return canvasRef
}


// ─── Animated SVG check ───────────────────────────────────────────────────────
function AnimatedCheck() {
    return (
        <Box sx={{ width: 64, height: 64, mx: 'auto', mb: 2.5 }}>
            <svg viewBox="0 0 64 64" width={64} height={64}>
                <circle
                    cx="32" cy="32" r="28"
                    fill="none" stroke={T.sage} strokeWidth="2"
                    strokeDasharray="176" strokeDashoffset="176"
                    strokeLinecap="round"
                    style={{ animation: 'drawCircle 0.5s ease forwards' }}
                />
                <polyline
                    points="18,33 27,43 46,23"
                    fill="none" stroke={T.sage} strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round"
                    strokeDasharray="40" strokeDashoffset="40"
                    style={{ animation: 'drawCheck 0.3s ease forwards 0.48s' }}
                />
            </svg>
            <style>{`
                @keyframes drawCircle { to { stroke-dashoffset: 0; } }
                @keyframes drawCheck  { to { stroke-dashoffset: 0; } }
            `}</style>
        </Box>
    )
}


// ─── Meta info item ───────────────────────────────────────────────────────────
const MetaItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box sx={{ flexShrink: 0, opacity: 0.9, mt: '1px' }}>{icon}</Box>
        <Box>
            <Typography sx={{
                fontSize: '0.62rem', letterSpacing: '0.14em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)',
                lineHeight: 1.2, fontFamily: 'var(--font-inter)',
            }}>
                {label}
            </Typography>
            <Typography sx={{
                fontSize: '0.82rem', color: 'rgba(255,255,255,0.75)',
                fontFamily: 'var(--font-inter)', lineHeight: 1.3,
            }}>
                {value}
            </Typography>
        </Box>
    </Box>
)


// ─── Flat button base (matches site's .btn exactly) ───────────────────────────
const btnBase = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontFamily: 'var(--font-inter)',
    fontSize: '0.8rem',
    fontWeight: 500,
    letterSpacing: '0.05em',
    textDecoration: 'none',
    padding: '0.75rem 1.8rem',
    cursor: 'pointer',
    border: 'none',
    borderRadius: 0,
    boxShadow: 'none',
    textTransform: 'none',
    transition: 'all 0.22s ease',
    width: '100%',
    justifyContent: 'center',
} as const


// ─── Page ─────────────────────────────────────────────────────────────────────
function SuccessPageContent() {
    const searchParams = useSearchParams()
    const ticketID = searchParams.get('ticketID')

    const [ticketData, setTicketData] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [showConfetti, setShowConfetti] = useState(false)
    const canvasRef = useConfetti(showConfetti)

    useEffect(() => {
        const fetchTicket = async () => {
            if (!ticketID) { setLoading(false); return }
            try {
                const res = await fetch('/api/verify-yoga-day', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ticketID }),
                })
                const data = await res.json()
                if (!res.ok) { setError(data.message || 'Error fetching data'); return }
                setTicketData(data.data)
                setTimeout(() => setShowConfetti(true), 150)
            } catch {
                setError('Failed to fetch ticket info.')
            } finally {
                setLoading(false)
            }
        }
        fetchTicket()
    }, [ticketID])

    return (
        <ThemeProvider theme={yogaTheme}>

            {/* Confetti canvas */}
            <canvas
                ref={canvasRef}
                style={{
                    position: 'fixed', inset: 0, zIndex: 9999,
                    pointerEvents: 'none',
                    display: showConfetti ? 'block' : 'none',
                }}
            />

            <Box sx={{ minHeight: '100vh', bgcolor: T.cream, pt: { xs: 10, md: 14 }, pb: 8 }}>
                <Container maxWidth="sm">

                    <Box sx={{ border: `1px solid ${T.border}`, bgcolor: T.white }}>

                        {/* ── Dark header ── */}
                        <Box sx={{
                            bgcolor: T.earth,
                            px: { xs: 3, md: 4 },
                            pt: { xs: 3.5, md: 4.5 },
                            pb: { xs: 3, md: 4 },
                            textAlign: 'center',
                        }}>
                            {loading ? (
                                <>
                                    <Box sx={{ mb: 2, mt: 1 }}>
                                        <CircularProgress size={32} sx={{ color: T.gold }} thickness={4} />
                                    </Box>
                                    <Typography sx={{
                                        display: 'block',
                                        fontSize: '0.68rem',
                                        letterSpacing: '0.2em',
                                        textTransform: 'uppercase',
                                        color: T.gold,
                                        fontWeight: 500,
                                        mb: 1,
                                        fontFamily: 'var(--font-inter)',
                                    }}>
                                        Fetching
                                    </Typography>
                                    <Typography sx={{
                                        fontFamily: 'var(--font-playfair)',
                                        fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
                                        fontWeight: 400,
                                        color: T.white,
                                        lineHeight: 1.2,
                                        mb: 3,
                                    }}>
                                        Locating{' '}
                                        <span style={{ color: T.gold, fontStyle: 'italic' }}>Ticket...</span>
                                    </Typography>
                                </>
                            ) : error ? (
                                <>
                                    <Box sx={{ mb: 2 }}>
                                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={T.gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10" />
                                            <line x1="12" y1="8" x2="12" y2="12" />
                                            <line x1="12" y1="16" x2="12.01" y2="16" />
                                        </svg>
                                    </Box>
                                    <Typography sx={{
                                        display: 'block',
                                        fontSize: '0.68rem',
                                        letterSpacing: '0.2em',
                                        textTransform: 'uppercase',
                                        color: T.gold,
                                        fontWeight: 500,
                                        mb: 1,
                                        fontFamily: 'var(--font-inter)',
                                    }}>
                                        Error
                                    </Typography>
                                    <Typography sx={{
                                        fontFamily: 'var(--font-playfair)',
                                        fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
                                        fontWeight: 400,
                                        color: T.white,
                                        lineHeight: 1.2,
                                        mb: 1,
                                    }}>
                                        Ticket{' '}
                                        <span style={{ color: T.gold, fontStyle: 'italic' }}>Not Found</span>
                                    </Typography>
                                    <Typography sx={{
                                        fontFamily: 'var(--font-inter)',
                                        fontSize: '0.85rem',
                                        color: 'rgba(255,255,255,0.5)',
                                        fontStyle: 'italic',
                                        mb: 3,
                                    }}>
                                        We couldn&apos;t find a registration with those details.
                                    </Typography>
                                </>
                            ) : (
                                <>
                                    <AnimatedCheck />

                                    <Typography sx={{
                                        display: 'block',
                                        fontSize: '0.68rem',
                                        letterSpacing: '0.2em',
                                        textTransform: 'uppercase',
                                        color: T.gold,
                                        fontWeight: 500,
                                        mb: 1,
                                        fontFamily: 'var(--font-inter)',
                                    }}>
                                        Registration Confirmed
                                    </Typography>

                                    <Typography sx={{
                                        fontFamily: 'var(--font-playfair)',
                                        fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
                                        fontWeight: 400,
                                        color: T.white,
                                        lineHeight: 1.2,
                                        mb: 1,
                                    }}>
                                        You&apos;re{' '}
                                        <span style={{ color: T.gold, fontStyle: 'italic' }}>all set</span>
                                    </Typography>

                                    <Typography sx={{
                                        fontFamily: 'var(--font-inter)',
                                        fontSize: '0.85rem',
                                        color: 'rgba(255,255,255,0.5)',
                                        fontStyle: 'italic',
                                        mb: 3,
                                    }}>
                                        Your ticket has been sent to your email inbox.
                                    </Typography>
                                </>
                            )}

                            {/* Event meta strip */}
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                gap: { xs: 2.5, sm: 4 },
                                flexWrap: 'wrap',
                                pt: 2.5,
                                borderTop: '1px solid rgba(255,255,255,0.08)',
                            }}>
                                <MetaItem icon={<CalendarIcon />} label="Date" value="Sunday, June 21, 2026" />
                                <MetaItem icon={<ClockIcon />} label="Time" value="6:00 AM onwards" />
                                <MetaItem icon={<PinIcon />} label="Venue" value="Indiranagar Club, Blr" />
                            </Box>
                        </Box>

                        {/* ── Ticket + actions ── */}
                        <Box sx={{ px: { xs: 3, md: 4 }, pt: 3.5, pb: 3 }}>

                            {loading && (
                                <Skeleton
                                    variant="rectangular"
                                    width="100%"
                                    height={200}
                                    sx={{ borderRadius: 0, mb: 3 }}
                                />
                            )}

                            {error && (
                                <Box sx={{
                                    mb: 3, px: 2, py: 1.5,
                                    bgcolor: '#fff5f5',
                                    border: '1px solid #ffcdd2',
                                }}>
                                    <Typography sx={{
                                        fontFamily: 'var(--font-inter)',
                                        fontSize: '0.84rem',
                                        color: '#c62828',
                                    }}>
                                        {error}
                                    </Typography>
                                </Box>
                            )}

                            {ticketData && (
                                <Box sx={{ mb: 3 }}>
                                    <TicketDisplay
                                        name={ticketData.name}
                                        ticketId={ticketData.ticketID}
                                        qrDataUrl={ticketData.qrDataUrl || ''}
                                        downloadUrl={ticketData.fileUrl || ''}
                                        title="Yoga Arambha 2026"
                                        date="June 21, 2026, 6:00 AM"
                                        venue="Indiranagar Club, Bangalore"
                                        hideDownload={true}
                                    />
                                </Box>
                            )}

                            {/* Buttons — 1.5px gap trick from the site */}
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1.5px', bgcolor: T.border }}>
                                {ticketData?.fileUrl && (
                                    <Button
                                        component="a"
                                        href={ticketData.fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        startIcon={<DownloadIcon />}
                                        sx={{
                                            ...btnBase,
                                            bgcolor: T.gold,
                                            color: T.white,
                                            '&:hover': { bgcolor: '#9a7222' },
                                        }}
                                    >
                                        Download Ticket
                                    </Button>
                                )}
                                <Button
                                    component={Link}
                                    href="/yoga-day-26"
                                    startIcon={<PersonAddIcon />}
                                    sx={{
                                        ...btnBase,
                                        bgcolor: T.sageL,
                                        color: T.sage,
                                        '&:hover': { bgcolor: '#d4ddd1' },
                                    }}
                                >
                                    Register Another Person
                                </Button>
                            </Box>
                        </Box>
                    </Box>

                    {/* Footer note */}
                    <Typography sx={{
                        textAlign: 'center',
                        fontFamily: 'var(--font-inter)',
                        fontSize: '0.78rem',
                        color: T.ink3,
                        mt: 2.5,
                        lineHeight: 1.7,
                    }}>
                        Didn&apos;t receive your email? Check spam, or{' '}
                        <Link href="/yoga-day-26" style={{ color: T.gold, textDecoration: 'none', fontWeight: 600 }}>
                            contact us
                        </Link>.
                    </Typography>

                </Container>
            </Box>
        </ThemeProvider>
    )
}

export default function YogaDay26SuccessPage() {
    return (
        <Suspense fallback={
            <Box sx={{ 
                display: 'flex', 
                minHeight: '100vh', 
                bgcolor: T.cream, 
                alignItems: 'center', 
                justifyContent: 'center' 
            }}>
                <CircularProgress sx={{ color: T.gold }} />
            </Box>
        }>
            <SuccessPageContent />
        </Suspense>
    )
}