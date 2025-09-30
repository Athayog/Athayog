import { Box, Typography, Button, Container, Grid } from '@mui/material'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { PrismicRichText } from '@prismicio/react'
import { asLink } from '@prismicio/helpers'

export type HeroCtaImageTextProps = SliceComponentProps<Content.HeroCtaImageTextSlice>

const BackgroundSection = ({
    desktopUrl,
    mobileUrl,
    children
}: {
    desktopUrl?: string | null;
    mobileUrl?: string | null;
    children: React.ReactNode;
}) => (
    <>
        <Box
            sx={{
                position: 'relative',
                minHeight: { xs: '70vh', md: '100vh' },
                display: { xs: 'none', md: 'flex' },
                backgroundImage: desktopUrl ? `url(${desktopUrl})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                alignItems: { xs: 'flex-start', md: 'center' },
                pt: { xs: 8, md: 0 } // Add top padding for mobile when aligned flex-start
            }}
        >
            {children}
        </Box>
        <Box
            sx={{
                position: 'relative',
                minHeight: { xs: '70vh', md: '100vh' },
                display: { xs: 'flex', md: 'none' },
                backgroundImage: mobileUrl ? `url(${mobileUrl})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'bottom',
                alignItems: { xs: 'flex-start', md: 'center' },
                pt: { xs: 8, md: 0 } // Add top padding for mobile when aligned flex-start
            }}
        >
            {children}
        </Box>
    </>
);


const HeroCtaImageText = ({ slice }: HeroCtaImageTextProps) => {
    const { image, title, subtitle, primary_cta, image_mobile } = slice.primary
    const ctaUrl = asLink(primary_cta)

    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <BackgroundSection desktopUrl={image?.url} mobileUrl={image_mobile?.url} >
                {/* Overlay for better text readability */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    }}
                />

                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, paddingTop: { xs: '80px', md: '0px' } }} >
                    <Grid container spacing={4} alignItems="center">
                        {/* Text Content - Full Left Alignment */}
                        <Grid item xs={12} md={12} lg={12}>
                            <Box sx={{ color: 'white', textAlign: 'left' }}>
                                {/* Main Title */}
                                <Box sx={{ mb: 2 }}>
                                    <PrismicRichText
                                        field={title}
                                        components={{
                                            heading1: ({ children }) => (
                                                <Typography
                                                    variant="h3"
                                                    component="h1"
                                                    sx={{
                                                        fontWeight: 700,
                                                        fontSize: {
                                                            xs: '30px',   // Mobile first: 30px
                                                            sm: '40px',   // Small tablets: 40px  
                                                            md: '50px',   // Tablets: 50px
                                                            lg: '60px',   // Small desktop: 60px
                                                            xl: '70px'    // Large desktop: 70px
                                                        },
                                                        color: { xs: '#000000', md: '#ffffff' },
                                                        lineHeight: 1.2,
                                                        textShadow: '0px 4px 4px #00000066'
                                                    }}
                                                >
                                                    {children}
                                                </Typography>
                                            ),
                                        }}
                                    />
                                </Box>

                                {/* Subtitle */}
                                <Box sx={{ mb: 3 }}>
                                    <PrismicRichText
                                        field={subtitle}
                                        components={{
                                            paragraph: ({ children }) => (
                                                <Typography
                                                    variant="h5"
                                                    component="h2"
                                                    sx={{
                                                        fontWeight: 600,
                                                        fontSize: {
                                                            "xs": "18px",
                                                            "sm": "20px",
                                                            "md": "22px",
                                                            "lg": "24px",
                                                            "xl": "33px"
                                                        },
                                                        color: { xs: '#000', md: '#ffffff' },
                                                        textShadow: '0px 4px 4px #00000066'
                                                    }}
                                                >
                                                    {children}
                                                </Typography>
                                            ),
                                        }}
                                    />
                                </Box>

                                {/* CTA Button */}
                                {ctaUrl && (
                                    <Button
                                        variant="contained"
                                        size="large"
                                        href={ctaUrl}
                                        sx={{
                                            px: {
                                                xs: 1.7,    // 13.64px mobile
                                                md: 2.34    // 18.69px desktop (18.69/8)
                                            },
                                            py: {
                                                xs: 1.28,   // 10.23px mobile  
                                                md: 1.75    // 14.01px desktop (14.01/8)
                                            },
                                            fontSize: {
                                                xs: "20px",
                                                md: "26px"
                                            },
                                            fontWeight: 600,
                                            borderRadius: {
                                                xs: "27.29px",
                                                md: "37.37px"
                                            },
                                            textTransform: 'none',
                                            boxShadow: '0px 0.8px 81.6px 0px rgba(0, 0, 0, 0.7)',
                                            minWidth: {
                                                xs: "174px",
                                                md: "238px"
                                            },
                                            minHeight: {
                                                xs: "50.38px",
                                                md: "69px"
                                            },
                                            '&:hover': {
                                                boxShadow: 6,
                                                transform: 'translateY(-2px)',
                                            },
                                            transition: 'all 0.3s ease',
                                        }}
                                    >
                                        {primary_cta.text || 'Register Now'}
                                    </Button>
                                )}
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </BackgroundSection>
        </section>
    )
}

export default HeroCtaImageText