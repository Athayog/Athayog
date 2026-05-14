import { Box, Container, Typography } from '@mui/material'
import { EyebrowLabel } from './ui'
import { FAQS } from './data'

export function FaqSection() {
    return (
        <Box component="section" id="faq" sx={{ py: { xs: 6, md: 8 }, bgcolor: '#e8ede6', scrollMarginTop: '80px' }}>
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
                            <Typography sx={{ fontFamily: 'var(--font-playfair),Georgia,serif', fontSize: '0.98rem', color: '#3d2f1e', mb: '0.45rem' }}>{item.q}</Typography>
                            <Typography sx={{ fontSize: '0.84rem', color: '#555', lineHeight: 1.65 }}>{item.a}</Typography>
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    )
}
