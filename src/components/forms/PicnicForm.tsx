'use client'
import * as Yup from 'yup'
import { useState } from 'react'
import { useFormik } from 'formik'
import { LinkField } from '@prismicio/client'
import useFormStore from '@/store/useFormStore'
import RegisterButton from '@/components/elements/button/RegisterButton'
import { Alert, Box, CircularProgress, FormControl, FormHelperText, MenuItem, Select, Snackbar, TextField, Typography } from '@mui/material'

interface PicnicFormWeightLoss {
    fullName: string
    phoneNumber: string
    email: string
    gender: string
    weight: string
    healthConditions: string
    currentLocation: string
    emergencyContactNameAndRelation: string
    emergencyContactNumber: string
    preferredDietaryPreferences: string
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
    currentLocation: Yup.string().required('Current Location is required'),
    emergencyContactNameAndRelation: Yup.string().required('Emergency Contact Name and Relation is required'),
    emergencyContactNumber: Yup.string()
        .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
        .required('Emergency Contact Number is required'),
    preferredDietaryPreferences: Yup.string().required('Preffered Diet is required'),
})

const PicnicForm = ({ paymentLink }: { paymentLink: LinkField }): JSX.Element => {
    const { loading, error, success, submitForm, setSuccess } = useFormStore()
    const [showOverlay, setShowOverlay] = useState(false)

    const formik = useFormik<PicnicFormWeightLoss>({
        initialValues: {
            fullName: '',
            phoneNumber: '',
            email: '',
            gender: '',
            weight: '',
            healthConditions: '',
            currentLocation: '',
            emergencyContactNameAndRelation: '',
            emergencyContactNumber: '',
            preferredDietaryPreferences: '',
        },
        validationSchema: validationSchemaWeightLoss,
        onSubmit: async (values: PicnicFormWeightLoss, { resetForm }) => {
            await submitForm(values, 'picnicForm', `info@athayogliving.com`)
            if (!error) {
                setShowOverlay(true)
                resetForm()
                setSuccess(false)
                setTimeout(() => {
                    window.location.href = (paymentLink as { url: string }).url
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

                {/* Gender and Weight side by side */}
                <Box sx={{ width: { xs: '100%', md: '100%' } }}>
                    <Typography sx={{ marginBottom: '12px', color: '#284E01', fontWeight: '500' }}>Current Location</Typography>
                    <TextField
                        fullWidth
                        id="currentLocation"
                        name="currentLocation"
                        value={formik.values.currentLocation}
                        onChange={formik.handleChange}
                        error={Boolean(formik.errors.currentLocation)}
                        helperText={formik.errors.currentLocation}
                        sx={{ mb: 3 }}
                    />
                </Box>
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
                <Box sx={{ width: { xs: '100%', md: '100%' } }}>
                    <Typography sx={{ marginBottom: '12px', color: '#284E01', fontWeight: '500' }}>Emergency Contact Name and Relation ( Eg: Amrutha / Wife )</Typography>
                    <TextField
                        fullWidth
                        id="emergencyContactNameAndRelation"
                        name="emergencyContactNameAndRelation"
                        value={formik.values.emergencyContactNameAndRelation}
                        onChange={formik.handleChange}
                        error={Boolean(formik.errors.emergencyContactNameAndRelation)}
                        helperText={formik.errors.emergencyContactNameAndRelation}
                        sx={{ mb: 3 }}
                    />
                </Box>
                <Box sx={{ width: { xs: '100%', md: '100%' } }}>
                    <Typography sx={{ marginBottom: '12px', color: '#284E01', fontWeight: '500' }}>Emergency Contact Number</Typography>
                    <TextField
                        fullWidth
                        id="emergencyContactNumber"
                        name="emergencyContactNumber"
                        value={formik.values.emergencyContactNumber}
                        onChange={formik.handleChange}
                        error={Boolean(formik.errors.emergencyContactNumber)}
                        helperText={formik.errors.emergencyContactNumber}
                        sx={{ mb: 3 }}
                    />
                </Box>

                {/* Health Conditions */}
                <Box sx={{ mb: 3 }}>
                    <Typography sx={{ marginBottom: '12px', color: '#284E01', fontWeight: '500' }}>Health Conditions</Typography>
                    <TextField fullWidth id="healthConditions" name="healthConditions" value={formik.values.healthConditions} onChange={formik.handleChange} multiline rows={3} />
                    {formik.errors.healthConditions ? <FormHelperText error>{formik.errors.healthConditions}</FormHelperText> : null}
                </Box>

                <Box sx={{ width: { xs: '100%', md: '100%' } }}>
                    <Typography sx={{ marginBottom: '12px', color: '#284E01', fontWeight: '500' }}>Preferred Dietary Preferences</Typography>
                    <FormControl fullWidth sx={{ mb: 3 }}>
                        <Select
                            sx={{
                                '&& .MuiSelect-outlined': {
                                    backgroundColor: '#fff',
                                },
                            }}
                            id="preferredDietaryPreferences"
                            name="preferredDietaryPreferences"
                            value={formik.values.preferredDietaryPreferences}
                            placeholder="Select Option"
                            onChange={formik.handleChange}
                            error={formik.touched.preferredDietaryPreferences && Boolean(formik.errors.preferredDietaryPreferences)}
                        >
                            <MenuItem value="">
                                <em>Select Preference Diet</em>
                            </MenuItem>
                            <MenuItem value="male">Vegetarian</MenuItem>
                            <MenuItem value="female">Non Vegetarian</MenuItem>
                            <MenuItem value="other">Eggetarian</MenuItem>
                        </Select>
                        {formik.errors.preferredDietaryPreferences ? <FormHelperText error>{formik.errors.preferredDietaryPreferences}</FormHelperText> : null}
                    </FormControl>
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

export default PicnicForm
