'use client'

import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
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
} from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { EyebrowLabel } from './ui'
import { DIGNITARIES } from './data'

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

// ─── Success State ─────────────────────────────────────────────────────────────
function RegistrationSuccess({ onReset }: { onReset: () => void }) {
    return (
        <Box sx={{ textAlign: 'center', py: 6 }}>
            <CheckCircleOutlineIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h3" sx={{ color: '#3d2f1e', mb: 1 }}>
                You&apos;re Registered!
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Thank you for registering. See you on June 21 at Indiranagar Club, Bangalore.
            </Typography>
            <Button variant="outlined" color="primary" sx={{ mt: 3 }} onClick={onReset}>
                Register Another Person
            </Button>
        </Box>
    )
}

// ─── Registration Form ─────────────────────────────────────────────────────────
function RegistrationForm() {
    const [submitted, setSubmitted] = React.useState(false)

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
        onSubmit: (_values, { setSubmitting, resetForm }) => {
            // TODO: replace with real API call — POST to /api/yoga-day
            console.log('Registration submitted:', _values)
            setTimeout(() => {
                setSubmitting(false)
                setSubmitted(true)
                resetForm()
            }, 800)
        },
    })

    if (submitted) return <RegistrationSuccess onReset={() => setSubmitted(false)} />

    return (
        <Box component="form" onSubmit={formik.handleSubmit} noValidate>
            <Typography sx={{ fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#555', mb: '1.4rem', fontWeight: 500 }}>
                Registration Details
            </Typography>

            <Stack spacing={2.5}>
                {/* Full Name */}
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

                {/* Mobile Number */}
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

                {/* Email */}
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

                {/* Gender + T-shirt Size — equal columns, same size */}
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
                            {['Male', 'Female', 'Other', 'Prefer not to say'].map((opt) => (
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

                {/* How did you hear */}
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

                {/* Yoga Experience */}
                <FormControl component="fieldset" error={formik.touched.hasYogaExperience && Boolean(formik.errors.hasYogaExperience)}>
                    <FormLabel component="legend" sx={{ fontSize: '0.72rem', fontWeight: 500, color: 'text.secondary', letterSpacing: '0.04em', mb: 0.5 }}>
                        Do you have prior yoga experience?
                    </FormLabel>
                    <RadioGroup row name="hasYogaExperience" value={formik.values.hasYogaExperience} onChange={formik.handleChange}>
                        <FormControlLabel value="yes" control={<Radio size="small" color="primary" />} label={<Typography variant="body2">Yes</Typography>} />
                        <FormControlLabel value="no" control={<Radio size="small" color="primary" />} label={<Typography variant="body2">No</Typography>} />
                    </RadioGroup>
                </FormControl>

                {/* Submit */}
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
    return (
        <Box component="section" id="register" sx={{ py: { xs: 6, md: 8 }, bgcolor: '#faf7f2' }}>
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
                        <RegistrationForm />
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}
