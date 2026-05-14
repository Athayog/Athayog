'use client'

import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
    Box,
    Container,
    Typography,
    Grid,
    Button,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Stack,
    Link,
    InputAdornment,
    FormHelperText,
} from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { createTheme, ThemeProvider } from '@mui/material/styles'

// ─── Theme ────────────────────────────────────────────────────────────────────
const yogaTheme = createTheme({
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
        h1: {
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 400,
            lineHeight: 1.15,
        },
        h2: {
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 400,
            lineHeight: 1.25,
        },
        h3: {
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontWeight: 400,
        },
        h4: {
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontWeight: 400,
        },
        h5: {
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontWeight: 400,
        },
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

// ─── Static Data ──────────────────────────────────────────────────────────────
const SCHEDULE = [
    { time: '6:00 am – 6:30 am', activity: 'Registration & Welcome', highlight: false },
    { time: '6:30 am – 6:45 am', activity: 'Arrival of Dignitaries', highlight: false },
    { time: '6:45 am – 7:00 am', activity: 'Inauguration Ceremony', highlight: true },
    { time: '7:00 am – 8:00 am', activity: 'Mass Yoga Session', note: 'Led by Athayog Team', highlight: true },
    { time: '8:00 am – 8:05 am', activity: 'Talent Showcase', highlight: false },
    { time: '8:05 am – 8:10 am', activity: 'Address by Founder, Athayog', highlight: false },
    { time: '8:10 am – 8:30 am', activity: 'Address by Dignitaries', highlight: false },
    { time: '8:30 am – 8:35 am', activity: 'Valedictory & Closing Ceremony', highlight: false },
    { time: '8:35 am onwards', activity: 'Healthy Refreshments & Networking', highlight: false },
]

const WHY_ITEMS = [
    {
        title: 'Wellness for Women, Wellness for the World',
        body: 'When a woman thrives, communities flourish. Yoga nurtures mind, body, and soul — creating a ripple effect of strength and compassion that extends to families, societies, and the Earth itself.',
    },
    {
        title: 'Yoga for Every Body, Every Being',
        body: 'Yoga knows no boundaries — welcoming people of all ages, backgrounds, and walks of life. When we come together on the mat, we heal ourselves and contribute to collective planetary health.',
    },
    {
        title: 'Inner Calm, Outer Care',
        body: "Yoga is more than movement — it's mindfulness that grounds us in the present and awakens responsibility to nature. Through breath, balance, and awareness, we create harmony within and with the Earth.",
    },
]

const EXPERIENCE_ITEMS = [
    { num: '01', title: 'Yoga Practice', body: 'Tailored to all levels, focusing on postures and flows that promote strength, flexibility and energy.' },
    { num: '02', title: 'Breath Work', body: 'Guided practices to calm the mind, reduce stress and enhance vitality.' },
    { num: '03', title: 'Community Connection', body: 'Engage with a vibrant community in a warm, supportive and uplifting environment.' },
    { num: '04', title: 'Enriching Experiences', body: 'Discover holistic benefits of yoga through experiences that go beyond the mat.' },
]

const ACTIVITIES = [
    { title: 'Live Music', body: 'Soothing tunes elevating the yoga atmosphere' },
    { title: 'Live Painting', body: 'Yoga-inspired art created live on canvas' },
    { title: 'AI Station', body: 'Where technology meets wellness' },
    { title: 'Blood Donation', body: 'Give back through our wellness drive' },
    { title: 'Yoga as Career', body: 'Turn passion into profession' },
    { title: 'Yoga Clinics', body: 'Therapy, rehab & holistic health' },
]

const DIGNITARIES = [
    { tag: 'Presided by', name: 'Shri P.C. Mohan', role: 'MP, Central Bengaluru' },
    { tag: 'Chief Guest', name: 'Shri Tejasvi Surya', role: 'MP, South Bengaluru' },
    { tag: 'Guest of Honour', name: 'Shri BNS Reddy', role: 'Indiranagar Club President, Ex IPS' },
]

const FAQS = [
    {
        q: 'Is Yoga Arambha 2026 free to attend?',
        a: 'Yes, completely free and open to everyone. No yoga experience required. Simply register and show up.',
    },
    {
        q: 'Where is the event held?',
        a: 'Indiranagar Club, Bangalore on Sunday, June 21, 2026.',
    },
    {
        q: 'Do I need prior yoga experience?',
        a: 'Not at all. Sessions are tailored to every level — from complete beginners to experienced practitioners.',
    },
    {
        q: 'What time should I arrive?',
        a: 'On-site registration and welcome begins at 6:00 AM. Dignitaries arrive at 6:30 AM and the mass yoga session runs from 7:00–8:00 AM.',
    },
    {
        q: 'Who are the dignitaries at Yoga Arambha 2026?',
        a: 'The event is presided by Shri P.C. Mohan (MP, Central Bengaluru). Chief Guest is Shri Tejasvi Surya (MP, South Bengaluru). Guest of Honour is Shri BNS Reddy (Indiranagar Club President, Ex IPS).',
    },
    {
        q: 'What is the theme of Yoga Arambha 2026?',
        a: '"Yoga for Wellness, Wisdom & World Peace" — celebrating yoga as a tool for holistic health, mental well-being, and social harmony.',
    },
]

// ─── Yup Validation Schema ────────────────────────────────────────────────────
const registrationSchema = Yup.object({
    fullName: Yup.string().min(2, 'Name is too short').required('Full name is required'),
    phone: Yup.string()
        .matches(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number')
        .required('Phone number is required'),
    email: Yup.string().email('Enter a valid email address').required('Email is required'),
    gender: Yup.string().required('Please select your gender'),
    tshirtSize: Yup.string().required('Please select a T-shirt size'),
    heardFrom: Yup.string().required('Please tell us how you heard about us'),
    hasYogaExperience: Yup.string().required(),
})

// ─── Reusable: Eyebrow Label ──────────────────────────────────────────────────
interface EyebrowLabelProps {
    children: React.ReactNode
    dark?: boolean
}

function EyebrowLabel({ children, dark = false }: EyebrowLabelProps) {
    return (
        <Typography
            variant="caption"
            component="div"
            sx={{
                display: 'block',
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                fontWeight: 600,
                color: dark ? '#b8892a' : 'secondary.main',
                mb: 1.5,
            }}
        >
            {children}
        </Typography>
    )
}

// ─── Reusable: Section Header ─────────────────────────────────────────────────
interface SectionHeaderProps {
    eyebrow?: string
    title: React.ReactNode
    subtitle?: string
    dark?: boolean
}

function SectionHeader({ eyebrow, title, subtitle, dark = false }: SectionHeaderProps) {
    return (
        <Box mb={5}>
            {eyebrow && <EyebrowLabel dark={dark}>{eyebrow}</EyebrowLabel>}
            <Typography variant="h2" sx={{ color: dark ? '#fff' : 'text.primary', fontSize: { xs: '1.7rem', md: '2.2rem' } }}>
                {title}
            </Typography>
            {subtitle && (
                <Typography variant="body1" sx={{ mt: 1, color: dark ? 'rgba(255,255,255,0.55)' : 'text.secondary', maxWidth: 540 }}>
                    {subtitle}
                </Typography>
            )}
        </Box>
    )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function HeroSection() {
    return (
        <Box component="section" sx={{ bgcolor: '#3d2f1e', py: { xs: '3.5rem', md: '10rem' }, pb: { xs: '2.5rem', md: '4.5rem' }, position: 'relative', overflow: 'hidden' }}>
            <Container maxWidth="lg">
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr auto' }, gap: '3rem', alignItems: 'start' }}>
                    {/* Left */}
                    <Box>
                        <Box
                            sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.6rem',
                                border: '1px solid rgba(184,137,42,0.4)',
                                px: '1rem',
                                py: '0.35rem',
                                fontSize: '0.68rem',
                                letterSpacing: '0.14em',
                                textTransform: 'uppercase',
                                color: '#b8892a',
                                mb: '1.4rem',
                            }}
                        >
                            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                                <path d="M5.5 1L6.8 4.2H10.3L7.5 6.3L8.5 9.5L5.5 7.5L2.5 9.5L3.5 6.3L0.7 4.2H4.2Z" stroke="#b8892a" strokeWidth="1" fill="rgba(184,137,42,.15)" />
                            </svg>
                            International Day of Yoga 2026
                        </Box>
                        <Typography variant="h1" sx={{ color: '#fff', fontSize: { xs: '2.4rem', md: '4rem' }, mb: '0.6rem' }}>
                            Yoga Arambha
                            <br />
                            <Box component="span" sx={{ color: '#b8892a', fontStyle: 'italic' }}>
                                2026
                            </Box>
                        </Typography>
                        <Typography
                            sx={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', fontSize: { xs: '1rem', md: '1.25rem' }, color: 'rgba(255,255,255,0.5)', mb: '1.8rem' }}
                        >
                            &ldquo;Yoga for Wellness, Wisdom &amp; World Peace&rdquo;
                        </Typography>
                        <Stack direction={{ xs: 'column', sm: 'row' }} flexWrap="wrap" gap="1.2rem" mb="2.2rem">
                            {[
                                {
                                    label: (
                                        <>
                                            <strong style={{ color: '#fff' }}>June 21, 2026</strong> — Sunday
                                        </>
                                    ),
                                },
                                {
                                    label: (
                                        <>
                                            <strong style={{ color: '#fff' }}>Indiranagar Club</strong>, Bangalore
                                        </>
                                    ),
                                },
                                { label: <>6:00 AM — 8:30 AM</> },
                            ].map((m, i) => (
                                <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.65)' }}>
                                    {m.label}
                                </Box>
                            ))}
                        </Stack>
                        <Stack direction="row" flexWrap="wrap" gap="0.8rem" alignItems="center">
                            <Button
                                href="#register"
                                sx={{ bgcolor: '#b8892a', color: '#fff', px: '2.4rem', py: '0.95rem', fontSize: '0.85rem', '&:hover': { bgcolor: '#9a7222' }, display: 'inline-flex', gap: '0.5rem' }}
                            >
                                Register Now
                            </Button>
                            <Button
                                href="#schedule"
                                sx={{
                                    border: '1.5px solid rgba(255,255,255,0.2)',
                                    color: 'rgba(255,255,255,0.6)',
                                    px: '1.8rem',
                                    py: '0.75rem',
                                    '&:hover': { borderColor: 'rgba(255,255,255,0.5)', color: '#fff' },
                                }}
                            >
                                View Schedule
                            </Button>
                            <Box
                                sx={{
                                    display: 'inline-block',
                                    bgcolor: '#f5edd8',
                                    color: '#b8892a',
                                    fontSize: '0.68rem',
                                    fontWeight: 600,
                                    letterSpacing: '0.08em',
                                    textTransform: 'uppercase',
                                    px: '0.8rem',
                                    py: '0.25rem',
                                    border: '1px solid rgba(184,137,42,0.3)',
                                }}
                            >
                                Free &amp; For Everyone
                            </Box>
                        </Stack>
                    </Box>
                    {/* Side box — hidden on mobile */}
                    <Box sx={{ display: { xs: 'none', md: 'block' }, bgcolor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', p: '1.5rem 1.8rem', minWidth: 210 }}>
                        <Typography sx={{ fontSize: '0.62rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', mb: '0.8rem' }}>Organised by</Typography>
                        <Typography sx={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1rem', color: '#fff', mb: '0.2rem' }}>Atha Yog Living</Typography>
                        <Typography sx={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.4)', mb: '1.2rem' }}>A Celebration of Yoga</Typography>
                        <Box sx={{ height: '1px', bgcolor: 'rgba(255,255,255,0.1)', mb: '1.2rem' }} />
                        {DIGNITARIES.map((d, i) => (
                            <Box key={d.name} sx={{ mt: i > 0 ? '1rem' : 0, pt: i > 0 ? '1rem' : 0, borderTop: i > 0 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                                <Typography sx={{ fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#b8892a', mb: '0.4rem' }}>{d.tag}</Typography>
                                <Typography sx={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.05rem', color: '#fff' }}>{d.name}</Typography>
                                <Typography sx={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.38)', fontStyle: 'italic' }}>{d.role}</Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

// ─── Schedule ─────────────────────────────────────────────────────────────────
function ScheduleSection() {
    return (
        <Box component="section" id="schedule" sx={{ py: { xs: 6, md: 8 }, bgcolor: '#fff' }}>
            <Container maxWidth="lg">
                <SectionHeader
                    eyebrow="Event Programme"
                    title="Schedule — June 21, 2026"
                    subtitle="A morning of movement, community and celebration from 6 AM to 8:35 AM at Indiranagar Club, Bangalore."
                />
                <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', mt: 2 }}>
                    <Box component="tbody">
                        {SCHEDULE.map((item, idx) => (
                            <Box
                                key={idx}
                                component="tr"
                                sx={{
                                    borderBottom: idx < SCHEDULE.length - 1 ? '1px solid #e2ddd5' : 'none',
                                    bgcolor: item.highlight ? '#e8ede6' : 'transparent',
                                }}
                            >
                                <Box
                                    component="td"
                                    sx={{
                                        py: '0.95rem',
                                        pr: '2rem',
                                        pl: item.highlight ? '0.8rem' : 0,
                                        fontSize: '0.76rem',
                                        fontWeight: 500,
                                        color: item.highlight ? '#4f6148' : '#b8892a',
                                        whiteSpace: 'nowrap',
                                        minWidth: 148,
                                        verticalAlign: 'top',
                                    }}
                                >
                                    {item.time}
                                </Box>
                                <Box component="td" sx={{ py: '0.95rem', pr: item.highlight ? '0.8rem' : 0, verticalAlign: 'top' }}>
                                    <Typography sx={{ fontSize: '0.9rem', color: '#1c1c1c' }}>{item.activity}</Typography>
                                    {item.note && <Typography sx={{ fontSize: '0.78rem', color: '#555', mt: '0.2rem' }}>{item.note}</Typography>}
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>
                <Box mt={3}>
                    <Button href="#register" sx={{ bgcolor: '#4f6148', color: '#fff', px: '1.8rem', py: '0.75rem', fontSize: '0.8rem', '&:hover': { bgcolor: '#3d4e38' } }}>
                        Secure Your Spot — It&apos;s Free
                    </Button>
                </Box>
            </Container>
        </Box>
    )
}

// ─── Why ──────────────────────────────────────────────────────────────────────
function WhySection() {
    return (
        <Box component="section" sx={{ py: { xs: 6, md: 8 }, bgcolor: '#e8ede6' }}>
            <Container maxWidth="lg">
                <SectionHeader eyebrow="Why Yoga Arambha" title="Movement with Meaning" subtitle="Personal well-being and planetary health are deeply intertwined. Arambha brings both together." />
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1.5px', background: '#e2ddd5', mt: 2.5 }}>
                    {WHY_ITEMS.map((item) => (
                        <Box key={item.title} sx={{ bgcolor: '#fff', p: '2rem 1.8rem' }}>
                            <Typography variant="h3" sx={{ color: '#3d2f1e', mb: '0.6rem', fontSize: '1.05rem' }}>
                                {item.title}
                            </Typography>
                            <Typography sx={{ fontSize: '0.88rem', color: '#555', lineHeight: 1.65 }}>{item.body}</Typography>
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    )
}

// ─── Experience ─────────────────────────────────────────────────────────────────
function ExperienceSection() {
    return (
        <Box component="section" sx={{ py: { xs: 6, md: 8 }, bgcolor: '#fff' }}>
            <Container maxWidth="lg">
                <SectionHeader eyebrow="What to Expect" title="Your Experience on the Day" />
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1rem', mt: 2.5 }}>
                    {EXPERIENCE_ITEMS.map((item) => (
                        <Box key={item.num} sx={{ p: '1.6rem 1.4rem', border: '1px solid #e2ddd5', bgcolor: '#fff' }}>
                            <Typography sx={{ fontFamily: "var(--font-playfair),Georgia,serif", fontSize: '2rem', fontWeight: 400, color: '#e8ede6', lineHeight: 1, mb: '0.8rem' }}>
                                {item.num}
                            </Typography>
                            <Typography sx={{ fontSize: '0.76rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#4f6148', mb: '0.4rem', fontWeight: 500 }}>{item.title}</Typography>
                            <Typography sx={{ fontSize: '0.84rem', color: '#555' }}>{item.body}</Typography>
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    )
}

// ─── Activities ─────────────────────────────────────────────────────────────────
function ActivitiesSection() {
    return (
        <Box component="section" sx={{ py: { xs: 6, md: 8 }, bgcolor: '#e8ede6' }}>
            <Container maxWidth="lg">
                <SectionHeader eyebrow="Allied Activities" title="More to Explore on the Day" />
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(155px,1fr))', gap: '1rem', mt: 2.5 }}>
                    {ACTIVITIES.map((item) => (
                        <Box
                            key={item.title}
                            sx={{
                                p: '1.4rem 1.2rem',
                                textAlign: 'center',
                                border: '1px solid #e2ddd5',
                                bgcolor: '#fff',
                                transition: 'all 0.2s ease',
                                '&:hover': { borderColor: '#4f6148', bgcolor: '#e8ede6' },
                            }}
                        >
                            <Typography sx={{ fontSize: '0.82rem', color: '#3d2f1e', fontWeight: 500, mb: '0.35rem' }}>{item.title}</Typography>
                            <Typography sx={{ fontSize: '0.76rem', color: '#555', lineHeight: 1.5 }}>{item.body}</Typography>
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    )
}

// ─── About ─────────────────────────────────────────────────────────────────────
function AboutSection() {
    return (
        <Box component="section" sx={{ py: { xs: 6, md: 8 }, bgcolor: '#fff' }}>
            <Container maxWidth="lg">
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: '3rem', alignItems: 'center' }}>
                    <Box>
                        <EyebrowLabel>About Atha Yog Living</EyebrowLabel>
                        <Typography variant="h2" sx={{ mb: 0 }}>
                            A Sanctum for the Spirit
                        </Typography>
                        <Box
                            component="blockquote"
                            sx={{
                                fontFamily: "var(--font-playfair),Georgia,serif",
                                fontSize: '1.25rem',
                                fontStyle: 'italic',
                                color: '#3d2f1e',
                                borderLeft: '2px solid #b8892a',
                                pl: '1.2rem',
                                my: '1.5rem',
                                lineHeight: 1.5,
                                m: '1.5rem 0',
                            }}
                        >
                            &ldquo;Atha&rdquo; means now, here begins. &ldquo;Yog&rdquo; means union.
                        </Box>
                        <Typography sx={{ fontSize: '0.9rem', color: '#555', mb: '0.9rem', lineHeight: 1.65 }}>
                            At AthaYog, we are devoted to preserving the long-standing legacy of Yog and propagating its true purpose, philosophies and practices associated with this age-old wisdom.
                        </Typography>
                        <Typography sx={{ fontSize: '0.9rem', color: '#555', lineHeight: 1.65 }}>
                            Our teachings are rooted in ancient scriptures — the Vedas, Sankhya Philosophy, Bhagwat Geeta, Patanjali&apos;s Yoga Sutras, and Hatha Yoga Pradipika.
                        </Typography>
                        <Box sx={{ display: 'flex', gap: '2rem', mt: '1.5rem' }}>
                            <Box>
                                <Typography sx={{ fontFamily: "var(--font-playfair),Georgia,serif", fontSize: '1.5rem', color: '#4f6148', fontWeight: 600, lineHeight: 1 }}>Atha</Typography>
                                <Typography sx={{ fontSize: '0.7rem', color: '#555', letterSpacing: '0.06em', mt: '0.2rem' }}>Now, Here Begins</Typography>
                            </Box>
                            <Box>
                                <Typography sx={{ fontFamily: "var(--font-playfair),Georgia,serif", fontSize: '1.5rem', color: '#4f6148', fontWeight: 600, lineHeight: 1 }}>Yog</Typography>
                                <Typography sx={{ fontSize: '0.7rem', color: '#555', letterSpacing: '0.06em', mt: '0.2rem' }}>Union, To Join</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ bgcolor: '#e8ede6', p: '3rem 2rem', textAlign: 'center', border: '1px solid #e2ddd5' }}>
                        <svg width="130" height="130" viewBox="0 0 130 130" fill="none">
                            <circle cx="65" cy="65" r="60" stroke="#4f6148" strokeWidth=".8" />
                            <circle cx="65" cy="65" r="44" stroke="#4f6148" strokeWidth=".6" strokeDasharray="4 4" />
                            <circle cx="65" cy="65" r="28" stroke="#b8892a" strokeWidth="1" />
                            <ellipse cx="65" cy="93" rx="25" ry="7" fill="rgba(79,97,72,.12)" />
                            <path d="M48 91Q46 77 52 66Q57 58 65 54Q73 58 78 66Q84 77 82 91Z" fill="rgba(79,97,72,.18)" stroke="#4f6148" strokeWidth=".9" />
                            <path d="M52 75Q41 73 34 80" stroke="#4f6148" strokeWidth="1.1" strokeLinecap="round" />
                            <path d="M78 75Q89 73 96 80" stroke="#4f6148" strokeWidth="1.1" strokeLinecap="round" />
                            <circle cx="65" cy="47" r="10" fill="rgba(79,97,72,.14)" stroke="#4f6148" strokeWidth=".9" />
                            <circle cx="65" cy="47" r="2.5" fill="#b8892a" />
                            <line x1="65" y1="14" x2="65" y2="37" stroke="#b8892a" strokeWidth=".7" />
                            <circle cx="65" cy="11" r="2.5" fill="#b8892a" opacity=".5" />
                        </svg>
                        <Typography sx={{ mt: '1rem', fontSize: '0.82rem', color: '#4f6148', fontStyle: 'italic', fontFamily: "var(--font-playfair),Georgia,serif" }}>
                            &ldquo;Reinstating belief in the ancient wisdom of Yog&rdquo;
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

// ─── Location ─────────────────────────────────────────────────────────────────
function LocationSection() {
    const rows = [
        { label: 'Venue', val: 'Indiranagar Club, Bangalore' },
        { label: 'Date', val: 'Sunday, June 21, 2026' },
        { label: 'Time', val: '6:00 AM – 8:35 AM' },
        { label: 'Organised by', val: 'Atha Yog Living — A Celebration of Yoga' },
    ]
    return (
        <Box component="section" sx={{ py: { xs: 6, md: 8 }, bgcolor: '#3d2f1e' }}>
            <Container maxWidth="lg">
                <Box mb={4}>
                    <EyebrowLabel dark>Venue</EyebrowLabel>
                    <Typography variant="h2" sx={{ color: '#fff' }}>
                        Find Us on June 21
                    </Typography>
                </Box>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: '2rem', alignItems: 'start' }}>
                    <Box>
                        {rows.map((r) => (
                            <Box key={r.label} sx={{ display: 'flex', gap: '0.9rem', mb: '1rem', alignItems: 'flex-start' }}>
                                <Box>
                                    <Typography sx={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.35)', mb: '0.12rem' }}>{r.label}</Typography>
                                    <Typography sx={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.82)' }}>{r.val}</Typography>
                                </Box>
                            </Box>
                        ))}
                        <Box mt={2}>
                            <Button href="#register" sx={{ bgcolor: '#b8892a', color: '#fff', px: '1.8rem', py: '0.75rem', fontSize: '0.8rem', '&:hover': { bgcolor: '#9a7222' } }}>
                                Register — Free Entry
                            </Button>
                        </Box>
                    </Box>
                    <Box sx={{ bgcolor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', p: '2rem', textAlign: 'center' }}>
                        <Box
                            sx={{
                                aspectRatio: '16/9',
                                bgcolor: 'rgba(255,255,255,0.03)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'rgba(255,255,255,0.2)',
                                fontSize: '0.8rem',
                                mb: '1rem',
                                flexDirection: 'column',
                                gap: 1,
                            }}
                        >
                            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ opacity: 0.25 }}>
                                <circle cx="18" cy="15" r="7" stroke="white" strokeWidth="1.3" />
                                <path d="M18 3C11 3 5 8.6 5 15C5 23.5 18 33 18 33C18 33 31 23.5 31 15C31 8.6 25 3 18 3Z" stroke="white" strokeWidth="1.3" fill="none" />
                            </svg>
                            Indiranagar Club, Bangalore
                        </Box>
                        <Link
                            href="https://maps.app.goo.gl/JpW1wbeDugHRp3ZKA"
                            target="_blank"
                            rel="noopener"
                            sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                fontSize: '0.78rem',
                                color: '#b8892a',
                                textDecoration: 'none',
                                '&:hover': { textDecoration: 'underline' },
                            }}
                        >
                            Open in Google Maps
                        </Link>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

// ─── Registration Form (Formik) ───────────────────────────────────────────────
function RegistrationForm() {
    const [submitted, setSubmitted] = React.useState(false)

    const formik = useFormik({
        initialValues: {
            fullName: '',
            phone: '',
            email: '',
            gender: '',
            tshirtSize: '',
            heardFrom: '',
            hasYogaExperience: 'no',
        },
        validationSchema: registrationSchema,
        onSubmit: (_values, { setSubmitting, resetForm }) => {
            // Replace with your API call, e.g. POST to /api/register
            console.log('Registration submitted:', _values)
            setTimeout(() => {
                setSubmitting(false)
                setSubmitted(true)
                resetForm()
            }, 800)
        },
    })

    if (submitted) {
        return (
            <Box sx={{ textAlign: 'center', py: 6 }}>
                <CheckCircleOutlineIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h3" sx={{ color: '#3d2f1e', mb: 1 }}>
                    You're Registered!
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Thank you for registering. See you on June 21 at Indiranagar Club, Bangalore.
                </Typography>
                <Button variant="outlined" color="primary" sx={{ mt: 3 }} onClick={() => setSubmitted(false)}>
                    Register Another Person
                </Button>
            </Box>
        )
    }

    return (
        <Box component="form" onSubmit={formik.handleSubmit} noValidate>
            <Typography
                sx={{
                    fontSize: '0.68rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: '#555',
                    mb: '1.4rem',
                    fontWeight: 500,
                }}
            >
                Registration Details
            </Typography>

            <Stack spacing={2}>
                {/* Full Name */}
                <TextField
                    fullWidth
                    id="fullName"
                    name="fullName"
                    label="Full Name"
                    placeholder="Your full name"
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                    helperText={formik.touched.fullName && formik.errors.fullName}
                />

                {/* Phone */}
                <TextField
                    fullWidth
                    id="phone"
                    name="phone"
                    label="Mobile Number"
                    placeholder="9XXXXXXXXX"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
                                    +91
                                </Typography>
                            </InputAdornment>
                        ),
                    }}
                />

                {/* Email */}
                <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email Address"
                    type="email"
                    placeholder="you@email.com"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />

                {/* Gender + T-shirt Size */}
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <FormControl fullWidth size="small" error={formik.touched.gender && Boolean(formik.errors.gender)}>
                            <InputLabel id="gender-label">Gender</InputLabel>
                            <Select labelId="gender-label" id="gender" name="gender" label="Gender" value={formik.values.gender} onChange={formik.handleChange} onBlur={formik.handleBlur}>
                                {['Male', 'Female', 'Other', 'Prefer not to say'].map((opt) => (
                                    <MenuItem key={opt} value={opt}>
                                        {opt}
                                    </MenuItem>
                                ))}
                            </Select>
                            {formik.touched.gender && formik.errors.gender && <FormHelperText>{formik.errors.gender}</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth size="small" error={formik.touched.tshirtSize && Boolean(formik.errors.tshirtSize)}>
                            <InputLabel id="tshirt-label">T-shirt Size</InputLabel>
                            <Select
                                labelId="tshirt-label"
                                id="tshirtSize"
                                name="tshirtSize"
                                label="T-shirt Size"
                                value={formik.values.tshirtSize}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((s) => (
                                    <MenuItem key={s} value={s}>
                                        {s}
                                    </MenuItem>
                                ))}
                            </Select>
                            {formik.touched.tshirtSize && formik.errors.tshirtSize && <FormHelperText>{formik.errors.tshirtSize}</FormHelperText>}
                        </FormControl>
                    </Grid>
                </Grid>

                {/* How did you hear */}
                <FormControl fullWidth size="small" error={formik.touched.heardFrom && Boolean(formik.errors.heardFrom)}>
                    <InputLabel id="heard-label">How did you hear about us?</InputLabel>
                    <Select
                        labelId="heard-label"
                        id="heardFrom"
                        name="heardFrom"
                        label="How did you hear about us?"
                        value={formik.values.heardFrom}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    >
                        {['Instagram / Social Media', 'Friend / Word of mouth', 'Athayog Community', 'Google Search', 'Flyer / Poster', 'Other'].map((opt) => (
                            <MenuItem key={opt} value={opt}>
                                {opt}
                            </MenuItem>
                        ))}
                    </Select>
                    {formik.touched.heardFrom && formik.errors.heardFrom && <FormHelperText>{formik.errors.heardFrom}</FormHelperText>}
                </FormControl>

                {/* Yoga Experience */}
                <FormControl component="fieldset" error={formik.touched.hasYogaExperience && Boolean(formik.errors.hasYogaExperience)}>
                    <FormLabel component="legend" sx={{ fontSize: '0.72rem', fontWeight: 500, color: 'text.secondary', letterSpacing: '0.04em', mb: 0.5 }}>
                        Do you have prior yoga experience?
                    </FormLabel>
                    <RadioGroup row name="hasYogaExperience" value={formik.values.hasYogaExperience} onChange={formik.handleChange}>
                        <FormControlLabel value="yes" control={<Radio size="small" color="primary" />} label={<Typography variant="body2">Yes</Typography>} />
                        <FormControlLabel value="no" control={<Radio size="small" color="primary" />} label={<Typography variant="body2">No</Typography>} />
                    </RadioGroup>
                </FormControl>

                {/* Submit */}
                <Button
                    type="submit"
                    fullWidth
                    disabled={formik.isSubmitting}
                    sx={{ bgcolor: '#b8892a', color: '#fff', py: '0.9rem', fontSize: '0.84rem', mt: 1, '&:hover': { bgcolor: '#9a7222' }, display: 'inline-flex', gap: 1, justifyContent: 'center' }}
                >
                    {formik.isSubmitting ? 'Registering...' : 'Register Now — Free'}
                </Button>

                <Typography variant="caption" sx={{ textAlign: 'center', color: 'text.disabled', display: 'block' }}>
                    By registering you agree to Atha Yog Living&apos;s{' '}
                    <Link href="https://athayogliving.com/privacy-policy" underline="hover" sx={{ color: 'primary.main' }}>
                        Privacy Policy
                    </Link>
                    .
                </Typography>
            </Stack>
        </Box>
    )
}

function RegisterSection() {
    return (
        <Box component="section" id="register" sx={{ py: { xs: 6, md: 8 }, bgcolor: '#faf7f2' }}>
            <Container maxWidth="lg">
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: '3rem', alignItems: 'start' }}>
                    <Box>
                        <EyebrowLabel>Free Registration</EyebrowLabel>
                        <Typography variant="h2" sx={{ mb: '0.8rem' }}>
                            Join Yoga Arambha 2026
                        </Typography>
                        <Typography sx={{ fontSize: '0.88rem', color: '#555', mb: '1.2rem', lineHeight: 1.65 }}>
                            Reserve your spot at Bangalore&apos;s International Day of Yoga 2026 celebration. Free and open to everyone &mdash; residents, professionals, students, and wellness
                            enthusiasts.
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.8rem', p: '0.9rem 1.1rem', mb: '0.9rem', bgcolor: '#e8ede6', borderLeft: '3px solid #4f6148' }}>
                            <Typography sx={{ fontSize: '0.8rem', color: '#4f6148', fontWeight: 500 }}>On-site registration opens at 6:00 AM. Pre-register to secure your spot.</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.8rem', p: '0.9rem 1.1rem', mb: '1.4rem', bgcolor: '#f5edd8', borderLeft: '3px solid #b8892a' }}>
                            <Typography sx={{ fontSize: '0.8rem', color: '#b8892a', fontWeight: 500 }}>Mass yoga session from 7:00&ndash;8:00 AM. All levels welcome.</Typography>
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: '0.78rem', color: '#888', mb: '0.6rem' }}>Dignitaries</Typography>
                            {DIGNITARIES.map((d) => (
                                <Typography key={d.name} sx={{ fontSize: '0.78rem', color: '#555', mb: '0.2rem' }}>
                                    <Box component="strong" sx={{ color: '#3d2f1e' }}>
                                        {d.name}
                                    </Box>{' '}
                                    &mdash; {d.role}
                                </Typography>
                            ))}
                        </Box>
                    </Box>
                    <Box sx={{ bgcolor: '#fff', border: '1px solid #e2ddd5', p: '2rem' }}>
                        <RegistrationForm />
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FaqSection() {
    return (
        <Box component="section" id="faq" sx={{ py: { xs: 6, md: 8 }, bgcolor: '#e8ede6' }}>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <EyebrowLabel>FAQ</EyebrowLabel>
                    <Typography variant="h2">Common Questions</Typography>
                </Box>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 0 }}>
                    {FAQS.map((item, idx) => (
                        <Box
                            key={idx}
                            sx={{
                                py: '1.4rem',
                                borderBottom: '1px solid #e2ddd5',
                                pr: idx % 2 === 0 ? { md: '2.5rem' } : 0,
                                pl: idx % 2 !== 0 ? { md: '2.5rem' } : 0,
                                borderLeft: idx % 2 !== 0 ? { md: '1px solid #e2ddd5' } : 'none',
                            }}
                        >
                            <Typography sx={{ fontFamily: "var(--font-playfair),Georgia,serif", fontSize: '0.98rem', color: '#3d2f1e', mb: '0.45rem' }}>{item.q}</Typography>
                            <Typography sx={{ fontSize: '0.84rem', color: '#555', lineHeight: 1.65 }}>{item.a}</Typography>
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    )
}

// ─── Final CTA ────────────────────────────────────────────────────────────────
function FinalCtaSection() {
    return (
        <Box component="section" sx={{ py: { xs: 6, md: 8 }, bgcolor: '#4f6148', textAlign: 'center' }}>
            <Container maxWidth="lg">
                <Typography sx={{ display: 'block', fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', mb: '0.5rem', fontWeight: 500 }}>
                    June 21, 2026 &middot; Bangalore
                </Typography>
                <Typography variant="h2" sx={{ color: '#fff', maxWidth: 540, mx: 'auto', mb: '1rem' }}>
                    Join Thousands Celebrating
                    <br />
                    <em>International Day of Yoga</em>
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.65)', maxWidth: 420, mx: 'auto', mb: '2rem', fontSize: '0.9rem' }}>
                    Move. Breathe. Connect. One for Yoga, Yoga for All. Free for everyone at Indiranagar Club, Bangalore.
                </Typography>
                <Button href="#register" sx={{ bgcolor: '#b8892a', color: '#fff', px: '2.4rem', py: '0.95rem', fontSize: '0.85rem', '&:hover': { bgcolor: '#9a7222' } }}>
                    Register Now &mdash; It&apos;s Free
                </Button>
            </Container>
        </Box>
    )
}

// ─── Page Root ────────────────────────────────────────────────────────────────
export default function YogaArambha2026Page() {
    return (
        <ThemeProvider theme={yogaTheme}>
            <Box sx={{ minHeight: '100vh', bgcolor: '#faf7f2' }}>
                <main>
                    <HeroSection />
                    <ScheduleSection />
                    <WhySection />
                    <ExperienceSection />
                    <ActivitiesSection />
                    <AboutSection />
                    <LocationSection />
                    <RegisterSection />
                    <FaqSection />
                    <FinalCtaSection />
                </main>
            </Box>
        </ThemeProvider>
    )
}
