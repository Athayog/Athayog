import React from 'react'
import { Typography, Box } from '@mui/material'

// ─── Eyebrow Label ─────────────────────────────────────────────────────────────
interface EyebrowLabelProps {
    children: React.ReactNode
    dark?: boolean
}

export function EyebrowLabel({ children, dark = false }: EyebrowLabelProps) {
    return (
        <Typography
            variant="caption"
            component="div"
            sx={{
                display: 'block',
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                fontWeight: 600,
                color: dark ? '#47820D' : 'secondary.main',
                mb: 1.5,
            }}
        >
            {children}
        </Typography>
    )
}

// ─── Section Header ────────────────────────────────────────────────────────────
interface SectionHeaderProps {
    eyebrow?: string
    title: React.ReactNode
    subtitle?: string
    dark?: boolean
}

export function SectionHeader({ eyebrow, title, subtitle, dark = false }: SectionHeaderProps) {
    return (
        <Box mb={5}>
            {eyebrow && <EyebrowLabel dark={dark}>{eyebrow}</EyebrowLabel>}
            <Typography variant="h2" sx={{ color: dark ? '#fff' : 'text.primary', fontSize: { xs: '1.7rem', md: '2.2rem' } }}>
                {title}
            </Typography>
            {subtitle && (
                <Typography variant="body1" sx={{ mt: 1, color: dark ? 'rgba(255,255,255,0.55)' : 'text.secondary', maxWidth: 540 }}>
                    {subtitle}
                </Typography>
            )}
        </Box>
    )
}
