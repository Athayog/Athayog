'use client'
import React from 'react'
import theme from '@/styles/theme'
import { styled, Button as MuiButton, ButtonProps } from '@mui/material'

// Styled ActionButton using MUI's styled utility
export const ActionButton = styled(MuiButton)(() => ({
    boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.44)',
    padding: '17px 40px',
    borderRadius: '46.578px',
    height: '56px',
    fontSize: '20px',
    [theme.breakpoints.down('md')]: {
        height: '46px',
        padding: '10px 40px',
        fontSize: '17px',
    },
}))

// Button component that forwards props and children
const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
    return <ActionButton {...props}>{children}</ActionButton>
}

export default Button
