'use client'

import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { v4 as uuidv4 } from 'uuid'
import QRCode from 'qrcode'
import { useRouter } from 'next/navigation'
import { generatePDFBlob } from '@/components/forms/generatePdf'
import { storage } from '@/lib/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import {
    Box, Button, Container, FormControl, FormControlLabel,
    FormHelperText, FormLabel, InputAdornment, InputLabel,
    Link, MenuItem, Radio, RadioGroup, Select, Stack,
    TextField, Typography, Snackbar, Alert,
} from '@mui/material'
import { EyebrowLabel } from './ui'
import { DIGNITARIES } from './data'


// ─── Design tokens ────────────────────────────────────────────────────────────
const T = {
    earth: '#3d2f1e',
    sage: '#4f6148',
    sageL: '#e8ede6',
    gold: '#b8892a',
    goldL: '#f5edd8',
    cream: '#faf7f2',
    border: '#e2ddd5',
    ink2: '#555',
    ink3: '#888',
    white: '#fff',
}


// ─── Yoga Loading Overlay ─────────────────────────────────────────────────────
// Animated lotus / breath ring — no emoji, no spinner, pure SVG
const STEPS = [
    { label: 'Generating your ticket', pct: 20 },
    { label: 'Uploading secure pass', pct: 40 },
    { label: 'Saving and sending details', pct: 70 },
    { label: 'All done', pct: 100 },
]

function YogaLoader({ step, pct }: { step: string; pct: number }) {
    return (
        <Box sx={{
            position: 'absolute', inset: 0, zIndex: 10,
            bgcolor: 'rgba(250,247,242,0.97)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: 0,
            '@keyframes petalPulse0': {
                '0%, 100%': { fillOpacity: 0.55 },
                '50%': { fillOpacity: 0.85 },
            },
            '@keyframes petalPulse1': {
                '0%, 100%': { fillOpacity: 0.4 },
                '50%': { fillOpacity: 0.7 },
            },
        }}>
            {/* Breathing lotus SVG */}
            <Box sx={{
                width: 96, height: 96, mb: 3,
                '@keyframes breathe': {
                    '0%, 100%': { transform: 'scale(1)', opacity: 0.85 },
                    '50%': { transform: 'scale(1.1)', opacity: 1 },
                },
                animation: 'breathe 3s ease-in-out infinite',
            }}>
                <svg viewBox="0 0 96 96" width={96} height={96} fill="none">
                    {/* Outer petals */}
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
                        <ellipse
                            key={i}
                            cx="48" cy="30" rx="7" ry="18"
                            fill={i % 2 === 0 ? T.gold : T.sage}
                            transform={`rotate(${deg} 48 48)`}
                            style={{
                                animation: `petalPulse${i % 2} 3s ease-in-out infinite`,
                                animationDelay: `${i * 0.18}s`,
                            }}
                        />
                    ))}
                    {/* Inner petals */}
                    {[22, 67, 112, 157, 202, 247].map((deg, i) => (
                        <ellipse
                            key={`inner-${i}`}
                            cx="48" cy="36" rx="5" ry="11"
                            fill={T.gold}
                            fillOpacity={0.7}
                            transform={`rotate(${deg} 48 48)`}
                        />
                    ))}
                    {/* Centre circle */}
                    <circle cx="48" cy="48" r="9" fill={T.earth} fillOpacity={0.9} />
                    <circle cx="48" cy="48" r="5" fill={T.gold} />
                </svg>
            </Box>

            {/* Step label */}
            <Typography sx={{
                fontFamily: 'var(--font-inter)',
                fontSize: '1.05rem',
                fontWeight: 600,
                color: T.earth,
                mb: 0.75,
                textAlign: 'center',
                px: 3,
            }}>
                {step || 'Processing...'}
            </Typography>

            {/* Thin gold progress line */}
            <Box sx={{
                width: '160px',
                height: '3px',
                bgcolor: T.border,
                mt: 2.5,
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '2px',
            }}>
                <Box sx={{
                    position: 'absolute', left: 0, top: 0, bottom: 0,
                    width: `${pct}%`,
                    bgcolor: T.gold,
                    transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                }} />
            </Box>

            {/* Readable message */}
            <Typography sx={{
                fontSize: '0.78rem',
                color: T.ink2,
                mt: 1.5,
                fontWeight: 500,
                fontFamily: 'var(--font-inter)',
            }}>
                Please do not close this window
            </Typography>
        </Box>
    )
}


// ─── Validation Schema ────────────────────────────────────────────────────────
const registrationSchema = Yup.object({
    fullName: Yup.string().min(2, 'Name is too short').required('Full name is required'),
    phone: Yup.string().matches(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number').required('Phone number is required'),
    email: Yup.string().email('Enter a valid email address').required('Email is required'),
    gender: Yup.string().required('Please select your gender'),
    tshirtSize: Yup.string().required('Please select a T-shirt size'),
    heardFrom: Yup.string().required('Please tell us how you heard about us'),
    hasYogaExperience: Yup.string().required(),
})


function generateTicketID(): string {
    const prefix = 'ATH-'
    const timestampPart = Date.now().toString(36).toUpperCase()
    const uuidPart = uuidv4().replace(/-/g, '').slice(0, 4).toUpperCase()
    const merged = `${timestampPart}${uuidPart}`
    let hash = 0
    for (let i = 0; i < merged.length; i++) hash = (hash * 31 + merged.charCodeAt(i)) >>> 0
    return `${prefix}${hash.toString(36).toUpperCase().slice(0, 6)}`
}


// ─── Registration Form ────────────────────────────────────────────────────────
function RegistrationForm() {
    const router = useRouter()

    const [apiError, setApiError] = useState<string | null>(null)
    const [progressStep, setProgressStep] = useState('')
    const [percentage, setPercentage] = useState(0)

    const formik = useFormik({
        initialValues: {
            fullName: '', phone: '', email: '',
            gender: '', tshirtSize: '', heardFrom: '',
            hasYogaExperience: 'no',
        },
        validationSchema: registrationSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            setApiError(null)
            setSubmitting(true)
            setPercentage(0)
            setProgressStep('')

            try {
                // 1. Generate Ticket ID & PDF
                setProgressStep(STEPS[0].label)
                setPercentage(20)
                const formattedPhone = values.phone.startsWith('+91') ? values.phone : `+91${values.phone}`
                const ticketID = generateTicketID()
                const qrDataUrl = await QRCode.toDataURL(ticketID)
                const pdfBlob = await generatePDFBlob({ name: values.fullName, ticketId: ticketID, qrDataUrl })

                // 2. Upload PDF to Firebase Storage
                setProgressStep(STEPS[1].label)
                setPercentage(40)
                const storageRef = ref(storage, `arambhaForm26/${ticketID}.pdf`)
                await uploadBytes(storageRef, pdfBlob)
                const fileUrl = await getDownloadURL(storageRef)

                // 3. Register via Backend API
                setProgressStep(STEPS[2].label)
                setPercentage(70)

                const fullData = {
                    ...values,
                    phone: formattedPhone,
                    name: values.fullName,
                    ticketID,
                    qrDataUrl,
                }

                const res = await fetch('/api/yoga-day-register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        formData: fullData,
                        collectionName: 'arambhaForm26',
                        fileUrl,
                    }),
                })

                if (res.status === 409) {
                    const data = await res.json()
                    setApiError(data.message || 'Phone or email already registered.')
                    return
                } else if (!res.ok) {
                    const data = await res.json()
                    setApiError(data.message || 'Something went wrong. Please try again.')
                    return
                }

                setPercentage(100)
                setProgressStep(STEPS[3].label)

                // Short buffer to allow state to settle before push
                await new Promise((r) => setTimeout(r, 300))

                resetForm()
                router.push(`/yoga-day-26/success?ticketID=${ticketID}`)
            } catch (err: any) {
                setApiError('Unexpected error occurred. Please try again.')
            } finally {
                setSubmitting(false)
                setPercentage(0)
                setProgressStep('')
            }
        },
    })

    // Shared field sx — flat, no border-radius, gold focus
    const fieldSx = {
        '& .MuiOutlinedInput-root': {
            borderRadius: 0,
            '& fieldset': { borderColor: T.border },
            '&:hover fieldset': { borderColor: T.gold },
            '&.Mui-focused fieldset': { borderColor: T.gold, borderWidth: '1.5px' },
        },
        '& .MuiInputLabel-root.Mui-focused': { color: T.gold },
    }

    return (
        <>
            <Box component="form" onSubmit={formik.handleSubmit} noValidate>

                {/* ── Yoga loading overlay ── */}
                {formik.isSubmitting && (
                    <YogaLoader step={progressStep} pct={percentage} />
                )}

                {/* Error snackbar */}
                <Snackbar
                    open={!!apiError}
                    autoHideDuration={6000}
                    onClose={() => setApiError(null)}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert onClose={() => setApiError(null)} severity="error" sx={{ width: '100%', borderRadius: 0 }}>
                        {apiError}
                    </Alert>
                </Snackbar>

                <Typography sx={{
                    fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase',
                    color: T.ink3, mb: '1.4rem', fontWeight: 500, fontFamily: 'var(--font-inter)',
                }}>
                    Registration Details
                </Typography>

                <Stack spacing={2.5}>
                    <TextField
                        fullWidth size="small"
                        id="fullName" name="fullName" label="Full Name"
                        placeholder="Your full name"
                        value={formik.values.fullName}
                        onChange={formik.handleChange} onBlur={formik.handleBlur}
                        error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                        helperText={formik.touched.fullName && formik.errors.fullName}
                        sx={fieldSx}
                    />

                    <TextField
                        fullWidth size="small"
                        id="phone" name="phone" label="WhatsApp Number"
                        placeholder="9XXXXXXXXX"
                        value={formik.values.phone}
                        onChange={formik.handleChange} onBlur={formik.handleBlur}
                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                        helperText={(formik.touched.phone && formik.errors.phone) || 'Your QR pass will be sent to this WhatsApp number'}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Typography sx={{ fontSize: '0.8rem', color: T.ink2, fontFamily: 'var(--font-inter)' }}>+91</Typography>
                                </InputAdornment>
                            ),
                        }}
                        sx={fieldSx}
                    />

                    <TextField
                        fullWidth size="small"
                        id="email" name="email" label="Email Address" type="email"
                        placeholder="you@email.com"
                        value={formik.values.email}
                        onChange={formik.handleChange} onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        sx={fieldSx}
                    />

                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                        <FormControl fullWidth size="small" sx={fieldSx} error={formik.touched.gender && Boolean(formik.errors.gender)}>
                            <InputLabel id="gender-label">Gender</InputLabel>
                            <Select labelId="gender-label" id="gender" name="gender" label="Gender"
                                value={formik.values.gender} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                sx={{ borderRadius: 0 }}
                            >
                                {['Male', 'Female', 'Other'].map((opt) => (
                                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                                ))}
                            </Select>
                            {formik.touched.gender && formik.errors.gender && <FormHelperText>{formik.errors.gender}</FormHelperText>}
                        </FormControl>

                        <FormControl fullWidth size="small" sx={fieldSx} error={formik.touched.tshirtSize && Boolean(formik.errors.tshirtSize)}>
                            <InputLabel id="tshirt-label">T-shirt Size</InputLabel>
                            <Select labelId="tshirt-label" id="tshirtSize" name="tshirtSize" label="T-shirt Size"
                                value={formik.values.tshirtSize} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                sx={{ borderRadius: 0 }}
                            >
                                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((s) => (
                                    <MenuItem key={s} value={s}>{s}</MenuItem>
                                ))}
                            </Select>
                            {formik.touched.tshirtSize && formik.errors.tshirtSize && <FormHelperText>{formik.errors.tshirtSize}</FormHelperText>}
                        </FormControl>
                    </Box>

                    <FormControl fullWidth size="small" sx={fieldSx} error={formik.touched.heardFrom && Boolean(formik.errors.heardFrom)}>
                        <InputLabel id="heard-label">How did you hear about us?</InputLabel>
                        <Select labelId="heard-label" id="heardFrom" name="heardFrom" label="How did you hear about us?"
                            value={formik.values.heardFrom} onChange={formik.handleChange} onBlur={formik.handleBlur}
                            sx={{ borderRadius: 0 }}
                        >
                            {['Instagram / Social Media', 'Friend / Word of mouth', 'Athayog Community', 'Google Search', 'Flyer / Poster', 'Other'].map((opt) => (
                                <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                            ))}
                        </Select>
                        {formik.touched.heardFrom && formik.errors.heardFrom && <FormHelperText>{formik.errors.heardFrom}</FormHelperText>}
                    </FormControl>

                    <FormControl component="fieldset" error={formik.touched.hasYogaExperience && Boolean(formik.errors.hasYogaExperience)}>
                        <FormLabel component="legend" sx={{ fontSize: '0.72rem', fontWeight: 500, color: T.ink2, letterSpacing: '0.04em', mb: 0.5 }}>
                            Do you have prior yoga experience?
                        </FormLabel>
                        <RadioGroup row name="hasYogaExperience" value={formik.values.hasYogaExperience} onChange={formik.handleChange}>
                            <FormControlLabel value="yes" control={<Radio size="small" sx={{ color: T.sage, '&.Mui-checked': { color: T.sage } }} />} label={<Typography sx={{ fontSize: '0.84rem' }}>Yes</Typography>} />
                            <FormControlLabel value="no" control={<Radio size="small" sx={{ color: T.sage, '&.Mui-checked': { color: T.sage } }} />} label={<Typography sx={{ fontSize: '0.84rem' }}>No</Typography>} />
                        </RadioGroup>
                    </FormControl>

                    {/* Submit button — flat, matches .btn-g */}
                    <Button
                        type="submit"
                        fullWidth
                        disabled={formik.isSubmitting}
                        sx={{
                            bgcolor: T.gold,
                            color: T.white,
                            borderRadius: 0,
                            py: '0.85rem',
                            fontSize: '0.8rem',
                            fontWeight: 500,
                            letterSpacing: '0.05em',
                            fontFamily: 'var(--font-inter)',
                            textTransform: 'none',
                            boxShadow: 'none',
                            '&:hover': { bgcolor: '#9a7222', boxShadow: 'none' },
                            '&:disabled': { bgcolor: T.border, color: T.ink3 },
                        }}
                    >
                        {formik.isSubmitting ? 'Registering…' : 'Register Now — Free'}
                    </Button>

                    <Typography sx={{ textAlign: 'center', fontSize: '0.72rem', color: T.ink3, fontFamily: 'var(--font-inter)' }}>
                        By registering you agree to Atha Yog Living&apos;s{' '}
                        <Link href="https://athayogliving.com/privacy-policy" underline="hover" sx={{ color: T.gold }}>
                            Privacy Policy
                        </Link>.
                    </Typography>
                </Stack>
            </Box>
        </>
    )
}


// ─── Register Section ─────────────────────────────────────────────────────────
export function RegisterSection() {
    const [mode, setMode] = useState<'register' | 'download'>('register')
    const [downloadId, setDownloadId] = useState('')
    const [isDownloading, setIsDownloading] = useState(false)
    const router = useRouter()

    const [retrieveError, setRetrieveError] = useState<string | null>(null)

    const handleDownloadSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setRetrieveError(null)
        if (downloadId.trim()) {
            setIsDownloading(true)

            try {
                // Check if the phone/email exists and get the ticketID
                const formattedPhone = downloadId.startsWith('+91') ? downloadId : `+91${downloadId}`
                const res = await fetch('/api/yoga-day-duplicate/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ phone: formattedPhone, email: downloadId.trim() }),
                })

                const data = await res.json()

                if (res.status === 409 && data.ticketID) {
                    // 409 means it exists! We can retrieve it.
                    router.push(`/yoga-day-26/success?ticketID=${encodeURIComponent(data.ticketID)}`)
                } else {
                    setRetrieveError('No registration found with this email or phone number.')
                    setIsDownloading(false)
                }
            } catch (err) {
                setRetrieveError('Failed to lookup ticket. Please try again.')
                setIsDownloading(false)
            }
        }
    }

    const fieldSx = {
        '& .MuiOutlinedInput-root': {
            borderRadius: 0,
            '& fieldset': { borderColor: T.border },
            '&:hover fieldset': { borderColor: T.gold },
            '&.Mui-focused fieldset': { borderColor: T.gold, borderWidth: '1.5px' },
        },
        '& .MuiInputLabel-root.Mui-focused': { color: T.gold },
    }

    return (
        <Box component="section" id="register" sx={{ py: { xs: 8, md: 12 }, bgcolor: T.cream, scrollMarginTop: '80px' }}>
            <Container maxWidth="lg">
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: '3rem', alignItems: 'start' }}>

                    {/* Left copy */}
                    <Box>
                        <EyebrowLabel>Free Registration</EyebrowLabel>
                        <Typography variant="h2" sx={{ mb: '0.8rem', fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' }, whiteSpace: { md: 'nowrap' } }}>
                            Join Yoga Arambha 2026
                        </Typography>
                        <Typography sx={{ fontSize: '0.88rem', color: T.ink2, mb: '1.2rem', lineHeight: 1.65 }}>
                            Reserve your spot at Bangalore&apos;s International Day of Yoga 2026 celebration. Free and open to everyone — residents, professionals, students, and wellness enthusiasts.
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.8rem', p: '0.9rem 1.1rem', mb: '0.9rem', bgcolor: T.sageL, borderLeft: `3px solid ${T.sage}` }}>
                            <Typography sx={{ fontSize: '0.8rem', color: T.sage, fontWeight: 500 }}>
                                On-site registration opens at 6:00 AM. Pre-register to secure your spot.
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.8rem', p: '0.9rem 1.1rem', mb: '1.4rem', bgcolor: T.goldL, borderLeft: `3px solid ${T.gold}` }}>
                            <Typography sx={{ fontSize: '0.8rem', color: T.gold, fontWeight: 500 }}>
                                Mass yoga session from 7:00&ndash;8:00 AM. All levels welcome.
                            </Typography>
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: '0.78rem', color: T.ink3, mb: '0.6rem' }}>Dignitaries</Typography>
                            {DIGNITARIES.map((d) => (
                                <Typography key={d.name} sx={{ fontSize: '0.78rem', color: T.ink2, mb: '0.2rem' }}>
                                    <Box component="strong" sx={{ color: T.earth }}>{d.name}</Box> &mdash; {d.role}
                                </Typography>
                            ))}
                        </Box>
                    </Box>

                    {/* Right form card */}
                    <Box sx={{ position: 'relative', overflow: 'hidden', bgcolor: T.white, border: `1px solid ${T.border}`, p: { xs: '1.5rem', md: '2rem' } }}>
                        {isDownloading && (
                            <YogaLoader step="Looking up ticket details..." pct={50} />
                        )}
                        {mode === 'register' ? (
                            <>
                                <RegistrationForm />
                                <Box sx={{ mt: 3, pt: 3, borderTop: `1px solid ${T.border}`, textAlign: 'center' }}>
                                    <Typography sx={{ fontSize: '0.85rem', color: T.ink2, fontFamily: 'var(--font-inter)' }}>
                                        Already registered?{' '}
                                        <Box component="span" onClick={() => setMode('download')}
                                            sx={{ color: T.gold, fontWeight: 600, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                                            Download your ticket here.
                                        </Box>
                                    </Typography>
                                </Box>
                            </>
                        ) : (
                            <Box>
                                <Typography sx={{
                                    fontFamily: 'var(--font-playfair)', fontSize: '1.3rem',
                                    color: T.earth, mb: 1, fontWeight: 400,
                                }}>
                                    Retrieve Your Ticket
                                </Typography>
                                <Typography sx={{ fontSize: '0.84rem', color: T.ink2, mb: 3, fontFamily: 'var(--font-inter)', lineHeight: 1.65 }}>
                                    Enter your email or phone number to fetch your event ticket.
                                </Typography>
                                <Box component="form" onSubmit={handleDownloadSubmit}>
                                    <TextField
                                        fullWidth size="small"
                                        label="Email or Phone Number"
                                        value={downloadId}
                                        onChange={(e) => setDownloadId(e.target.value)}
                                        sx={{ ...fieldSx, mb: 2 }}
                                    />
                                    {retrieveError && (
                                        <Typography sx={{ color: 'error.main', fontSize: '0.8rem', mb: 2, fontFamily: 'var(--font-inter)' }}>
                                            {retrieveError}
                                        </Typography>
                                    )}
                                    <Button type="submit" fullWidth disabled={isDownloading} sx={{
                                        bgcolor: T.sage, color: T.white,
                                        borderRadius: 0, py: '0.85rem',
                                        fontSize: '0.8rem', fontWeight: 500,
                                        letterSpacing: '0.05em', fontFamily: 'var(--font-inter)',
                                        textTransform: 'none', boxShadow: 'none',
                                        mb: 2,
                                        '&:hover': { bgcolor: T.earth, boxShadow: 'none' },
                                        '&:disabled': { bgcolor: T.border, color: T.ink3 },
                                    }}>
                                        {isDownloading ? 'Retrieving…' : 'Retrieve Ticket'}
                                    </Button>
                                </Box>
                                <Box sx={{ mt: 3, pt: 3, borderTop: `1px solid ${T.border}`, textAlign: 'center' }}>
                                    <Typography sx={{ fontSize: '0.85rem', color: T.ink2, fontFamily: 'var(--font-inter)' }}>
                                        Need to register?{' '}
                                        <Box component="span" onClick={() => setMode('register')}
                                            sx={{ color: T.gold, fontWeight: 600, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                                            Go back to registration.
                                        </Box>
                                    </Typography>
                                </Box>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}