'use client'

import { ThemeProvider } from '@mui/material/styles'
import { Box } from '@mui/material'
import { yogaTheme } from './theme'

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider theme={yogaTheme}>
            <Box sx={{ minHeight: '100vh', bgcolor: '#faf7f2' }}>
                {children}
            </Box>
        </ThemeProvider>
    )
}
