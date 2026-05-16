import { Box, Container, Typography } from '@mui/material'
import Image from 'next/image'
import { SectionHeader } from './ui'
import { CLIENTS } from './data'

export function ClientsSection() {
    return (
        <Box component="section" sx={{ py: { xs: 6, md: 8 }, bgcolor: '#fff' }}>
            <Container maxWidth="lg">
                <SectionHeader
                    eyebrow="Our Clients & Associates"
                    title="Empowering Diverse Communities"
                    subtitle="At Athayog Living, we collaborate with educational institutions, corporates, sports organizations, wellness communities, and government bodies to bring authentic yoga practices into diverse environments. Our programs are designed to support physical wellbeing, mental clarity, productivity, and holistic lifestyle transformation."
                />
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '2rem', mt: 4 }}>
                    {CLIENTS.map((client) => (
                        <Box
                            key={client.name}
                            sx={{
                                p: '2rem 1.8rem',
                                border: '1px solid #e2ddd5',
                                bgcolor: '#f1f5ee',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                transition: 'all 0.2s ease',
                                '&:hover': { borderColor: '#47820D', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }
                            }}
                        >
                            <Box sx={{
                                width: '100%',
                                height: 120,
                                position: 'relative',
                                mb: '1.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Image
                                    src={client.logo}
                                    alt={client.name}
                                    fill
                                    style={{ objectFit: 'contain' }}
                                />
                            </Box>
                            <Typography variant="h3" sx={{ color: '#1a2016', mb: '0.8rem', fontSize: '1.1rem', fontWeight: 600 }}>
                                {client.name}
                            </Typography>
                            <Typography sx={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.6 }}>
                                {client.description}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    )
}
