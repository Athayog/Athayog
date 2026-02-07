import React from 'react'
import { Box, Container, Typography, Stack, Paper } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

export interface ScheduleItem {
    id: string
    text: string
    icon?: React.ReactNode
}

export interface StructuredListSectionProps {
    title: string
    subtitle: string
    items: ScheduleItem[]
    backgroundColor?: string
    titleColor?: string
    subtitleColor?: string
    itemCardBackgroundColor?: string
    itemTextColor?: string
    iconColor?: string
    iconBackgroundColor?: string
    useDefaultIcon?: boolean
}

const StructuredListSection: React.FC<StructuredListSectionProps> = ({
    title,
    subtitle,
    items,
    backgroundColor = '#f5f5e8',
    titleColor = '#3d5a32',
    subtitleColor = '#4a7c2f',
    itemCardBackgroundColor = 'rgba(200, 240, 200, 0.5)',
    itemTextColor = '#1a1a1a',
    iconColor = '#4a7c2f',
    iconBackgroundColor = 'rgba(74, 124, 47, 0.12)',
    useDefaultIcon = true,
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
                    variant="h5"
                    component="h3"
                    sx={{
                        color: subtitleColor,
                        fontWeight: 600,
                        fontSize: { xs: '1.15rem', md: '1.35rem' },
                        textAlign: 'center',
                        mb: { xs: 4, md: 6 },
                    }}
                >
                    {subtitle}
                </Typography>

                {/* Items List with Cards */}
                <Stack spacing={{ xs: 2.5, md: 3 }}>
                    {items.map((item) => (
                        <Paper
                            key={item.id}
                            elevation={0}
                            sx={{
                                backgroundColor: itemCardBackgroundColor,
                                borderRadius: 3,
                                p: { xs: 2.5, md: 3 },
                                display: 'flex',
                                alignItems: 'center',
                                gap: { xs: 2.5, md: 3 },
                                transition: 'all 0.3s ease-in-out',
                                border: '2px solid transparent',
                                '&:hover': {
                                    transform: 'translateX(12px)',
                                    backgroundColor: itemCardBackgroundColor,
                                    borderColor: iconColor,
                                    boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
                                },
                            }}
                        >
                            {/* Icon Circle */}
                            <Box
                                sx={{
                                    flexShrink: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: { xs: 48, md: 56 },
                                    height: { xs: 48, md: 56 },
                                    borderRadius: '50%',
                                    backgroundColor: iconBackgroundColor,
                                    transition: 'transform 0.3s ease-in-out',
                                    '&:hover': {
                                        transform: 'rotate(15deg) scale(1.1)',
                                    },
                                    '& svg': {
                                        fontSize: { xs: 26, md: 30 },
                                        color: iconColor,
                                    },
                                }}
                            >
                                {item.icon || (useDefaultIcon && <CheckCircleIcon />)}
                            </Box>

                            {/* Text */}
                            <Typography
                                variant="body1"
                                sx={{
                                    color: itemTextColor,
                                    fontWeight: 500,
                                    fontSize: { xs: '1.05rem', md: '1.15rem' },
                                    lineHeight: 1.6,
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

export default StructuredListSection
