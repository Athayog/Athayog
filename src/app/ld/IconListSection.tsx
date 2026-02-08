import React from 'react'
import { Box, Container, Typography, Stack, Paper } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

export interface ListItem {
    id: string
    text: string
    icon?: React.ReactNode
}

export interface IconListSectionProps {
    title: string
    description?: string
    items: ListItem[]
    backgroundColor?: string
    titleColor?: string
    descriptionColor?: string
    itemBackgroundColor?: string
    itemTextColor?: string
    iconColor?: string
    useDefaultIcon?: boolean
    centerTitle?: boolean
}
const IconListSection: React.FC<IconListSectionProps> = ({
    title,
    description,
    items,
    backgroundColor = '#f5f5e8',
    titleColor = '#3d5a32',
    descriptionColor = '#4f5d47',
    itemBackgroundColor = 'rgba(200, 240, 200, 0.5)',
    itemTextColor = '#1a1a1a',
    iconColor = '#4a7c2f',
    useDefaultIcon = true,
    centerTitle = true,
}) => {
    return (
        <Box
            sx={{
                backgroundColor,
                py: { xs: 8, md: 12 },
            }}
        >
            <Container maxWidth="md">
                {/* Title */}
                <Typography
                    variant="h3"
                    component="h2"
                    sx={{
                        color: titleColor,
                        fontWeight: 700,
                        fontSize: { xs: '1.75rem', md: '2.5rem' },
                        textAlign: centerTitle ? 'center' : 'left',
                        mb: { xs: 2, md: 3 },
                        lineHeight: 1.3,
                    }}
                >
                    {title}
                </Typography>

                {/* Optional Description */}
                {description && (
                    <Typography
                        variant="body1"
                        sx={{
                            color: descriptionColor,
                            maxWidth: 720,
                            mx: centerTitle ? 'auto' : 0,
                            textAlign: centerTitle ? 'center' : 'left',
                            fontSize: { xs: '1rem', md: '1.1rem' },
                            lineHeight: 1.7,
                            mb: { xs: 5, md: 7 },
                        }}
                    >
                        {description}
                    </Typography>
                )}

                {/* Items List */}
                <Stack spacing={{ xs: 2.5, md: 3 }}>
                    {items.map((item) => (
                        <Paper
                            key={item.id}
                            elevation={0}
                            sx={{
                                backgroundColor: itemBackgroundColor,
                                borderRadius: 3,
                                p: { xs: 3, md: 3.5 },
                                display: 'flex',
                                alignItems: 'center',
                                gap: { xs: 2.5, md: 3 },
                                transition: 'all 0.3s ease-in-out',
                                border: '2px solid transparent',
                                '&:hover': {
                                    transform: 'translateX(12px)',
                                    backgroundColor: itemBackgroundColor,
                                    borderColor: iconColor,
                                    boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
                                },
                            }}
                        >
                            {/* Icon */}
                            <Box
                                sx={{
                                    flexShrink: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: { xs: 48, md: 56 },
                                    height: { xs: 48, md: 56 },
                                    borderRadius: '50%',
                                    backgroundColor: 'rgba(74, 124, 47, 0.12)',
                                    '& svg': {
                                        fontSize: { xs: 28, md: 32 },
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

export default IconListSection
