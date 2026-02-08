import React from 'react'
import { Box, Container, Grid, Typography, Paper } from '@mui/material'

export interface InfoBarItem {
    label: string
    value: string
}

export interface InfoBarSectionProps {
    items: InfoBarItem[]
    backgroundColor?: string
    itemBackgroundColor?: string
    labelColor?: string
    valueColor?: string
}

const InfoBarSection: React.FC<InfoBarSectionProps> = ({
    items,
    backgroundColor = '#2a3d23',
    itemBackgroundColor = 'rgba(255, 255, 255, 0.1)',
    labelColor = 'rgba(255, 255, 255, 0.7)',
    valueColor = '#ffffff',
}) => {
    return (
        <Box
            sx={{
                backgroundColor,
                py: { xs: 4, md: 5 },
            }}
        >
            <Container maxWidth="lg">
                <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    justifyContent="center" // Always center
                    alignItems="stretch"
                >
                    {items.map((item, index) => (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md="auto" // Auto width on desktop
                            key={index}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center', // Center the Paper inside Grid item
                            }}
                        >
                            <Paper
                                elevation={0}
                                sx={{
                                    backgroundColor: itemBackgroundColor,
                                    borderRadius: 2,
                                    p: { xs: 2.5, md: 3 },
                                    textAlign: 'center',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    minWidth: { xs: '100%', sm: '200px', md: '220px' }, // Consistent width
                                    maxWidth: { xs: '100%', sm: '100%', md: '280px' }, // Max width
                                    width: '100%', // Full width on mobile
                                }}
                            >
                                <Typography
                                    variant="overline"
                                    sx={{
                                        color: labelColor,
                                        fontWeight: 600,
                                        fontSize: '0.75rem',
                                        letterSpacing: '1px',
                                        display: 'block',
                                        mb: 1,
                                        whiteSpace: 'nowrap', // Prevent label wrapping
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}
                                >
                                    {item.label}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: valueColor,
                                        fontWeight: 600,
                                        fontSize: { xs: '0.95rem', md: '1.05rem' },
                                        lineHeight: 1.4,
                                    }}
                                >
                                    {item.value}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    )
}

export default InfoBarSection
