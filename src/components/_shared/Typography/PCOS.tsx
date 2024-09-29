import { Box, styled, Typography } from '@mui/material'

export const Gradient = styled(Box)(() => ({
    background:
        ' linear-gradient(56deg,rgba(254,186,207,1) 0%, rgba(254,186,207,1) 23%, rgba(255,189,206,1) 32%, rgba(254,202,204,1) 49%, rgba(254,208,208,1) 63%, rgba(254,184,209,1) 80%, rgba(253,211,215,1) 86%, rgba(254,199,231,1) 100%)',
    pointerEvents: 'none',
    zIndex: '-1',
}))

export const Title = styled(Box)(({ theme }) => ({
    color: '#C32A58',
    fontWeight: 700,
    fontStyle: 'normal',
    lineHeight: '86px',
    marginBottom: '25px',
    fontSize: '48px', // Default for small screen
    [theme.breakpoints.down('md')]: {
        fontSize: '38px', // Large screen
        lineHeight: '52px',
    },
}))

export const Subtitle = styled(Box)(({ theme }) => ({
    color: '#000',
    fontWeight: 400,
    fontStyle: 'normal',
    lineHeight: '39.2px', // 163.333%
    marginBottom: '35px',
    fontSize: '24px', // Default for small screens
    [theme.breakpoints.down('md')]: {
        fontSize: '18px', // Large screens
        lineHeight: '26px',
    },
}))
