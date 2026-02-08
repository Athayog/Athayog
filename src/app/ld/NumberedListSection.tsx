import React from 'react'
import { Box, Container, Typography, Stack, Paper } from '@mui/material'

export interface ListItem {
    id: string
    text: string
}

export type NumberedListVariant = 'default' | 'timeline' | 'minimal' | 'bold'

export interface NumberedListSectionProps {
    title: string
    subtitle?: string
    items: ListItem[]
    variant?: NumberedListVariant
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
    variant = 'default',
    backgroundColor = '#f5f5e8',
    titleColor = '#3d5a32',
    subtitleColor = '#5a7850',
    itemCardBackgroundColor = 'rgba(200, 240, 200, 0.4)',
    itemTextColor = '#1a1a1a',
    numberColor = '#ffffff',
    numberBackgroundColor = '#4a7c2f',
}) => {
    const renderDefaultVariant = () => (
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
    )

    const renderTimelineVariant = () => (
        <Box sx={{ position: 'relative', pl: { xs: 4, md: 5 } }}>
            {/* Vertical Connecting Line */}
            <Box
                sx={{
                    position: 'absolute',
                    left: { xs: '22px', md: '26px' },
                    top: { xs: '30px', md: '36px' },
                    bottom: { xs: '30px', md: '36px' },
                    width: '3px',
                    backgroundColor: numberBackgroundColor,
                    opacity: 0.3,
                }}
            />

            <Stack spacing={{ xs: 4, md: 4.5 }}>
                {items.map((item, index) => (
                    <Box
                        key={item.id}
                        sx={{
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: { xs: 3, md: 3.5 },
                        }}
                    >
                        {/* Number Circle with Timeline Dot */}
                        <Box
                            sx={{
                                position: 'absolute',
                                left: { xs: '-32px', md: '-40px' },
                                top: 0,
                                flexShrink: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: { xs: 48, md: 56 },
                                height: { xs: 48, md: 56 },
                                borderRadius: '50%',
                                backgroundColor: numberBackgroundColor,
                                border: '4px solid',
                                borderColor: backgroundColor,
                                boxShadow: '0 4px 16px rgba(74, 124, 47, 0.4)',
                                zIndex: 1,
                                transition: 'all 0.3s ease-in-out',
                                '&:hover': {
                                    transform: 'scale(1.2)',
                                    boxShadow: '0 6px 20px rgba(74, 124, 47, 0.5)',
                                },
                            }}
                        >
                            <Typography
                                sx={{
                                    color: numberColor,
                                    fontWeight: 700,
                                    fontSize: { xs: '1.15rem', md: '1.35rem' },
                                }}
                            >
                                {index + 1}
                            </Typography>
                        </Box>

                        {/* Content Card */}
                        <Paper
                            elevation={0}
                            sx={{
                                backgroundColor: itemCardBackgroundColor,
                                borderRadius: 3,
                                p: { xs: 3, md: 3.5 },
                                flex: 1,
                                transition: 'all 0.3s ease-in-out',
                                borderLeft: '4px solid',
                                borderLeftColor: numberBackgroundColor,
                                '&:hover': {
                                    transform: 'translateX(8px)',
                                    boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
                                },
                            }}
                        >
                            <Typography
                                variant="body1"
                                sx={{
                                    color: itemTextColor,
                                    fontWeight: 500,
                                    fontSize: { xs: '1.05rem', md: '1.15rem' },
                                    lineHeight: 1.7,
                                }}
                            >
                                {item.text}
                            </Typography>
                        </Paper>
                    </Box>
                ))}
            </Stack>
        </Box>
    )

    const renderMinimalVariant = () => (
        <Stack spacing={{ xs: 2.5, md: 3 }}>
            {items.map((item, index) => (
                <Box
                    key={item.id}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: { xs: 2.5, md: 3 },
                        p: { xs: 2.5, md: 3 },
                        borderRadius: 2,
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                            backgroundColor: itemCardBackgroundColor,
                            transform: 'translateX(8px)',
                        },
                    }}
                >
                    {/* Minimal Number */}
                    <Typography
                        sx={{
                            color: numberBackgroundColor,
                            fontWeight: 700,
                            fontSize: { xs: '2rem', md: '2.5rem' },
                            lineHeight: 1,
                            opacity: 0.3,
                            flexShrink: 0,
                            minWidth: { xs: '48px', md: '56px' },
                            fontFamily: 'Georgia, serif',
                        }}
                    >
                        {String(index + 1).padStart(2, '0')}
                    </Typography>

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
                </Box>
            ))}
        </Stack>
    )

    const renderBoldVariant = () => (
        <Stack spacing={{ xs: 3, md: 4 }}>
            {items.map((item, index) => (
                <Box
                    key={item.id}
                    sx={{
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    <Paper
                        elevation={0}
                        sx={{
                            backgroundColor: itemCardBackgroundColor,
                            borderRadius: 4,
                            p: { xs: 3, md: 4 },
                            pl: { xs: 10, md: 12 },
                            position: 'relative',
                            transition: 'all 0.3s ease-in-out',
                            '&:hover': {
                                transform: 'scale(1.02)',
                                boxShadow: '0 8px 28px rgba(0,0,0,0.15)',
                            },
                        }}
                    >
                        {/* Large Background Number */}
                        <Typography
                            sx={{
                                position: 'absolute',
                                left: { xs: '-8px', md: '-12px' },
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: numberBackgroundColor,
                                fontWeight: 900,
                                fontSize: { xs: '5rem', md: '6.5rem' },
                                lineHeight: 1,
                                opacity: 0.08,
                                fontFamily: 'Arial Black, sans-serif',
                                userSelect: 'none',
                            }}
                        >
                            {index + 1}
                        </Typography>

                        {/* Small Number Badge */}
                        <Box
                            sx={{
                                position: 'absolute',
                                left: { xs: '16px', md: '20px' },
                                top: { xs: '16px', md: '20px' },
                                width: { xs: 36, md: 42 },
                                height: { xs: 36, md: 42 },
                                borderRadius: '8px',
                                backgroundColor: numberBackgroundColor,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 3px 10px rgba(74, 124, 47, 0.3)',
                            }}
                        >
                            <Typography
                                sx={{
                                    color: numberColor,
                                    fontWeight: 700,
                                    fontSize: { xs: '1rem', md: '1.15rem' },
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
                                position: 'relative',
                                zIndex: 1,
                            }}
                        >
                            {item.text}
                        </Typography>
                    </Paper>
                </Box>
            ))}
        </Stack>
    )

    const renderContent = () => {
        switch (variant) {
            case 'timeline':
                return renderTimelineVariant()
            case 'minimal':
                return renderMinimalVariant()
            case 'bold':
                return renderBoldVariant()
            case 'default':
            default:
                return renderDefaultVariant()
        }
    }

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
                {subtitle && (
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
                )}

                {/* Render Selected Variant */}
                {renderContent()}
            </Container>
        </Box>
    )
}

export default NumberedListSection
