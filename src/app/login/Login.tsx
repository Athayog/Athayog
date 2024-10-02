'use client'
import RegisterButton from '@/components/elements/button/RegisterButton'
import { Box, Button, Divider, TextField, Typography } from '@mui/material'
import { signInWithGoogle } from '@/lib/auth' // Import your Google sign-in function
import { useEffect, useState } from 'react'
import GoogleIcon from './GoogleIcon.svg'
import useAuthStore from '@/store/useAuthStore'
import { useRouter } from 'next/navigation'

const Login = () => {
    const [loading, setLoading] = useState(false)
    const { user } = useAuthStore()
    const router = useRouter()

    const handleGoogleLogin = async () => {
        setLoading(true)
        try {
            const user = await signInWithGoogle()
            console.log('User signed in:', user)
            // Handle user login, e.g., redirect or update state
        } catch (error) {
            console.error('Google login failed:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user) {
            router.push('/')
        }
    }, [router, user])

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
                    width: '500px',
                    color: '#fff',
                    padding: '30px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '25px',
                }}
            >
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
                    <GoogleIcon />{' '}
                    {loading ? 'Signing In...' : 'Log In With Google'}
                </Button>

                <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
                    <Divider sx={{ flexGrow: 1, borderColor: '#C1C1C1' }} />
                    <Typography sx={{ mx: 2, color: '#626262' }}>Or</Typography>
                    <Divider sx={{ flexGrow: 1, borderColor: '#C1C1C1' }} />
                </Box>
                <Box sx={{ width: '100%' }}>
                    <Typography sx={{ fontSize: '24px', marginBottom: '10px' }}>
                        Had an account with phone?
                    </Typography>
                    <Typography>Phone</Typography>
                    <TextField
                        placeholder="+91"
                        sx={{
                            width: '100%',
                            marginTop: '10px',
                            background: '#EBEBEB',
                            borderRadius: '8px',
                            border: '1px solid #D4D7E3',
                            input: {
                                borderRadius: '8px',
                            },
                            fieldset: {
                                borderRadius: '8px',
                            },
                        }}
                    />
                </Box>
                <RegisterButton
                    sx={{
                        width: '100%',
                        padding: '16px 0px',
                        height: '52px',
                        fontSize: '20px',
                    }}
                >
                    Get OTP
                </RegisterButton>
                <Typography sx={{ textAlign: 'center' }}>
                    Don&apos;t have an account?{' '}
                    <span
                        style={{ color: '#4A9103', cursor: 'pointer' }}
                        onClick={handleGoogleLogin}
                    >
                        Sign up with google
                    </span>
                </Typography>
            </Box>
        </Box>
    )
}

export default Login
