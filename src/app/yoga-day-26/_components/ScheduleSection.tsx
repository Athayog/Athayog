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
                <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', mt: 2 }} aria-label="Event Schedule">
                    <Box component="tbody">
                        {SCHEDULE.map((item, idx) => (
                            <Box
                                key={idx}
                                component="tr"
                                sx={{
                                    borderBottom: idx < SCHEDULE.length - 1 ? '1px solid #e2ddd5' : 'none',
                                    bgcolor: item.highlight ? '#f1f5ee' : 'transparent',
                                    display: { xs: 'flex', sm: 'table-row' },
                                    flexDirection: { xs: 'column', sm: 'row' },
                                    py: { xs: 2, sm: 0 },
                                }}
                            >
                                <Box
                                     component="th"
                                     scope="row"
                                     sx={{
                                         py: { xs: 0, sm: '1.2rem' },
                                         pr: '2rem',
                                         pl: item.highlight ? '1.2rem' : { xs: 1.5, sm: 0 },
                                         fontSize: '0.88rem',
                                         fontWeight: 600,
                                         color: '#38660a',
                                         whiteSpace: { xs: 'normal', sm: 'nowrap' },
                                         minWidth: { xs: 'auto', sm: 160 },
                                         verticalAlign: 'top',
                                         fontFamily: 'var(--font-inter)',
                                         display: { xs: 'block', sm: 'table-cell' },
                                         textAlign: 'left',
                                     }}
                                 >
                                    {item.time}
                                </Box>
                                <Box
                                    component="td"
                                    sx={{
                                        py: { xs: 0.5, sm: '1.2rem' },
                                        pr: item.highlight ? '1.2rem' : 0,
                                        pl: { xs: 1.5, sm: 0 },
                                        verticalAlign: 'top',
                                        display: { xs: 'block', sm: 'table-cell' },
                                    }}
                                >
                                    <Typography sx={{
                                        fontSize: '1rem',
                                        fontWeight: item.highlight ? 600 : 500,
                                        color: '#1a2016',
                                        fontFamily: 'var(--font-inter)'
                                    }}>
                                        {item.activity}
                                    </Typography>
                                    {item.note && (
                                        <Typography sx={{
                                            fontSize: '0.88rem',
                                            color: '#444',
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
                    <Button href="#register" sx={{ bgcolor: '#47820D', color: '#fff', px: '1.8rem', py: '0.75rem', fontSize: '0.8rem', '&:hover': { bgcolor: '#3d6b0a' } }}>
                        Secure Your Spot — It&apos;s Free
                    </Button>
                </Box>
            </Container>
        </Box>
    )
}
