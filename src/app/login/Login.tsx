'use client'
import RegisterButton from '@/components/elements/button/RegisterButton'
import {
    Box,
    Button,
    Divider,
    TextField,
    Typography,
    Snackbar,
    Select,
} from '@mui/material'
import { signInWithGoogle } from '@/lib/auth' // Import your Google sign-in function
import { useEffect, useState } from 'react'
import GoogleIcon from './GoogleIcon.svg'
import useAuthStore from '@/store/useAuthStore'
import { useRouter } from 'next/navigation'
import { RecaptchaVerifier } from 'firebase/auth'
import { auth } from '@/lib/firebase' // Your Firebase configuration
import theme from '@/styles/theme'

const Login = () => {
    const [loading, setLoading] = useState(false)
    const [otpLaoding, setOTPLoading] = useState(false)
    const [phone, setPhone] = useState('')
    const [otp, setOtp] = useState(['', '', '', '', '', '']) // Array to hold each OTP digit

    const [otpSent, setOtpSent] = useState(false)
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState('')
    const { user, handleSignIn, sendOtp, signInWithOtp } = useAuthStore() // Using Zustand store
    const router = useRouter()

    const handleGoogleLogin = async () => {
        setLoading(true)
        try {
            const user = await signInWithGoogle()
        } catch (error) {
            setSnackbarMessage('Google login failed. Please try again.')
            setSnackbarOpen(true)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user) {
            router.push('/')
        }
    }, [router, user])

    const setupRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier(
            auth,
            'recaptcha-container',
            {
                size: 'invisible',
                callback: () => {
                    console.log('Recaptcha verified!')
                },
            }
        )
    }

    const handleSendOtp = async () => {
        setupRecaptcha()
        setOTPLoading(true)
        try {
            const preFixed = '+91' + phone
            await sendOtp(preFixed)
        } catch (error) {
            setSnackbarMessage(
                'Error sending OTP. Please check your phone number.'
            )
            setSnackbarOpen(true)
        } finally {
            setOTPLoading(false)
        }
    }

    const handleVerifyOtp = async () => {
        try {
            const finalOtp = otp.join('')
            await signInWithOtp(phone, finalOtp)
        } catch (error) {
            console.error('Error verifying OTP:', error)
            setSnackbarMessage('Error verifying OTP. Please try again.')
            setSnackbarOpen(true)
        }
    }

    const handleChangeOtp = (value: string, index: number) => {
        const newOtp = [...otp]
        newOtp[index] = value // Update the specific OTP digit
        setOtp(newOtp)

        // Focus next input automatically
        if (value && index < otp.length - 1) {
            const nextInput = document.getElementById(`otp-input-${index + 1}`)
            if (nextInput) nextInput.focus()
        }

        // Focus previous input if backspace is pressed
        if (!value && index > 0) {
            const prevInput = document.getElementById(`otp-input-${index - 1}`)
            if (prevInput) prevInput.focus()
        }
    }

    return (
        <Box
            sx={{
                backgroundColor: '#445236',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                padding: '10px',
            }}
        >
            <Box
                sx={{
                    backgroundColor: '#2F3E21',
                    borderRadius: '8px',
                    maxWidth: '500px',
                    color: '#fff',
                    padding: '30px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '25px',
                }}
            >
                {otpSent ? (
                    <Box sx={{ width: '100%' }}>
                        <Typography sx={{ fontSize: '32px' }}>
                            OTP Verification
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: '16px',
                                color: '#C5C5C5',
                                marginTop: '13px',
                            }}
                        >
                            Enter the code from the sms <br /> we sent to{' '}
                            <span style={{ color: '#FFF' }}>{phone}</span>
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: '10px',
                                marginBottom: '10px',
                                marginTop: '30px',
                            }}
                        >
                            {otp.map((digit, index) => (
                                <TextField
                                    key={index}
                                    id={`otp-input-${index}`}
                                    value={digit}
                                    onChange={(e) =>
                                        handleChangeOtp(e.target.value, index)
                                    }
                                    inputProps={{
                                        maxLength: 1,
                                        style: { textAlign: 'center' },
                                    }}
                                    sx={{
                                        width: '60px',
                                        marginTop: '10px',
                                        borderRadius: '8px',
                                        color: '#000',
                                        input: {
                                            borderRadius: '8px',
                                            color: '#000',
                                            background: '#EBEBEB',
                                        },
                                        fieldset: {
                                            border: '1px solid #D4D7E3',

                                            color: '#000',
                                        },
                                        [theme.breakpoints.down('md')]: {
                                            width: '100%',
                                        },
                                    }}
                                />
                            ))}
                        </Box>
                        <RegisterButton
                            onClick={handleVerifyOtp}
                            sx={{
                                padding: '16px 0px',
                                height: '52px',
                                fontSize: '20px',
                                marginTop: '37px',
                            }}
                        >
                            Verify OTP
                        </RegisterButton>
                        <Typography sx={{ marginTop: '37px' }}>
                            I didn&apos;t receive any code.{' '}
                            <span
                                style={{ color: '#4A9103', cursor: 'pointer' }}
                                onClick={handleSendOtp}
                            >
                                RESEND
                            </span>
                        </Typography>
                    </Box>
                ) : (
                    <>
                        <Typography sx={{ fontSize: '32px' }}>
                            Welcome Back to Wellness 👋
                        </Typography>
                        <Button
                            onClick={handleGoogleLogin}
                            disabled={loading}
                            sx={{
                                bgcolor: '#fff',
                                color: '#000',
                                padding: '10px 20px',
                                display: 'flex',
                                justifyContent: 'center',
                                gap: '16px',
                                fontSize: '20px',
                            }}
                        >
                            <GoogleIcon />
                            {loading ? 'Signing In...' : 'Log In With Google'}
                        </Button>

                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                my: 2,
                            }}
                        >
                            <Divider
                                sx={{ flexGrow: 1, borderColor: '#C1C1C1' }}
                            />
                            <Typography sx={{ mx: 2, color: '#626262' }}>
                                Or
                            </Typography>
                            <Divider
                                sx={{ flexGrow: 1, borderColor: '#C1C1C1' }}
                            />
                        </Box>

                        <Box sx={{ width: '100%' }}>
                            <Typography
                                sx={{ fontSize: '24px', marginBottom: '10px' }}
                            >
                                Had an account with phone?
                            </Typography>
                            <Typography>Phone</Typography>

                            <TextField
                                placeholder="+91"
                                onChange={(e) => setPhone(e.target.value)}
                                sx={{
                                    width: '100%',
                                    marginTop: '10px',
                                    borderRadius: '8px',
                                    color: '#000',
                                    input: {
                                        borderRadius: '8px',
                                        color: '#000',
                                        background: '#EBEBEB',
                                    },
                                    fieldset: {
                                        border: '1px solid #D4D7E3',

                                        color: '#000',
                                    },
                                }}
                            />
                        </Box>

                        <RegisterButton
                            onClick={handleSendOtp}
                            disabled={otpLaoding}
                            sx={{
                                width: '100%',
                                padding: '16px 0px',
                                height: '52px',
                                fontSize: '20px',
                            }}
                        >
                            {otpLaoding ? 'Sending OTP...' : 'Get OTP'}
                        </RegisterButton>

                        <Typography sx={{ textAlign: 'center' }}>
                            Don&apos;t have an account?{' '}
                            <span
                                style={{ color: '#4A9103', cursor: 'pointer' }}
                                onClick={handleGoogleLogin}
                            >
                                Sign up with Google
                            </span>
                        </Typography>
                    </>
                )}

                {/* Invisible reCAPTCHA */}
                <div id="recaptcha-container"></div>
            </Box>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                message={snackbarMessage}
            />
        </Box>
    )
}

export default Login
