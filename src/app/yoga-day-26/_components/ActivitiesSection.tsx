import { Box, Container, Typography } from '@mui/material'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import BrushIcon from '@mui/icons-material/Brush'
import PsychologyIcon from '@mui/icons-material/Psychology'
import BloodtypeIcon from '@mui/icons-material/Bloodtype'
import WorkIcon from '@mui/icons-material/Work'
import HealingIcon from '@mui/icons-material/Healing'

import { SectionHeader } from './ui'
import { ACTIVITIES } from './data'

const ACTIVITY_ICONS: Record<string, React.ReactNode> = {
    music: <MusicNoteIcon sx={{ fontSize: '1.8rem', color: '#4f6148' }} />,
    brush: <BrushIcon sx={{ fontSize: '1.8rem', color: '#4f6148' }} />,
    ai: <PsychologyIcon sx={{ fontSize: '1.8rem', color: '#4f6148' }} />,
    blood: <BloodtypeIcon sx={{ fontSize: '1.8rem', color: '#4f6148' }} />,
    career: <WorkIcon sx={{ fontSize: '1.8rem', color: '#4f6148' }} />,
    clinic: <HealingIcon sx={{ fontSize: '1.8rem', color: '#4f6148' }} />,
}

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
                            <Box sx={{ mb: '0.8rem', display: 'flex', justifyContent: 'center' }}>
                                {ACTIVITY_ICONS[item.icon]}
                            </Box>
                            <Typography sx={{ fontSize: '0.82rem', color: '#3d2f1e', fontWeight: 500, mb: '0.35rem' }}>{item.title}</Typography>
                            <Typography sx={{ fontSize: '0.76rem', color: '#555', lineHeight: 1.5 }}>{item.body}</Typography>
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    )
}
