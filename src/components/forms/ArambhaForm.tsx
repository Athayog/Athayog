'use client'

import RegisterButton from '@/components/elements/button/RegisterButton';
import { generatePDFBlob } from '@/components/forms/generatePdf';
import useFormStore from '@/store/useFormStore';
import { Alert, Backdrop, Box, CircularProgress, FormControl, FormControlLabel, FormHelperText, InputAdornment, LinearProgress, linearProgressClasses, MenuItem, Radio, RadioGroup, Select, Snackbar, styled, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { useRouter } from 'next/navigation';
import QRCode from 'qrcode';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 12,
    borderRadius: 6,
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.1)'
            : theme.palette.grey[300],

    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 6,
        backgroundImage:
            theme.palette.mode === 'dark'
                ? 'linear-gradient(90deg, #00c6ff 0%, #0072ff 100%)'
                : 'linear-gradient(90deg, #00c853 0%, #b2ff59 100%)',
        animation: 'progress-glow 1.5s ease-in-out infinite',
    },

    '@keyframes progress-glow': {
        '0%': { boxShadow: '0 0 5px rgba(0, 195, 255, 0.4)' },
        '50%': { boxShadow: '0 0 15px rgba(0, 195, 255, 0.9)' },
        '100%': { boxShadow: '0 0 5px rgba(0, 195, 255, 0.4)' },
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



function generateTicketID(): string {
    const prefix = 'ATH-';

    // Get base36 timestamp (compact and time-sensitive)
    const timestampPart = Date.now().toString(36).toUpperCase();

    // Get 4 characters from UUID (randomness)
    const uuidPart = uuidv4().replace(/-/g, '').slice(0, 4).toUpperCase();

    // Merge and rehash as base36 again
    const merged = `${timestampPart}${uuidPart}`;

    // Convert the merged string to a hash code number (ensuring numeric conversion)
    let hash = 0;
    for (let i = 0; i < merged.length; i++) {
        hash = (hash * 31 + merged.charCodeAt(i)) >>> 0; // Unsigned 32-bit int
    }

    const finalId = hash.toString(36).toUpperCase().slice(0, 6);

    return `${prefix}${finalId}`;
}



const ArambhaForm = ({ data }: any) => {
    const [qrData, setQrData] = useState<string | null>(null);
    const { loading, error, success, submitForm, fileURL } = useFormStore()
    const [submittedData, setSubmittedData] = useState<any>(null);
    const [apiError, setApiError] = useState<string | null>(null);
    const [progressStep, setProgressStep] = useState('');
    const [percentage, setPercentage] = useState(0)
    const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
    const router = useRouter();

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

            let globalTicketID = '';
            try {
                setPercentage(20)
                setProgressStep('🔍 Verifying your information...');

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


                setProgressStep('🎫 Generating your ticket...');
                const ticketID = generateTicketID();
                globalTicketID = ticketID;
                const qrDataUrl = await QRCode.toDataURL(ticketID);
                setQrData(ticketID);

                const resPDF = generatePDFBlob({ name: values.name, ticketId: ticketID, qrDataUrl });

                setPercentage(40);

                const pdfBlob = await resPDF;
                const pdfFile = new File([pdfBlob], ticketID.toString() + '.pdf', { type: 'application/pdf' });
                const pdfUrl = URL.createObjectURL(pdfBlob);
                setDownloadUrl(pdfUrl);
                let fullData = {
                    ...values,
                    ticketID,
                    qrDataUrl,
                };


                // Now call your other submitForm function and pass the file
                setProgressStep('💾 Saving your details securely...');
                await submitForm(fullData, 'arambhaForm25', null, pdfFile, 'arambhaForm25')


                setPercentage(80)
                setProgressStep('📧 Sending tickets to your inbox...');

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
                            media_url: (fullData as any).fileUrl,
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
                setProgressStep('✅ All done! You’re all set!');
                await new Promise((resolve) => setTimeout(resolve, 2000));
                setSubmittedData(fullData);
                resetForm();
                router.push(`/thank-you-for-registering?ticketID=${globalTicketID}`);
            } catch (error) {
                setApiError('Unexpected error occurred. Please try again.');
            } finally {
                setSubmitting(false);
                setPercentage(0)
                setProgressStep('');
            }
        }
    });

    return (

        <Box sx={{ width: '100%', padding: { xs: '0px 10px', md: 'inherit' } }}>

            <Backdrop
                open={formik.isSubmitting}
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, color: '#fff', flexDirection: 'column' }}
            >

                <Box sx={{ maxWidth: '300px', minWidth: '200px' }}>
                    <BorderLinearProgress variant="determinate" value={percentage} />
                </Box>
                <Typography variant="body1" sx={{
                    mt: 1,
                    fontSize: { xs: '16px', md: '22px' },
                    color: '#ffffff', // force white text
                    textShadow: '0px 1px 4px rgba(0, 0, 0, 0.9)', // subtle glow for readability
                    px: 1.5,
                    py: 0.5,
                    textAlign: 'center',
                    borderRadius: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.3)' // optional background to lift from Backdrop
                }}>
                    {progressStep || "Please wait..."}
                </Typography>

            </Backdrop>



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
                                            <MenuItem value="indiranagar run club">Indiranagar run club</MenuItem>
                                        </Select>
                                        {formik.touched.eventSource && Boolean(formik.errors.eventSource) ? <FormHelperText error>{formik.errors.eventSource}</FormHelperText> : null}
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
        </Box >
    );

};

export default ArambhaForm;
