import React from 'react'
import { Box, Container, Typography, Stack, Paper } from '@mui/material'

export interface ListItem {
    id: string
    text: string
}

export interface NumberedListSectionProps {
    title: string
    subtitle: string
    items: ListItem[]
    backgroundColor?: string
    titleColor?: string
    subtitleColor?: string
    itemCardBackgroundColor?: string
    itemTextColor?: string
    numberColor?: string
    numberBackgroundColor?: string
}

const NumberedListSection: React.FC<NumberedListSectionProps> = ({
    title,
    subtitle,
    items,
    backgroundColor = '#f5f5e8',
    titleColor = '#3d5a32',
    subtitleColor = '#5a7850',
    itemCardBackgroundColor = 'rgba(200, 240, 200, 0.4)',
    itemTextColor = '#1a1a1a',
    numberColor = '#ffffff',
    numberBackgroundColor = '#4a7c2f',
}) => {
    return (
        <Box
            sx={{
                backgroundColor,
                py: { xs: 8, md: 12 },
            }}
        >
            <Container maxWidth="md">
                {/* Main Title */}
                <Typography
                    variant="h3"
                    component="h2"
                    sx={{
                        color: titleColor,
                        fontWeight: 700,
                        fontSize: { xs: '1.75rem', md: '2.5rem' },
                        textAlign: 'center',
                        mb: { xs: 2, md: 3 },
                        lineHeight: 1.3,
                    }}
                >
                    {title}
                </Typography>

                {/* Subtitle */}
                <Typography
                    variant="h6"
                    component="p"
                    sx={{
                        color: subtitleColor,
                        fontWeight: 500,
                        fontSize: { xs: '1.05rem', md: '1.2rem' },
                        textAlign: 'center',
                        mb: { xs: 5, md: 7 },
                        fontStyle: 'italic',
                        lineHeight: 1.6,
                    }}
                >
                    {subtitle}
                </Typography>

                {/* Numbered Items - Clean, No Connecting Lines */}
                <Stack spacing={{ xs: 3, md: 3.5 }}>
                    {items.map((item, index) => (
                        <Paper
                            key={item.id}
                            elevation={0}
                            sx={{
                                backgroundColor: itemCardBackgroundColor,
                                borderRadius: 4,
                                p: { xs: 3, md: 3.5 },
                                display: 'flex',
                                alignItems: 'center',
                                gap: { xs: 2.5, md: 3 },
                                transition: 'all 0.3s ease-in-out',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    backgroundColor: itemCardBackgroundColor,
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                                },
                            }}
                        >
                            {/* Number Circle */}
                            <Box
                                sx={{
                                    flexShrink: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: { xs: 44, md: 52 },
                                    height: { xs: 44, md: 52 },
                                    borderRadius: '50%',
                                    backgroundColor: numberBackgroundColor,
                                    boxShadow: '0 4px 12px rgba(74, 124, 47, 0.3)',
                                    transition: 'transform 0.3s ease-in-out',
                                    '&:hover': {
                                        transform: 'scale(1.15)',
                                    },
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: numberColor,
                                        fontWeight: 700,
                                        fontSize: { xs: '1.25rem', md: '1.5rem' },
                                    }}
                                >
                                    {index + 1}
                                </Typography>
                            </Box>

                            {/* Text */}
                            <Typography
                                variant="body1"
                                sx={{
                                    color: itemTextColor,
                                    fontWeight: 500,
                                    fontSize: { xs: '1.05rem', md: '1.15rem' },
                                    lineHeight: 1.7,
                                    flex: 1,
                                }}
                            >
                                {item.text}
                            </Typography>
                        </Paper>
                    ))}
                </Stack>
            </Container>
        </Box>
    )
}

export default NumberedListSection
