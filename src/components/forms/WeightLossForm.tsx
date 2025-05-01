'use client'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import useFormStore from '@/store/useFormStore'
import RegisterButton from '@/components/elements/button/RegisterButton'
import { Box, FormControl, FormHelperText, MenuItem, Select, Snackbar, TextField, Typography, Alert } from '@mui/material'
import { useRouter } from 'next/navigation'
import ResetError from '../FormErrorReset'

interface FormValuesWeightLoss {
    fullName: string
    phoneNumber: string
    email: string
    gender: string
    weight: string
    healthConditions: string
}

const validationSchemaWeightLoss = Yup.object({
    fullName: Yup.string().required('Full Name is required'),
    phoneNumber: Yup.string()
        .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
        .required('Phone number is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    gender: Yup.string().required('Gender is required'),
    weight: Yup.string().required('Weight is required'),
    healthConditions: Yup.string().required('Health Condition is required'),
})

const WeightLossForm = (): JSX.Element => {
    const { loading, error, success, submitForm } = useFormStore()
    const router = useRouter()
    const formik = useFormik<FormValuesWeightLoss>({
        initialValues: {
            fullName: '',
            phoneNumber: '',
            email: '',
            gender: '',
            weight: '',
            healthConditions: '',
        },
        validationSchema: validationSchemaWeightLoss,
        onSubmit: async (values: FormValuesWeightLoss, { resetForm }) => {
            await submitForm(values, 'weightLossForm', `info@athayogliving.com`)
            if (!error) {
                resetForm()
                router.push('/thank-you')
            }
        },
    })

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
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
                <ResetError />
                {/* Gender and Weight side by side */}
                <Box sx={{ display: 'flex', gap: '20px', flexDirection: { xs: 'column', md: 'row' } }}>
                    <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                        <Typography sx={{ marginBottom: '12px', color: '#284E01', fontWeight: '500' }}>Gender</Typography>
                        <FormControl fullWidth sx={{ mb: 3 }}>
                            <Select
                                sx={{
                                    '&& .MuiSelect-outlined': {
                                        backgroundColor: '#fff',
                                    },
                                }}
                                id="gender"
                                name="gender"
                                value={formik.values.gender}
                                placeholder="Select Option"
                                onChange={formik.handleChange}
                                error={formik.touched.gender && Boolean(formik.errors.gender)}
                            >
                                <MenuItem value="">
                                    <em>Select Gender</em>
                                </MenuItem>
                                <MenuItem value="male">Male</MenuItem>
                                <MenuItem value="female">Female</MenuItem>
                                <MenuItem value="other">Other</MenuItem>
                            </Select>
                            {formik.errors.gender ? <FormHelperText error>{formik.errors.gender}</FormHelperText> : null}
                        </FormControl>
                    </Box>

                    <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                        <Typography sx={{ marginBottom: '12px', color: '#284E01', fontWeight: '500' }}>Weight</Typography>
                        <TextField
                            fullWidth
                            id="weight"
                            name="weight"
                            value={formik.values.weight}
                            onChange={formik.handleChange}
                            error={Boolean(formik.errors.weight)}
                            helperText={formik.errors.weight}
                            sx={{ mb: 3 }}
                        />
                    </Box>
                </Box>

                {/* Health Conditions */}
                <Box sx={{ mb: 3 }}>
                    <Typography sx={{ marginBottom: '12px', color: '#284E01', fontWeight: '500' }}>Health Conditions</Typography>
                    <TextField fullWidth id="healthConditions" name="healthConditions" value={formik.values.healthConditions} onChange={formik.handleChange} multiline rows={3} />
                    {formik.errors.healthConditions ? <FormHelperText error>{formik.errors.healthConditions}</FormHelperText> : null}
                </Box>

                {/* Submit Button */}
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                    <RegisterButton color="primary" variant="contained" fullWidth type="submit" sx={{ margin: '0 auto' }} disabled={loading}>
                        {loading ? 'Submitting...' : 'Register'}
                    </RegisterButton>
                </Box>

                {/* Error Snackbar */}
                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={!!error} autoHideDuration={4000} onClose={() => useFormStore.setState({ error: null })}>
                    <Alert onClose={() => useFormStore.setState({ error: null })} severity="error">
                        {error}
                    </Alert>
                </Snackbar>
            </form>
        </>
    )
}

export default WeightLossForm
