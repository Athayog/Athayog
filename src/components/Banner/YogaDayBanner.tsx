'use client'
import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const BANNER_HEIGHT = 36

export default function YogaDayBanner() {
  const pathname = usePathname()

  if (pathname?.startsWith('/yoga-day-26')) return null
  if (pathname === '/scanner') return null

  return (
    <Link href="/yoga-day-26" passHref style={{ textDecoration: 'none' }}>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1301,
          bgcolor: '#2b3524',
          py: { xs: '6px', md: '8px' },
          px: { xs: 2, md: 4 },
          textAlign: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          cursor: 'pointer',
          transition: 'background 0.25s ease',
          '&:hover': { bgcolor: '#3a4a30' },
        }}
      >
        <Typography
          sx={{
            fontFamily: 'var(--font-inter)',
            fontSize: { xs: '0.72rem', md: '0.82rem' },
            color: '#faf7f2',
            letterSpacing: '0.04em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: { xs: 0.5, md: 1 },
            flexWrap: 'wrap',
          }}
        >
          Yoga Arambha 2026 — Free Yoga Celebration on 21st June by Athayog Living —&nbsp;
          <Box
            component="span"
            sx={{
              color: '#b3d98c',
              fontWeight: 600,
              fontSize: { xs: '0.68rem', md: '0.78rem' },
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
              textDecorationColor: 'rgba(179, 217, 140, 0.4)',
            }}
          >
            Register Now →
          </Box>
        </Typography>
      </Box>
    </Link>
  )
}
