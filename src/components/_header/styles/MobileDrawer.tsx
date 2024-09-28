import {
    Button,
    styled,
    Menu as MuiMenu,
    List as MuiList,
    Box,
    Drawer as MuiDrawer,
    ListItemButton,
    IconButton as MuiIconButton,
    Divider as MuiDivider,
} from '@mui/material';

export const NavLinkButton = styled(ListItemButton, {
    shouldForwardProp: (prop) => prop !== 'pathname' && prop !== 'path',
})<{
    path: string;
    pathname: string;
}>(({ theme, pathname, path }) => ({
    fontSize: '18px',
    color: pathname === path ? theme.palette.primary.main : 'white',
    padding: '12px 0px',
    minWidth: '50px',
}));

export const MenuButton = styled(Button)({
    color: 'white',
    fontSize: '18px',
});

export const Menu = styled(MuiMenu)({
    '& .MuiPaper-root': {
        borderRadius: '8px',
        color: 'white',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
});

export const List = styled(MuiList, {
    shouldForwardProp: (prop) => prop !== 'active',
})<{ active: boolean }>(({ active }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'baseline',
    marginLeft: active ? '30px' : '0px',
    marginTop: '5px',
    paddingLeft: active ? '10px' : '0px',
    borderWidth: active ? '2px' : '0px',
    borderStyle: active ? 'solid' : 'none',
    borderImage: active ? 'linear-gradient(180deg, rgba(217, 217, 217, 0.20) 0%, #AEFF47 100%) 1' : 'none',
    borderTop: '0px',
    borderRight: '0px',
    borderBottom: '0px',
    borderLeft: active ? '1px' : '0px',

    '& .MuiListItem-root': {
        color: 'white',
        marginLeft: '0px',
        padding: '12px 0px',
    },
}));

export const DrawerParent = styled(Box)(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'none',
    },
}));

export const DrawerContent = styled(Box)({
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    flexDirection: 'column',
});

export const DrawerNavContainer = styled(Box)({
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    fontSize: '18px',
    '& .MuiListItem-root': {
        span: {
            fontSize: '18px',
        },
    },
});

export const Drawer = styled(MuiDrawer)({
    '& .MuiDrawer-paper': {
        width: '100%',
        maxWidth: '100%',
        padding: '40px 35px',
        boxSizing: 'border-box',
        height: '100%',
        background: 'linear-gradient(180deg, #101010 20%, #1B2E08 100%)',
    },
});

export const IconButton = styled(MuiIconButton)(({ theme }) => ({
    color: theme.palette.primary.main,
    padding: '0px',
}));

export const Divider = styled(MuiDivider)({
    minWidth: '176px',
    borderColor: 'rgba(255, 255, 255, 0.20)',
});

export const TrialButton = styled(Button)(({ theme }) => ({
    fontSize: '18px',
    color: 'black',
    backgroundColor: 'white',
    padding: '15px, 25px',
    width: '100%',
    fontWeight: '700',
    span: {
        color: theme.palette.primary.main,
        marginLeft: '5px',
    },
}));
