'use client'
import theme from '@/styles/theme'
import { LinkField, ImageFieldImage } from '@prismicio/client'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import ContentContainer from '@/components/_shared/ContentContainer'
import { Box, Button, Divider, Grid, styled, Typography } from '@mui/material'
import { usePathname } from 'next/navigation'
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from 'react'
import { green } from '@mui/material/colors'
import Image from 'next/image'
import React from 'react'

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
    const paymentOption = data.payment_option

    const pathname = usePathname()
    if (pathname === '/scanner') return null

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
                    <Grid item xs={4} sm={3} md={3} sx={pathname === '/yoga-arambha-25' ? { display: 'none' } : {}}>
                        <HeadingTitle variant="h6" gutterBottom>
                            Site Links
                        </HeadingTitle>
                        {siteLinks.map((link: any, index: number) => (
                            <React.Fragment key={index}>
                                <LinksItem key={index}>
                                    <PrismicNextLink field={link.link}>{link.label}</PrismicNextLink>
                                </LinksItem>
                            </React.Fragment>
                        ))}
                    </Grid>

                    {/* What We Offer */}
                    <Grid item xs={4} sm={3} md={3} sx={pathname === '/yoga-arambha-25' ? { display: 'none' } : {}}>
                        <HeadingTitle variant="h6" gutterBottom>
                            What We Offer
                        </HeadingTitle>
                        {whatWeOffer.map((offer: any, index: number) => (
                            <LinksItem key={index}>
                                <PrismicNextLink field={offer.link}>{offer.label}</PrismicNextLink>
                            </LinksItem>
                        ))}
                    </Grid>

                    {/* Legal */}
                    <Grid item xs={4} sm={3} md={3} sx={pathname === '/yoga-arambha-25' ? { display: 'none' } : {}}>
                        <HeadingTitle variant="h6" gutterBottom>
                            Legal
                        </HeadingTitle>
                        {legal.map((item: any, index: number) => (
                            <LinksItem key={index}>
                                <PrismicNextLink field={item.link}>{item.label}</PrismicNextLink>
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
                                    flexDirection: { xs: 'column', md: 'column' },
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
                                    {data?.address?.map(
                                        (item: {
                                            title:
                                                | string
                                                | number
                                                | bigint
                                                | boolean
                                                | ReactElement<any, string | JSXElementConstructor<any>>
                                                | Iterable<ReactNode>
                                                | ReactPortal
                                                | Promise<AwaitedReactNode>
                                                | null
                                                | undefined
                                            locations:
                                                | string
                                                | number
                                                | bigint
                                                | boolean
                                                | ReactElement<any, string | JSXElementConstructor<any>>
                                                | Iterable<ReactNode>
                                                | ReactPortal
                                                | Promise<AwaitedReactNode>
                                                | null
                                                | undefined
                                            link_to_map: LinkField | null | undefined
                                        }) => {
                                            return (
                                                <React.Fragment key={index}>
                                                    <Typography sx={{ fontSize: { xs: '12px', md: '18px' }, fontWeight: 'bold', marginBottom: '5px' }}>{item.title}</Typography>
                                                    <LinksItem>{item.locations} </LinksItem>
                                                    <Box sx={{ marginBottom: '15px', textDecoration: 'underline', color: 'green', a: { fontSize: { xs: '12px', md: '18px' } } }}>
                                                        <PrismicNextLink field={item.link_to_map} />
                                                    </Box>
                                                </React.Fragment>
                                            )
                                        }
                                    )}
                                </Box>
                            </Box>
                        ))}

                        {/*Payment*/}

                        <HeadingTitle variant="h6" gutterBottom mt={3}>
                            Payment Option
                        </HeadingTitle>

                        {paymentOption.map((item: any, index: number) => (
                            <Box
                                key={index}
                                sx={{
                                    display: 'flex',
                                    flexDirection: { xs: 'column', md: 'column' },
                                    gap: { xs: '30px', md: '0px' },
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Box>
                                    <LinksItem>{item.name}</LinksItem>
                                </Box>
                            </Box>
                        ))}
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 2,
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                            }}
                        >
                            {paymentOption.map((item: any, index: number) => (
                                <Image
                                    key={index}
                                    src={item.icon.url}
                                    alt={item.icon.alt}
                                    title={item.icon.alt}
                                    width={40}
                                    height={24}
                                    style={{
                                        width: 'auto',
                                        height: '24px',
                                        objectFit: 'contain',
                                    }}
                                />
                            ))}
                        </Box>
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
                        {data.social_links_icons.map((item: { link: LinkField | null | undefined; icon: ImageFieldImage | null | undefined }) => {
                            return (
                                <PrismicNextLink field={item.link} key={item?.icon?.id}>
                                    {/* TODO: Check why cant i use next/svg */}
                                    {/* eslint-disable-next-line
                                        @next/next/no-img-element */}
                                    <img src={item?.icon?.url || '/fallback-icon.svg'} alt={(item?.icon?.alt as any) || 'social icon'} width={40} height={40} />
                                </PrismicNextLink>
                            )
                        })}
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
