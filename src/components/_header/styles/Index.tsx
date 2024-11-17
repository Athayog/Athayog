import { Box, Button, ButtonProps, Toolbar as MuiToolbar, styled, Menu as MuiMenu } from '@mui/material'

export const Toolbar = styled(MuiToolbar, {
    shouldForwardProp: (prop) => prop !== 'navigationVariant',
})<{ navigationVariant: string }>(({ navigationVariant }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0px',
    color: navigationVariant === 'light' ? 'black' : 'white',
}))

export const NavContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: '30px',
    color: 'inherit',
    [theme.breakpoints.down('md')]: {
        display: 'none',
    },
    [theme.breakpoints.up('lg')]: {
        gap: '60px',
    },
}))

interface NavLinkButtonProps extends ButtonProps {
    path: string
    pathname: string
    navigationVariant: string
}

export const NavLinkButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== 'pathname' && prop !== 'path' && prop !== 'navigationVariant',
})<NavLinkButtonProps>(({ theme, pathname, path, navigationVariant }) => ({
    fontSize: '18px',
    textTransform: 'capitalize',
    color: pathname === path ? '##7FB942' : navigationVariant === 'light' ? 'black' : 'white',
}))

export const MenuButton = styled(Button)({
    color: 'inherit',
    fontSize: '18px',
    textTransform: 'capitalize',
})

export const Menu = styled(MuiMenu)({
    '& .MuiPaper-root': {
        borderRadius: '8px',
        color: 'inherit',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        textTransform: 'capitalize',
    },
})

export const TrialButton = styled(Button)(({ theme }) => ({
    fontSize: '18px',
    color: 'black',
    backgroundColor: 'white',
    padding: '15px, 25px',
    width: '174px',
    fontWeight: '700',
    span: {
        color: theme.palette.primary.main,
        marginLeft: '5px',
    },
    [theme.breakpoints.down('md')]: {
        display: 'none',
    },
}))

export const TrialAndAuth = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    [theme.breakpoints.down('md')]: {
        display: 'none',
    },
}))
