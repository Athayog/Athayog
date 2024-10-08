import { Box, Grid, Typography } from '@mui/material'
import { Content, KeyTextField, RichTextField } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'

export type AdvantagesOfPersonalTrainingProps = SliceComponentProps<Content.AdvantagesOfPersonalTrainingSlice>

const AdvantagesBox = ({ title, description }: { title: KeyTextField | null; description: RichTextField | null }) => {
    return (
        <Grid item xs={12} md={6} lg={6} sx={{ padding: '20px' }}>
            <Box
                sx={{
                    borderRadius: '8px',
                    background: '#DBF1D5',
                    padding: '20px',
                    minHeight: { xs: '100%', lg: '370px' },
                }}
            >
                <Typography
                    sx={{
                        color: '#000000',
                        fontSize: { xs: '17px', md: '30px' },
                        fontWeight: '700',
                    }}
                >
                    {title}
                </Typography>
                <Box
                    sx={{
                        color: '#000000',
                        fontSize: { xs: '17px', md: '30px' },
                        fontWeight: '400',
                        marginTop: { xs: '14px', md: '26px' },
                    }}
                >
                    <PrismicRichText field={description} />
                </Box>
            </Box>
        </Grid>
    )
}
const AdvantagesOfPersonalTraining = ({ slice }: AdvantagesOfPersonalTrainingProps): JSX.Element => {
    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <Box
                sx={{
                    background: 'linear-gradient(to bottom, #e7ead8, #dffad1)',
                    padding: { xs: '40px 20px', lg: '60px 100px' },
                }}
            >
                <Box sx={{ textAlign: 'center', marginBottom: '40px' }}>
                    <Typography
                        sx={{
                            color: '#284E01',
                            fontSize: { xs: '33px', md: '42px' },
                            fontWeight: '700',
                        }}
                    >
                        {slice.primary.title}
                    </Typography>
                </Box>
                <Grid container spacing={3}>
                    {slice.primary.content.map((item, index) => (
                        <AdvantagesBox key={index} {...item} />
                    ))}

                    <Grid
                        item
                        xs={12}
                        md={6}
                        lg={6}
                        sx={{
                            justifyContent: 'flex-end',
                            padding: '20px',
                            display: { xs: 'none', md: 'flex' },
                        }}
                    >
                        <PrismicNextImage field={slice.primary.image_at_the_end} />
                    </Grid>
                </Grid>
            </Box>
        </section>
    )
}

export default AdvantagesOfPersonalTraining
