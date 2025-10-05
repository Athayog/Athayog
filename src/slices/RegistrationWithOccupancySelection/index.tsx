'use client'
import * as Yup from 'yup'
import { useState } from 'react'
import { useFormik } from 'formik'
import useFormStore from '@/store/useFormStore'
import { Box, Typography, TextField, Button, Card, Radio, FormControlLabel, Divider, Alert, Snackbar } from '@mui/material'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { PrismicRichText } from '@prismicio/react'
import { useRouter } from 'next/navigation'
import ResetError from '@/components/FormErrorReset'

export type RegistrationWithOccupancySelectionProps = SliceComponentProps<Content.RegistrationWithOccupancySelectionSlice>

interface FormValues {
    selectedPackage: string
    fullName: string
    email: string
    phone: string
    currentLocation: string
    emergencyContactName: string
    emergencyContactRelation: string
    emergencyContactNumber: string
}

const validationSchema = Yup.object({
    selectedPackage: Yup.string().required('Please select a package'),
    fullName: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string()
        .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
        .required('Phone number is required'),
    currentLocation: Yup.string().required('Current location is required'),
    emergencyContactName: Yup.string().required('Emergency contact name is required'),
    emergencyContactRelation: Yup.string().required('Emergency contact relation is required'),
    emergencyContactNumber: Yup.string()
        .matches(/^[0-9]{10}$/, 'Emergency contact number must be 10 digits')
        .required('Emergency contact number is required'),
})

const RegistrationWithOccupancySelection: React.FC<RegistrationWithOccupancySelectionProps> = ({ slice }) => {
    const { title, subtitle, package_options, selected_package_note, full_name_label, email_label, phone_label, location_label, emergency_name_label, emergency_relation_hint, emergency_number_label, submit_button_text } = slice.primary
    const { loading, error, success, submitForm } = useFormStore()
    const router = useRouter()

    const formik = useFormik<FormValues>({
        initialValues: {
            selectedPackage: '',
            fullName: '',
            email: '',
            phone: '',
            currentLocation: '',
            emergencyContactName: '',
            emergencyContactRelation: '',
            emergencyContactNumber: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values: FormValues, { resetForm }) => {
            await submitForm(values, 'bali_retreat_registration', 'info@athayogliving.com')
            if (!error) {
                resetForm()
                router.push('/thank-you')
            }
        },
    })

    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} style={{
            background: 'rgba(234, 254, 223, 1)',

        }}>
            <Box sx={{ p: '190px 200px' }}>
                <Box sx={{ maxWidth: '800px', margin: '0 auto', p: 3 }}>
                    {/* Title */}
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <PrismicRichText
                            field={title}
                            components={{
                                heading1: ({ children }) => (
                                    <Typography
                                        variant="h1"
                                        sx={{
                                            fontWeight: 700,
                                            fontSize: { xs: '2rem', md: '2.5rem' },
                                            mb: 2,
                                            color: 'text.primary'
                                        }}
                                    >
                                        {children}
                                    </Typography>
                                )
                            }}
                        />

                        <PrismicRichText
                            field={subtitle}
                            components={{
                                heading2: ({ children }) => (
                                    <Typography
                                        variant="h2"
                                        sx={{
                                            fontWeight: 600,
                                            fontSize: { xs: '1.25rem', md: '1.5rem' },
                                            color: 'text.secondary'
                                        }}
                                    >
                                        {children}
                                    </Typography>
                                )
                            }}
                        />
                    </Box>

                    <form onSubmit={formik.handleSubmit}>
                        {/* Package Selection */}
                        <Box sx={{ mb: 6 }}>
                            <Typography variant="h3" sx={{ fontWeight: 600, mb: 3, fontSize: '1.5rem' }}>
                                Choose Your Occupancy
                            </Typography>

                            <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
                                {package_options?.map((pkg, index) => (
                                    <Card
                                        key={index}
                                        sx={{
                                            flex: 1,
                                            p: 3,
                                            border: formik.values.selectedPackage === pkg.name ? '2px solid' : '1px solid',
                                            borderColor: formik.values.selectedPackage === pkg.name ? 'primary.main' : 'divider',
                                            borderRadius: 2,
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                borderColor: 'primary.main',
                                            }
                                        }}
                                        onClick={() => formik.setFieldValue('selectedPackage', pkg.name)}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                                            <Radio
                                                sx={{ display: 'none' }}
                                                checked={formik.values.selectedPackage === pkg.name}
                                                onChange={() => formik.setFieldValue('selectedPackage', pkg.name)}
                                            />
                                            <Box sx={{ flex: 1 }}>
                                                {/* Package Icon/Image */}
                                                {pkg.icon?.url && (
                                                    <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                                                        <img
                                                            src={pkg.icon.url}
                                                            alt=""
                                                            style={{
                                                                width: '60px',
                                                                height: '60px',
                                                                objectFit: 'contain'
                                                            }}
                                                        />
                                                    </Box>
                                                )}

                                                <Typography variant="h6" sx={{ fontWeight: 600, textAlign: 'center' }}>
                                                    {pkg.name}
                                                </Typography>
                                                <Typography variant="body1" sx={{ fontWeight: 600, color: 'primary.main', textAlign: 'center' }}>
                                                    {pkg.price}
                                                </Typography>
                                                {pkg.subtext && (
                                                    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5, textAlign: 'center' }}>
                                                        {pkg.subtext}
                                                    </Typography>
                                                )}
                                            </Box>
                                        </Box>
                                    </Card>
                                ))}
                            </Box>
                            {formik.errors.selectedPackage && (
                                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                                    {formik.errors.selectedPackage}
                                </Typography>
                            )}
                        </Box>

                        <Divider sx={{ my: 4 }} />

                        {/* Selected Package Note */}
                        {selected_package_note && (
                            <Box sx={{ mb: 4 }}>
                                <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
                                    Selected Package
                                </Typography>
                                <Typography variant="body1">
                                    {selected_package_note}
                                </Typography>
                            </Box>
                        )}

                        {/* Personal Information */}
                        <Box sx={{ mb: 4 }}>
                            <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
                                Personal Information
                            </Typography>

                            {/* Full Name */}
                            <Typography sx={{ mb: 1, fontWeight: 500 }}>
                                {full_name_label || 'Full Name'}
                            </Typography>
                            <TextField
                                fullWidth
                                id="fullName"
                                name="fullName"
                                value={formik.values.fullName}
                                onChange={formik.handleChange}
                                error={Boolean(formik.errors.fullName)}
                                helperText={formik.errors.fullName}
                                sx={
                                    {
                                        mb: 3,
                                        background: '#ffff',
                                        '&&&& .MuiFormHelperText-root':
                                        {
                                            background: 'rgba(234, 254, 223, 1)',
                                            margin: 0,
                                            paddingTop: '5px !important'
                                        }
                                    }
                                }
                            />

                            {/* Email and Phone */}
                            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
                                <Box sx={{ flex: 1 }}>
                                    <Typography sx={{ mb: 1, fontWeight: 500 }}>
                                        {email_label || 'Email Address'}
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        error={Boolean(formik.errors.email)}
                                        helperText={formik.errors.email}
                                        sx={
                                            {
                                                mb: 3,
                                                background: '#ffff',
                                                '&&&& .MuiFormHelperText-root':
                                                {
                                                    background: 'rgba(234, 254, 223, 1)',
                                                    margin: 0,
                                                    paddingTop: '5px !important'
                                                }
                                            }
                                        }
                                    />
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <Typography sx={{ mb: 1, fontWeight: 500 }}>
                                        {phone_label || 'Phone Number'}
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        id="phone"
                                        name="phone"
                                        value={formik.values.phone}
                                        onChange={formik.handleChange}
                                        error={Boolean(formik.errors.phone)}
                                        helperText={formik.errors.phone}
                                        sx={
                                            {
                                                mb: 3,
                                                background: '#ffff',
                                                '&&&& .MuiFormHelperText-root':
                                                {
                                                    background: 'rgba(234, 254, 223, 1)',
                                                    margin: 0,
                                                    paddingTop: '5px !important'
                                                }
                                            }
                                        }
                                    />
                                </Box>
                            </Box>

                            {/* Current Location */}
                            <Typography sx={{ mb: 1, fontWeight: 500 }}>
                                {location_label || 'Current Location'}
                            </Typography>
                            <TextField
                                fullWidth
                                id="currentLocation"
                                name="currentLocation"
                                value={formik.values.currentLocation}
                                onChange={formik.handleChange}
                                error={Boolean(formik.errors.currentLocation)}
                                helperText={formik.errors.currentLocation}
                                sx={
                                    {
                                        mb: 3,
                                        background: '#ffff',
                                        '&&&& .MuiFormHelperText-root':
                                        {
                                            background: 'rgba(234, 254, 223, 1)',
                                            margin: 0,
                                            paddingTop: '5px !important'
                                        }
                                    }
                                }
                            />
                        </Box>

                        <Divider sx={{ my: 4 }} />

                        {/* Emergency Contact */}
                        <Box sx={{ mb: 4 }}>
                            <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
                                Emergency Contact
                            </Typography>

                            {/* Emergency Contact Name and Relation */}
                            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
                                <Box sx={{ flex: 1 }}>
                                    <Typography sx={{ mb: 1, fontWeight: 500 }}>
                                        {emergency_name_label || 'Emergency Contact Name'}
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        id="emergencyContactName"
                                        name="emergencyContactName"
                                        value={formik.values.emergencyContactName}
                                        onChange={formik.handleChange}
                                        error={Boolean(formik.errors.emergencyContactName)}
                                        helperText={formik.errors.emergencyContactName}
                                        sx={
                                            {
                                                mb: 3,
                                                background: '#ffff',
                                                '&&&& .MuiFormHelperText-root':
                                                {
                                                    background: 'rgba(234, 254, 223, 1)',
                                                    margin: 0,
                                                    paddingTop: '5px !important'
                                                }
                                            }
                                        }
                                    />
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <Typography sx={{ mb: 1, fontWeight: 500 }}>
                                        Relation {emergency_relation_hint && `(${emergency_relation_hint})`}
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        id="emergencyContactRelation"
                                        name="emergencyContactRelation"
                                        placeholder="Eg: Wife, Husband, Parent"
                                        value={formik.values.emergencyContactRelation}
                                        onChange={formik.handleChange}
                                        error={Boolean(formik.errors.emergencyContactRelation)}
                                        helperText={formik.errors.emergencyContactRelation}
                                        sx={
                                            {
                                                mb: 3,
                                                background: '#ffff',
                                                '&&&& .MuiFormHelperText-root':
                                                {
                                                    background: 'rgba(234, 254, 223, 1)',
                                                    margin: 0,
                                                    paddingTop: '5px !important'
                                                }
                                            }
                                        }
                                    />
                                </Box>
                            </Box>

                            {/* Emergency Contact Number */}
                            <Typography sx={{ mb: 1, fontWeight: 500 }}>
                                {emergency_number_label || 'Emergency Contact Number'}
                            </Typography>
                            <TextField
                                fullWidth
                                id="emergencyContactNumber"
                                name="emergencyContactNumber"
                                value={formik.values.emergencyContactNumber}
                                onChange={formik.handleChange}
                                error={Boolean(formik.errors.emergencyContactNumber)}
                                helperText={formik.errors.emergencyContactNumber}
                                sx={
                                    {
                                        mb: 3,
                                        background: '#ffff',
                                        '&&&& .MuiFormHelperText-root':
                                        {
                                            background: 'rgba(234, 254, 223, 1)',
                                            margin: 0,
                                            paddingTop: '5px !important'
                                        }
                                    }
                                }
                            />
                        </Box>

                        <ResetError />

                        {/* Submit Button */}
                        <Box sx={{ textAlign: 'center' }}>
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                disabled={loading}
                                sx={{
                                    px: 4,
                                    py: 1.5,
                                    fontSize: '1.1rem',
                                    fontWeight: 600,
                                    borderRadius: 2,
                                    minWidth: '200px'
                                }}
                            >
                                {loading ? 'Submitting...' : (submit_button_text || 'Register Now')}
                            </Button>
                        </Box>
                    </form>

                    {/* Error Snackbar */}
                    <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={!!error} autoHideDuration={4000}>
                        <Alert severity="error">
                            {error}
                        </Alert>
                    </Snackbar>
                </Box>
            </Box>
        </section>
    )
}

export default RegistrationWithOccupancySelection