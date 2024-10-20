import { Content } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { backgroundColorExtract } from '@/utils/color'
import { Box, Divider, Grid2, Typography } from '@mui/material'
import { SliceComponentProps } from '@prismicio/react'

export type AmenitiesProps = SliceComponentProps<Content.AmenitiesSlice>

const Amenities = ({ slice }: AmenitiesProps): JSX.Element => {
    const backgroundGradient = backgroundColorExtract(slice.primary.background_color.map((item) => item.color))

    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <Box
                sx={{
                    background: backgroundGradient,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: { xs: '20px 10px', md: '60px 130px' },
                }}
            >
                <Typography
                    sx={{
                        color: '#4A7A19',
                        fontSize: { xs: '20px', md: '50px' },
                        fontStyle: 'normal',
                        fontWeight: 700,
                        lineHeight: 'normal',
                    }}
                >
                    {slice.primary.title}
                </Typography>

                <Grid2 container spacing={2} sx={{ marginTop: { xs: '23px', md: '53px' } }}>
                    {slice.primary.provided.map((item, index) => (
                        <Grid2 key={index} size={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <Box
                                    sx={{
                                        position: 'relative',
                                        width: { xs: '23px', md: '60px' },
                                        height: { xs: '23px', md: '60px' },
                                    }}
                                >
                                    <PrismicNextImage field={item.icon} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </Box>
                                <Typography
                                    sx={{
                                        color: '#202020',
                                        fontSize: { xs: '12px', md: '39px' },
                                        fontStyle: 'normal',
                                        fontWeight: 600,
                                        lineHeight: 'normal',
                                    }}
                                >
                                    {item.label}
                                </Typography>
                            </Box>
                        </Grid2>
                    ))}
                </Grid2>

                <Typography
                    sx={{
                        color: '#4A7A19',
                        fontSize: { xs: '20px', md: '50px' },
                        fontStyle: 'normal',
                        fontWeight: 700,
                        lineHeight: 'normal',
                        marginTop: { xs: '20px', md: '100px' },
                    }}
                >
                    {slice.primary.note_title}
                </Typography>
                <Box sx={{ display: 'flex', gap: { xs: '15px', md: '50px' } }}>
                    {slice.primary.notes.map((item, index) => (
                        <Box key={item.label} sx={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: { xs: '13px', md: '25px' } }}>
                            <Box
                                sx={{
                                    position: 'relative',
                                    width: { xs: '23px', md: '60px' },
                                    height: { xs: '23px', md: '60px' },
                                }}
                            >
                                <PrismicNextImage field={item.icon} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography
                                    sx={{
                                        color: '#202020',
                                        fontSize: { xs: '12px', md: '39px' },
                                        fontStyle: 'normal',
                                        fontWeight: 600,
                                        lineHeight: 'normal',
                                    }}
                                >
                                    {item.label}
                                </Typography>
                                {item.subtext && (
                                    <Typography
                                        sx={{
                                            color: '#404040',
                                            fontSize: { xs: '10px', md: '34px' },
                                            fontStyle: 'normal',
                                            fontWeight: 600,
                                            lineHeight: 'normal',
                                        }}
                                    >
                                        {item.subtext}
                                    </Typography>
                                )}
                            </Box>
                            {index !== 0 && index !== slice.primary.notes.length - 1 && <Divider orientation="vertical" flexItem />}
                        </Box>
                    ))}
                </Box>
            </Box>
        </section>
    )
}

export default Amenities
