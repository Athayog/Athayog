'use client'
import React, { useState } from 'react';
import {
    Box,
    Button,
    Container,
    Grid,
    TextField,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio,
    CircularProgress,
    Select,
    FormControl,
    MenuItem,
    FormHelperText,
    Snackbar,
    Alert,
    Table, TableBody, TableCell, TableContainer, TableRow,
    Paper,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { QRCodeSVG } from 'qrcode.react';
import useFormStore from '@/store/useFormStore';
import { v4 as uuidv4 } from 'uuid';
import TicketDisplay from './TicketDisplayPDF';

const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    phone: Yup.string().required('Required'),
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

    // Get digits from phone, take first 2
    const phoneDigits = phone.replace(/\D/g, '').slice(0, 2);

    // Get first 2 letters from email prefix (before @), only alphabets
    const emailPrefix = email.split('@')[0].replace(/[^a-zA-Z]/g, '').slice(0, 2).toUpperCase();

    // Generate UUID and take first 2 alphanumeric chars (skip dashes)
    const uuid = uuidv4().replace(/-/g, '').toUpperCase();
    const randomChars = uuid.slice(0, 2);

    return prefix + phoneDigits + emailPrefix + randomChars; // 6 chars after ATH-
};

const ArambhaForm = ({ data }: any) => {
    const uniqueID = uuidv4(); // Unique ID
    const [qrData, setQrData] = useState<string | null>(null);
    const { loading, error, success, submitForm } = useFormStore()
    const [submittedData, setSubmittedData] = useState<any>(null);
    const [apiError, setApiError] = useState<string | null>(null);

    const formik = useFormik({
        initialValues: {
            name: '',
            phone: '',
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
            setApiError(null); // Reset any previous API error

            // Check for duplicate registration
            const res = await fetch('/api/yoga-day-duplicate/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone: values.phone, email: values.email }),
            });

            // Handle duplicate registration
            if (res.status === 409) {
                const data = await res.json();
                setApiError(data.message || 'Either phone or email is already registered for this event.');
                setSubmitting(false);
                return; // stop submission
            } else if (!res.ok) {
                setApiError('Something went wrong checking registration. Please try again.');
                setSubmitting(false);
                return;
            }

            // Proceed with form submission
            const ticketID = generateTicketID(values.phone, values.email);

            const fullData = {
                ...values,
                ticketID: ticketID,
            };

            await submitForm(fullData, 'arambhaForm25', ``)

            setSubmitting(false)
            setSubmittedData(fullData);

            // Generate QR code data
            const qrString = ticketID
            setQrData(qrString);

            resetForm()
        },
    });

    return (
        <Box sx={{ py: 6, mt: '100px' }}>
            <Container maxWidth="lg">


                {submittedData && (
                    <Box mt={4} textAlign="center">
                        <TicketDisplay submittedData={submittedData} qrData={qrData || ''} />
                        <Button sx={{ marginTop: '10px' }} variant='contained' onClick={() => setSubmittedData(false)}>Register Another</Button>
                    </Box>
                )}

                {!submittedData && (
                    <Box sx={{ py: 6 }}>
                        <Typography variant="h4" align="center" gutterBottom color="green">
                            Registration Form
                        </Typography>
                        <Container maxWidth="lg">
                            <form onSubmit={formik.handleSubmit}>
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                                    {/* Left Image */}
                                    <Grid item xs={12} md={3}>
                                        <Box
                                            component="img"
                                            src={data?.leftimage.url || '/placeholder.png'} // Replace with actual path
                                            alt="Yoga Pose"
                                            sx={{ width: '100%', maxWidth: 250, display: 'block', mx: 'auto' }}
                                        />
                                    </Grid>

                                    {/* Form */}
                                    <Grid item xs={12} md={6}>
                                        <Box display="flex" flexDirection="column" gap={2}>
                                            <TextField
                                                fullWidth
                                                name="name"
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
                                                type="tel"
                                                value={formik.values.phone}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.phone && Boolean(formik.errors.phone)}
                                                helperText={formik.touched.phone && formik.errors.phone}
                                            />
                                            <TextField
                                                fullWidth
                                                name="email"
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

                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="error"
                                                disabled={formik.isSubmitting}
                                                sx={{
                                                    py: 1.5,
                                                    fontWeight: 'bold',
                                                    fontSize: '1rem',
                                                    borderRadius: '30px',
                                                    position: 'relative',
                                                }}
                                            >
                                                {formik.isSubmitting ? (
                                                    <CircularProgress
                                                        size={24}
                                                        color="inherit"
                                                        sx={{ position: 'absolute', top: '50%', left: '50%', marginTop: '-12px', marginLeft: '-12px' }}
                                                    />
                                                ) : (
                                                    'Register Now'
                                                )}
                                            </Button>
                                        </Box>
                                    </Grid>

                                    {/* Right Image */}
                                    <Grid item xs={12} md={3}>
                                        <Box
                                            component="img"
                                            src={data?.rightimage.url || '/placeholder.png'} // Replace with actual path
                                            alt="Assisted Yoga Pose"
                                            sx={{ width: '100%', maxWidth: 250, display: 'block', mx: 'auto' }}
                                        />
                                    </Grid>
                                </Grid>
                            </form>
                        </Container>
                    </Box>
                )}
            </Container>
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
