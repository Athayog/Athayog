import { Box, Container, Typography } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import GroupsIcon from '@mui/icons-material/Groups'
import NatureIcon from '@mui/icons-material/Nature'
import { SectionHeader } from './ui'
import { WHY_ITEMS } from './data'

const WHY_ICONS: Record<string, React.ReactNode> = {
    heart: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#47820D" strokeWidth="1.5">
            <path d="M12 21L10.55 19.705C5.4 15.03 2 11.95 2 8.5C2 5.74 4.16 3.5 6.92 3.5C8.5 3.5 10.02 4.23 11 5.39C11.98 4.23 13.5 3.5 15.08 3.5C17.84 3.5 20 5.74 20 8.5C20 11.95 16.6 15.03 11.45 19.71L12 21Z" />
        </svg>
    ),
    people: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#47820D" strokeWidth="1.5">
            <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21V19C22.9993 18.1137 22.7044 17.2524 22.1614 16.5523C21.6184 15.8522 20.8581 15.3516 20 15.13" />
            <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88" />
        </svg>
    ),
    leaf: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#47820D" strokeWidth="1.5">
            <path d="M12 2V22M12 2C12 2 19 6 19 12C19 18 12 22 12 22M12 2C12 2 5 6 5 12C5 18 12 22 12 22M19 12H5" />
        </svg>
    ),
}

export function WhySection() {
    return (
        <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#f1f5ee' }}>
            <Container maxWidth="lg">
                <SectionHeader eyebrow="Why Yoga Arambha" title="Movement with Meaning" subtitle="Personal well-being and planetary health are deeply intertwined. Arambha brings both together." />
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1.5px', background: '#e2ddd5', mt: 2.5 }}>
                    {WHY_ITEMS.map((item) => (
                        <Box key={item.title} sx={{
                            bgcolor: '#fff',
                            p: '2.5rem 2rem',
                            transition: 'all 0.3s ease-in-out',
                            cursor: 'default',
                            '&:hover': {
                                transform: 'translateY(-5px)',
                                boxShadow: '0 8px 24px rgba(61, 47, 30, 0.06)',
                                zIndex: 1,
                                '& .icon-badge': {
                                    transform: 'scale(1.1)',
                                    bgcolor: 'rgba(71, 130, 13, 0.1)',
                                }
                            }
                        }}>
                            {/* Icon badge */}
                            <Box
                                className="icon-badge"
                                sx={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 48,
                                    height: 48,
                                    borderRadius: '50%',
                                    bgcolor: 'rgba(71, 130, 13, 0.08)',
                                    mb: '1.2rem',
                                    border: '1px solid rgba(71, 130, 13, 0.12)',
                                    transition: 'all 0.3s ease-out',
                                }}
                            >
                                {WHY_ICONS[item.icon]}
                            </Box>
                            <Typography variant="h3" sx={{ color: '#1a2016', mb: '0.75rem', fontSize: '1.15rem', fontWeight: 600, fontFamily: 'var(--font-inter)' }}>
                                {item.title}
                            </Typography>
                            <Typography sx={{ fontSize: '0.94rem', color: '#555', lineHeight: 1.7, fontFamily: 'var(--font-inter)' }}>{item.body}</Typography>
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    )
}
