'use client'
import React from 'react';
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Content } from '@prismicio/client'
import { useRouter } from 'next/navigation'
import useFormStore from '@/store/useFormStore'
import { PrismicRichText } from '@prismicio/react'
import ResetError from '@/components/FormErrorReset'
import { SliceComponentProps } from '@prismicio/react'
import { Box, Typography, TextField, Button, Card, Radio, Divider, Alert, Snackbar } from '@mui/material'

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

    function priceFormatter(price: number) {
        const formattedPrice = new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(price);
        return formattedPrice
    }

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
            fontSize: '18px',

        }}>
            <Box sx={{ p: '190px 200px' }}>
                <Box sx={{ maxWidth: '800px', margin: '0 auto', p: 3 }}>
                    {/* Title */}
                    <Box sx={{ textAlign: 'center', mb: 6 }}>
                        <PrismicRichText
                            field={title}
                            components={{
                                heading1: ({ children }) => (
                                    <Typography
                                        variant="h1"
                                        sx={{
                                            fontWeight: 700,
                                            fontSize: { xs: '22px', md: '48px' },
                                            mb: 3,
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
                                            fontWeight: 700,
                                            fontSize: { xs: '16px', md: '38px' },
                                            color: 'text.primary',
                                            mb: 2
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
                        <Box sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', gap: '63px', width: '100%', flexDirection: { xs: 'column', md: 'row' } }}>
                                {package_options?.map((pkg, index) => (
                                    <Box key={index} sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                        <Card
                                            sx={{
                                                flex: 1,
                                                p: 3,
                                                border: formik.values.selectedPackage === pkg.name ? '2.48px solid' : '2.48px solid',
                                                borderColor: formik.values.selectedPackage === pkg.name ? 'rgba(71, 130, 13, 1)' : 'rgba(223, 223, 223, 1)',
                                                backgroundColor: formik.values.selectedPackage === pkg.name ? 'rgba(198, 246, 168, 1)' : 'rgba(247, 250, 245, 1)',
                                                borderRadius: '16px',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
                                                maxHeight: '234px',
                                                minHeight: '234px',
                                                '&:hover': {
                                                    borderColor: 'rgba(71, 130, 13, 1)',
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

                                                    <Typography variant="h6" sx={{ fontWeight: 700, textAlign: 'center', fontSize: { xs: '26px', md: '26px' } }}>
                                                        {pkg.name}
                                                    </Typography>

                                                    <Typography variant="body1" sx={{ fontWeight: 700, color: "rgba(31, 60, 4, 1)", textAlign: 'center', fontSize: { xs: '26px', md: '28px' } }}>
                                                        {priceFormatter(Number(pkg.price) || 0)} +  <span style={{ fontSize: "18px" }}>{pkg.subtext}</span>
                                                    </Typography>

                                                </Box>
                                            </Box>
                                        </Card>
                                        {formik.values.selectedPackage === pkg.name && (
                                            <Typography variant="body1" sx={{ mt: 2, textAlign: 'center', color: "rgba(71, 130, 13, 1)", fontSize: '16px', fontStyle: 'italic' }}>
                                                {selected_package_note}
                                            </Typography>
                                        )}
                                    </Box >
                                ))}
                            </Box>
                            {formik.errors.selectedPackage && (
                                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                                    {formik.errors.selectedPackage}
                                </Typography>
                            )}
                        </Box>




                        {/* Personal Information */}
                        <Box sx={{ mb: 2 }}>

                            {/* Full Name */}
                            <Typography sx={{ mb: 1, fontWeight: 500, color: "rgba(40, 78, 1, 1)", fontSize: '26px' }}>
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
                                            fontSize: '18px',
                                            margin: 0,
                                            paddingTop: '5px !important'
                                        }
                                    }
                                }
                            />

                            {/* Email and Phone */}
                            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
                                <Box sx={{ flex: 1 }}>
                                    <Typography sx={{ mb: 1, fontWeight: 500, color: "rgba(40, 78, 1, 1)", fontSize: '26px' }}>
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
                                                    fontSize: '18px',
                                                    margin: 0,
                                                    paddingTop: '5px !important'
                                                }
                                            }
                                        }
                                    />
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <Typography sx={{ mb: 1, fontWeight: 500, color: "rgba(40, 78, 1, 1)", fontSize: '26px' }}>
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
                                                    fontSize: '18px',
                                                    margin: 0,
                                                    paddingTop: '5px !important'
                                                }
                                            }
                                        }
                                    />
                                </Box>
                            </Box>

                            {/* Current Location */}
                            <Typography sx={{ mb: 1, fontWeight: 500, color: "rgba(40, 78, 1, 1)", fontSize: '26px' }}>
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
                                            fontSize: '18px',
                                            margin: 0,
                                            paddingTop: '5px !important'
                                        }
                                    }
                                }
                            />
                        </Box>


                        {/* Emergency Contact */}
                        <Box sx={{ mb: 2 }}>

                            {/* Emergency Contact Name and Relation */}
                            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
                                <Box sx={{ flex: 1 }}>
                                    <Typography sx={{ mb: 1, fontWeight: 500, color: "rgba(40, 78, 1, 1)", fontSize: '26px' }}>
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
                                                    fontSize: '18px',
                                                    margin: 0,
                                                    paddingTop: '5px !important'
                                                }
                                            }
                                        }
                                    />
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <Typography sx={{ mb: 1, fontWeight: 500, color: "rgba(40, 78, 1, 1)", fontSize: '26px' }}>
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
                                                    fontSize: '18px',
                                                    margin: 0,
                                                    paddingTop: '5px !important'
                                                }
                                            }
                                        }
                                    />
                                </Box>
                            </Box>

                            {/* Emergency Contact Number */}
                            <Typography sx={{ mb: 1, fontWeight: 500, color: "rgba(40, 78, 1, 1)", fontSize: '26px' }}>
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
                                            fontSize: '18px',
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
                                variant="contained"
                                size="medium"
                                disabled={loading}
                                sx={{
                                    px: '58.67px',
                                    py: '14.67px',
                                    fontSize: {
                                        xs: "20px",
                                        md: "26px"
                                    },
                                    fontWeight: 600,
                                    boxShadow: 0,
                                    borderRadius: "88.01px",
                                    textTransform: 'none',
                                    width: "283.34px",
                                    height: "57.34px",
                                    '&:hover': {
                                        boxShadow: 6,
                                        transform: 'translateY(-2px)',
                                    },
                                    transition: 'all 0.3s ease',
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