import { Box, Container, Typography } from '@mui/material'
import { EyebrowLabel } from './ui'

export function AboutSection() {
    return (
        <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#fff' }}>
            <Container maxWidth="lg">
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: '3rem', alignItems: 'center' }}>
                    <Box>
                        <EyebrowLabel>About Atha Yog Living</EyebrowLabel>
                        <Typography variant="h2" sx={{ mb: 0, fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' }, whiteSpace: { md: 'nowrap' } }}>
                            A Sanctum for the Spirit
                        </Typography>
                        <Box
                            component="blockquote"
                            sx={{
                                fontFamily: 'var(--font-playfair),Georgia,serif',
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
                                <Typography sx={{ fontFamily: 'var(--font-playfair),Georgia,serif', fontSize: '1.5rem', color: '#4f6148', fontWeight: 600, lineHeight: 1 }}>Atha</Typography>
                                <Typography sx={{ fontSize: '0.7rem', color: '#555', letterSpacing: '0.06em', mt: '0.2rem' }}>Now, Here Begins</Typography>
                            </Box>
                            <Box>
                                <Typography sx={{ fontFamily: 'var(--font-playfair),Georgia,serif', fontSize: '1.5rem', color: '#4f6148', fontWeight: 600, lineHeight: 1 }}>Yog</Typography>
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
                        <Typography sx={{ mt: '1rem', fontSize: '0.82rem', color: '#4f6148', fontStyle: 'italic', fontFamily: 'var(--font-playfair),Georgia,serif' }}>
                            &ldquo;Reinstating belief in the ancient wisdom of Yog&rdquo;
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}
