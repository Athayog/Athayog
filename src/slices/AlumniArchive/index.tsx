'use client'
import 'swiper/css'
import 'swiper/css/navigation'
import { useRef, useEffect } from 'react'
import { Content } from '@prismicio/client'
import { Navigation } from 'swiper/modules'
import { Box, Typography } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import { backgroundColorExtract } from '@/utils/color'
import { YouTubeEmbed } from '@next/third-parties/google'
import ArrowForward from '/public/images/OrangeArrowForward.svg'
import ArrowBackward from '/public/images/OrangeArrowBackward.svg'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'

export type AlumniArchiveProps = SliceComponentProps<Content.AlumniArchiveSlice>

const AlumniArchive = ({ slice }: AlumniArchiveProps): JSX.Element => {
    const backgroundGradient = backgroundColorExtract(slice.primary.background_color.map((item) => item.color))

    const prevRef = useRef(null)
    const nextRef = useRef(null)

    const handleSwiperInit = (swiper: { update: () => void }) => {
        swiper.update()
    }

    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <Box
                sx={{
                    background: backgroundGradient,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: { xs: '20px 10px', md: '60px 50px' },
                    maxWidth: '100vw',
                    '& .swiper-initialized': {
                        width: '100%',
                    },
                }}
            >
                <Typography
                    sx={{
                        color: '#202020',
                        textAlign: 'center',
                        fontSize: { xs: '36px', md: '52px' },
                        fontStyle: 'normal',
                        fontWeight: 700,
                        lineHeight: '44px',
                        marginBottom: { xs: '20px', md: '100px' },
                    }}
                >
                    {slice.primary.title}
                </Typography>
                <Box sx={{ position: 'relative', width: '100%' }}>
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={50}
                        slidesPerView={1}
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                        onInit={(swiper) => handleSwiperInit}
                    >
                        {slice.primary.alumni.map((item) => (
                            <SwiperSlide key={item.youtube_embed_id}>
                                <Box sx={{ display: 'flex', gap: { xs: '20px', md: '52px' }, flexDirection: { xs: 'column', md: 'row' } }}>
                                    <Box
                                        sx={{
                                            position: 'relative',
                                            borderRadius: '22.2px',
                                            height: { xs: '100%', md: '520px' },
                                            width: { xs: '100%', md: '520px' },
                                            overflow: 'hidden',
                                            '&& div[data-ntpc="YouTubeEmbed"]': {
                                                height: '100% !important',
                                                width: '100% !important',
                                                borderRadius: '22.2px',
                                            },
                                            '.lite-youtube': { maxWidth: 'none' },
                                        }}
                                    >
                                        <YouTubeEmbed style="height: 100%; width: 100%;" videoid={item.youtube_embed_id ?? ''} params="controls=0" />
                                    </Box>

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            fontSize: { xs: '18px', md: '32px' },
                                            maxWidth: '700px',
                                            color: '#000',
                                            fontWeight: '400',
                                            lineHeight: { xs: '38px', md: '48px' },
                                            '&& p, strong, em': {
                                                fontSize: { xs: '18px', md: '32px' },
                                                lineHeight: { xs: '38px', md: '48px' },
                                            },
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                fontSize: { xs: '18px', md: '32px' },
                                                color: '#000',
                                                fontWeight: '400',
                                                lineHeight: { xs: '38px', md: '48px' },
                                                '&& p, strong, em': {
                                                    fontSize: { xs: '18px', md: '32px' },
                                                    lineHeight: { xs: '38px', md: '48px' },
                                                },
                                            }}
                                        >
                                            <PrismicRichText field={item.description} />
                                        </Box>
                                        <Typography sx={{ fontWeight: '700', marginTop: '27px' }}>{item.name}</Typography>
                                        <Typography sx={{ color: '#404040', fontWeight: '500', fontSize: { xs: '20px', md: '30x' } }}>{item.works_at}</Typography>
                                    </Box>
                                </Box>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Custom navigation buttons */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '20px',
                            position: { xs: 'relative', md: 'absolute' },
                            right: { xs: 'auto', md: '100px' },
                            bottom: { xs: 'auto', md: '100px' },
                            zIndex: 2,
                        }}
                    >
                        <Box
                            ref={prevRef}
                            component="button"
                            sx={{
                                width: '68px',
                                height: '68px',
                                border: '2px solid #F69B75',
                                borderRadius: '500px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                            }}
                        >
                            <ArrowBackward />
                        </Box>
                        <Box
                            ref={nextRef}
                            component="button"
                            sx={{
                                width: '68px',
                                height: '68px',
                                border: '2px solid #F69B75',
                                borderRadius: '500px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                            }}
                        >
                            <ArrowForward />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </section>
    )
}

export default AlumniArchive
