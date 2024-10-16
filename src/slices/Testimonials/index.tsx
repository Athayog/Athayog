'use client'
import { Content } from '@prismicio/client'
import { Box, IconButton, Typography } from '@mui/material'
import { backgroundColorExtract } from '@/utils/color'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import ArrowLeft from '/public/images/home/ArrowLeft.svg'
import ArrowRight from '/public/images/home/ArrowRight.svg'
import Button from '@/components/elements/button/Index'
import { Navigation } from 'swiper/modules'

/**
 * Props for `Testimonials`.
 */
export type TestimonialsProps = SliceComponentProps<Content.TestimonialsSlice>

/**
 * Component for "Testimonials" Slices.
 */
const Testimonials = ({ slice }: TestimonialsProps): JSX.Element => {
    const backgroundGradient = backgroundColorExtract(slice.primary.background_color.map((item) => item.color))

    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <Box
                sx={{
                    background: backgroundGradient,
                    padding: { xs: '30px 10px', md: '60px 50px' },
                    height: '100%',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        maxWidth: '1400px',
                        margin: '0 auto',
                    }}
                >
                    {/* Title */}
                    <Typography
                        variant="h4"
                        sx={{
                            color: '#160709',
                            fontSize: { xs: '32px', sm: '40px', md: '52px' },
                            fontWeight: '700',
                            textAlign: 'center',
                            mb: { xs: '20px', md: '40px' },
                        }}
                    >
                        {slice.primary.tilte}
                    </Typography>

                    {/* Swiper Slider */}
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={30}
                        slidesPerView={1}
                        navigation={{
                            nextEl: '.custom-next',
                            prevEl: '.custom-prev',
                        }}
                        loop={true}
                        style={{
                            width: '100%',
                        }}
                    >
                        {slice.primary.data.map((item, index) => (
                            <SwiperSlide key={index}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        padding: { xs: '20px', md: '40px' },
                                    }}
                                >
                                    <PrismicNextImage
                                        field={item.image}
                                        style={{
                                            width: '250px',
                                            height: '250px',
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                            marginBottom: '20px',
                                        }}
                                    />
                                    <Typography
                                        sx={{
                                            fontSize: { xs: '23px', md: '40px', lg: '40px' },
                                            lineHeight: { xs: '32px', lg: '56px' },
                                            fontWeight: '700',
                                            marginTop: { xs: '20px', md: '40px' },
                                        }}
                                    >
                                        {item.name}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: { xs: '23px', md: '40px', lg: '40px' },
                                            lineHeight: { xs: '21px', lg: '36px' },
                                            marginTop: '6px',
                                            fontWeight: '500',
                                        }}
                                    >
                                        {item.subtitle}
                                    </Typography>
                                    <Box
                                        sx={{
                                            fontSize: { xs: '18px', md: '20px', lg: '27px' },
                                            lineHeight: { xs: '30px', lg: '46px' },
                                            marginTop: { xs: '10px', md: '28px' },
                                            '&& p': {
                                                display: { xs: 'inline-block', lg: 'block' },
                                                wordWrap: 'break-word',
                                                whiteSpace: 'initial',
                                                margin: 0,
                                            },
                                        }}
                                    >
                                        {' '}
                                        <PrismicRichText field={item.testimonial_content} />
                                    </Box>
                                </Box>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Custom Navigation Arrows */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '20px',
                            mt: '30px',
                        }}
                    >
                        <IconButton className="custom-prev" sx={{ backgroundColor: '#FFF' }}>
                            <ArrowLeft />
                        </IconButton>
                        <IconButton className="custom-next" sx={{ backgroundColor: '#FFF' }}>
                            <ArrowRight />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </section>
    )
}

export default Testimonials
