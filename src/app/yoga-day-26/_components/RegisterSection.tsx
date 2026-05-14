'use client'

import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { v4 as uuidv4 } from 'uuid'
import QRCode from 'qrcode'
import emailjs from '@emailjs/browser'
import { useRouter } from 'next/navigation'
import { generatePDFBlob } from '@/components/forms/generatePdf'
import useFormStore from '@/store/useFormStore'
import {
    Box,
    Button,
    Container,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    InputAdornment,
    InputLabel,
    Link,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    Stack,
    TextField,
    Typography,
    Backdrop,
    CircularProgress,
    LinearProgress,
    linearProgressClasses,
    styled,
    Snackbar,
    Alert
} from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { EyebrowLabel } from './ui'
import { DIGNITARIES } from './data'

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 12,
    borderRadius: 6,
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.1)'
            : theme.palette.grey[300],

    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 6,
        backgroundImage:
            theme.palette.mode === 'dark'
                ? 'linear-gradient(90deg, #b8892a 0%, #d4aa6a 100%)'
                : 'linear-gradient(90deg, #b8892a 0%, #4f6148 100%)',
        animation: 'progress-glow 1.5s ease-in-out infinite',
    },

    '@keyframes progress-glow': {
        '0%': { boxShadow: '0 0 5px rgba(184, 137, 42, 0.4)' },
        '50%': { boxShadow: '0 0 15px rgba(184, 137, 42, 0.9)' },
        '100%': { boxShadow: '0 0 5px rgba(184, 137, 42, 0.4)' },
    },
}))

// ─── Validation Schema ─────────────────────────────────────────────────────────
const registrationSchema = Yup.object({
    fullName: Yup.string().min(2, 'Name is too short').required('Full name is required'),
    phone: Yup.string()
        .matches(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number')
        .required('Phone number is required'),
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
    for (let i = 0; i < merged.length; i++) {
        hash = (hash * 31 + merged.charCodeAt(i)) >>> 0
    }
    const finalId = hash.toString(36).toUpperCase().slice(0, 6)
    return `${prefix}${finalId}`
}

// Removed RegistrationSuccess component as we will route to a dedicated page

// ─── Registration Form ─────────────────────────────────────────────────────────
function RegistrationForm() {
    const { submitForm } = useFormStore()
    const router = useRouter()

    // Loading/Error states
    const [apiError, setApiError] = useState<string | null>(null)
    const [progressStep, setProgressStep] = useState('')
    const [percentage, setPercentage] = useState(0)

    const formik = useFormik({
        initialValues: {
            fullName: '',
            phone: '',
            email: '',
            gender: '',
            tshirtSize: '',
            heardFrom: '',
            hasYogaExperience: 'no',
        },
        validationSchema: registrationSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            setApiError(null)
            setSubmitting(true)
            setPercentage(0)
            setProgressStep('')

            try {
                // 1. Verify Duplicates
                setPercentage(20)
                setProgressStep('🔍 Verifying your information...')

                // Ensure number has country code for consistency
                const formattedPhone = values.phone.startsWith('+91') ? values.phone : `+91${values.phone}`

                const res = await fetch('/api/yoga-day-duplicate/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ phone: formattedPhone, email: values.email }),
                })

                if (res.status === 409) {
                    const data = await res.json()
                    setApiError(data.message || 'Either phone or email is already registered for this event.')
                    setSubmitting(false)
                    setProgressStep('')
                    return
                } else if (!res.ok) {
                    setApiError('Something went wrong checking registration. Please try again.')
                    setSubmitting(false)
                    setProgressStep('')
                    return
                }

                // 2. Generate Ticket & PDF
                setProgressStep('🎫 Generating your ticket...')
                const ticketID = generateTicketID()
                const qrDataUrl = await QRCode.toDataURL(ticketID)

                const resPDF = generatePDFBlob({ name: values.fullName, ticketId: ticketID, qrDataUrl })
                setPercentage(40)

                const pdfBlob = await resPDF
                const pdfFile = new File([pdfBlob], ticketID + '.pdf', { type: 'application/pdf' })

                let fullData = {
                    ...values,
                    phone: formattedPhone, // use formatted
                    name: values.fullName, // map fullName to name for backend expectations
                    ticketID,
                    qrDataUrl,
                    emailSent: false, // Explicitly mark as not sent initially
                }

                // 3. Save to DB
                setProgressStep('💾 Saving your details securely...')
                // Using 'arambhaForm26' as the collection for this new event
                await submitForm(fullData, 'arambhaForm26', '', pdfFile, 'arambhaForm26')

                setPercentage(80)
                setProgressStep('📧 Sending ticket to your inbox...')

                // 4. Send Email & WhatsApp (WhatsApp commented out as requested)
                const [emailRes] = await Promise.allSettled([
                    fetch('/api/send-brevo-email', {
                        method: 'POST',
                        body: JSON.stringify({
                            name: fullData.fullName,
                            email: fullData.email,
                            ticketID: fullData.ticketID,
                            fileUrl: (fullData as any).fileUrl,
                        }),
                        headers: { 'Content-Type': 'application/json' },
                    }),
                    /*
                    fetch('/api/send-pinnacle-whatsapp', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            phoneNumber: fullData.phone,
                            name: fullData.fullName,
                            registrationId: fullData.ticketID,
                            pdfUrl: (fullData as any).fileUrl,
                            destinationUrl: 'www.athayogliving.com',
                            enableTracking: true,
                        }),
                    })
                    */
                ])

                // Email fallback
                let emailSuccess = false
                if (emailRes.status === 'rejected' || !emailRes.value.ok) {
                    console.warn('⚠️ Brevo email failed — attempting EmailJS fallback.')
                    try {
                        await emailjs.send(
                            "service_33jio54",
                            "template_9mruadf",
                            {
                                email: fullData.email,
                                name: fullData.fullName,
                                ticketID: fullData.ticketID,
                                tiketURL: (fullData as any).fileUrl,
                            },
                            "user_Zp6dTdYGxn4E5rxeiLLCh"
                        )
                        console.log('✅ EmailJS fallback succeeded.')
                        emailSuccess = true
                    } catch (err) {
                        console.error('❌ EmailJS fallback also failed:', err)
                        setApiError('Form submitted, but failed to send confirmation email.')
                    }
                } else {
                    emailSuccess = true
                }

                if (emailSuccess) {
                    await fetch('/api/mark-email-sent', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ ticketID: fullData.ticketID }),
                    })
                }

                setPercentage(100)
                setProgressStep('✅ All done! You’re all set!')
                await new Promise((resolve) => setTimeout(resolve, 1500))

                resetForm()
                router.push(`/yoga-day-26/success?ticketID=${ticketID}`)
            } catch (error) {
                setApiError('Unexpected error occurred. Please try again.')
            } finally {
                setSubmitting(false)
                setPercentage(0)
                setProgressStep('')
            }
        },
    })

    return (
        <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ position: 'relative' }}>

            {/* Loader Backdrop */}
            <Backdrop
                open={formik.isSubmitting}
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, color: '#fff', flexDirection: 'column', position: 'absolute', bgcolor: 'rgba(255, 255, 255, 0.9)' }}
            >
                <CircularProgress color="primary" size={60} thickness={4} />
                <Typography variant="h6" sx={{ mt: 3, fontWeight: 600, color: '#3d2f1e' }}>
                    {progressStep}
                </Typography>
                <Box sx={{ width: '80%', maxWidth: 300, mt: 2 }}>
                    <BorderLinearProgress variant="determinate" value={percentage} />
                </Box>
                <Typography variant="body2" sx={{ mt: 1, color: '#555' }}>
                    {percentage}%
                </Typography>
            </Backdrop>

            {/* Error Snackbar */}
            <Snackbar open={!!apiError} autoHideDuration={6000} onClose={() => setApiError(null)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={() => setApiError(null)} severity="error" sx={{ width: '100%' }}>
                    {apiError}
                </Alert>
            </Snackbar>

            <Typography sx={{ fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#555', mb: '1.4rem', fontWeight: 500 }}>
                Registration Details
            </Typography>

            <Stack spacing={2.5}>
                <TextField
                    fullWidth
                    size="small"
                    id="fullName"
                    name="fullName"
                    label="Full Name"
                    placeholder="Your full name"
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                    helperText={formik.touched.fullName && formik.errors.fullName}
                />

                <TextField
                    fullWidth
                    size="small"
                    id="phone"
                    name="phone"
                    label="Mobile Number"
                    placeholder="9XXXXXXXXX"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>+91</Typography>
                            </InputAdornment>
                        ),
                    }}
                />

                <TextField
                    fullWidth
                    size="small"
                    id="email"
                    name="email"
                    label="Email Address"
                    type="email"
                    placeholder="you@email.com"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />

                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                    <FormControl fullWidth size="small" error={formik.touched.gender && Boolean(formik.errors.gender)}>
                        <InputLabel id="gender-label">Gender</InputLabel>
                        <Select
                            labelId="gender-label"
                            id="gender"
                            name="gender"
                            label="Gender"
                            value={formik.values.gender}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                            {['Male', 'Female', 'Other'].map((opt) => (
                                <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                            ))}
                        </Select>
                        {formik.touched.gender && formik.errors.gender && <FormHelperText>{formik.errors.gender}</FormHelperText>}
                    </FormControl>

                    <FormControl fullWidth size="small" error={formik.touched.tshirtSize && Boolean(formik.errors.tshirtSize)}>
                        <InputLabel id="tshirt-label">T-shirt Size</InputLabel>
                        <Select
                            labelId="tshirt-label"
                            id="tshirtSize"
                            name="tshirtSize"
                            label="T-shirt Size"
                            value={formik.values.tshirtSize}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                            {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((s) => (
                                <MenuItem key={s} value={s}>{s}</MenuItem>
                            ))}
                        </Select>
                        {formik.touched.tshirtSize && formik.errors.tshirtSize && <FormHelperText>{formik.errors.tshirtSize}</FormHelperText>}
                    </FormControl>
                </Box>

                <FormControl fullWidth size="small" error={formik.touched.heardFrom && Boolean(formik.errors.heardFrom)}>
                    <InputLabel id="heard-label">How did you hear about us?</InputLabel>
                    <Select
                        labelId="heard-label"
                        id="heardFrom"
                        name="heardFrom"
                        label="How did you hear about us?"
                        value={formik.values.heardFrom}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    >
                        {['Instagram / Social Media', 'Friend / Word of mouth', 'Athayog Community', 'Google Search', 'Flyer / Poster', 'Other'].map((opt) => (
                            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                        ))}
                    </Select>
                    {formik.touched.heardFrom && formik.errors.heardFrom && <FormHelperText>{formik.errors.heardFrom}</FormHelperText>}
                </FormControl>

                <FormControl component="fieldset" error={formik.touched.hasYogaExperience && Boolean(formik.errors.hasYogaExperience)}>
                    <FormLabel component="legend" sx={{ fontSize: '0.72rem', fontWeight: 500, color: 'text.secondary', letterSpacing: '0.04em', mb: 0.5 }}>
                        Do you have prior yoga experience?
                    </FormLabel>
                    <RadioGroup row name="hasYogaExperience" value={formik.values.hasYogaExperience} onChange={formik.handleChange}>
                        <FormControlLabel value="yes" control={<Radio size="small" color="primary" />} label={<Typography variant="body2">Yes</Typography>} />
                        <FormControlLabel value="no" control={<Radio size="small" color="primary" />} label={<Typography variant="body2">No</Typography>} />
                    </RadioGroup>
                </FormControl>

                <Button
                    type="submit"
                    fullWidth
                    disabled={formik.isSubmitting}
                    sx={{ bgcolor: '#b8892a', color: '#fff', py: '0.85rem', fontSize: '0.84rem', '&:hover': { bgcolor: '#9a7222' }, '&:disabled': { bgcolor: '#d4aa6a', color: '#fff' } }}
                >
                    {formik.isSubmitting ? 'Registering...' : 'Register Now — Free'}
                </Button>

                <Typography variant="caption" sx={{ textAlign: 'center', color: 'text.disabled', display: 'block' }}>
                    By registering you agree to Atha Yog Living&apos;s{' '}
                    <Link href="https://athayogliving.com/privacy-policy" underline="hover" sx={{ color: 'primary.main' }}>
                        Privacy Policy
                    </Link>
                    .
                </Typography>
            </Stack>
        </Box>
    )
}

// ─── Register Section (layout wrapper) ────────────────────────────────────────
export function RegisterSection() {
    const [mode, setMode] = useState<'register' | 'download'>('register');
    const [downloadId, setDownloadId] = useState('');
    const router = useRouter();

    const handleDownloadSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (downloadId.trim()) {
            const id = downloadId.trim();
            // Pass the email or phone exactly as entered
            router.push(`/yoga-day-26/success?ticketID=${encodeURIComponent(id)}`);
        }
    };

    return (
        <Box component="section" id="register" sx={{ py: { xs: 6, md: 8 }, bgcolor: '#faf7f2', scrollMarginTop: '80px' }}>
            <Container maxWidth="lg">
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: '3rem', alignItems: 'start' }}>
                    {/* Left — copy */}
                    <Box>
                        <EyebrowLabel>Free Registration</EyebrowLabel>
                        <Typography variant="h2" sx={{ mb: '0.8rem' }}>
                            Join Yoga Arambha 2026
                        </Typography>
                        <Typography sx={{ fontSize: '0.88rem', color: '#555', mb: '1.2rem', lineHeight: 1.65 }}>
                            Reserve your spot at Bangalore&apos;s International Day of Yoga 2026 celebration. Free and open to everyone — residents, professionals, students, and wellness enthusiasts.
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.8rem', p: '0.9rem 1.1rem', mb: '0.9rem', bgcolor: '#e8ede6', borderLeft: '3px solid #4f6148' }}>
                            <Typography sx={{ fontSize: '0.8rem', color: '#4f6148', fontWeight: 500 }}>On-site registration opens at 6:00 AM. Pre-register to secure your spot.</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.8rem', p: '0.9rem 1.1rem', mb: '1.4rem', bgcolor: '#f5edd8', borderLeft: '3px solid #b8892a' }}>
                            <Typography sx={{ fontSize: '0.8rem', color: '#b8892a', fontWeight: 500 }}>Mass yoga session from 7:00&ndash;8:00 AM. All levels welcome.</Typography>
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: '0.78rem', color: '#888', mb: '0.6rem' }}>Dignitaries</Typography>
                            {DIGNITARIES.map((d) => (
                                <Typography key={d.name} sx={{ fontSize: '0.78rem', color: '#555', mb: '0.2rem' }}>
                                    <Box component="strong" sx={{ color: '#3d2f1e' }}>{d.name}</Box>{' '}
                                    &mdash; {d.role}
                                </Typography>
                            ))}
                        </Box>
                    </Box>

                    {/* Right — form card */}
                    <Box sx={{ bgcolor: '#fff', border: '1px solid #e2ddd5', p: { xs: '1.5rem', md: '2rem' } }}>
                        {mode === 'register' ? (
                            <>
                                <RegistrationForm />
                                <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid #e2ddd5', textAlign: 'center' }}>
                                    <Typography sx={{ fontSize: '0.85rem', color: '#555', fontFamily: 'var(--font-inter)' }}>
                                        Already registered?{' '}
                                        <Box 
                                            component="span" 
                                            onClick={() => setMode('download')} 
                                            sx={{ color: '#b8892a', fontWeight: 600, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                                        >
                                            Download your ticket here.
                                        </Box>
                                    </Typography>
                                </Box>
                            </>
                        ) : (
                            <Box>
                                <Typography variant="h5" sx={{ fontFamily: 'var(--font-playfair)', color: '#3d2f1e', mb: 2, fontWeight: 700 }}>
                                    Retrieve Your Ticket
                                </Typography>
                                <Typography sx={{ fontSize: '0.88rem', color: '#555', mb: 3, fontFamily: 'var(--font-inter)' }}>
                                    Enter your Email Address or Phone Number to fetch and download your event ticket.
                                </Typography>
                                
                                <Box component="form" onSubmit={handleDownloadSubmit}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        label="Email or Phone Number"
                                        value={downloadId}
                                        onChange={(e) => setDownloadId(e.target.value)}
                                        sx={{ 
                                            mb: 3,
                                            fontFamily: 'var(--font-inter)',
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 1,
                                                '& fieldset': { borderColor: '#e2ddd5' },
                                                '&:hover fieldset': { borderColor: '#b8892a' },
                                                '&.Mui-focused fieldset': { borderColor: '#b8892a' }
                                            }
                                        }}
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        sx={{ bgcolor: '#4f6148', color: '#fff', py: '0.85rem', fontSize: '0.84rem', mb: 2, boxShadow: 'none', borderRadius: 0, '&:hover': { bgcolor: '#3d2f1e', boxShadow: 'none' } }}
                                    >
                                        Retrieve Ticket
                                    </Button>
                                </Box>

                                <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid #e2ddd5', textAlign: 'center' }}>
                                    <Typography sx={{ fontSize: '0.85rem', color: '#555', fontFamily: 'var(--font-inter)' }}>
                                        Need to register?{' '}
                                        <Box 
                                            component="span" 
                                            onClick={() => setMode('register')} 
                                            sx={{ color: '#b8892a', fontWeight: 600, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                                        >
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
