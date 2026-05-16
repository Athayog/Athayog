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
        <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#e8ede6' }}>
            <Container maxWidth="lg">
                <SectionHeader eyebrow="Allied Activities" title="More to Explore on the Day" />
                <Box sx={{ 
                    display: 'grid', 
                    gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, 
                    gap: '1.2rem', 
                    mt: 3.5 
                }}>
                    {ACTIVITIES.map((item) => (
                        <Box
                            key={item.title}
                            sx={{
                                p: '2rem 1.4rem',
                                textAlign: 'center',
                                border: '1px solid #e2ddd5',
                                bgcolor: '#fff',
                                transition: 'all 0.3s ease',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                '&:hover': { 
                                    borderColor: '#4f6148', 
                                    bgcolor: '#e8ede6' 
                                },
                            }}
                        >
                            <Box sx={{ mb: '1.2rem', display: 'flex', justifyContent: 'center' }}>
                                {ACTIVITY_ICONS[item.icon]}
                            </Box>
                            <Typography sx={{ 
                                fontSize: '1rem', 
                                color: '#3d2f1e', 
                                fontWeight: 600, 
                                mb: '0.6rem',
                                fontFamily: 'var(--font-inter)'
                            }}>
                                {item.title}
                            </Typography>
                            <Typography sx={{ 
                                fontSize: '0.88rem', 
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
