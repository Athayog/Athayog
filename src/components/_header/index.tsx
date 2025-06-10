'use client'
import MobileDrawer from '@/components/_header/MobileDrawer'
import { RenderMenuItems } from '@/components/_header/RenderMenuItems'
import { Menu, MenuButton, NavContainer, NavLinkButton, Toolbar, TrialButton, TrialAndAuth } from '@/components/_header/styles/Index'
import { navItems } from '@/constants/navItems'
import Logo from '../../../public/images/Logo.png'
import { AppBar, Box, Button } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import useThemeStore from '@/store/useThemeStore'
import AccountMenu from '@/components/_header/AccountMenu'
import ScrollListener from '@/hooks/ScrollListener'
import useAuthStore from '@/store/useAuthStore'

const Navbar: React.FC = () => {
    // State for managing open menus independently
    const [anchorEls, setAnchorEls] = useState<{ [key: number]: HTMLElement | null }>({})
    const [subMenuAnchorEl, setSubMenuAnchorEl] = useState<HTMLElement | null>(null)
    const pathname = usePathname()
    const { navigationVariant, isScrolled } = useThemeStore()
    const { user } = useAuthStore()
    const [gradient, setGradient] = useState('linear-gradient(to bottom, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0) 100%)')


    const handleClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
        // Update the anchor element for the clicked menu
        setAnchorEls((prev) => ({
            ...prev,
            [index]: event.currentTarget,
        }))
        setSubMenuAnchorEl(null) // Close submenu if any
    }

    const handleClose = (index: number) => {
        // Close the specific menu
        setAnchorEls((prev) => ({
            ...prev,
            [index]: null,
        }))
    }

    const handleSubMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setSubMenuAnchorEl(event.currentTarget)
    }

    const initializeAuth = useAuthStore((state) => state.initializeAuth)

    useEffect(() => {
        const unsubscribe = initializeAuth()
        return unsubscribe
    }, [initializeAuth])

    const blockedPaths = ['/yoga-arambha-25', '/thank-you-for-registering']
    return (
        <>
            {!blockedPaths.includes(pathname) && (
                <Box sx={{ backgroundColor: '#FFF0D8', color: '#000', textAlign: 'center', p: '5px', zIndex: 9999, position: 'fixed', top: 0, width: '100%', mb: 2 }}>
                    🧘‍♀️ <strong>Yoga Arambha 2025</strong> registration is now open!{' '}
                    <Link href="/yoga-arambha-25" style={{ color: '#000', textDecoration: 'underline' }}>Register for free here</Link>. ✨
                </Box>
            )}

            <AppBar
                position="fixed"
                sx={{
                    background: isScrolled ? '#556940' : gradient,
                    boxShadow: 'none',
                    mt: { xs: !blockedPaths.includes(pathname) ? 6 : 0, md: !blockedPaths.includes(pathname) ? 4 : 0 },
                    padding: isScrolled ? '10px 20px' : '25px 20px',
                    transition: 'padding 0.5s ease-in-out, background 0.5s ease-in-out',
                    ...(pathname === '/yoga-arambha-25' && {
                        pointerEvents: 'none',
                    }),
                }}
            >

                <ScrollListener />
                <Toolbar navigationVariant={navigationVariant}>
                    <Box
                        sx={{
                            width: { xs: 52, sm: 52, md: 52 },
                            height: { xs: 52, sm: 52, md: 52 },
                        }}
                    >
                        <Link href={'/'} passHref={true}>
                            <Image src={Logo} alt="athayog logo" width={67} height={67} style={{ width: '100%', height: 'auto' }} />
                        </Link>
                    </Box>

                    {pathname !== '/yoga-arambha-25' &&
                        <NavContainer>
                            {navItems.map(({ label, path, type, children }, index) => {
                                if (type === 'nav') {
                                    return (
                                        <Link href={path || '/'} passHref={true} key={index}>
                                            <NavLinkButton variant="text" pathname={pathname} path={path || '/'} navigationVariant={navigationVariant}>
                                                {label}
                                            </NavLinkButton>
                                        </Link>
                                    )
                                } else if (type === 'menu' && children) {
                                    return (
                                        <React.Fragment key={index}>
                                            <MenuButton variant="text" aria-controls={anchorEls[index] ? `submenu-${index}` : undefined} aria-haspopup="true" onClick={(event) => handleClick(event, index)}>
                                                {label}
                                            </MenuButton>
                                            <Menu
                                                id={`submenu-${index}`}
                                                anchorEl={anchorEls[index]}
                                                open={Boolean(anchorEls[index])}
                                                onClose={() => handleClose(index)}
                                                disableScrollLock={true}
                                                MenuListProps={{
                                                    'aria-labelledby': `submenu-button-${index}`,
                                                }}
                                            >
                                                {RenderMenuItems(children, () => handleClose(index), handleSubMenuClick, subMenuAnchorEl)}
                                            </Menu>
                                        </React.Fragment>
                                    )
                                }
                            })}
                        </NavContainer>
                    }

                    {pathname !== '/yoga-arambha-25' &&
                        <>
                            <TrialAndAuth>
                                {!user && (
                                    <Link href="/login">
                                        <Button
                                            sx={{
                                                backgroundColor: '#47820D',
                                                color: '#FFFFFF',
                                                padding: '15px, 25px',
                                                fontSize: '18px',
                                                fontWeight: '700',
                                                width: '115px',
                                            }}
                                        >
                                            Login
                                        </Button>
                                    </Link>
                                )}
                                <Link href={'/trial-classes'} passHref={true}>
                                    <TrialButton variant="text">
                                        Get a<span>Free Trial</span>
                                    </TrialButton>
                                </Link>
                                <AccountMenu />
                            </TrialAndAuth>

                            <MobileDrawer />
                        </>
                    }
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar
