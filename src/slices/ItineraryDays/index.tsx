import { FC } from 'react'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { PrismicRichText } from '@prismicio/react'
import { Box, Typography, Container, Grid, Card, CardContent, Divider } from '@mui/material'
import Image from 'next/image'

export type ItineraryDaysProps = SliceComponentProps<Content.ItineraryDaysSlice>

const ItineraryDays: FC<ItineraryDaysProps> = ({ slice }) => {
    const { section_title, days } = slice.primary

    const gradientArray = [
        'linear-gradient(239.14deg, #DCF6FC -18.25%, #FFFFFF 40.51%, #F2DDF7 99.27%)',
        'linear-gradient(239.14deg, #DEFFC3 -18.25%, #FFFFFF 32.63%, #FFE7D9 99.27%)',
        'linear-gradient(241.34deg, #DDDDF7 -26.49%, #FFFFFF 70.17%, #B6FCAB 104.61%)',
        'linear-gradient(239.14deg, #FBC3FF -18.25%, #FFFFFF 32.63%, #D9E7FF 99.27%)',
        'linear-gradient(238.91deg, #FEFFB5 -3.57%, #FFFFFF 55.53%, #C3E7FF 100.68%)',
        'linear-gradient(238.91deg, #D5F0B9 -4.83%, #FFFFFF 40.32%, #E4C9FF 99.42%)'
    ]

    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <Box sx={{
                background: 'linear-gradient(90deg, #FFFFCB 5.61%, #FFFFFF 34.53%, #EAFEDF 79.33%)',
                padding: { xs: '10px', md: '40px 100px' }
            }}>
                <Container maxWidth="lg">
                    {/* Section Title */}
                    {section_title && (
                        <Box sx={{ textAlign: 'center', mb: 6 }}>
                            <Typography
                                variant="h2"
                                component="h1"
                                sx={{
                                    fontWeight: 700,
                                    fontSize: { xs: '2rem', md: '2.5rem' },
                                    mb: 3,
                                    color: 'text.primary'
                                }}
                            >
                                {section_title}
                            </Typography>
                        </Box>
                    )}

                    {/* Itinerary Days */}
                    <Box sx={{ width: '100%' }}>
                        {days?.map((day, index) => {
                            const hasImages = day.main_image?.url || day.secondary_image?.url || day.tertiary_image?.url
                            const imageCount = [day.main_image, day.secondary_image, day.tertiary_image].filter(img => img?.url).length

                            return (
                                <Card
                                    key={index}
                                    sx={{
                                        mb: 4,
                                        borderRadius: '35px',
                                        background: gradientArray[index % gradientArray.length],
                                        boxShadow: { xs: 'none', md: '0px 3.86px 48.31px 0px rgba(0, 0, 0, 0.3)' },
                                        overflow: 'hidden',
                                        padding: { xs: '10px', md: '70px 17px' },
                                        '&:last-child': { mb: 0 }
                                    }}
                                >
                                    <Grid container>
                                        {/* Day Header - Flex row */}
                                        <Grid item xs={12}>
                                            <CardContent sx={{ p: { xs: 2, md: 4 }, pb: 2 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                                                    {/* Day Number */}
                                                    <Typography
                                                        variant="h2"
                                                        component="h2"
                                                        sx={{
                                                            flex: 1,
                                                            fontWeight: 700,
                                                            fontSize: { xs: '2.5rem', md: '44px' },
                                                            color: '#000000',
                                                            lineHeight: 1,
                                                            minWidth: '80px'
                                                        }}
                                                    >
                                                        Day {index + 1}
                                                    </Typography>

                                                    {/* Day Label and Headline */}
                                                    <Box sx={{ flex: 1 }}>
                                                        {day.label && (
                                                            <Typography
                                                                variant="h4"
                                                                component="h3"
                                                                sx={{
                                                                    fontWeight: 700,
                                                                    textAlign: 'right',
                                                                    fontSize: { xs: '1.5rem', md: '44px' },
                                                                    mb: 1,
                                                                    color: '#000000',
                                                                }}
                                                            >
                                                                {day.label}
                                                            </Typography>
                                                        )}

                                                        {day.headline && (
                                                            <Typography
                                                                variant="h6"
                                                                component="p"
                                                                sx={{
                                                                    fontWeight: 400,
                                                                    fontSize: { xs: '1rem', md: '27px' },
                                                                    textAlign: 'right',
                                                                    lineHeight: 1.4
                                                                }}
                                                            >
                                                                {day.headline}
                                                            </Typography>
                                                        )}
                                                    </Box>
                                                </Box>
                                            </CardContent>
                                        </Grid>

                                        {/* Content and Images - Description left, Images right */}
                                        <Grid item xs={12}>
                                            <Grid container>
                                                {/* Description Side */}
                                                <Grid item xs={12} md={hasImages ? 8 : 12}>
                                                    <CardContent sx={{ pt: 0, pb: hasImages ? 4 : 0, pl: { xs: 2, md: 4 }, pr: { xs: 2, md: 2 } }}>
                                                        {/* Description */}
                                                        <PrismicRichText
                                                            field={day.description}
                                                            components={{
                                                                paragraph: ({ children }) => (
                                                                    <Typography
                                                                        variant="body1"
                                                                        sx={{
                                                                            fontSize: { xs: '16px', md: '25px' },
                                                                            lineHeight: '26px',
                                                                            mb: { xs: '15px', md: '26px' },
                                                                        }}
                                                                    >
                                                                        {children}
                                                                    </Typography>
                                                                ),
                                                                strong: ({ children }) => (
                                                                    <Typography component="span" sx={{ fontWeight: 700, color: '#000000', fontSize: { xs: '16px', md: '25px' } }}>
                                                                        {children}
                                                                    </Typography>
                                                                )
                                                            }}
                                                        />
                                                    </CardContent>
                                                </Grid>

                                                {/* Images Side */}
                                                {hasImages && (
                                                    <Grid item xs={12} md={4}>
                                                        <Box sx={{
                                                            p: { xs: 1, md: 3 },
                                                            height: '100%',
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            gap: 2,
                                                            pl: { xs: 2, md: 0 },
                                                            pr: { xs: 2, md: 3 },
                                                            pb: 4
                                                        }}>
                                                            {/* Image Layout Logic */}
                                                            {imageCount === 1 && day.main_image?.url && (
                                                                <Box sx={{ position: 'relative', width: '100%', height: '300px', borderRadius: 2, overflow: 'hidden' }}>
                                                                    <Image src={day.main_image.url} alt="" fill style={{ objectFit: 'cover' }} />
                                                                </Box>
                                                            )}

                                                            {imageCount === 2 && (
                                                                <>
                                                                    {day.main_image?.url && (
                                                                        <Box sx={{ position: 'relative', width: '100%', height: '200px', borderRadius: 2, overflow: 'hidden' }}>
                                                                            <Image src={day.main_image.url} alt="" fill style={{ objectFit: 'cover' }} />
                                                                        </Box>
                                                                    )}
                                                                    {day.secondary_image?.url && (
                                                                        <Box sx={{ position: 'relative', width: '100%', height: '200px', borderRadius: 2, overflow: 'hidden' }}>
                                                                            <Image src={day.secondary_image.url} alt="" fill style={{ objectFit: 'cover' }} />
                                                                        </Box>
                                                                    )}
                                                                </>
                                                            )}

                                                            {imageCount === 3 && (
                                                                <>
                                                                    {day.main_image?.url && (
                                                                        <Box sx={{ position: 'relative', width: '100%', height: '200px', borderRadius: 2, overflow: 'hidden' }}>
                                                                            <Image src={day.main_image.url} alt="" fill style={{ objectFit: 'cover' }} />
                                                                        </Box>
                                                                    )}
                                                                    <Box sx={{ display: 'flex', gap: 2 }}>
                                                                        {day.secondary_image?.url && (
                                                                            <Box sx={{ position: 'relative', width: '50%', height: '150px', borderRadius: 2, overflow: 'hidden' }}>
                                                                                <Image src={day.secondary_image.url} alt="" fill style={{ objectFit: 'cover' }} />
                                                                            </Box>
                                                                        )}
                                                                        {day.tertiary_image?.url && (
                                                                            <Box sx={{ position: 'relative', width: '50%', height: '150px', borderRadius: 2, overflow: 'hidden' }}>
                                                                                <Image src={day.tertiary_image.url} alt="" fill style={{ objectFit: 'cover' }} />
                                                                            </Box>
                                                                        )}
                                                                    </Box>
                                                                </>
                                                            )}
                                                        </Box>
                                                    </Grid>
                                                )}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Card>
                            )
                        })}
                    </Box>
                </Container>
            </Box >
        </section >
    )
}

export default ItineraryDays