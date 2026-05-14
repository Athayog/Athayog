import { Box, Container, Typography } from '@mui/material'
import { SectionHeader } from './ui'
import { WHY_ITEMS } from './data'

export function WhySection() {
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
