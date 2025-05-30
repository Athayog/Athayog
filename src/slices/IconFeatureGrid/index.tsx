import { FC } from 'react'
import { Box, Container, Grid, Typography, Card, CardContent, Avatar } from '@mui/material'
import { SliceComponentProps } from '@prismicio/react'
import { PrismicRichText, PrismicImage } from '@prismicio/react'
import { Content } from '@prismicio/client'
import Image from 'next/image'

export type IconFeatureGridProps = SliceComponentProps<Content.IconFeatureGridSlice>

const IconFeatureGrid: FC<IconFeatureGridProps> = ({ slice }) => {

    return (
        <Box
            component="section"
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
            py={8}

        >
            <Container maxWidth="lg">
                {slice.primary.title && (
                    <Box sx={{
                        '&& p,h1,h2,h3': {
                            color: '#007B48',
                            fontSize: { xs: '26px', md: '42px' },
                            fontWeight: 700,
                            textAlign: 'center',
                            marginBottom: '32px',
                        }
                    }}>

                        <PrismicRichText field={slice.primary.title} />
                    </Box>

                )}
                <Box sx={{ margin: '0 auto' }}>
                    <Grid container spacing={{ xs: '0', md: '4' }} mt={4} sx={{
                        px: { xs: 0, md: 2 }, // To counteract the -margin from spacing
                    }}>
                        {slice.primary.items.map((item, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card
                                    elevation={0}
                                    sx={{
                                        height: '100%',
                                        textAlign: 'center',
                                        bgcolor: '#fff',
                                        borderRadius: 3,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-start',
                                        justifyContent: 'flex-start',
                                    }}
                                >
                                    <CardContent sx={{ backgroundColor: 'transparent', textAlign: 'left', padding: '0px', marginTop: '32px' }}>
                                        <Box sx={{ display: 'flex', flexDirection: { xs: "row-reverse", sm: 'column' }, justifyContent: { xs: 'space-between', md: 'flex-start' }, gap: '30px' }}>
                                            <Box
                                                sx={{
                                                    position: 'relative',
                                                    width: { xs: 50, md: 50 },
                                                    aspectRatio: '1 / 1', // 1:1 aspect ratio
                                                    flexShrink: 0,
                                                }}
                                            >
                                                <Image
                                                    src={item.icon.url ?? ''}
                                                    alt={item.icon.alt || 'Icon'}
                                                    fill
                                                    style={{ objectFit: 'contain' }}
                                                />
                                            </Box>
                                            <Typography gutterBottom fontWeight="700" fontSize='31px'>
                                                {item.item_title}
                                            </Typography>
                                        </Box>
                                        <Box sx={{
                                            '&& p,h1,h2,h3': {
                                                fontSize: {
                                                    xs: '22px', md: '26px'
                                                },
                                                padding: '0px',
                                                margin: '0px',
                                                fontWeight: 400,

                                            }
                                        }}>

                                            <PrismicRichText field={item.item_description} />
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </Box>
    )
}

export default IconFeatureGrid
