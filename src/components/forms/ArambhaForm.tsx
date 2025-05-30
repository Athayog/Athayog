'use client'

import * as Yup from 'yup';
import QRCode from 'qrcode';
import { useState } from 'react';
import { useFormik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import useFormStore from '@/store/useFormStore';
import { Backdrop, CircularProgress, InputAdornment, LinearProgress, linearProgressClasses, styled } from '@mui/material';
import TicketDisplay from '@/components/forms/TicketDisplayPDF';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import RegisterButton from '@/components/elements/button/RegisterButton';
import { Alert, Box, Button, FormControl, FormControlLabel, FormHelperText, MenuItem, Radio, RadioGroup, Select, Snackbar, TextField, Typography } from '@mui/material';


const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[200],
        ...theme.applyStyles('dark', {
            backgroundColor: theme.palette.grey[800],
        }),
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: '#47820D',
        ...theme.applyStyles('dark', {
            backgroundColor: '#308fe8',
        }),
    },
}));

const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    phone: Yup.string().required('Required').test('is-valid-phone', 'Enter a valid phone number with country code', (value) => {
        const phoneNumber = parsePhoneNumberFromString(value || '');
        return phoneNumber?.isValid() ?? false;
    }),
    email: Yup.string().email('Invalid email').required('Required'),
    location: Yup.string().required('Required'),
    experience: Yup.string().required('Please select an option'),
    eventSource: Yup.string().required('Please select an option'),
    gender: Yup.string().required('Required'),
    tShirtSize: Yup.string().required('Required'),
    age: Yup.number().required('Required').min(1, 'Must be valid age'),
});


const generateTicketID = (phone: string, email: string) => {
    const prefix = 'ATH-';
    const phoneDigits = phone.replace(/\D/g, '').slice(0, 2);
    const emailPrefix = email.split('@')[0].replace(/[^a-zA-Z]/g, '').slice(0, 2).toUpperCase();
    const uuid = uuidv4().replace(/-/g, '').toUpperCase();
    const randomChars = uuid.slice(0, 2);

    return prefix + phoneDigits + emailPrefix + randomChars;
};

const ArambhaForm = ({ data }: any) => {
    const [qrData, setQrData] = useState<string | null>(null);
    const { loading, error, success, submitForm, fileURL } = useFormStore()
    const [submittedData, setSubmittedData] = useState<any>(null);
    const [apiError, setApiError] = useState<string | null>(null);
    const [progressStep, setProgressStep] = useState('');
    const [percentage, setPercentage] = useState(0)

    const formik = useFormik({
        initialValues: {
            name: '',
            phone: '+91',
            email: '',
            location: '',
            eventSource: '',
            gender: '',
            tShirtSize: '',
            age: '',
            experience: 'yes',
        },

        validationSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            setApiError(null);
            setSubmitting(true);
            setPercentage(0)
            setProgressStep('');
            try {
                setPercentage(20)
                setProgressStep('Checking for duplicates...');
                const res = await fetch('/api/yoga-day-duplicate/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ phone: values.phone, email: values.email }),
                });

                if (res.status === 409) {
                    const data = await res.json();
                    setProgressStep('');
                    setApiError(data.message || 'Either phone or email is already registered for this event.');
                    return;
                } else if (!res.ok) {
                    setProgressStep('');
                    setApiError('Something went wrong checking registration. Please try again.');
                    return;
                }


                setProgressStep('Generating your ticket...');
                const ticketID = generateTicketID(values.phone, values.email);
                const qrDataUrl = await QRCode.toDataURL(ticketID);
                setQrData(ticketID);

                const resPDF = await fetch('/api/generate-pdf', {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: values.name, ticketId: ticketID, qrDataUrl: qrDataUrl }),
                })
                setPercentage(40)

                if (!resPDF.ok) {
                    setProgressStep('');
                    setApiError('Something went wrong. Please try again.');
                    return;
                }

                // Get the PDF blob
                const pdfBlob = await resPDF.blob()

                // Convert blob to a File object
                const pdfFile = new File([pdfBlob], 'entry-pass.pdf', { type: 'application/pdf' })

                let fullData = {
                    ...values,
                    ticketID,
                    qrDataUrl,
                    fileURL: fileURL
                };

                // Now call your other submitForm function and pass the file
                setProgressStep('Saving your details...');
                await submitForm(fullData, 'arambhaForm25', 'info@athayogliving.com', pdfFile, 'arambhaForm25')
                setPercentage(80)
                setProgressStep('Sending confirmation email and WhatsApp...');

                const [emailRes, whatsAppRes] = await Promise.allSettled([
                    fetch('/api/send-email', {
                        method: 'POST',
                        body: JSON.stringify(fullData),
                        headers: { 'Content-Type': 'application/json' },
                    }),
                    fetch('/api/send-whatsapp', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            phoneNumber: fullData.phone,
                            name: fullData.name,
                            ticketId: fullData.ticketID,
                            media_url: fullData.fileURL,
                        }),
                    })
                ]);

                // Error handling
                if (emailRes.status === 'rejected' || !emailRes.value.ok) {
                    setApiError('Form submitted, but failed to send confirmation email.');
                }

                if (whatsAppRes.status === 'rejected' || !whatsAppRes.value.ok) {
                    setApiError('Form submitted, but failed to send WhatsApp ticket.');
                }
                setPercentage(100)
                setProgressStep('✅ All done!');

                setSubmittedData(fullData);
                resetForm();

            } catch (error) {
                setApiError('Unexpected error occurred. Please try again.');
            } finally {
                setSubmitting(false);
            }
        }
    });

    return (

        <Box sx={{ width: '100%', padding: { xs: '0px 30px', md: 'inherit' } }}>
            {submittedData && (
                <Box textAlign="center">
                    <TicketDisplay name={submittedData.name} ticketId={submittedData.ticketID} qrDataUrl={submittedData.qrDataUrl} />
                    <RegisterButton sx={{ marginTop: '30px' }} variant='contained' onClick={() => setSubmittedData(false)}>Register Another</RegisterButton>
                </Box>
            )}

            <Backdrop
                open={formik.isSubmitting}
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, color: '#fff', flexDirection: 'column' }}
            >

                <Box sx={{ maxWidth: '300px', minWidth: '200px' }}>
                    <BorderLinearProgress variant="determinate" value={percentage} />
                </Box>
                <Typography variant="body1" sx={{ mt: 2, fontSize: '22px' }}>
                    {progressStep}
                </Typography>

            </Backdrop>

            {!submittedData && (
                <Box sx={{ width: '100%' }}>
                    <Typography sx={{ fontSize: { xs: '34px', md: '48px' }, fontWeight: '700' }} align="center" gutterBottom color="green">
                        Registration Form
                    </Typography>
                    <Box sx={{ width: '100%' }}>
                        <form onSubmit={formik.handleSubmit}>
                            <Box display='flex' gap={5} alignItems="center" justifyContent="center">
                                {/* Left Image */}

                                <Box
                                    component="img"
                                    src={data?.leftimage.url || '/placeholder.png'} // Replace with actual path
                                    alt="Yoga Pose"
                                    sx={{ width: '100%', maxWidth: 200, display: { xs: 'none', md: 'block' }, mx: 'auto' }}
                                />


                                {/* Form */}
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: { xs: '100%', md: '800px' } }}>
                                    <Box display="flex" flexDirection="column" gap={2}>
                                        <TextField
                                            fullWidth
                                            name="name"
                                            sx={{ backgroundColor: '#FFFFFF' }}
                                            placeholder="Name"
                                            value={formik.values.name}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.name && Boolean(formik.errors.name)}
                                            helperText={formik.touched.name && formik.errors.name}
                                        />
                                        <TextField
                                            fullWidth
                                            name="phone"
                                            placeholder="Whatsapp Number"
                                            sx={{ backgroundColor: '#FFFFFF' }}
                                            type="tel"
                                            value={formik.values.phone.slice(3)} // Only show 10-digit number
                                            onChange={(e) => {
                                                const digits = e.target.value.replace(/[^\d]/g, '').slice(0, 10);
                                                formik.setFieldValue('phone', '+91' + digits);
                                            }}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">+91</InputAdornment>,
                                                inputProps: { maxLength: 10 }
                                            }}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                                            helperText={formik.touched.phone && formik.errors.phone}
                                        />
                                        <TextField
                                            fullWidth
                                            name="email"
                                            sx={{ backgroundColor: '#FFFFFF' }}
                                            placeholder="Email Address"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.email && Boolean(formik.errors.email)}
                                            helperText={formik.touched.email && formik.errors.email}
                                        />
                                        <FormControl fullWidth>
                                            <Select
                                                sx={{
                                                    '&& .MuiSelect-outlined': {
                                                        backgroundColor: '#fff',
                                                    },
                                                }}
                                                id="eventSource"
                                                name="eventSource"
                                                value={formik.values.eventSource}
                                                placeholder="How did you hear about this event?"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                displayEmpty
                                                error={formik.touched.eventSource && Boolean(formik.errors.eventSource)}
                                            >
                                                <MenuItem value="">
                                                    <em>How did you hear about this event?</em>
                                                </MenuItem>
                                                <MenuItem value="social media">Social media</MenuItem>
                                                <MenuItem value="whatsapp group">WhatsApp group message</MenuItem>
                                                <MenuItem value="friend family referral">Friend or family referral</MenuItem>
                                                <MenuItem value="event website">Event website</MenuItem>
                                                <MenuItem value="poster flyer">Poster or flyer</MenuItem>
                                                <MenuItem value="online advertisement">Online advertisement</MenuItem>
                                            </Select>
                                            {formik.errors.eventSource ? <FormHelperText error>{formik.errors.eventSource}</FormHelperText> : null}
                                        </FormControl>
                                        <TextField
                                            fullWidth
                                            name="location"
                                            sx={{ backgroundColor: '#FFFFFF' }}
                                            placeholder="Residential Location"
                                            value={formik.values.location}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.location && Boolean(formik.errors.location)}
                                            helperText={formik.touched.location && formik.errors.location}
                                        />
                                        <FormControl fullWidth error={formik.touched.gender && Boolean(formik.errors.gender)}>
                                            <Select
                                                name="gender"
                                                value={formik.values.gender}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                sx={{
                                                    '&& .MuiSelect-outlined': {
                                                        backgroundColor: '#fff',
                                                    },
                                                }}
                                                displayEmpty
                                            >
                                                <MenuItem value=""><em>Select Gender</em></MenuItem>
                                                <MenuItem value="male">Male</MenuItem>
                                                <MenuItem value="female">Female</MenuItem>
                                                <MenuItem value="other">Other</MenuItem>
                                            </Select>
                                            <FormHelperText>{formik.touched.gender && formik.errors.gender}</FormHelperText>
                                        </FormControl>

                                        <FormControl fullWidth error={formik.touched.tShirtSize && Boolean(formik.errors.tShirtSize)}>
                                            <Select
                                                name="tShirtSize"
                                                value={formik.values.tShirtSize}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                sx={{
                                                    '&& .MuiSelect-outlined': {
                                                        backgroundColor: '#fff',
                                                    },
                                                }}
                                                displayEmpty
                                            >
                                                <MenuItem value=""><em>Select T-Shirt Size</em></MenuItem>
                                                <MenuItem value="xs">XS</MenuItem>
                                                <MenuItem value="s">S</MenuItem>
                                                <MenuItem value="m">M</MenuItem>
                                                <MenuItem value="l">L</MenuItem>
                                                <MenuItem value="xl">XL</MenuItem>
                                                <MenuItem value="xxl">XXL</MenuItem>
                                            </Select>
                                            <FormHelperText>{formik.touched.tShirtSize && formik.errors.tShirtSize}</FormHelperText>
                                        </FormControl>

                                        <TextField
                                            fullWidth
                                            name="age"
                                            type="number"
                                            sx={{ backgroundColor: '#FFFFFF' }}
                                            placeholder="Age"
                                            value={formik.values.age}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.age && Boolean(formik.errors.age)}
                                            helperText={formik.touched.age && formik.errors.age}
                                        />

                                        <Box display="flex" alignItems="center">
                                            <Typography variant="body1" mr={2}>
                                                Any Yoga Experience?
                                            </Typography>
                                            <RadioGroup
                                                row
                                                name="experience"
                                                value={formik.values.experience}
                                                onChange={formik.handleChange}
                                            >
                                                <FormControlLabel value="yes" control={<Radio sx={{ color: 'green' }} />} label="Yes" />
                                                <FormControlLabel value="no" control={<Radio />} label="No" />
                                            </RadioGroup>
                                        </Box>
                                        {formik.touched.experience && formik.errors.experience && (
                                            <Typography variant="caption" color="error">
                                                {formik.errors.experience}
                                            </Typography>
                                        )}

                                        <RegisterButton
                                            type="submit"
                                            variant="contained"
                                            color="error"
                                            disabled={formik.isSubmitting}
                                            sx={{
                                                fontWeight: 'bold',
                                                margin: '20px auto',
                                                fontSize: { xs: '22px', md: '29px' },
                                                backgroundColor: '#FF5B02',
                                                position: 'relative',
                                            }}
                                        >
                                            {formik.isSubmitting ? (
                                                <>
                                                    <CircularProgress
                                                        size={24}
                                                        color="inherit"
                                                        sx={{ position: 'absolute', top: '50%', left: '50%', marginTop: '-12px', marginLeft: '-12px' }}
                                                    />
                                                    Submitting...
                                                </>
                                            ) : (
                                                'Register Now'
                                            )}
                                        </RegisterButton>
                                    </Box>

                                </Box>

                                {/* Right Image */}

                                <Box
                                    component="img"
                                    src={data?.rightimage.url || '/placeholder.png'} // Replace with actual path
                                    alt="Assisted Yoga Pose"
                                    sx={{ width: '100%', maxWidth: 200, display: { xs: 'none', md: 'block' }, mx: 'auto' }}
                                />

                            </Box>
                        </form>
                    </Box>
                </Box>
            )}

            {/* Error Snackbar */}
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={!!error || !!apiError} autoHideDuration={4000} onClose={() => useFormStore.setState({ error: null })}>
                <Alert onClose={() => {
                    setApiError(null)
                    useFormStore.setState({ error: null })
                }
                }
                    severity="error">
                    {error || apiError}
                </Alert>
            </Snackbar>
        </Box>
    );

};

export default ArambhaForm;
