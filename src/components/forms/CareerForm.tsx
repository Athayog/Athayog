'use client'
import * as Yup from 'yup'
import { useState } from 'react'
import { useFormik } from 'formik'
import useFormStore from '@/store/useFormStore'
import RegisterButton from '@/components/elements/button/RegisterButton'
import { Alert, Box, Button, Divider, FormControl, FormHelperText, MenuItem, Select, styled, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
})

interface FormValuesCareer {
    fullName: string
    email: string
    phone: string
    currentLocation: string
    designation: string
    currentCompany: string
    experienceInYears: string
    currentCTC: string
    expectedCTC: string
    noticePeriod: string
    willingToRelocate: string
    offerInHand: string
    flexibleWithSplitShift: string
    questionsOrComments?: string
    resumeFile: File | null
}

const validationSchemaCareer = Yup.object({
    fullName: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email address').required('Email address is required'),
    phone: Yup.string()
        .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
        .required('Phone number is required'),
    currentLocation: Yup.string().required('Current location is required'),
    designation: Yup.string().required('Designation is required'),
    currentCompany: Yup.string().required('Current company is required'),
    experienceInYears: Yup.number().required('Experience in years is required'),
    currentCTC: Yup.string().required('Current CTC is required'),
    expectedCTC: Yup.string().required('Expected CTC is required'),
    noticePeriod: Yup.string().required('Notice period is required'),
    willingToRelocate: Yup.string().required('Willing to relocate is required'),
    offerInHand: Yup.string().required('Offer in hand is required'),
    flexibleWithSplitShift: Yup.string().required('Flexibility with split shift is required'),
    resumeFile: Yup.mixed().required('Resume file is required'),
})

const CareerForm = (): JSX.Element => {
    const { loading, error, success, submitForm, setSuccess } = useFormStore()
    const [fileError, setFileError] = useState('')
    const router = useRouter()

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.currentTarget.files ? event.currentTarget.files[0] : null
        if (file) {
            if (file.type !== 'application/pdf') {
                setFileError('Only PDF files are allowed')
                formik.setFieldValue('resumeFile', null)
            } else if (file.size > 5 * 1024 * 1024) {
                // 5MB size limit
                setFileError('File size should be less than 5MB')
                formik.setFieldValue('resumeFile', null)
            } else {
                setFileError('') // Clear any previous errors
                formik.setFieldValue('resumeFile', file)
            }
        }
    }

    const formik = useFormik<FormValuesCareer>({
        initialValues: {
            fullName: '',
            email: '',
            phone: '',
            currentLocation: '',
            designation: '',
            currentCompany: '',
            experienceInYears: '',
            currentCTC: '',
            expectedCTC: '',
            noticePeriod: '',
            willingToRelocate: '',
            offerInHand: '',
            flexibleWithSplitShift: '',
            questionsOrComments: '',
            resumeFile: null,
        },
        validationSchema: validationSchemaCareer,
        onSubmit: async (values: FormValuesCareer, { resetForm }) => {
            const { resumeFile, ...formDataWithoutFile } = values // Destructure to remove resumeFile from formData
            const file = resumeFile // Keep a reference to the file
            await submitForm(formDataWithoutFile, 'resume', 'info@athayogliving.com', file ?? undefined, 'resume')
            if (!error) {
                resetForm()
                setSuccess(false)
                router.push('/thank-you')
            }
        },
    })

    return (
        <div className="element" id="career-scroll-target">
            <form onSubmit={formik.handleSubmit}>
                {/* Full Name */}
                <Box>
                    <Typography sx={{ marginBottom: '30px', color: '#284E01', fontWeight: '700', fontSize: { xs: '28px', md: '35px' } }}>Personal Information</Typography>
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

                    {/* Email and Phone side by side */}
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
                                id="phone"
                                name="phone"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                error={Boolean(formik.errors.phone)}
                                helperText={formik.errors.phone}
                                sx={{ mb: 3 }}
                            />
                        </Box>
                    </Box>

                    {/* Current Location */}
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
                <Divider sx={{ borderColor: '#7D9571', height: '3px', margin: '50px 0px' }} />

                {/* Designation and Current Company side by side */}
                <Box>
                    <Typography sx={{ marginBottom: '30px', color: '#284E01', fontWeight: '700', fontSize: { xs: '28px', md: '35px' } }}>Work Information</Typography>
                    <Typography sx={{ marginBottom: '12px', color: '#284E01', fontWeight: '500' }}>Designation Applying For</Typography>
                    <FormControl fullWidth sx={{ mb: 3 }}>
                        <Select
                            sx={{
                                '&& .MuiSelect-outlined': {
                                    backgroundColor: '#fff',
                                },
                            }}
                            id="designation"
                            name="designation"
                            value={formik.values.designation}
                            onChange={formik.handleChange}
                            error={Boolean(formik.errors.designation)}
                        >
                            <MenuItem value="">
                                <em>Select Designation</em>
                            </MenuItem>
                            <MenuItem value="Yoga Teacher">Yoga Teacher</MenuItem>
                            <MenuItem value="Center Manager">Center Manager</MenuItem>
                            <MenuItem value="Sales Executive">Sales Executive</MenuItem>
                            <MenuItem value="Graphic Designer">Graphic Designer</MenuItem>
                        </Select>
                        {formik.errors.designation ? <FormHelperText error>{formik.errors.designation}</FormHelperText> : null}
                    </FormControl>
                    <Box sx={{ display: 'flex', gap: '20px', flexDirection: { xs: 'column', md: 'row' } }}>
                        <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                            <Typography sx={{ marginBottom: '12px', color: '#284E01', fontWeight: '500' }}>Current Company</Typography>
                            <TextField
                                fullWidth
                                id="currentCompany"
                                name="currentCompany"
                                value={formik.values.currentCompany}
                                onChange={formik.handleChange}
                                error={Boolean(formik.errors.currentCompany)}
                                helperText={formik.errors.currentCompany}
                                sx={{ mb: 3 }}
                            />
                        </Box>
                        <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                            <Typography sx={{ marginBottom: '12px', color: '#284E01', fontWeight: '500' }}>Experience in Years</Typography>
                            <TextField
                                fullWidth
                                id="experienceInYears"
                                name="experienceInYears"
                                value={formik.values.experienceInYears}
                                onChange={formik.handleChange}
                                error={Boolean(formik.errors.experienceInYears)}
                                helperText={formik.errors.experienceInYears}
                                sx={{ mb: 3 }}
                            />
                        </Box>
                    </Box>

                    {/* Experience, Current CTC, Expected CTC, Notice Period */}
                    <Box sx={{ display: 'flex', gap: '20px', flexDirection: { xs: 'column', md: 'row' } }}>
                        <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                            <Typography sx={{ marginBottom: '12px', color: '#284E01', fontWeight: '500' }}>Current CTC</Typography>
                            <TextField
                                fullWidth
                                id="currentCTC"
                                name="currentCTC"
                                value={formik.values.currentCTC}
                                onChange={formik.handleChange}
                                error={Boolean(formik.errors.currentCTC)}
                                helperText={formik.errors.currentCTC}
                                sx={{ mb: 3 }}
                            />
                        </Box>
                        <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                            <Typography sx={{ marginBottom: '12px', color: '#284E01', fontWeight: '500' }}>Expected CTC</Typography>
                            <TextField
                                fullWidth
                                id="expectedCTC"
                                name="expectedCTC"
                                value={formik.values.expectedCTC}
                                onChange={formik.handleChange}
                                error={Boolean(formik.errors.expectedCTC)}
                                helperText={formik.errors.expectedCTC}
                                sx={{ mb: 3 }}
                            />
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', gap: '20px', flexDirection: { xs: 'column', md: 'row' } }}>
                        <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                            <Typography sx={{ marginBottom: '12px', color: '#284E01', fontWeight: '500' }}>Notice Period</Typography>
                            <TextField
                                fullWidth
                                id="noticePeriod"
                                name="noticePeriod"
                                value={formik.values.noticePeriod}
                                onChange={formik.handleChange}
                                error={Boolean(formik.errors.noticePeriod)}
                                helperText={formik.errors.noticePeriod}
                                sx={{ mb: 3 }}
                            />
                        </Box>
                        <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                            <Typography sx={{ marginBottom: '12px', color: '#284E01', fontWeight: '500' }}>Willing to Relocate</Typography>
                            <FormControl fullWidth sx={{ mb: 3 }}>
                                <Select
                                    sx={{
                                        '&& .MuiSelect-outlined': {
                                            backgroundColor: '#fff',
                                        },
                                    }}
                                    id="willingToRelocate"
                                    name="willingToRelocate"
                                    value={formik.values.willingToRelocate}
                                    onChange={formik.handleChange}
                                    error={Boolean(formik.errors.willingToRelocate)}
                                >
                                    <MenuItem value="">
                                        <em>Select Option</em>
                                    </MenuItem>
                                    <MenuItem value="Yes">Yes</MenuItem>
                                    <MenuItem value="No">No</MenuItem>
                                </Select>
                                {formik.errors.willingToRelocate ? <FormHelperText error>{formik.errors.willingToRelocate}</FormHelperText> : null}
                            </FormControl>
                        </Box>
                    </Box>

                    {/* Willing to Relocate, Offer In Hand */}
                    <Box sx={{ display: 'flex', gap: '20px', flexDirection: { xs: 'column', md: 'row' } }}>
                        <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                            <Typography sx={{ marginBottom: '12px', color: '#284E01', fontWeight: '500' }}>Any Offer in Hand ?</Typography>
                            <FormControl fullWidth sx={{ mb: 3 }}>
                                <Select
                                    sx={{
                                        '&& .MuiSelect-outlined': {
                                            backgroundColor: '#fff',
                                        },
                                    }}
                                    id="offerInHand"
                                    name="offerInHand"
                                    value={formik.values.offerInHand}
                                    onChange={formik.handleChange}
                                    error={Boolean(formik.errors.offerInHand)}
                                >
                                    <MenuItem value="">
                                        <em>Select Option</em>
                                    </MenuItem>
                                    <MenuItem value="Yes">Yes</MenuItem>
                                    <MenuItem value="No">No</MenuItem>
                                </Select>
                                {formik.errors.offerInHand ? <FormHelperText error>{formik.errors.offerInHand}</FormHelperText> : null}
                            </FormControl>
                        </Box>
                        <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                            <Typography sx={{ marginBottom: '12px', color: '#284E01', fontWeight: '500' }}>Are you flexible with split shift ?</Typography>
                            <FormControl fullWidth sx={{ mb: 3 }}>
                                <Select
                                    sx={{
                                        '&& .MuiSelect-outlined': {
                                            backgroundColor: '#fff',
                                        },
                                    }}
                                    id="flexibleWithSplitShift"
                                    name="flexibleWithSplitShift"
                                    value={formik.values.flexibleWithSplitShift}
                                    onChange={formik.handleChange}
                                    error={Boolean(formik.errors.flexibleWithSplitShift)}
                                >
                                    <MenuItem value="">
                                        <em>Select Option</em>
                                    </MenuItem>
                                    <MenuItem value="Yes">Yes</MenuItem>
                                    <MenuItem value="No">No</MenuItem>
                                </Select>
                                {formik.errors.flexibleWithSplitShift ? <FormHelperText error>{formik.errors.flexibleWithSplitShift}</FormHelperText> : null}
                            </FormControl>
                        </Box>
                    </Box>

                    {/* Flexibility with Split Shift */}

                    {/* Questions or Comments */}
                    <Typography sx={{ marginBottom: '12px', color: '#284E01', fontWeight: '500' }}>If any questions comment here:</Typography>
                    <TextField
                        fullWidth
                        id="questionsOrComments"
                        name="questionsOrComments"
                        value={formik.values.questionsOrComments}
                        onChange={formik.handleChange}
                        multiline
                        rows={4}
                        sx={{ mb: 3 }}
                    />

                    {/* Resume File */}
                    <Box sx={{ display: 'flex', gap: { xs: '50px', md: '20px' }, justifyContent: 'space-between', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center' }}>
                        <Box sx={{ alignSelf: { xs: 'baseline', md: 'inherit' } }}>
                            <Typography sx={{ marginBottom: '12px', color: '#284E01', fontWeight: '500' }}>Upload Resume</Typography>
                            <Button
                                sx={{
                                    backgroundColor: '#EFEFEF',
                                    padding: ' 21.607px 43.213px',
                                    height: { xs: '41px', md: '68px' },
                                    border: ' 2.161px solid rgba(64, 64, 64, 0.50)',
                                    borderRadius: '14.405px',
                                    boxShadow: 'none',
                                    fontWeigth: '500',
                                    fontSize: { xs: '13px', md: '23.047px' },
                                    color: '#284E01',
                                }}
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                            >
                                Choose File
                                <VisuallyHiddenInput id="resumeFile" name="resumeFile" type="file" onChange={handleFileChange} multiple />
                            </Button>
                            {formik.values.resumeFile?.name ? (
                                <Box sx={{ marginLeft: '10px', display: 'inline' }}>{formik.values.resumeFile.name}</Box>
                            ) : (
                                <Box sx={{ marginLeft: '10px', display: 'inline' }}>No file chosen</Box>
                            )}
                            {formik.errors.resumeFile && <FormHelperText error>{formik.errors.resumeFile}</FormHelperText>}
                        </Box>
                        <Box>
                            <RegisterButton color="primary" variant="contained" fullWidth type="submit" sx={{ margin: { xs: '0 auto', md: 0 } }} disabled={loading}>
                                {loading ? 'Submitting...' : 'Submit'}
                            </RegisterButton>
                        </Box>
                    </Box>
                </Box>
                {/* Submit Button */}
            </form>
        </div>
    )
}

export default CareerForm
