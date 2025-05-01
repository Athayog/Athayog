'use client'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import useFormStore from '@/store/useFormStore'
import RegisterButton from '@/components/elements/button/RegisterButton'
import { Box, FormControl, FormHelperText, MenuItem, Select, Snackbar, TextField, Typography, Alert, CircularProgress } from '@mui/material'
import { KeyTextField, LinkField } from '@prismicio/client'
import { useState } from 'react'

interface FormValuesAcademy {
    fullName: string
    phoneNumber: string
    email: string
    location: string
    pageSource: string | KeyTextField
}

const validationSchemaAcademy = Yup.object({
    fullName: Yup.string().required('Full Name is required'),
    phoneNumber: Yup.string()
        .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
        .required('Phone number is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    location: Yup.string().required('Location is required'),
})

const AcademyForm = ({ pageSource, paymentLink }: { pageSource: string | KeyTextField; paymentLink: any }): JSX.Element => {
    const { loading, error, success, submitForm, setSuccess } = useFormStore()
    const [showOverlay, setShowOverlay] = useState(false)

    const formik = useFormik<FormValuesAcademy>({
        initialValues: {
            fullName: '',
            phoneNumber: '',
            email: '',
            location: '',
            pageSource: pageSource,
        },
        validationSchema: validationSchemaAcademy,
        onSubmit: async (values: FormValuesAcademy, { resetForm }) => {
            await submitForm(values, 'academyFormv2', `info@athayogliving.com`)
            if (!error) {
                setShowOverlay(true)
                resetForm()
                setSuccess(false)
                setTimeout(() => {
                    window.location.href = paymentLink.url as unknown as string
                }, 2000) // Redirect after 2 seconds
            }
        },
    })

    return (
        <>
            {showOverlay && (
                <Box
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1000,
                    }}
                >
                    <Typography variant="h6" sx={{ color: 'white', mt: 2 }}>
                        Redirecting to payment... <CircularProgress color="success" size="30px" sx={{ marginLeft: '10px' }} />
                    </Typography>
                </Box>
            )}
            <form onSubmit={formik.handleSubmit}>
                {/* Full Name */}
                <Box sx={{ display: 'flex', gap: '20px', flexDirection: { xs: 'column', md: 'row' } }}>
                    <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                        <Typography sx={{ marginBottom: '12px', color: '#284E01', fontWeight: '500' }}>Full Name</Typography>
                        <TextField
                            fullWidth
                            id="fullName"
                            name="fullName"
                            value={formik.values.fullName}
                            onChange={formik.handleChange}
                            error={Boolean(formik.errors.fullName)}
                            helperText={formik.errors.fullName}
                            sx={{ mb: 3 }}
                        />
                    </Box>
                    <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                        <Typography sx={{ marginBottom: '12px', color: '#284E01', fontWeight: '500' }}>Location</Typography>
                        <TextField
                            fullWidth
                            id="location"
                            name="location"
                            value={formik.values.location}
                            onChange={formik.handleChange}
                            error={Boolean(formik.errors.location)}
                            helperText={formik.errors.location}
                            sx={{ mb: 3 }}
                        />
                    </Box>
                </Box>

                {/* Email and Phone Number side by side */}
                <Box sx={{ display: 'flex', gap: '20px', flexDirection: { xs: 'column', md: 'row' } }}>
                    <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                        <Typography sx={{ marginBottom: '12px', color: '#284E01', fontWeight: '500' }}>Email</Typography>
                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={Boolean(formik.errors.email)}
                            helperText={formik.errors.email}
                            sx={{ mb: 3 }}
                        />
                    </Box>
                    <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                        <Typography sx={{ marginBottom: '12px', color: '#284E01', fontWeight: '500' }}>Phone Number</Typography>
                        <TextField
                            fullWidth
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formik.values.phoneNumber}
                            onChange={formik.handleChange}
                            error={Boolean(formik.errors.phoneNumber)}
                            helperText={formik.errors.phoneNumber}
                            sx={{ mb: 3 }}
                        />
                    </Box>
                </Box>

                {/* Submit Button */}
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                    <RegisterButton color="primary" variant="contained" fullWidth type="submit" sx={{ margin: '0 auto' }} disabled={loading}>
                        {loading ? 'Submitting...' : 'Register'}
                    </RegisterButton>
                </Box>
            </form>

            {/* Success Snackbar */}
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={success} autoHideDuration={4000} onClose={() => useFormStore.setState({ success: false })}>
                <Alert onClose={() => useFormStore.setState({ success: false })} severity="success">
                    Form submitted successfully!
                </Alert>
            </Snackbar>

            {/* Error Snackbar */}
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={!!error} autoHideDuration={4000} onClose={() => useFormStore.setState({ error: null })}>
                <Alert onClose={() => useFormStore.setState({ error: null })} severity="error">
                    {error}
                </Alert>
            </Snackbar>
        </>
    )
}

export default AcademyForm
