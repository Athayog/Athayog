import Link from 'next/link'
import Image from 'next/image'
import { Box, Container, Grid, Typography, Button, Paper, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import ContactForm from './ContactForm'

interface FormData {
    name: string
    email: string
    phone: string
    message: string
}

interface FormErrors {
    name?: string
    email?: string
    phone?: string
    message?: string
}

export interface YogaProgramHeroProps {
    title: string
    description: string
    features: string[]
    ctaButtonText: string
    submitButtonText: string
    submittingButtonText?: string
    formSubmitUrl?: string
    namePlaceholder?: string
    emailPlaceholder?: string
    phonePlaceholder?: string
    messagePlaceholder?: string
    successMessage?: string
    errorMessage?: string
    backgroundImage: StaticImport | string
    backgroundImageAlt?: string
    backgroundImagePriority?: boolean
    backgroundImageQuality?: number
    ctaButtonHref?: string
    overlayGradient?: string
    overlayOpacity?: number
    formKey?: string
    notifyEmail?: string
}

const YogaProgramHero: React.FC<YogaProgramHeroProps> = ({
    title,
    description,
    features,
    ctaButtonText,
    submitButtonText,
    submittingButtonText = 'Submitting...',
    namePlaceholder = 'Name',
    emailPlaceholder = 'Email',
    phonePlaceholder = 'Phone number',
    messagePlaceholder = 'Your message',
    successMessage = 'Thank you! We will contact you soon.',
    errorMessage = 'Something went wrong. Please try again.',
    backgroundImage,
    backgroundImageAlt = 'Yoga background',
    backgroundImagePriority = true,
    backgroundImageQuality = 85,
    ctaButtonHref = '/',
    overlayGradient = 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(245, 245, 232, 0.2) 100%)',
    overlayOpacity = 0.35,
    formKey = 'landingPageForm',
    notifyEmail = 'info@athayogliving.com',
}) => {

    return (
        <>
            <Box
                sx={{
                    minHeight: '100vh',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    py: { xs: 12, md: 8 },
                    overflow: 'hidden',
                }}
            >
                {/* Background Image Layer */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 0,
                    }}
                >
                    <Image
                        src={backgroundImage}
                        alt={backgroundImageAlt}
                        fill
                        priority={backgroundImagePriority}
                        quality={backgroundImageQuality}
                        sizes="100vw"
                        style={{
                            objectFit: 'cover',
                            objectPosition: 'center',
                        }}
                    />

                    {/* Subtle Gradient Overlay */}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: overlayGradient,
                            opacity: overlayOpacity,
                        }}
                    />
                </Box>

                {/* Content */}
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
                    <Grid container spacing={{ xs: 3, md: 4 }} alignItems="flex-start">
                        {/* ↑ FIXED: Changed from alignItems="center" to alignItems="flex-start" */}

                        {/* Program Information Section */}
                        <Grid item xs={12} md={6}>
                            <Box>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        backgroundColor: 'rgba(200, 240, 200, 0.95)',
                                        p: { xs: 3, md: 4 },
                                        borderRadius: 3,
                                        backdropFilter: 'blur(8px)',
                                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                                    }}
                                >
                                    <Typography
                                        variant="h4"
                                        component="h1"
                                        sx={{
                                            fontWeight: 700,
                                            mb: 2,
                                            fontSize: { xs: '1.5rem', md: '2rem' },
                                            color: '#1a1a1a',
                                        }}
                                    >
                                        {title}
                                    </Typography>

                                    <Typography
                                        variant="body1"
                                        sx={{
                                            mb: 3,
                                            color: '#2a2a2a',
                                            fontSize: { xs: '0.95rem', md: '1rem' },
                                        }}
                                    >
                                        {description}
                                    </Typography>

                                    <List sx={{ mb: 0 }}>
                                        {features.map((feature, index) => (
                                            <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                                                <ListItemIcon sx={{ minWidth: 32 }}>
                                                    <CheckCircleIcon sx={{ color: '#4caf50', fontSize: 24 }} />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={feature}
                                                    primaryTypographyProps={{
                                                        fontSize: { xs: '0.9rem', md: '1rem' },
                                                        fontWeight: 500,
                                                        color: '#1a1a1a',
                                                    }}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Paper>

                                {/* CTA Button */}
                                <Box sx={{ mt: 3 }}>
                                    <Link href={ctaButtonHref} passHref>
                                        <Button
                                            variant="contained"
                                            size="large"
                                            sx={{
                                                backgroundColor: '#4a7c2f',
                                                color: 'white',
                                                px: 4,
                                                py: 1.5,
                                                borderRadius: 8,
                                                textTransform: 'none',
                                                fontSize: '1rem',
                                                fontWeight: 600,
                                                boxShadow: '0 4px 14px rgba(74, 124, 47, 0.3)',
                                                '&:hover': {
                                                    backgroundColor: '#3d6625',
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: '0 6px 20px rgba(74, 124, 47, 0.4)',
                                                },
                                                transition: 'all 0.3s ease-in-out',
                                            }}
                                        >
                                            {ctaButtonText}
                                        </Button>
                                    </Link>
                                </Box>
                            </Box>
                        </Grid>

                    {/* Contact Form Section */}
                    <Grid item xs={12} md={6}>
                        <ContactForm
                            submitButtonText={submitButtonText}
                            submittingButtonText={submittingButtonText}
                            namePlaceholder={namePlaceholder}
                            emailPlaceholder={emailPlaceholder}
                            phonePlaceholder={phonePlaceholder}
                            messagePlaceholder={messagePlaceholder}
                            successMessage={successMessage}
                            errorMessage={errorMessage}
                            formKey={formKey}
                            notifyEmail={notifyEmail}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    </>
)
}

export default YogaProgramHero
