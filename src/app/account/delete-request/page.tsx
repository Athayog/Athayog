'use client'
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    TextField,
    Typography,
    TextareaAutosize,
    Snackbar,
    Alert,
    styled,
} from '@mui/material'
import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import useFormStore from '@/store/useFormStore' // import your Zustand store

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
    color: '#fff',
    width: '100%',
    fontSize: '18px',
    borderRadius: '16px',
    height: '54px',
    '&:disabled': {
        backgroundColor: '#cfcfcf',
    },
}))

interface FormValues {
    name: string
    email: string
    phone: string
    reason: string
}

const DeleteRequestSchema = Yup.object().shape({
    name: Yup.string().required('This is required'),
    email: Yup.string().email('Invalid email').required('This is required'),
    phone: Yup.string().required('This is required'),
    reason: Yup.string().required('This is required'),
})

const DeleteRequest: React.FC = () => {
    const [captcha, setCaptcha] = useState<string | null>(null)
    const [openSnackbar, setOpenSnackbar] = useState(false)

    const { loading, error, success, submitForm, setError, setSuccess } =
        useFormStore()

    const handleSubmit = async (values: FormValues, { resetForm }: any) => {
        await submitForm(
            values,
            'accountDeletionRequests',
            `info@athayogliving.com`
        )

        // Display success or error notification
        if (success) {
            setOpenSnackbar(true)
            resetForm()
        }
        if (error) {
            setOpenSnackbar(true)
        }
    }

    const handleSnackbarClose = () => {
        setOpenSnackbar(false)
        setError(null) // reset error
        setSuccess(false) // reset success
    }

    return (
        <Box
            sx={{
                background: '#fff',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Box
                sx={{
                    maxWidth: '1000px',
                    padding: {
                        xs: '120px 10px',
                        md: '120px 50px',
                    },
                }}
            >
                <Typography
                    variant="h3"
                    component="h1"
                    sx={{ fontSize: { xs: '30px', md: '40px' } }}
                >
                    Account Deletion Request
                </Typography>
                <Box
                    sx={{
                        marginTop: { xs: '20px', md: '40px' },
                        padding: '4',
                        border: '1',
                        borderColor: 'grey',
                        borderRadius: 'boderRadius',
                    }}
                >
                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            phone: '',
                            reason: '',
                        }}
                        validationSchema={DeleteRequestSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <FormControl margin="normal">
                                        <FormLabel htmlFor="name">
                                            Name
                                        </FormLabel>
                                        <Field
                                            name="name"
                                            as={ContactTextField}
                                            id="name"
                                        />
                                        <ErrorMessage
                                            name="name"
                                            component={FormHelperText}
                                        />
                                    </FormControl>

                                    <FormControl margin="normal">
                                        <FormLabel htmlFor="email">
                                            Email
                                        </FormLabel>
                                        <Field
                                            name="email"
                                            as={ContactTextField}
                                            type="email"
                                            id="email"
                                        />
                                        <ErrorMessage
                                            name="email"
                                            component={FormHelperText}
                                        />
                                    </FormControl>

                                    <FormControl margin="normal">
                                        <FormLabel htmlFor="phone">
                                            Phone
                                        </FormLabel>
                                        <Field
                                            name="phone"
                                            as={ContactTextField}
                                            type="tel"
                                            id="phone"
                                        />
                                        <ErrorMessage
                                            name="phone"
                                            component={FormHelperText}
                                        />
                                    </FormControl>

                                    <FormControl margin="normal">
                                        <FormLabel htmlFor="reason">
                                            Reason
                                        </FormLabel>
                                        <Field
                                            name="reason"
                                            as={ContactTextarea}
                                            minRows={10}
                                            id="reason"
                                        />
                                        <ErrorMessage
                                            name="reason"
                                            component={FormHelperText}
                                        />
                                    </FormControl>

                                    <SubmitButton
                                        type="submit"
                                        variant="contained"
                                        color="error"
                                        size="large"
                                        disabled={isSubmitting || loading}
                                        fullWidth
                                    >
                                        {loading
                                            ? 'Submitting...'
                                            : 'Submit Request'}
                                    </SubmitButton>

                                    <Typography
                                        marginTop={4}
                                        sx={{
                                            border: '1px solid #ddd',
                                            padding: '10px',
                                            borderRadius: '10px',
                                            backgroundColor: '#f9f9f9',
                                        }}
                                        color="textSecondary"
                                    >
                                        By submitting this form, you acknowledge
                                        that your account will be permanently
                                        deleted. All associated data, including
                                        your personal information and any
                                        content, will be irreversibly removed
                                        from our system. This action cannot be
                                        undone, so please proceed with caution.
                                    </Typography>
                                </Box>
                            </Form>
                        )}
                    </Formik>

                    {/* Snackbar to show success or error messages */}
                    <Snackbar
                        open={openSnackbar}
                        autoHideDuration={6000}
                        onClose={handleSnackbarClose}
                    >
                        {success ? (
                            <Alert
                                onClose={handleSnackbarClose}
                                severity="success"
                                sx={{ width: '100%' }}
                            >
                                Account Deletion Request Submitted Successfully!
                            </Alert>
                        ) : (
                            <Alert
                                onClose={handleSnackbarClose}
                                severity="error"
                                sx={{ width: '100%' }}
                            >
                                {error
                                    ? error
                                    : 'Failed to submit delete request. Please try again later.'}
                            </Alert>
                        )}
                    </Snackbar>
                </Box>
            </Box>
        </Box>
    )
}

export default DeleteRequest
