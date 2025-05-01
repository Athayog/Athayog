'use client'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import useFormStore from '@/store/useFormStore'
import { KeyTextField } from '@prismicio/client'
import { Alert, Box, Snackbar, TextField, Typography } from '@mui/material'
import RegisterButton from '@/components/elements/button/RegisterButton'
import { useEffect } from 'react'
import ResetError from '../FormErrorReset'

interface FormValuesEnquiry {
    fullName: string
    phoneNumber: string
    email: string
    location: string
    pageSource: string | KeyTextField
}

const validationSchemaEnquiry = Yup.object({
    fullName: Yup.string().required('Full Name is required'),
    phoneNumber: Yup.string()
        .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
        .required('Phone number is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    location: Yup.string().required('Location is required'),
})

const EnquiryForm = ({ pageSource }: { pageSource: string | KeyTextField }): JSX.Element => {
    const { loading, error, success, submitForm } = useFormStore()
    const router = useRouter()
    const formik = useFormik<FormValuesEnquiry>({
        initialValues: {
            fullName: '',
            phoneNumber: '',
            email: '',
            location: '',
            pageSource: pageSource,
        },
        validationSchema: validationSchemaEnquiry,
        onSubmit: async (values: FormValuesEnquiry, { resetForm }) => {
            await submitForm(values, 'enquiryFormsv2', `info@athayogliving.com`)
            if (!error) {
                resetForm()
                router.push('/thank-you')
            }
        },
    })

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Box sx={{ display: 'flex', gap: '20px', flexDirection: { xs: 'column', md: 'row' } }}>
                    <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                        {/* Full Name */}
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
                        {/* Full Name */}
                        <Typography sx={{ marginBottom: '12px', color: '#284E01', fontWeight: '500' }}>Full Name</Typography>
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
                <ResetError />
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

                {/* Error Snackbar */}
                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={!!error} autoHideDuration={4000} onClose={() => useFormStore.setState({ error: null })}>
                    <Alert onClose={() => useFormStore.setState({ error: null })} severity="error">
                        {error}
                    </Alert>
                </Snackbar>

                {/* Submit Button */}
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                    <RegisterButton color="primary" variant="contained" fullWidth type="submit" sx={{ margin: '0 auto' }} disabled={loading}>
                        {loading ? 'Submitting...' : 'Register'}
                    </RegisterButton>
                </Box>
            </form>
        </>
    )
}

export default EnquiryForm
