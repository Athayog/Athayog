import React, { useState } from 'react'
import { Box, Container, Typography, Button, Accordion, AccordionSummary, AccordionDetails, Stack } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'

export interface FAQItem {
    id: string
    question: string
    answer: string
}

export interface FAQCTASectionProps {
    sectionTitle: string
    faqs: FAQItem[]
    subtext: string
    primaryCtaText: string
    onPrimaryCtaClick?: () => void
    secondaryCtaText: string
    onSecondaryCtaClick?: () => void
    showWhatsAppIcon?: boolean
    backgroundColor?: string
    titleColor?: string
    faqBackgroundColor?: string
    faqQuestionColor?: string
    faqAnswerColor?: string
    subtextColor?: string
    primaryCtaBackgroundColor?: string
    primaryCtaTextColor?: string
    secondaryCtaTextColor?: string
    expandedByDefault?: boolean
}

const FAQCTASection: React.FC<FAQCTASectionProps> = ({
    sectionTitle,
    faqs,
    subtext,
    primaryCtaText,
    onPrimaryCtaClick,
    secondaryCtaText,
    onSecondaryCtaClick,
    showWhatsAppIcon = true,
    backgroundColor = '#f5f5e8',
    titleColor = '#3d5a32',
    faqBackgroundColor = 'rgba(200, 240, 200, 0.4)',
    faqQuestionColor = '#2a3d23',
    faqAnswerColor = '#4a4a4a',
    subtextColor = '#3d5a32',
    primaryCtaBackgroundColor = '#4a7c2f',
    primaryCtaTextColor = '#ffffff',
    secondaryCtaTextColor = '#4a7c2f',
    expandedByDefault = false,
}) => {
    const [expanded, setExpanded] = useState<string | false>(expandedByDefault && faqs.length > 0 ? faqs[0].id : false)

    const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false)
    }

    const handlePrimaryCtaClick = () => {
        if (onPrimaryCtaClick) {
            onPrimaryCtaClick()
        }
    }

    const handleSecondaryCtaClick = () => {
        if (onSecondaryCtaClick) {
            onSecondaryCtaClick()
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
                {/* Section Title */}
                <Typography
                    variant="h3"
                    component="h2"
                    sx={{
                        color: titleColor,
                        fontWeight: 700,
                        fontSize: { xs: '1.75rem', md: '2.5rem' },
                        textAlign: 'center',
                        mb: { xs: 4, md: 6 },
                    }}
                >
                    {sectionTitle}
                </Typography>

                {/* FAQ Accordion */}
                <Box sx={{ mb: { xs: 6, md: 8 } }}>
                    {faqs.map((faq) => (
                        <Accordion
                            key={faq.id}
                            expanded={expanded === faq.id}
                            onChange={handleAccordionChange(faq.id)}
                            elevation={0}
                            sx={{
                                backgroundColor: faqBackgroundColor,
                                borderRadius: '12px !important',
                                mb: 2,
                                '&:before': {
                                    display: 'none',
                                },
                                '&.Mui-expanded': {
                                    margin: '0 0 16px 0',
                                },
                            }}
                        >
                            <AccordionSummary
                                expandIcon={
                                    <ExpandMoreIcon
                                        sx={{
                                            color: faqQuestionColor,
                                            fontSize: 28,
                                        }}
                                    />
                                }
                                sx={{
                                    minHeight: { xs: 64, md: 72 },
                                    px: { xs: 2.5, md: 3.5 },
                                    '&.Mui-expanded': {
                                        minHeight: { xs: 64, md: 72 },
                                    },
                                    '& .MuiAccordionSummary-content': {
                                        my: { xs: 1.5, md: 2 },
                                    },
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: faqQuestionColor,
                                        fontWeight: 600,
                                        fontSize: { xs: '1rem', md: '1.1rem' },
                                        lineHeight: 1.5,
                                    }}
                                >
                                    {faq.question}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails
                                sx={{
                                    px: { xs: 2.5, md: 3.5 },
                                    pb: { xs: 2.5, md: 3 },
                                    pt: 0,
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: faqAnswerColor,
                                        fontSize: { xs: '0.95rem', md: '1rem' },
                                        lineHeight: 1.7,
                                    }}
                                >
                                    {faq.answer}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Box>

                {/* Subtext */}
                <Typography
                    variant="h4"
                    component="p"
                    sx={{
                        color: subtextColor,
                        fontWeight: 700,
                        fontSize: { xs: '1.5rem', md: '2rem' },
                        textAlign: 'center',
                        mb: { xs: 4, md: 5 },
                        lineHeight: 1.4,
                    }}
                >
                    {subtext}
                </Typography>

                {/* CTA Buttons */}
                <Stack spacing={2.5} alignItems="center">
                    {/* Primary CTA */}
                    <Button
                        variant="contained"
                        size="large"
                        onClick={handlePrimaryCtaClick}
                        sx={{
                            backgroundColor: primaryCtaBackgroundColor,
                            color: primaryCtaTextColor,
                            px: { xs: 4, md: 6 },
                            py: { xs: 1.5, md: 2 },
                            fontSize: { xs: '1rem', md: '1.1rem' },
                            fontWeight: 600,
                            borderRadius: 8,
                            textTransform: 'none',
                            boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                            transition: 'all 0.3s ease-in-out',
                            maxWidth: '100%',
                            width: { xs: '100%', sm: 'auto' },
                            '&:hover': {
                                backgroundColor: primaryCtaBackgroundColor,
                                transform: 'translateY(-2px)',
                                boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
                            },
                        }}
                    >
                        {primaryCtaText}
                    </Button>

                    {/* Secondary CTA (WhatsApp) */}
                    <Button
                        variant="text"
                        size="large"
                        onClick={handleSecondaryCtaClick}
                        startIcon={showWhatsAppIcon ? <WhatsAppIcon sx={{ fontSize: 24 }} /> : undefined}
                        sx={{
                            color: secondaryCtaTextColor,
                            fontSize: { xs: '0.95rem', md: '1rem' },
                            fontWeight: 600,
                            textTransform: 'none',
                            px: 2,
                            py: 1,
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                                backgroundColor: 'rgba(74, 124, 47, 0.08)',
                                transform: 'scale(1.02)',
                            },
                        }}
                    >
                        {secondaryCtaText}
                    </Button>
                </Stack>
            </Container>
        </Box>
    )
}

export default FAQCTASection
