import { Menu as MuiMenu, styled } from '@mui/material';

export const Menu = styled(MuiMenu)(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: '8px',
        color: 'white',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        fontSize: '18px',
        marginLeft: '10px',
        '& .MuiMenuItem-root': {
            fontSize: '18px',
            '&:active': {
                color: theme.palette.primary.main,
            },
        },
        '&&& .MuiButtonBase-root': {
            fontSize: '18px',
        },
    },
}));
