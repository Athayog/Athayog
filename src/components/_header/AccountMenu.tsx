import useAuthStore from '@/store/useAuthStore'
import { Avatar, Menu, MenuItem, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function AccountMenu() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const { user, handleLogout } = useAuthStore()
    const router = useRouter()

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleAccountClick = () => {
        handleClose()
        router.push('/account')
    }

    const handleLogoutClick = () => {
        handleLogout()
        handleClose()
    }

    if (!user) return null

    return (
        <div>
            <Avatar
                id="menu-appbar"
                sx={{ width: 40, height: 40 }}
                onClick={handleMenu}
            >
                {user?.displayName?.charAt(0)}
            </Avatar>
            <Menu
                disableScrollLock={true}
                id="menu-appbar"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleAccountClick}>
                    <Typography textAlign="center">Account</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogoutClick}>
                    <Typography textAlign="center">Logout</Typography>
                </MenuItem>
            </Menu>
        </div>
    )
}

export default AccountMenu
