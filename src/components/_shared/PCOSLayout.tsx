import { Box, styled } from '@mui/material'
import theme from '@/styles/theme'

export const PCOSLayout = styled(Box)(() => ({
    maxWidth: '1440px',
    margin: '0 auto',
    padding: '50px 100px',
    [theme.breakpoints.down('lg')]: {
        padding: '50px 50px',
    },
    [theme.breakpoints.down('md')]: {
        padding: '0px 20px',
    },
}))
