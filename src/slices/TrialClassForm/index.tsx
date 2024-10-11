'use client'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Content } from '@prismicio/client'
import useFormStore from '@/store/useFormStore'
import { SliceComponentProps } from '@prismicio/react'
import RegisterButton from '@/components/elements/button/RegisterButton'
import { Box, Checkbox, FormControl, FormControlLabel, FormHelperText, Radio, RadioGroup, Snackbar, TextField, Typography, Alert } from '@mui/material'

interface FormValues {
    fullName: string
    phoneNumber: string
    email: string
    gender: string
    previousExperience: string
    yogaStyle: string
    healthConditions: string[]
    referralSource: string
}

const validationSchema = Yup.object({
    fullName: Yup.string().required('Full Name is required'),
    phoneNumber: Yup.string()
        .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
        .required('Phone number is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    gender: Yup.string().required('Gender is required'),
    previousExperience: Yup.string().required('Previous experience is required'),
    yogaStyle: Yup.string().required('Yoga style is required'),
    healthConditions: Yup.array().min(1, 'Select at least one health condition'),
    referralSource: Yup.string().required('How did you hear about us? is required'),
})

export type TrialClassFormProps = SliceComponentProps<Content.TrialClassFormSlice>

const TrialClassForm = ({ slice }: TrialClassFormProps): JSX.Element => {
    const { loading, error, success, submitForm } = useFormStore()

    const formik = useFormik<FormValues>({
        initialValues: {
            fullName: '',
            phoneNumber: '',
            email: '',
            gender: '',
            previousExperience: '',
            yogaStyle: '',
            healthConditions: [],
            referralSource: '',
        },
        validationSchema,
        onSubmit: async (values: FormValues, { resetForm }) => {
            await submitForm(values, 'trialClasses')
            if (!error) {
                resetForm()
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
                        {/* Full Name */}
                        <Typography sx={{ marginBottom: '12px', color: '#284E01', fontWeight: '500' }}>Full Name</Typography>
                        <TextField
                            fullWidth
                            id="fullName"
                            name="fullName"
                            value={formik.values.fullName}
                            onChange={formik.handleChange}
                            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                            helperText={formik.touched.fullName && formik.errors.fullName}
                            sx={{ mb: 3 }}
                        />

                        {/* Phone Number */}
                        <Typography sx={{ marginBottom: '12px', color: '#284E01', fontWeight: '500' }}>Phone Number</Typography>
                        <TextField
                            fullWidth
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formik.values.phoneNumber}
                            onChange={formik.handleChange}
                            error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                            sx={{ mb: 3 }}
                        />

                        {/* Email */}
                        <Typography sx={{ marginBottom: '12px', color: '#284E01', fontWeight: '500' }}>Email</Typography>
                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            sx={{ mb: 3 }}
                        />

                        {/* Gender */}
                        <Typography sx={{ marginBottom: '12px', color: '#284E01', fontWeight: '500' }}>Gender</Typography>
                        <FormControl component="fieldset" sx={{ mb: 3 }}>
                            <RadioGroup name="gender" value={formik.values.gender} onChange={formik.handleChange} row>
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="other" control={<Radio />} label="Others" />
                            </RadioGroup>
                            {formik.touched.gender && formik.errors.gender ? <FormHelperText error>{formik.errors.gender}</FormHelperText> : null}
                        </FormControl>

                        {/* Previous Yoga Experience */}
                        <Box sx={{ mb: 3 }}>
                            <Typography sx={{ marginBottom: '12px', color: '#284E01', fontWeight: '500' }}>Previous Yoga Experience</Typography>
                            <TextField fullWidth id="previousExperience" name="previousExperience" value={formik.values.previousExperience} onChange={formik.handleChange} multiline rows={3} />
                            {formik.touched.previousExperience && formik.errors.previousExperience ? <FormHelperText error>{formik.errors.previousExperience}</FormHelperText> : null}
                        </Box>
                        {/* Style of Yoga */}
                        <Box sx={{ mb: 3 }}>
                            <Typography sx={{ marginBottom: '12px', color: '#284E01', fontWeight: '500' }}>Style of Yoga</Typography>
                            <TextField fullWidth id="yogaStyle" name="yogaStyle" value={formik.values.yogaStyle} onChange={formik.handleChange} multiline rows={3} />
                            {formik.touched.yogaStyle && formik.errors.yogaStyle ? <FormHelperText error>{formik.errors.yogaStyle}</FormHelperText> : null}
                        </Box>

                        {/* Health Conditions */}
                        <Typography sx={{ marginBottom: '12px', color: '#284E01', fontWeight: '500' }}>Health Conditions</Typography>
                        <FormControl component="fieldset" sx={{ mb: 3 }}>
                            <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap' }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="healthConditions"
                                            value="spineJointRelated"
                                            onChange={formik.handleChange}
                                            checked={formik.values.healthConditions.includes('spineJointRelated')}
                                        />
                                    }
                                    label="Spine/Joint related"
                                />
                                <FormControlLabel
                                    control={<Checkbox name="healthConditions" value="heartRelated" onChange={formik.handleChange} checked={formik.values.healthConditions.includes('heartRelated')} />}
                                    label="Heart related"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="healthConditions"
                                            value="neurologicalPsychological"
                                            onChange={formik.handleChange}
                                            checked={formik.values.healthConditions.includes('neurologicalPsychological')}
                                        />
                                    }
                                    label="Neurological/Psychological"
                                />
                                <FormControlLabel
                                    control={<Checkbox name="healthConditions" value="others" onChange={formik.handleChange} checked={formik.values.healthConditions.includes('others')} />}
                                    label="Others"
                                />
                            </Box>
                            {formik.touched.healthConditions && formik.errors.healthConditions ? <FormHelperText error>{formik.errors.healthConditions}</FormHelperText> : null}
                        </FormControl>

                        {/* How Did You Hear About Us */}
                        <Typography sx={{ marginBottom: '12px', color: '#284E01', fontWeight: '500' }}>How did you hear about us?</Typography>
                        <FormControl component="fieldset" sx={{ mb: 3, display: 'flex', flexWrap: 'wrap' }}>
                            <RadioGroup name="referralSource" value={formik.values.referralSource} onChange={formik.handleChange} row>
                                <FormControlLabel value="google" control={<Radio />} label="Google" />
                                <FormControlLabel value="facebook" control={<Radio />} label="Facebook" />
                                <FormControlLabel value="instagram" control={<Radio />} label="Instagram" />
                                <FormControlLabel value="wordOfMouth" control={<Radio />} label="Word of Mouth" />
                                <FormControlLabel value="alumni" control={<Radio />} label="Alumni" />
                            </RadioGroup>
                            {formik.touched.referralSource && formik.errors.referralSource ? <FormHelperText error>{formik.errors.referralSource}</FormHelperText> : null}
                        </FormControl>

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
                </Box>
            </Box>
        </section>
    )
}

export default TrialClassForm
