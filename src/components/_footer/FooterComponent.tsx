'use client'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import ContentContainer from '@/components/_shared/ContentContainer'
import { Box, Divider, Grid, styled, Typography } from '@mui/material'
import { LinkField, ImageFieldImage } from '@prismicio/client'
import theme from '@/styles/theme'

export const HeadingTitle = styled(Typography)(({ theme }) => ({
    fontWeight: '700',
    fontSize: '18px',
    marginBottom: '18px',
    textTransform: 'uppercase',
    [theme.breakpoints.down('md')]: {
        fontSize: '10px',
    },
}))

export const LinksItem = styled(Typography)(({ theme }) => ({
    fontSize: '18px',
    marginBottom: '10px',
    color: '#203C02',
    [theme.breakpoints.down('md')]: {
        fontSize: '12px',
        marginBottom: '6px',
    },
    a: {
        textDecoration: 'none',
        color: '#203C02',
    },
}))

const FooterComponent = ({ data }: { data: any }) => {
    const siteLinks = data.section_title || []
    const whatWeOffer = data.what_we_offer || []
    const legal = data.legal || []
    const talkToUs = data.talk_to_us || []

    return (
        <Box sx={{ backgroundColor: '#e9fdde' }}>
            <ContentContainer>
                <Grid
                    container
                    spacing={2}
                    sx={{
                        marginTop: '40px',
                        marginBottom: '40px',
                        padding: { xs: '10px', md: '20px' },
                    }}
                >
                    {/* Site Links */}
                    <Grid item xs={4} sm={3} md={3}>
                        <HeadingTitle variant="h6" gutterBottom>
                            Site Links
                        </HeadingTitle>
                        {siteLinks.map((link: any, index: number) => (
                            <LinksItem key={index}>
                                <PrismicNextLink field={link.link}>
                                    {link.label}
                                </PrismicNextLink>
                            </LinksItem>
                        ))}
                    </Grid>

                    {/* What We Offer */}
                    <Grid item xs={4} sm={3} md={3}>
                        <HeadingTitle variant="h6" gutterBottom>
                            What We Offer
                        </HeadingTitle>
                        {whatWeOffer.map((offer: any, index: number) => (
                            <LinksItem key={index}>
                                <PrismicNextLink field={offer.link}>
                                    {offer.label}
                                </PrismicNextLink>
                            </LinksItem>
                        ))}
                    </Grid>

                    {/* Legal */}
                    <Grid item xs={4} sm={3} md={3}>
                        <HeadingTitle variant="h6" gutterBottom>
                            Legal
                        </HeadingTitle>
                        {legal.map((item: any, index: number) => (
                            <LinksItem key={index}>
                                <PrismicNextLink field={item.link}>
                                    {item.label}
                                </PrismicNextLink>
                            </LinksItem>
                        ))}
                    </Grid>

                    {/* Talk to Us */}
                    <Grid item xs={12} sm={12} md={3}>
                        <HeadingTitle variant="h6" gutterBottom>
                            Talk to Us
                        </HeadingTitle>

                        {talkToUs.map((item: any, index: number) => (
                            <Box
                                key={index}
                                sx={{
                                    display: 'flex',
                                    flexDirection: { xs: 'row', md: 'column' },
                                    gap: { xs: '30px', md: '0px' },
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Box>
                                    {' '}
                                    <LinksItem>{item.phone}</LinksItem>
                                    <LinksItem>{item.email}</LinksItem>
                                </Box>
                                <Box>
                                    <LinksItem>{item.address}</LinksItem>
                                </Box>
                            </Box>
                        ))}
                    </Grid>
                </Grid>
            </ContentContainer>
            <Divider
                sx={{
                    opacity: '0.1',
                    borderTop: '1px solid rgba(0, 0, 0, 1)',
                }}
            />
            <ContentContainer>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '30px',
                        textAlign: 'center',
                    }}
                >
                    <PrismicNextImage field={data.footer_logo} width={80} />
                    <Box
                        sx={{
                            textAlign: 'center',
                            [theme.breakpoints.down('md')]: { display: 'none' },
                        }}
                    >
                        <Typography>{data.copyright_title}</Typography>
                        <Typography>{data.copyright_subtitle}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: '10px' }}>
                        {data.social_links_icons.map(
                            (item: {
                                link: LinkField | null | undefined
                                icon: ImageFieldImage | null | undefined
                            }) => {
                                return (
                                    <PrismicNextLink
                                        field={item.link}
                                        key={item?.icon?.id}
                                    >
                                        {/* TODO: Check why cant i use next/svg */}
                                        {/* eslint-disable-next-line
                                        @next/next/no-img-element */}
                                        <img
                                            src={
                                                item?.icon?.url ||
                                                '/fallback-icon.svg'
                                            }
                                            alt={
                                                (item?.icon?.alt as any) ||
                                                'social icon'
                                            }
                                            width={40}
                                            height={40}
                                        />
                                    </PrismicNextLink>
                                )
                            }
                        )}
                    </Box>
                    <Box
                        sx={{
                            width: '100%',
                            textAlign: 'center',
                            fontSize: '13px',
                            marginBottom: '30px',
                            [theme.breakpoints.up('md')]: { display: 'none' },
                        }}
                    >
                        <Typography>{data.copyright_title}</Typography>
                        <Typography>{data.copyright_subtitle}</Typography>
                    </Box>
                </Box>
            </ContentContainer>
        </Box>
    )
}

export default FooterComponent
