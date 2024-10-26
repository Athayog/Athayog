import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { Box, Button, Typography } from '@mui/material'
import NotFoundImage from '/public/images/404Image.png'

export const metadata: Metadata = {
    title: '404 Not Found | Athayog',
    description: 'Athayog - 404 Not Found',
}

export default function NotFound() {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                position: 'relative',
                background: 'linear-gradient(to bottom, #e3f9e3,#cef5e2)',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    flexDirection: 'column',
                    width: '100%',
                    color: '#000',
                }}
            >
                <Image src={NotFoundImage} width={400} alt="404" />
                <Typography
                    sx={{
                        color: '#6D1102',
                        fontSize: { x: '36px', md: '44px' },
                        fontWeight: '700',
                        textAlign: 'center',
                        marginTop: '40px',
                    }}
                >
                    Sorry, Page Not Found
                </Typography>

                <Link href="/" passHref>
                    <Button
                        variant="contained"
                        sx={{
                            marginTop: '20px',
                            padding: '17.467px 23.289px',
                            height: '56px',
                        }}
                    >
                        {' '}
                        Back to Home
                    </Button>
                </Link>
            </Box>
        </Box>
    )
}
