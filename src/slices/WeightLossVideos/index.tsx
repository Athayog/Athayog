'use client'
import 'swiper/css'
import 'swiper/css/scrollbar'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import theme from '@/styles/theme'
import { Content } from '@prismicio/client'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import { SliceComponentProps } from '@prismicio/react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { Box, Typography, useMediaQuery } from '@mui/material'
import BackgroundColorLayout from '@/components/_shared/BackgroundColorLayout'
import { useRef } from 'react'

export type WeightLossVideosProps = SliceComponentProps<Content.WeightLossVideosSlice>

const WeightLossVideos = ({ slice }: WeightLossVideosProps): JSX.Element => {
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'))
    const swiperRef = useRef<SwiperRef>(null)

    const handleSwiperInit = (swiper: { update: () => void }) => {
        swiper.update()
    }

    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <BackgroundColorLayout background_color={slice.primary.background_color}>
                <Box>
                    <Typography
                        sx={{
                            fontSize: '48px',
                            color: '#202020',
                            fontWeight: 700,
                            marginBottom: '80px',
                            textAlign: 'center',
                            [theme.breakpoints.down('md')]: {
                                fontSize: '24px',
                                marginBottom: '24px',
                            },
                        }}
                    >
                        {slice.primary.title}
                    </Typography>
                    <Box sx={{ position: 'relative' }}>
                        <Swiper
                            modules={[Navigation]}
                            slidesPerView={1}
                            spaceBetween={20}
                            onInit={handleSwiperInit}
                            ref={swiperRef}
                            navigation={{
                                nextEl: '.swiper-button-next-ath',
                                prevEl: '.swiper-button-prev-ath',
                            }}
                            breakpoints={{
                                640: {
                                    slidesPerView: 1,
                                    spaceBetween: 20,
                                },
                                1080: {
                                    slidesPerView: 2,
                                    spaceBetween: 20,
                                },
                                1200: {
                                    slidesPerView: 3,
                                    spaceBetween: 20,
                                },
                            }}
                            style={{
                                width: isMobile ? '90vw' : '1000px',
                                margin: '0 auto',
                            }}
                        >
                            {slice.primary.videos.map((video, index) => (
                                <SwiperSlide key={index}>
                                    <Box
                                        sx={{
                                            width: '100%',
                                            height: '618px',
                                            overflow: 'hidden',
                                            borderRadius: '24px',
                                        }}
                                    >
                                        <iframe
                                            src={`https://www.youtube.com/embed/${video.youtube_embed_id}?autoplay=0&modestbranding=1&rel=0`}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                            }}
                                        />
                                    </Box>
                                </SwiperSlide>
                            ))}
                            {/* Navigation buttons */}
                        </Swiper>
                        <Box
                            className="swiper-button-prev-ath"
                            sx={{
                                display: isMobile ? 'none' : 'flex',
                                position: 'absolute',
                                top: '50%',
                                left: '-10%',
                                transform: 'translateY(-50%)',
                                backgroundColor: '#fff',
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: '#42740E',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                                height: '52px',
                                width: '52px',
                                '.swiper-button-disabled': {
                                    opacity: '0.5',
                                },
                            }}
                        >
                            <ArrowBackIosIcon />
                        </Box>
                        <Box
                            className="swiper-button-next-ath"
                            sx={{
                                display: isMobile ? 'none' : 'flex',
                                position: 'absolute',
                                top: '50%',
                                right: '-10%',
                                backgroundColor: '#fff',

                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: '50%',
                                color: '#42740E',
                                transform: 'translateY(-50%)',
                                cursor: 'pointer',
                                boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                                height: '52px',
                                width: '52px',
                                '.swiper-button-disabled': {
                                    opacity: '0.5',
                                },
                            }}
                        >
                            <ArrowForwardIosIcon />
                        </Box>
                        {isMobile && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    width: '100%%',
                                    margin: '0 auto',
                                    gap: '20px',
                                    marginTop: '10px',
                                }}
                            >
                                <Box
                                    className="swiper-button-prev-ath"
                                    sx={{
                                        backgroundColor: '#fff',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        color: '#42740E',
                                        borderRadius: '50%',
                                        cursor: 'pointer',
                                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                                        height: '52px',
                                        width: '52px',
                                    }}
                                >
                                    <ArrowBackIosIcon />
                                </Box>
                                <Box
                                    className="swiper-button-next-ath"
                                    sx={{
                                        backgroundColor: '#fff',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        color: '#42740E',
                                        borderRadius: '50%',
                                        cursor: 'pointer',
                                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                                        height: '52px',
                                        width: '52px',
                                    }}
                                >
                                    <ArrowForwardIosIcon />
                                </Box>
                            </Box>
                        )}
                    </Box>
                </Box>
            </BackgroundColorLayout>
        </section>
    )
}

export default WeightLossVideos
