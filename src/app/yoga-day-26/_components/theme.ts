import { createTheme } from '@mui/material/styles'

export const yogaTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#47820D',
            dark: '#2b3524',
            light: '#f1f5ee',
            contrastText: '#fff',
        },
        secondary: {
            main: '#4f6148',
            light: '#f1f5ef',
            contrastText: '#fff',
        },
        background: {
            default: '#fcfdfc',
            paper: '#ffffff',
        },
        text: {
            primary: '#1a2016',
            secondary: '#4b5563',
            disabled: '#888',
        },
        divider: '#dce3d5',
        error: { main: '#b00020' },
    },
    typography: {
        fontFamily: "var(--font-inter), system-ui, sans-serif",
        h1: { fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 400, lineHeight: 1.15 },
        h2: { fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 400, lineHeight: 1.25 },
        h3: { fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 400 },
        h4: { fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 400 },
        h5: { fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 400 },
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
