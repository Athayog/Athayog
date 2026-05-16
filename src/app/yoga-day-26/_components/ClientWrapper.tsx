'use client'

import { ThemeProvider } from '@mui/material/styles'
import { Box } from '@mui/material'
import { yogaTheme } from './theme'

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider theme={yogaTheme}>
            <Box
                component="a"
                href="#main-content"
                sx={{
                    position: 'absolute',
                    top: -100,
                    left: 20,
                    bgcolor: '#38660a',
                    color: '#fff',
                    px: 3,
                    py: 1.5,
                    zIndex: 9999,
                    textDecoration: 'none',
                    fontWeight: 600,
                    transition: 'top 0.3s',
                    '&:focus': { top: 20 },
                }}
            >
                Skip to main content
            </Box>
            <Box id="main-content" sx={{ minHeight: '100vh', bgcolor: '#fcfdfc' }}>
                {children}
            </Box>
        </ThemeProvider>
    )
}
