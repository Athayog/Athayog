'use client'
import useFormStore from '@/store/useFormStore'
import theme from '@/styles/theme'
import { Alert, Box, Button, Snackbar, TextareaAutosize, TextField, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { Content } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'

// Validation schema using Yup
const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phone: Yup.string().required('Phone is required'),
    message: Yup.string().required('Message is required'),
})

const ContactContent = styled(Box)(({}) => ({
    background: '#E7FDDA',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '80px 120px',
    gap: '100px',
    [theme.breakpoints.down('lg')]: {
        padding: '40px 30px',
        gap: '80px',
    },
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        gap: '40px',
    },
}))

const ContactDetails = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: '40px',
    flexDirection: 'column',
    marginTop: '50px',
    svg: {
        height: '30px',
        width: '30px',
    },
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        gap: '13px',
        marginTop: '30px',
        svg: {
            height: '20px',
            width: '20px',
        },
    },
}))

const ContactFormContainer = styled(Box)(({ theme }) => ({
    backgroundColor: '#F8FFF4',
    padding: '30px 22px',
    width: '510px',
    border: '1px solid rgba(189, 189, 189, 0.30)',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    [theme.breakpoints.down('md')]: {
        backgroundColor: 'transparent',
        border: 'none',
        padding: '0px',
        width: '100%',
    },
}))

const ContactTextField = styled(TextField)(({}) => ({
    '& .MuiInputBase-root': {
        borderRadius: '10px',
        background: '#F9F9F9',
    },
    '& .MuiInputBase-root:focus': {
        borderRadius: '10px',
        background: '#fff',
    },
    '& .MuiInputBase-input': {
        fontSize: '16px',
    },
    '& label': {
        fontSize: '16px',
    },
}))

const ContactTextarea = styled(TextareaAutosize)(({}) => ({
    border: '1px solid #CDCDCD',
    width: '100%',
    borderRadius: '10px',
    padding: '10px',
    fontSize: '16px',
    fontFamily: 'inherit',
    background: '#F9F9F9',
    '&:focus': {
        background: '#fff',
    },
}))

const SubmitButton = styled(Button)(({}) => ({
    backgroundColor: '#417A07',
    color: '#fff',
    border: '1px solid #417A07',
    width: '100%',
    fontSize: '18px',
    borderRadius: '16px',
    height: '54px',
    '&:disabled': {
        backgroundColor: '#cfcfcf',
    },
}))

const StyledErrorMessage = styled(ErrorMessage)`
    color: red;
    font-size: 16px;
`

type FormData = {
    phone: string
    name: string
    email: string
    message: string
}

/**
 * Props for `ContactUsForm`.
 */
export type ContactUsFormProps = SliceComponentProps<Content.ContactUsFormSlice>

/**
 * Component for "ContactUsForm" Slices.
 */

const ContactContainer = styled(Box)(({}) => ({
    backgroundColor: '#E7FDDA',
}))
const ContactUsForm = ({ slice }: ContactUsFormProps): JSX.Element => {
    const [snackbar, setSnackbar] = useState<{
        type: 'success' | 'error'
        message: string
    } | null>(null)
    const { submitForm, loading, error } = useFormStore()
    const linkUrl = (slice.primary.link_to_email as any).url
    const handleSubmit = async (values: FormData, { resetForm }: FormikHelpers<FormData>) => {
        try {
            await submitForm(values, 'contactMessages', 'contentmanager@athayogliving.com')
            setSnackbar({
                type: 'success',
                message: 'Your message has been sent successfully!',
            })
            resetForm()
        } catch {
            // Handle case where submitForm was unsuccessful (e.g., error with Firebase)
            setSnackbar({
                type: 'error',
                message: error || 'An unexpected error occurred. Please try again later.',
            })
        }
    }

    const handleCloseSnackbar = () => {
        setSnackbar(null)
    }
    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <ContactContainer>
                <ContactContent>
                    <Box>
                        <Typography
                            sx={{
                                fontSize: '48px',
                                fontWeight: '700',
                                [theme.breakpoints.down('md')]: {
                                    fontSize: '28px',
                                },
                            }}
                        >
                            {slice.primary.left_title}
                        </Typography>
                        <Box
                            sx={{
                                marginTop: '22px',
                                maxWidth: '500px',
                                fontWeight: '400',
                                [theme.breakpoints.down('md')]: {
                                    fontSize: '16px',
                                },
                            }}
                        >
                            <PrismicRichText field={slice.primary.description} />
                        </Box>
                        <ContactDetails>
                            <Typography
                                sx={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    [theme.breakpoints.down('md')]: {
                                        fontSize: '16px',
                                    },
                                }}
                            >
                                <PrismicNextImage style={{ marginRight: '16px' }} field={slice.primary.location_icon} />
                                {slice.primary.location}
                            </Typography>
                            <Typography
                                sx={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    [theme.breakpoints.down('md')]: {
                                        fontSize: '16px',
                                    },
                                }}
                            >
                                <PrismicNextImage style={{ marginRight: '16px' }} field={slice.primary.location_number} />
                                {slice.primary.number}
                            </Typography>
                            <Typography
                                sx={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    color: 'black',
                                    [theme.breakpoints.down('md')]: {
                                        fontSize: '16px',
                                    },
                                }}
                            >
                                <a
                                    href="tel:+91 8690333111"
                                    style={{
                                        color: 'black',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <PrismicNextImage style={{ marginRight: '16px' }} field={slice.primary.email_icon} />
                                    {slice.primary.email}
                                </a>
                            </Typography>
                        </ContactDetails>
                    </Box>
                    <Snackbar open={!!snackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                        <Alert onClose={handleCloseSnackbar} severity={snackbar?.type} sx={{ width: '100%' }}>
                            {snackbar?.message}
                        </Alert>
                    </Snackbar>
                    <Box>
                        <Formik
                            initialValues={{
                                name: '',
                                email: '',
                                phone: '',
                                message: '',
                            }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <ContactFormContainer>
                                        {/* Name Field */}
                                        <Field as={ContactTextField} name="name" label="Name" fullWidth />
                                        <StyledErrorMessage name="name" component="div" />

                                        {/* Email Field */}
                                        <Field as={ContactTextField} name="email" label="Email" fullWidth />
                                        <StyledErrorMessage name="email" component="div" />

                                        {/* Phone Field */}
                                        <Field as={ContactTextField} name="phone" label="Phone number" fullWidth />
                                        <StyledErrorMessage name="phone" component="div" />

                                        {/* Message Field */}
                                        <Field as={ContactTextarea} name="message" placeholder="Your message" minRows={10} />
                                        <StyledErrorMessage name="message" component="div" />

                                        {/* Submit Button */}
                                        <SubmitButton type="submit" disabled={isSubmitting}>
                                            {loading ? 'Submitting' : 'Submit'}
                                        </SubmitButton>
                                    </ContactFormContainer>
                                </Form>
                            )}
                        </Formik>
                    </Box>
                </ContactContent>
            </ContactContainer>
        </section>
    )
}

export default ContactUsForm
