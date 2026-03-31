'use client'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Content } from '@prismicio/client'
import useFormStore from '@/store/useFormStore'
import { SliceComponentProps } from '@prismicio/react'
import RegisterButton from '@/components/elements/button/RegisterButton'
import { Box, Checkbox, FormControl, FormControlLabel, FormHelperText, Radio, RadioGroup, Snackbar, TextField, Typography, Alert, Select, MenuItem } from '@mui/material'
import { KeyTextField } from '@prismicio/client'
import { useRouter } from 'next/navigation'

interface FormValues {
    fullName: string
    phoneNumber: string
    email: string
    location: string
    serviceLookingFor: string
    source: string
    message: string
}

const validationSchema = Yup.object({
    fullName: Yup.string().required('Full Name is required'),
    phoneNumber: Yup.string()
        .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
        .required('Phone number is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    location: Yup.string().required('Location is required'),
    serviceLookingFor: Yup.string().required('Service is required'),
    source: Yup.string().required('Source is required'),
    message: Yup.string(),
})

export type TrialClassFormProps = SliceComponentProps<Content.TrialClassFormSlice>

const TrialClassForm = ({ slice }: TrialClassFormProps): JSX.Element => {
    const { loading, error, success, submitForm } = useFormStore()
    const router = useRouter()
    const formik = useFormik<FormValues>({
        initialValues: {
            fullName: '',
            phoneNumber: '',
            email: '',
            location: '',
            serviceLookingFor: '',
            source: '',
            message: '',
        },
        validationSchema,
        onSubmit: async (values: FormValues, { resetForm }) => {
            await submitForm(values, 'trialClassesv2', `info@athayogliving.com`)
            if (!error) {
                resetForm()
                router.push('/thank-you')
            }
        },
    })

    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <Box sx={{ backgroundColor: '#EAFEDF', padding: '10px' }}>
                <Box
                    maxWidth="1200px"
                    margin="0 auto"
                    marginTop={{ xs: '100px', md: '100px' }}
                    sx={{
                        '& .MuiTextField-root': { backgroundColor: '#fff', borderRadius: '8px' },
                        '& .MuiFormHelperText-root': {
                            backgroundColor: '#EAFEDF',
                            margin: 0,
                            paddingTop: '8px',
                            paddingLeft: '5px',
                        },
                    }}
                >
                    <Typography sx={{ fontSize: { xs: '32px', md: '48px' }, fontWeight: '700', textAlign: 'center', color: '#2A5200', marginBottom: '38px' }}>{slice.primary.title}</Typography>

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
                        <Box sx={{ display: 'flex', gap: '20px', flexDirection: { xs: 'column', md: 'row' }, mt: 3 }}>
                            <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                                <Typography sx={{ marginBottom: '12px', color: '#284E01', fontWeight: '500' }}>Service You are looking for</Typography>
                                <FormControl fullWidth error={Boolean(formik.errors.serviceLookingFor)} sx={{ mb: 3 }}>
                                    <Select
                                        id="serviceLookingFor"
                                        name="serviceLookingFor"
                                        value={formik.values.serviceLookingFor}
                                        onChange={formik.handleChange}
                                        displayEmpty
                                        sx={{ backgroundColor: '#fff' }}
                                    >
                                        <MenuItem value="" disabled>Select Service</MenuItem>
                                        <MenuItem value="Group class">Group class</MenuItem>
                                        <MenuItem value="Personal Training">Personal Training</MenuItem>
                                        <MenuItem value="Teachers Training course">Teachers Training course</MenuItem>
                                    </Select>
                                    {formik.errors.serviceLookingFor && <FormHelperText>{formik.errors.serviceLookingFor}</FormHelperText>}
                                </FormControl>
                            </Box>
                            <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                                <Typography sx={{ marginBottom: '12px', color: '#284E01', fontWeight: '500' }}>Source</Typography>
                                <TextField
                                    fullWidth
                                    id="source"
                                    name="source"
                                    value={formik.values.source}
                                    onChange={formik.handleChange}
                                    error={Boolean(formik.errors.source)}
                                    helperText={formik.errors.source}
                                    sx={{ mb: 3 }}
                                    placeholder="How did you hear about us?"
                                />
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', gap: '20px', flexDirection: { xs: 'column', md: 'row' } }}>
                            <Box sx={{ width: '100%' }}>
                                <Typography sx={{ marginBottom: '12px', color: '#284E01', fontWeight: '500' }}>Message</Typography>
                                <TextField
                                    fullWidth
                                    id="message"
                                    name="message"
                                    value={formik.values.message}
                                    onChange={formik.handleChange}
                                    error={Boolean(formik.errors.message)}
                                    helperText={formik.errors.message}
                                    multiline
                                    rows={4}
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


                </Box>
            </Box>
        </section>
    )
}

export default TrialClassForm
