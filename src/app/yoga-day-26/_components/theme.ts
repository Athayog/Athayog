import { createTheme } from '@mui/material/styles'

export const yogaTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#4f6148',
            dark: '#3d4e38',
            light: '#e8ede6',
            contrastText: '#fff',
        },
        secondary: {
            main: '#b8892a',
            light: '#f5edd8',
            contrastText: '#fff',
        },
        background: {
            default: '#faf7f2',
            paper: '#ffffff',
        },
        text: {
            primary: '#1c1c1c',
            secondary: '#555',
            disabled: '#888',
        },
        divider: '#e2ddd5',
        error: { main: '#b00020' },
    },
    typography: {
        fontFamily: "'Inter', system-ui, sans-serif",
        h1: { fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400, lineHeight: 1.15 },
        h2: { fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400, lineHeight: 1.25 },
        h3: { fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400 },
        h4: { fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400 },
        h5: { fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400 },
        body1: { fontSize: '0.9375rem', lineHeight: 1.65 },
        body2: { fontSize: '0.875rem', lineHeight: 1.65 },
        caption: { fontSize: '0.72rem', letterSpacing: '0.08em' },
    },
    shape: { borderRadius: 2 },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                    textTransform: 'none',
                    fontWeight: 500,
                    letterSpacing: '0.05em',
                    fontSize: '0.8rem',
                },
            },
        },
    },
})
