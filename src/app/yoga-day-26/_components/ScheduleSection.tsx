import { Box, Button, Container, Typography } from '@mui/material'
import { SectionHeader } from './ui'
import { SCHEDULE } from './data'

export function ScheduleSection() {
    return (
        <Box component="section" id="schedule" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#fff', scrollMarginTop: '80px' }}>
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
                                        py: '1.2rem',
                                        pr: '2rem',
                                        pl: item.highlight ? '1.2rem' : 0,
                                        fontSize: '0.88rem',
                                        fontWeight: 600,
                                        color: item.highlight ? '#4f6148' : '#b8892a',
                                        whiteSpace: 'nowrap',
                                        minWidth: 160,
                                        verticalAlign: 'top',
                                        fontFamily: 'var(--font-inter)',
                                    }}
                                >
                                    {item.time}
                                </Box>
                                <Box component="td" sx={{ py: '1.2rem', pr: item.highlight ? '1.2rem' : 0, verticalAlign: 'top' }}>
                                    <Typography sx={{ 
                                        fontSize: '1rem', 
                                        fontWeight: item.highlight ? 600 : 500,
                                        color: '#3d2f1e',
                                        fontFamily: 'var(--font-inter)'
                                    }}>
                                        {item.activity}
                                    </Typography>
                                    {item.note && (
                                        <Typography sx={{ 
                                            fontSize: '0.84rem', 
                                            color: '#555', 
                                            mt: '0.3rem',
                                            fontFamily: 'var(--font-inter)',
                                            lineHeight: 1.5
                                        }}>
                                            {item.note}
                                        </Typography>
                                    )}
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
