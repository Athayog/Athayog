import { Box, Container, Typography } from '@mui/material'
import { SectionHeader } from './ui'
import { ACTIVITIES } from './data'

export function ActivitiesSection() {
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
