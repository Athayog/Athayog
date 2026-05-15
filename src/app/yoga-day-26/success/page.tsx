'use client'

import React, { useEffect, useState, useRef, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ThemeProvider } from '@mui/material/styles'
import { Box, Button, Container, Skeleton, Typography, CircularProgress } from '@mui/material'
import { yogaTheme } from '../_components/theme'


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


// ─── Confetti ─────────────────────────────────────────────────────────────────
function useConfetti(trigger: boolean) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    useEffect(() => {
        if (!trigger || !canvasRef.current) return
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')!
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        const COLORS = [T.gold, T.sage, '#d4a843', '#7a9e6e', '#e8d5a3', T.sageL]
        const particles = Array.from({ length: 72 }, () => ({
            x: Math.random() * canvas.width,
            y: -10 - Math.random() * 80,
            r: 3 + Math.random() * 3,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            vx: (Math.random() - 0.5) * 2.2,
            vy: 1.8 + Math.random() * 2.2,
            angle: Math.random() * Math.PI * 2,
            spin: (Math.random() - 0.5) * 0.1,
            rect: Math.random() > 0.5,
        }))
        let raf: number
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            let alive = false
            for (const p of particles) {
                p.x += p.vx; p.y += p.vy; p.vy += 0.035; p.angle += p.spin
                if (p.y < canvas.height + 20) alive = true
                ctx.save()
                ctx.globalAlpha = Math.max(0, 1 - p.y / canvas.height)
                ctx.translate(p.x, p.y); ctx.rotate(p.angle)
                ctx.fillStyle = p.color
                p.rect
                    ? ctx.fillRect(-p.r, -p.r / 2, p.r * 2, p.r)
                    : (ctx.beginPath(), ctx.arc(0, 0, p.r, 0, Math.PI * 2), ctx.fill())
                ctx.restore()
            }
            if (alive) raf = requestAnimationFrame(draw)
        }
        raf = requestAnimationFrame(draw)
        return () => cancelAnimationFrame(raf)
    }, [trigger])
    return canvasRef
}


// ─── Animated check ───────────────────────────────────────────────────────────
function AnimatedCheck() {
    return (
        <Box component="span" sx={{ display: 'inline-flex', lineHeight: 0 }}>
            <svg viewBox="0 0 36 36" width={36} height={36} fill="none">
                <circle cx="18" cy="18" r="15"
                    stroke={T.sage} strokeWidth="1.5"
                    strokeDasharray="94" strokeDashoffset="94"
                    strokeLinecap="round"
                    style={{ animation: 'drawCircle 0.45s ease forwards' }}
                />
                <polyline points="10,19 16,25 27,12"
                    stroke={T.gold} strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round"
                    strokeDasharray="26" strokeDashoffset="26"
                    style={{ animation: 'drawCheck 0.28s ease forwards 0.42s' }}
                />
            </svg>
            <style>{`
                @keyframes drawCircle { to { stroke-dashoffset: 0; } }
                @keyframes drawCheck  { to { stroke-dashoffset: 0; } }
            `}</style>
        </Box>
    )
}


// ─── SVG icons ────────────────────────────────────────────────────────────────
const IconDownload = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v13M7 11l5 5 5-5" /><line x1="5" y1="21" x2="19" y2="21" />
    </svg>
)
const IconUserPlus = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <line x1="19" y1="8" x2="19" y2="14" /><line x1="16" y1="11" x2="22" y2="11" />
    </svg>
)
const IconCalendar = ({ c }: { c: string }) => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
)
const IconClock = ({ c }: { c: string }) => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15.5 12" />
    </svg>
)
const IconPin = ({ c }: { c: string }) => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="2.5" />
    </svg>
)


// ─── Inline ticket card (replaces TicketDisplay) ──────────────────────────────
// Layout: horizontal split — left: text info, right: QR code
// Perforated tear line separates header from body
function InlineTicket({ data }: { data: any }) {
    return (
        <Box sx={{
            width: '100%',
            border: `1px solid ${T.border}`,
            bgcolor: T.white,
            overflow: 'hidden',
        }}>
            {/* Top band — event identity */}
            <Box sx={{
                bgcolor: T.earth,
                px: 2.5,
                py: 1.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <Box>
                    <Typography sx={{
                        fontFamily: 'var(--font-playfair)',
                        fontSize: '0.95rem',
                        fontWeight: 400,
                        color: T.white,
                        lineHeight: 1.2,
                    }}>
                        Yoga Arambha 2026
                    </Typography>
                    <Typography sx={{
                        fontSize: '0.62rem',
                        color: 'rgba(255,255,255,0.4)',
                        fontFamily: 'var(--font-inter)',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        mt: '2px',
                    }}>
                        International Day of Yoga
                    </Typography>
                </Box>
                {/* Lotus mark */}
                <Box sx={{ lineHeight: 0, opacity: 0.55 }}>
                    <svg viewBox="0 0 32 32" width={28} height={28} fill="none">
                        {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((deg, i) => (
                            <ellipse key={i} cx="16" cy="8" rx="2.8" ry="7"
                                fill={i % 2 === 0 ? T.gold : T.sageL}
                                fillOpacity={0.8}
                                transform={`rotate(${deg} 16 16)`}
                                style={{ transformOrigin: '16px 16px' }}
                            />
                        ))}
                        <circle cx="16" cy="16" r="4" fill={T.gold} fillOpacity={0.9} />
                    </svg>
                </Box>
            </Box>

            {/* Perforated line */}
            <Box sx={{
                height: '1px',
                backgroundImage: `repeating-linear-gradient(90deg, ${T.border} 0px, ${T.border} 6px, transparent 6px, transparent 12px)`,
            }} />

            {/* Main ticket body — side by side */}
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: 0,
            }}>
                {/* Left: attendee info */}
                <Box sx={{
                    px: 2.5,
                    py: 2,
                    borderRight: `1px dashed ${T.border}`,
                }}>
                    {/* Name */}
                    <Typography sx={{
                        fontFamily: 'var(--font-playfair)',
                        fontSize: 'clamp(1rem, 3.5vw, 1.25rem)',
                        fontWeight: 400,
                        color: T.earth,
                        lineHeight: 1.2,
                        mb: 0.4,
                    }}>
                        {data.name}
                    </Typography>

                    {/* Ticket ID */}
                    <Typography sx={{
                        fontSize: '0.68rem',
                        fontFamily: 'var(--font-inter)',
                        color: T.gold,
                        letterSpacing: '0.12em',
                        fontWeight: 500,
                        mb: 1.5,
                    }}>
                        {data.ticketID}
                    </Typography>

                    {/* Compact event meta */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        {[
                            { icon: <IconCalendar c={T.ink3} />, text: 'Sun, 21 June 2026' },
                            { icon: <IconClock c={T.ink3} />, text: '6:00 AM – 8:00 AM' },
                            { icon: <IconPin c={T.ink3} />, text: 'Indiranagar Club, Blr' },
                        ].map(({ icon, text }) => (
                            <Box key={text} sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Box sx={{ lineHeight: 0, flexShrink: 0 }}>{icon}</Box>
                                <Typography sx={{
                                    fontSize: '0.72rem',
                                    color: T.ink2,
                                    fontFamily: 'var(--font-inter)',
                                    lineHeight: 1.3,
                                }}>
                                    {text}
                                </Typography>
                            </Box>
                        ))}
                    </Box>

                    {/* Contact info — tight, below meta */}
                    <Box sx={{
                        mt: 1.5,
                        pt: 1.5,
                        borderTop: `1px solid ${T.border}`,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '3px',
                    }}>
                        {data.email && (
                            <Typography sx={{
                                fontSize: '0.68rem', color: T.ink3,
                                fontFamily: 'var(--font-inter)', lineHeight: 1.3,
                                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                            }}>
                                {data.email}
                            </Typography>
                        )}
                        {data.phone && (
                            <Typography sx={{
                                fontSize: '0.68rem', color: T.ink3,
                                fontFamily: 'var(--font-inter)', lineHeight: 1.3,
                            }}>
                                {data.phone}
                            </Typography>
                        )}
                    </Box>
                </Box>

                {/* Right: QR code */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    px: 2,
                    py: 2,
                    bgcolor: T.cream,
                    minWidth: 100,
                }}>
                    {data.qrDataUrl ? (
                        <>
                            <Box sx={{
                                p: '6px',
                                bgcolor: T.white,
                                border: `1px solid ${T.border}`,
                            }}>
                                <img
                                    src={data.qrDataUrl}
                                    alt="Ticket QR"
                                    width={72}
                                    height={72}
                                    style={{ display: 'block' }}
                                />
                            </Box>
                            <Typography sx={{
                                fontSize: '0.58rem',
                                color: T.ink3,
                                fontFamily: 'var(--font-inter)',
                                mt: '6px',
                                textAlign: 'center',
                                letterSpacing: '0.06em',
                                textTransform: 'uppercase',
                            }}>
                                Scan at entry
                            </Typography>
                        </>
                    ) : (
                        <Box sx={{
                            width: 72, height: 72,
                            bgcolor: T.border,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <Typography sx={{ fontSize: '0.6rem', color: T.ink3 }}>QR</Typography>
                        </Box>
                    )}
                </Box>
            </Box>

            {/* Bottom strip — admission type */}
            <Box sx={{
                borderTop: `1px dashed ${T.border}`,
                bgcolor: T.goldL,
                px: 2.5,
                py: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <Typography sx={{
                    fontSize: '0.65rem',
                    fontFamily: 'var(--font-inter)',
                    color: T.gold,
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                }}>
                    General Admission · Free
                </Typography>
                <Typography sx={{
                    fontSize: '0.65rem',
                    fontFamily: 'var(--font-inter)',
                    color: T.ink3,
                    letterSpacing: '0.06em',
                }}>
                    1 person
                </Typography>
            </Box>
        </Box>
    )
}


// ─── Eyebrow label ────────────────────────────────────────────────────────────
const Eyebrow = ({ children, color = T.gold }: { children: React.ReactNode; color?: string }) => (
    <Typography sx={{
        fontSize: '0.6rem', letterSpacing: '0.22em',
        textTransform: 'uppercase', color,
        fontWeight: 500, fontFamily: 'var(--font-inter)',
    }}>
        {children}
    </Typography>
)


// ─── Page content ─────────────────────────────────────────────────────────────
function SuccessPageContent() {
    const searchParams = useSearchParams()
    const ticketID = searchParams.get('ticketID')

    const [ticketData, setTicketData] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [showConfetti, setShowConfetti] = useState(false)
    const canvasRef = useConfetti(showConfetti)

    useEffect(() => {
        if (!ticketID) { setLoading(false); return }
        ; (async () => {
            try {
                const res = await fetch('/api/verify-yoga-day', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ticketID }),
                })
                const data = await res.json()
                if (!res.ok) { setError(data.message || 'Could not fetch ticket.'); return }
                setTicketData(data.data)
                setTimeout(() => setShowConfetti(true), 200)
            } catch {
                setError('Failed to fetch ticket info.')
            } finally {
                setLoading(false)
            }
        })()
    }, [ticketID])

    const isSuccess = !loading && !error && !!ticketData

    return (
        <ThemeProvider theme={yogaTheme}>

            <canvas ref={canvasRef} style={{
                position: 'fixed', inset: 0, zIndex: 9999,
                pointerEvents: 'none',
                display: showConfetti ? 'block' : 'none',
            }} />

            <Box sx={{ minHeight: '100dvh', bgcolor: T.cream, pt: { xs: 6, md: 10 }, pb: { xs: 5, md: 8 } }}>
                <Container maxWidth="sm" disableGutters sx={{ px: { xs: 2, sm: 3, md: 0 } }}>

                    {/* ── STATUS BAR — always first, always compact ── */}
                    <Box sx={{
                        display: 'flex', alignItems: 'center',
                        gap: 1.5, mb: 2.5,
                        px: 2, py: 1.5,
                        bgcolor: loading ? 'transparent'
                            : error ? '#fff8f8'
                                : T.sageL,
                        border: `1px solid ${loading ? T.border
                            : error ? '#ffcdd2'
                                : T.sage + '44'
                            }`,
                        minHeight: 48,
                    }}>
                        {loading && (
                            <>
                                <Box sx={{
                                    width: 24, height: 24, flexShrink: 0,
                                    '@keyframes breathe': {
                                        '0%,100%': { transform: 'scale(1)' },
                                        '50%': { transform: 'scale(1.15)' },
                                    },
                                    animation: 'breathe 2.5s ease-in-out infinite',
                                }}>
                                    <svg viewBox="0 0 24 24" width={24} height={24} fill="none">
                                        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                                            <ellipse key={i} cx="12" cy="5" rx="2" ry="5.5"
                                                fill={i % 2 === 0 ? T.gold : T.sage}
                                                fillOpacity={0.65}
                                                transform={`rotate(${deg} 12 12)`}
                                                style={{ transformOrigin: '12px 12px' }}
                                            />
                                        ))}
                                        <circle cx="12" cy="12" r="3" fill={T.earth} />
                                        <circle cx="12" cy="12" r="1.5" fill={T.gold} />
                                    </svg>
                                </Box>
                                <Typography sx={{
                                    fontSize: '0.8rem', color: T.ink2,
                                    fontFamily: 'var(--font-inter)', fontWeight: 500,
                                }}>
                                    Locating your ticket…
                                </Typography>
                            </>
                        )}
                        {!loading && error && (
                            <>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                                    stroke="#e57373" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                                    style={{ flexShrink: 0 }}>
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                                <Typography sx={{
                                    fontSize: '0.8rem', color: '#c62828',
                                    fontFamily: 'var(--font-inter)', fontWeight: 500,
                                }}>
                                    {error}
                                </Typography>
                            </>
                        )}
                        {isSuccess && (
                            <>
                                <AnimatedCheck />
                                <Box>
                                    <Typography sx={{
                                        fontSize: '0.8rem', color: T.sage,
                                        fontFamily: 'var(--font-inter)', fontWeight: 600,
                                        lineHeight: 1.3,
                                    }}>
                                        Registration confirmed
                                    </Typography>
                                    <Typography sx={{
                                        fontSize: '0.7rem', color: T.ink3,
                                        fontFamily: 'var(--font-inter)', lineHeight: 1.3,
                                    }}>
                                        Ticket sent to {ticketData?.email}
                                    </Typography>
                                </Box>
                            </>
                        )}
                    </Box>

                    {/* ── MAIN CARD ── */}
                    <Box sx={{
                        border: `1px solid ${T.border}`,
                        bgcolor: T.white,
                        overflow: 'hidden',
                    }}>

                        {/* Loading skeleton */}
                        {loading && (
                            <Box sx={{ p: 0 }}>
                                <Skeleton variant="rectangular" width="100%" height={56} sx={{ mb: '1px' }} />
                                <Skeleton variant="rectangular" width="100%" height={160} sx={{ mb: '1px' }} />
                                <Skeleton variant="rectangular" width="100%" height={48} sx={{ mb: '1px' }} />
                                <Skeleton variant="rectangular" width="100%" height={48} />
                            </Box>
                        )}

                        {/* Error state */}
                        {!loading && error && (
                            <Box sx={{ px: 3, py: 4, textAlign: 'center' }}>
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
                                    stroke={T.border} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                                    style={{ margin: '0 auto 16px', display: 'block' }}>
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                    <line x1="12" y1="17" x2="12.01" y2="17" />
                                </svg>
                                <Typography sx={{
                                    fontFamily: 'var(--font-playfair)',
                                    fontSize: '1.2rem', color: T.earth, mb: 0.75,
                                }}>
                                    Ticket not found
                                </Typography>
                                <Typography sx={{
                                    fontSize: '0.82rem', color: T.ink3,
                                    fontFamily: 'var(--font-inter)', lineHeight: 1.6, mb: 3,
                                }}>
                                    We couldn&apos;t find a registration with those details.<br />
                                    Try searching with your email or phone number.
                                </Typography>
                                <Button
                                    component={Link}
                                    href="/yoga-day-26"
                                    sx={{
                                        bgcolor: T.earth, color: T.white,
                                        borderRadius: 0, px: 3, py: 1,
                                        fontSize: '0.8rem', fontWeight: 500,
                                        textTransform: 'none', boxShadow: 'none',
                                        fontFamily: 'var(--font-inter)',
                                        '&:hover': { bgcolor: T.sage },
                                    }}
                                >
                                    Go back to registration
                                </Button>
                            </Box>
                        )}

                        {/* ── SUCCESS LAYOUT ── */}
                        {isSuccess && (
                            <>
                                {/* 1. Ticket — primary focus */}
                                <Box sx={{ p: { xs: 2, md: 2.5 } }}>
                                    <InlineTicket data={ticketData} />
                                </Box>

                                {/* 2. Primary action — download */}
                                {ticketData?.fileUrl && (
                                    <Box sx={{ px: { xs: 2, md: 2.5 }, pb: 1.5 }}>
                                        <Button
                                            component="a"
                                            href={ticketData.fileUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            fullWidth
                                            startIcon={<IconDownload />}
                                            sx={{
                                                bgcolor: T.gold, color: T.white,
                                                borderRadius: 0, py: '0.85rem',
                                                fontSize: '0.84rem', fontWeight: 500,
                                                letterSpacing: '0.04em',
                                                textTransform: 'none', boxShadow: 'none',
                                                fontFamily: 'var(--font-inter)',
                                                '&:hover': { bgcolor: '#9a7222', boxShadow: 'none' },
                                            }}
                                        >
                                            Download PDF Ticket
                                        </Button>
                                    </Box>
                                )}

                                {/* 3. What to bring — compact horizontal chips */}
                                <Box sx={{
                                    mx: { xs: 2, md: 2.5 },
                                    mb: 2,
                                    px: 2, py: 1.5,
                                    bgcolor: T.cream,
                                    border: `1px solid ${T.border}`,
                                }}>
                                    <Eyebrow color={T.ink3}>What to bring</Eyebrow>
                                    <Box sx={{
                                        display: 'flex', flexWrap: 'wrap',
                                        gap: '6px', mt: 1,
                                    }}>
                                        {['Yoga mat', 'Water bottle', 'Comfortable clothing', 'This ticket'].map((item) => (
                                            <Box key={item} sx={{
                                                px: 1.5, py: '3px',
                                                bgcolor: T.white,
                                                border: `1px solid ${T.border}`,
                                                display: 'flex', alignItems: 'center', gap: '5px',
                                            }}>
                                                <Box sx={{
                                                    width: 3, height: 3,
                                                    borderRadius: '50%',
                                                    bgcolor: T.gold, flexShrink: 0,
                                                }} />
                                                <Typography sx={{
                                                    fontSize: '0.7rem', color: T.ink2,
                                                    fontFamily: 'var(--font-inter)',
                                                }}>
                                                    {item}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                </Box>

                                {/* 4. Secondary action */}
                                <Box sx={{
                                    borderTop: `1px solid ${T.border}`,
                                    px: { xs: 2, md: 2.5 }, py: 1.5,
                                    display: 'flex', alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Button
                                        component={Link}
                                        href="/yoga-day-26"
                                        startIcon={<IconUserPlus />}
                                        sx={{
                                            bgcolor: 'transparent',
                                            color: T.sage,
                                            borderRadius: 0, py: '0.6rem', px: 2,
                                            fontSize: '0.78rem', fontWeight: 500,
                                            textTransform: 'none', boxShadow: 'none',
                                            fontFamily: 'var(--font-inter)',
                                            border: `1px solid ${T.sage + '44'}`,
                                            '&:hover': { bgcolor: T.sageL, boxShadow: 'none' },
                                        }}
                                    >
                                        Register Another Person
                                    </Button>
                                </Box>
                            </>
                        )}

                        {/* Footer strip */}
                        {!loading && (
                            <Box sx={{
                                borderTop: `1px solid ${T.border}`,
                                bgcolor: T.cream, px: { xs: 2.5, md: 3 }, py: 1.5,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                <Typography sx={{
                                    fontSize: '0.72rem', color: T.ink3,
                                    fontFamily: 'var(--font-inter)', textAlign: 'center',
                                }}>
                                    Didn&apos;t receive your email? Check spam, or{' '}
                                    <Link href="mailto:info@athayogliving.com"
                                        style={{ color: T.gold, textDecoration: 'none', fontWeight: 600 }}>
                                        contact us
                                    </Link>.
                                </Typography>
                            </Box>
                        )}
                    </Box>

                    {/* Branding */}
                    <Box sx={{
                        textAlign: 'center', mt: 3,
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px',
                    }}>
                        <Typography sx={{
                            fontSize: '0.62rem', letterSpacing: '0.18em',
                            textTransform: 'uppercase', color: T.ink3,
                            fontFamily: 'var(--font-inter)', fontWeight: 500,
                        }}>
                            Presented by
                        </Typography>
                        <Typography sx={{
                            fontFamily: 'var(--font-playfair)',
                            fontSize: '0.95rem', color: T.earth, fontWeight: 400,
                        }}>
                            Atha Yog Living
                        </Typography>
                    </Box>

                </Container>
            </Box>
        </ThemeProvider>
    )
}


// ─── Root export ──────────────────────────────────────────────────────────────
export default function YogaDay26SuccessPage() {
    return (
        <Suspense fallback={
            <Box sx={{
                display: 'flex', minHeight: '100dvh',
                bgcolor: T.cream, alignItems: 'center', justifyContent: 'center',
            }}>
                <CircularProgress sx={{ color: T.gold }} thickness={3} size={28} />
            </Box>
        }>
            <SuccessPageContent />
        </Suspense>
    )
}