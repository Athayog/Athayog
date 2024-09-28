'use client'
import { Box, styled } from '@mui/material'

export const LayoutContainer = styled(Box)(({ theme }) => ({
    backgroundColor: '#e9fdde',
    [theme.breakpoints.down('lg')]: {
        padding: '50px 0px 0px 0px',
    },
}))

export const LayoutContent = styled(Box)(({ theme }) => ({
    // maxWidth: '1440px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '80px',
    [theme.breakpoints.down('md')]: {
        gap: '50px',
    },
}))
