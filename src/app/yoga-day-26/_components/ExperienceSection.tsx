import { Box, Container, Typography } from '@mui/material'
import { SectionHeader } from './ui'
import { EXPERIENCE_ITEMS } from './data'

export function ExperienceSection() {
    return (
        <Box component="section" sx={{ py: { xs: 6, md: 8 }, bgcolor: '#fff' }}>
            <Container maxWidth="lg">
                <SectionHeader eyebrow="What to Expect" title="Your Experience on the Day" />
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1rem', mt: 2.5 }}>
                    {EXPERIENCE_ITEMS.map((item) => (
                        <Box key={item.num} sx={{ p: '1.6rem 1.4rem', border: '1px solid #e2ddd5', bgcolor: '#fff' }}>
                            <Typography sx={{ fontFamily: 'var(--font-playfair),Georgia,serif', fontSize: '2rem', fontWeight: 400, color: '#e8ede6', lineHeight: 1, mb: '0.8rem' }}>
                                {item.num}
                            </Typography>
                            <Typography sx={{ fontSize: '0.76rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#4f6148', mb: '0.4rem', fontWeight: 500 }}>
                                {item.title}
                            </Typography>
                            <Typography sx={{ fontSize: '0.84rem', color: '#555' }}>{item.body}</Typography>
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    )
}
