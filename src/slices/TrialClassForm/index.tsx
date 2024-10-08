'use client'
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormHelperText, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'

const validationSchema = Yup.object({
    fullName: Yup.string().required('Full Name is required'),
    phoneNumber: Yup.string()
        .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
        .required('Phone number is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    gender: Yup.string().required('Gender is required'),
    previousExperience: Yup.string(),
    yogaStyle: Yup.string(),
    healthConditions: Yup.array().min(1, 'Select at least one health condition'),
    courseInterest: Yup.string(),
    referralSource: Yup.string().required('How did you hear about us? is required'),
})

export type TrialClassFormProps = SliceComponentProps<Content.TrialClassFormSlice>

const TrialClassForm = ({ slice }: TrialClassFormProps): JSX.Element => {
    const formik = useFormik({
        initialValues: {
            fullName: '',
            phoneNumber: '',
            email: '',
            gender: '',
            previousExperience: '',
            yogaStyle: '',
            healthConditions: [],
            courseInterest: 'freeTrial', // Disabled by default
            referralSource: '',
        },
        validationSchema,
        onSubmit: (values) => {
            console.log(values) // Handle form submission
        },
    })
    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <Box sx={{ backgroundColor: '#EAFEDF', padding: '10px' }}>
                <Box maxWidth="1200px" margin="0 auto" marginTop="200px" sx={{ '& .MuiTextField-root': { backgroundColor: '#fff' } }}>
                    <Typography sx={{ fontSize: '48px', fontWeight: '700', textAlign: 'center', color: '#2A5200', marginBottom: '38px' }}>{slice.primary.title}</Typography>

                    <form onSubmit={formik.handleSubmit}>
                        {/* Full Name */}
                        <TextField
                            fullWidth
                            id="fullName"
                            name="fullName"
                            label="Full Name"
                            value={formik.values.fullName}
                            onChange={formik.handleChange}
                            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                            helperText={formik.touched.fullName && formik.errors.fullName}
                            sx={{ mb: 3 }}
                        />

                        {/* Phone Number */}
                        <TextField
                            fullWidth
                            id="phoneNumber"
                            name="phoneNumber"
                            label="Phone Number"
                            value={formik.values.phoneNumber}
                            onChange={formik.handleChange}
                            error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                            sx={{ mb: 3 }}
                        />

                        {/* Email */}
                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            sx={{ mb: 3 }}
                        />

                        {/* Gender */}
                        <FormControl component="fieldset" sx={{ mb: 3 }}>
                            <Typography>Gender</Typography>
                            <RadioGroup name="gender" value={formik.values.gender} onChange={formik.handleChange} row>
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="other" control={<Radio />} label="Others" />
                            </RadioGroup>
                            {formik.touched.gender && formik.errors.gender ? <FormHelperText error>{formik.errors.gender}</FormHelperText> : null}
                        </FormControl>

                        {/* Previous Yoga Experience */}
                        <TextField
                            fullWidth
                            id="previousExperience"
                            name="previousExperience"
                            label="Previous Yoga Experience"
                            value={formik.values.previousExperience}
                            onChange={formik.handleChange}
                            multiline
                            rows={3}
                            sx={{ mb: 3 }}
                        />

                        {/* Style of Yoga */}
                        <TextField fullWidth id="yogaStyle" name="yogaStyle" label="Style of Yoga" value={formik.values.yogaStyle} onChange={formik.handleChange} multiline rows={3} sx={{ mb: 3 }} />

                        {/* Health Conditions */}
                        <FormControl component="fieldset" sx={{ mb: 3 }}>
                            <Typography>Health Conditions</Typography>
                            <Box sx={{ display: 'flex' }}>
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

                        {/* Course Interest */}
                        <TextField fullWidth id="courseInterest" name="courseInterest" label="Course Interest" value={formik.values.courseInterest} disabled sx={{ mb: 3 }} />

                        {/* How Did You Hear About Us */}
                        <FormControl component="fieldset" sx={{ mb: 3 }}>
                            <Typography>How did you hear about us?</Typography>
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
                        <Button color="primary" variant="contained" fullWidth type="submit">
                            Submit
                        </Button>
                    </form>
                </Box>
            </Box>
        </section>
    )
}

export default TrialClassForm
