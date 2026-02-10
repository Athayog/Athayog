'use client'

import * as Yup from 'yup'
import Link from 'next/link'
import Image from 'next/image'
import React, { useState } from 'react'
import useFormStore from '@/store/useFormStore'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import { Box, Container, Grid, Typography, TextField, Button, Paper, List, ListItem, ListItemIcon, ListItemText, Snackbar, Alert } from '@mui/material'

interface FormData {
    name: string
    email: string
    phone: string
    message: string
}

interface FormErrors {
    name?: string
    email?: string
    phone?: string
    message?: string
}

export interface YogaProgramHeroProps {
    title: string
    description: string
    features: string[]
    ctaButtonText: string
    submitButtonText: string
    submittingButtonText?: string
    formSubmitUrl?: string
    namePlaceholder?: string
    emailPlaceholder?: string
    phonePlaceholder?: string
    messagePlaceholder?: string
    successMessage?: string
    errorMessage?: string
    backgroundImage: StaticImport | string
    backgroundImageAlt?: string
    backgroundImagePriority?: boolean
    backgroundImageQuality?: number
    ctaButtonHref?: string
    overlayGradient?: string
    overlayOpacity?: number
    formKey?: string
    notifyEmail?: string
}

const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    phone: Yup.string()
        .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
        .required('Phone number is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    message: Yup.string().required('Message is required'),
})

const YogaProgramHero: React.FC<YogaProgramHeroProps> = ({
    title,
    description,
    features,
    ctaButtonText,
    submitButtonText,
    submittingButtonText = 'Submitting...',
    formSubmitUrl,
    namePlaceholder = 'Name',
    emailPlaceholder = 'Email',
    phonePlaceholder = 'Phone number',
    messagePlaceholder = 'Your message',
    successMessage = 'Thank you! We will contact you soon.',
    errorMessage = 'Something went wrong. Please try again.',
    backgroundImage,
    backgroundImageAlt = 'Yoga background',
    backgroundImagePriority = true,
    backgroundImageQuality = 85,
    ctaButtonHref = '/',
    overlayGradient = 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(245, 245, 232, 0.2) 100%)',
    overlayOpacity = 0.35,
    formKey = 'landingPageForm',
    notifyEmail = 'info@athayogliving.com',
}) => {
    const { loading, error, success, submitForm } = useFormStore()
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        message: '',
    })
    const [errors, setErrors] = useState<FormErrors>({})

    const validateForm = async (): Promise<boolean> => {
        try {
            await validationSchema.validate(formData, { abortEarly: false })
            setErrors({})
            return true
        } catch (validationError: any) {
            const newErrors: FormErrors = {}
            if (validationError.inner && Array.isArray(validationError.inner)) {
                validationError.inner.forEach((err: any) => {
                    if (err.path && !newErrors[err.path as keyof FormErrors]) {
                        newErrors[err.path as keyof FormErrors] = err.message
                    }
                })
            }
            setErrors(newErrors)
            return false
        }
    }

    const handleInputChange = (field: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({
            ...prev,
            [field]: event.target.value,
        }))

        if (errors[field]) {
            setErrors((prev) => ({
                ...prev,
                [field]: undefined,
            }))
        }
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()

        const isValid = await validateForm()
        if (!isValid) return

        try {
            await submitForm(
                {
                    fullName: formData.name,
                    phoneNumber: formData.phone,
                    email: formData.email,
                    message: formData.message,
                    source: formKey,
                },
                'landingPageForm',
                notifyEmail
            )

            setFormData({
                name: '',
                email: '',
                phone: '',
                message: '',
            })
        } catch (err) {
            console.error('Submission error:', err)
        }
    }

    return (
        <>
            <Box
                sx={{
                    minHeight: '100vh',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    py: { xs: 12, md: 8 },
                    overflow: 'hidden',
                }}
            >
                {/* Background Image Layer */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 0,
                    }}
                >
                    <Image
                        src={backgroundImage}
                        alt={backgroundImageAlt}
                        fill
                        priority={backgroundImagePriority}
                        quality={backgroundImageQuality}
                        sizes="100vw"
                        style={{
                            objectFit: 'cover',
                            objectPosition: 'center',
                        }}
                    />

                    {/* Subtle Gradient Overlay */}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: overlayGradient,
                            opacity: overlayOpacity,
                        }}
                    />
                </Box>

                {/* Content */}
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
                    <Grid container spacing={{ xs: 3, md: 4 }} alignItems="flex-start">
                        {/* ↑ FIXED: Changed from alignItems="center" to alignItems="flex-start" */}

                        {/* Program Information Section */}
                        <Grid item xs={12} md={6}>
                            <Box>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        backgroundColor: 'rgba(200, 240, 200, 0.95)',
                                        p: { xs: 3, md: 4 },
                                        borderRadius: 3,
                                        backdropFilter: 'blur(8px)',
                                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                                    }}
                                >
                                    <Typography
                                        variant="h4"
                                        component="h1"
                                        sx={{
                                            fontWeight: 700,
                                            mb: 2,
                                            fontSize: { xs: '1.5rem', md: '2rem' },
                                            color: '#1a1a1a',
                                        }}
                                    >
                                        {title}
                                    </Typography>

                                    <Typography
                                        variant="body1"
                                        sx={{
                                            mb: 3,
                                            color: '#2a2a2a',
                                            fontSize: { xs: '0.95rem', md: '1rem' },
                                        }}
                                    >
                                        {description}
                                    </Typography>

                                    <List sx={{ mb: 0 }}>
                                        {features.map((feature, index) => (
                                            <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                                                <ListItemIcon sx={{ minWidth: 32 }}>
                                                    <CheckCircleIcon sx={{ color: '#4caf50', fontSize: 24 }} />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={feature}
                                                    primaryTypographyProps={{
                                                        fontSize: { xs: '0.9rem', md: '1rem' },
                                                        fontWeight: 500,
                                                        color: '#1a1a1a',
                                                    }}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Paper>

                                {/* CTA Button */}
                                <Box sx={{ mt: 3 }}>
                                    <Link href={ctaButtonHref} passHref>
                                        <Button
                                            variant="contained"
                                            size="large"
                                            sx={{
                                                backgroundColor: '#4a7c2f',
                                                color: 'white',
                                                px: 4,
                                                py: 1.5,
                                                borderRadius: 8,
                                                textTransform: 'none',
                                                fontSize: '1rem',
                                                fontWeight: 600,
                                                boxShadow: '0 4px 14px rgba(74, 124, 47, 0.3)',
                                                '&:hover': {
                                                    backgroundColor: '#3d6625',
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: '0 6px 20px rgba(74, 124, 47, 0.4)',
                                                },
                                                transition: 'all 0.3s ease-in-out',
                                            }}
                                        >
                                            {ctaButtonText}
                                        </Button>
                                    </Link>
                                </Box>
                            </Box>
                        </Grid>

                        {/* Contact Form Section */}
                        <Grid item xs={12} md={6}>
                            <Paper
                                id="contact-form"
                                elevation={3}
                                sx={{
                                    backgroundColor: 'rgba(220, 245, 220, 0.98)',
                                    p: { xs: 3, md: 4 },
                                    borderRadius: 3,
                                    backdropFilter: 'blur(8px)',
                                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                                }}
                            >
                                <Box
                                    component="form"
                                    onSubmit={handleSubmit}
                                    noValidate
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 2.5,
                                    }}
                                >
                                    <TextField
                                        fullWidth
                                        label={namePlaceholder}
                                        variant="outlined"
                                        value={formData.name}
                                        onChange={handleInputChange('name')}
                                        error={!!errors.name}
                                        helperText={errors.name}
                                        required
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                backgroundColor: 'white',
                                                borderRadius: 2,
                                            },
                                        }}
                                    />

                                    <TextField
                                        fullWidth
                                        label={emailPlaceholder}
                                        type="email"
                                        variant="outlined"
                                        value={formData.email}
                                        onChange={handleInputChange('email')}
                                        error={!!errors.email}
                                        helperText={errors.email}
                                        required
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                backgroundColor: 'white',
                                                borderRadius: 2,
                                            },
                                        }}
                                    />

                                    <TextField
                                        fullWidth
                                        label={phonePlaceholder}
                                        type="tel"
                                        variant="outlined"
                                        value={formData.phone}
                                        onChange={handleInputChange('phone')}
                                        error={!!errors.phone}
                                        helperText={errors.phone}
                                        required
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                backgroundColor: 'white',
                                                borderRadius: 2,
                                            },
                                        }}
                                    />

                                    <TextField
                                        fullWidth
                                        label={messagePlaceholder}
                                        multiline
                                        rows={4}
                                        variant="outlined"
                                        value={formData.message}
                                        onChange={handleInputChange('message')}
                                        error={!!errors.message}
                                        helperText={errors.message}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                backgroundColor: 'white',
                                                borderRadius: 2,
                                            },
                                        }}
                                    />

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="large"
                                        disabled={loading}
                                        fullWidth
                                        sx={{
                                            backgroundColor: '#4a7c2f',
                                            color: 'white',
                                            py: 1.5,
                                            borderRadius: 2,
                                            textTransform: 'none',
                                            fontSize: '1.1rem',
                                            fontWeight: 600,
                                            mt: 1,
                                            boxShadow: '0 4px 14px rgba(74, 124, 47, 0.25)',
                                            '&:hover': {
                                                backgroundColor: '#3d6625',
                                                transform: 'translateY(-2px)',
                                                boxShadow: '0 6px 20px rgba(74, 124, 47, 0.35)',
                                            },
                                            '&:disabled': {
                                                backgroundColor: '#a5c99a',
                                            },
                                            transition: 'all 0.3s ease-in-out',
                                        }}
                                    >
                                        {loading ? submittingButtonText : submitButtonText}
                                    </Button>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Success Snackbar */}
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={success} autoHideDuration={4000} onClose={() => useFormStore.setState({ success: false })}>
                <Alert onClose={() => useFormStore.setState({ success: false })} severity="success" sx={{ width: '100%' }}>
                    {successMessage}
                </Alert>
            </Snackbar>

            {/* Error Snackbar */}
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={!!error} autoHideDuration={4000} onClose={() => useFormStore.setState({ error: null })}>
                <Alert onClose={() => useFormStore.setState({ error: null })} severity="error" sx={{ width: '100%' }}>
                    {error || errorMessage}
                </Alert>
            </Snackbar>
        </>
    )
}

export default YogaProgramHero
