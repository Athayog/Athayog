'use client'

import * as Yup from 'yup'
import React, { useState } from 'react'
import useFormStore from '@/store/useFormStore'
import { Box, Grid, Typography, TextField, Button, Paper, Snackbar, Alert } from '@mui/material'

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

interface ContactFormProps {
    submitButtonText: string
    submittingButtonText?: string
    namePlaceholder?: string
    emailPlaceholder?: string
    phonePlaceholder?: string
    messagePlaceholder?: string
    successMessage?: string
    errorMessage?: string
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

export default function ContactForm({
    submitButtonText,
    submittingButtonText = 'Submitting...',
    namePlaceholder = 'Name',
    emailPlaceholder = 'Email',
    phonePlaceholder = 'Phone number',
    messagePlaceholder = 'Your message',
    successMessage = 'Thank you! We will contact you soon.',
    errorMessage = 'Something went wrong. Please try again.',
    formKey = 'landingPageForm',
    notifyEmail = 'info@athayogliving.com',
}: ContactFormProps) {
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

            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={success} autoHideDuration={4000} onClose={() => useFormStore.setState({ success: false })}>
                <Alert onClose={() => useFormStore.setState({ success: false })} severity="success" sx={{ width: '100%' }}>
                    {successMessage}
                </Alert>
            </Snackbar>

            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={!!error} autoHideDuration={4000} onClose={() => useFormStore.setState({ error: null })}>
                <Alert onClose={() => useFormStore.setState({ error: null })} severity="error" sx={{ width: '100%' }}>
                    {error || errorMessage}
                </Alert>
            </Snackbar>
        </>
    )
}
