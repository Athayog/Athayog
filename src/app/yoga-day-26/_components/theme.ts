import { createTheme } from '@mui/material/styles'

export const yogaTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#38660a', // Darkened for 4.5:1 contrast on white
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
            secondary: '#444444', // Darkened from #4b5563 for better hierarchy
            disabled: '#666666',  // Darkened from #888 for accessibility
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
        body1: { fontSize: '1rem', lineHeight: 1.6 },
        body2: { fontSize: '0.88rem', lineHeight: 1.6 },
        caption: { fontSize: '0.75rem', letterSpacing: '0.04em' },
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
