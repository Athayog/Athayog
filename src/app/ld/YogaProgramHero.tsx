import React, { useState } from 'react'
import Image, { ImageProps } from 'next/image'
import { Box, Container, Grid, Typography, TextField, Button, Paper, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Link from 'next/link'

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
    formSubmitUrl: string
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
}

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
}) => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        message: '',
    })

    const [errors, setErrors] = useState<FormErrors>({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {}

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required'
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format'
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
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

        if (!validateForm()) {
            return
        }

        setIsSubmitting(true)

        try {
            const response = await fetch(formSubmitUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if (!response.ok) {
                throw new Error('Submission failed')
            }

            setFormData({
                name: '',
                email: '',
                phone: '',
                message: '',
            })

            alert(successMessage)
        } catch (error) {
            console.error('Submission error:', error)
            alert(errorMessage)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Box
            sx={{
                minHeight: '100vh',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                py: { xs: 4, md: 8 },
                overflow: 'hidden',
            }}
        >
            {/* Next.js Image as Background */}
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
                    zIndex: 0,
                }}
            />

            {/* Overlay */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    zIndex: 1,
                }}
            />

            {/* Content */}
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
                <Grid container spacing={{ xs: 3, md: 4 }} alignItems="center">
                    {/* Program Information Section */}
                    <Grid item xs={12} md={6}>
                        <Box>
                            <Paper
                                elevation={0}
                                sx={{
                                    backgroundColor: 'rgba(200, 240, 200, 0.95)',
                                    p: { xs: 3, md: 4 },
                                    borderRadius: 3,
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

                            {/* CTA Button - Outside the Paper container */}
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
                                            '&:hover': {
                                                backgroundColor: '#3d6625',
                                            },
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
                                    disabled={isSubmitting}
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
                                        '&:hover': {
                                            backgroundColor: '#3d6625',
                                        },
                                        '&:disabled': {
                                            backgroundColor: '#a5c99a',
                                        },
                                    }}
                                >
                                    {isSubmitting ? submittingButtonText : submitButtonText}
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default YogaProgramHero
