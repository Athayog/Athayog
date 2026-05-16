import { Box, Container, Typography } from '@mui/material'
import { SectionHeader } from './ui'
import { EXPERIENCE_ITEMS } from './data'

export function ExperienceSection() {
    return (
        <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#fff' }}>
            <Container maxWidth="lg">
                <SectionHeader eyebrow="What to Expect" title="Your Experience on the Day" />
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1rem', mt: 2.5 }}>
                    {EXPERIENCE_ITEMS.map((item) => (
                        <Box key={item.num} sx={{
                            p: '2rem 1.6rem',
                            border: '1px solid #e2ddd5',
                            bgcolor: '#fff',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-3px)',
                                borderColor: '#47820D',
                                boxShadow: '0 6px 20px rgba(61, 47, 30, 0.04)',
                                '& .num-label': {
                                    color: '#47820D',
                                    opacity: 0.15
                                }
                            }
                        }}>
                            <Typography
                                className="num-label"
                                sx={{
                                    fontFamily: 'var(--font-playfair),Georgia,serif',
                                    fontSize: '2.5rem',
                                    fontWeight: 600,
                                    color: '#1a2016',
                                    opacity: 0.06,
                                    lineHeight: 1,
                                    mb: '0.6rem',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {item.num}
                            </Typography>
                            <Typography sx={{
                                fontSize: '0.82rem',
                                letterSpacing: '0.12em',
                                textTransform: 'uppercase',
                                color: '#47820D',
                                mb: '0.6rem',
                                fontWeight: 700,
                                fontFamily: 'var(--font-inter)'
                            }}>
                                {item.title}
                            </Typography>
                            <Typography sx={{
                                fontSize: '0.94rem',
                                color: '#555',
                                lineHeight: 1.6,
                                fontFamily: 'var(--font-inter)'
                            }}>
                                {item.body}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    )
}
