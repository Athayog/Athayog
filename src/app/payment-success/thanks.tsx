'use client'

import useAuthStore from '@/store/useAuthStore'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Box, Typography, Container, Button, CircularProgress } from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const PaymentSuccess = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const purchaseId = searchParams.get('id')

    const { user } = useAuthStore()
    const [purchase, setPurchase] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!user) return
        const fetchCourses = async () => {
            setLoading(true)
            try {
                const response = await fetch(`/api/course?userId=${user.uid}&purchaseId=${purchaseId}`)
                if (!response.ok) {
                    throw new Error('Failed to fetch courses')
                }
                const data = await response.json()
                setPurchase(data)
            } catch (err: any) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchCourses()
    }, [purchaseId, user])

    return (
        <Box
            sx={{
                backgroundColor: '#EAFEDF',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                py: 6,
            }}
        >
            <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
                {loading ? (
                    <CircularProgress />
                ) : error ? (
                    <Typography color="error">{error}</Typography>
                ) : (
                    <>
                        <CheckCircleIcon sx={{ fontSize: 80, color: '#4CAF50', mb: 3 }} />
                        <Typography
                            sx={{
                                fontSize: { xs: '26px', md: '30px' },
                                fontWeight: 600,
                                color: '#2A5200',
                                mb: 2,
                            }}
                        >
                            Payment Successful!
                        </Typography>

                        <Typography sx={{ color: '#4B4B4B', mb: 1 }}>
                            <strong>Course Name:</strong> {purchase?.name || 'N/A'}
                        </Typography>

                        <Typography sx={{ color: '#4B4B4B', mb: 1 }}>
                            <strong>Days Valid:</strong> {purchase?.days || 'N/A'}
                        </Typography>

                        <Typography sx={{ color: '#4B4B4B', mb: 1 }}>
                            <strong>Price Paid:</strong> ₹{purchase?.price || 'N/A'}
                        </Typography>

                        <Typography sx={{ color: '#4B4B4B', mb: 4 }}>
                            <strong>Date:</strong>{' '}
                            {purchase?.createdAt?._seconds
                                ? new Date(purchase.createdAt._seconds * 1000).toLocaleDateString('en-IN', {
                                      day: 'numeric',
                                      month: 'long',
                                      year: 'numeric',
                                  })
                                : 'N/A'}
                        </Typography>

                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            sx={{
                                borderRadius: '8px',
                                textTransform: 'none',
                                px: 4,
                                backgroundColor: '#2A5200',
                                '&:hover': {
                                    backgroundColor: '#204100',
                                },
                            }}
                            onClick={() => router.push('/')}
                        >
                            Back to Home
                        </Button>
                    </>
                )}
            </Container>
        </Box>
    )
}

export default PaymentSuccess
