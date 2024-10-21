import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { backgroundColorExtract } from '@/utils/color'
import { Box, Typography } from '@mui/material'
import { PrismicNextImage } from '@prismicio/next'
import { nanoid } from 'nanoid'

export type EligibleProps = SliceComponentProps<Content.EligibleSlice>

const Eligible = ({ slice }: EligibleProps): JSX.Element => {
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
                <Box sx={{ maxWidth: '1400px' }}>
                    <Typography
                        sx={{
                            color: '#606060',
                            textAlign: 'left',
                            fontSize: { xs: '36px', md: '52px' },
                            fontStyle: 'normal',
                            alignSelf: { xs: 'center', md: 'flex-start' },
                            fontWeight: 700,
                            lineHeight: '44px', // 84.615%
                        }}
                    >
                        {slice.primary.title}
                        <span style={{ color: '#617E43', marginLeft: '10px' }}>{slice.primary.highlighted_text}</span>
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            marginTop: { xs: '20px', md: '70px' },
                            gap: { xs: '50px', md: '150px' },
                            width: '100%',
                            justifyContent: 'space-between',
                            flexDirection: { xs: 'column-reverse', md: 'row' },
                            alignItems: { xs: 'center', md: 'flex-start' },
                        }}
                    >
                        <Box>
                            {slice.primary.points.map((item) => (
                                <Box
                                    key={item.title + nanoid()}
                                    sx={{ display: 'flex', gap: { xs: '20px', md: '50px' }, marginTop: '10px', marginBottom: { xs: '10px', md: '50px' }, alignItems: 'center' }}
                                >
                                    <Box sx={{ height: { xs: '28px', md: '50px' }, width: { xs: '28px', md: '50px' } }}>
                                        <PrismicNextImage field={item.icons} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                    </Box>
                                    <Typography
                                        sx={{
                                            color: '#202020',
                                            textAlign: 'left',
                                            fontSize: { xs: '18px', md: '32px' },
                                            fontStyle: 'normal',
                                            fontWeight: 500,
                                            lineHeight: '44px', // 84.615%
                                        }}
                                    >
                                        {item.title}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                        <Box
                            sx={{
                                width: { xs: '306px', md: '540px' },
                                height: { xs: '415px', md: '800px' },
                                borderRadius: '300px 300px 0px 0px',
                                borderTop: '6px solid #C9EEC0',
                                borderRight: '6px solid #C9EEC0',
                                borderLeft: '6px solid #C9EEC0',
                                background: '#824141',
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                        >
                            <PrismicNextImage field={slice.primary.main_image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </section>
    )
}

export default Eligible
