import { Box, Container, Typography } from '@mui/material'
import Image from 'next/image'
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
                                color: '#1a2016',
                                borderLeft: '2px solid #47820D',
                                pl: '1.2rem',
                                my: '1.5rem',
                                lineHeight: 1.5,
                                m: '1.5rem 0',
                            }}
                        >
                            &ldquo;Atha&rdquo; means now, here begins. &ldquo;Yog&rdquo; means union.
                        </Box>
                        <Typography sx={{ fontSize: '0.94rem', color: '#444', mb: '0.9rem', lineHeight: 1.65 }}>
                            At AthaYog, we are devoted to preserving the long-standing legacy of Yog and propagating its true purpose, philosophies and practices associated with this age-old wisdom.
                        </Typography>
                        <Typography sx={{ fontSize: '0.94rem', color: '#444', lineHeight: 1.65 }}>
                            Our teachings are rooted in ancient scriptures — the Vedas, Sankhya Philosophy, Bhagwat Geeta, Patanjali&apos;s Yoga Sutras, and Hatha Yoga Pradipika.
                        </Typography>
                        <Box sx={{ display: 'flex', gap: '2rem', mt: '1.5rem' }}>
                            <Box>
                                <Typography sx={{ fontFamily: 'var(--font-playfair),Georgia,serif', fontSize: '1.5rem', color: '#4f6148', fontWeight: 600, lineHeight: 1 }}>Atha</Typography>
                                <Typography sx={{ fontSize: '0.8rem', color: '#444', letterSpacing: '0.06em', mt: '0.2rem' }}>Now, Here Begins</Typography>
                            </Box>
                            <Box>
                                <Typography sx={{ fontFamily: 'var(--font-playfair),Georgia,serif', fontSize: '1.5rem', color: '#1a2016', fontWeight: 600, lineHeight: 1 }}>Yog</Typography>
                                <Typography sx={{ fontSize: '0.8rem', color: '#444', letterSpacing: '0.06em', mt: '0.2rem' }}>Union, To Join</Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Box>
                        <Box
                            sx={{
                                position: 'relative',
                                width: '100%',
                                aspectRatio: { xs: '4/3', sm: '1/1' },
                                border: '1px solid #e2ddd5',
                                p: '0.75rem',
                                bgcolor: '#fff',
                                boxShadow: '0 8px 24px rgba(61,47,30,0.04)',
                                mb: '1.5rem',
                            }}
                        >
                            <Box sx={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
                                <Image
                                    src="/images/yoga-day-26/Breathing Sharath.jpg"
                                    alt="Serene Practitioner in Deep Meditation"
                                    fill
                                    sizes="(max-width: 900px) 100vw, 50vw"
                                    style={{ objectFit: 'cover' }}
                                    loading="lazy"
                                />
                            </Box>
                        </Box>

                        <Typography sx={{ mt: '1rem', fontSize: '0.9rem', color: '#4f6148', fontStyle: 'italic', fontFamily: 'var(--font-playfair),Georgia,serif', textAlign: 'center', px: 2 }}>
                            &ldquo;Reinstating belief in the ancient wisdom of Yog&rdquo;
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}
