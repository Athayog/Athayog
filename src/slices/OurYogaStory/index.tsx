'use client'
import ContentContainer from '@/components/_shared/ContentContainer'
import { Content } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'
import 'swiper/css'
import 'swiper/css/pagination'
import Image from 'next/image'
import 'swiper/css/navigation'
import theme from '@/styles/theme'
import { Key, useRef, useState } from 'react'
import { Pagination, Navigation } from 'swiper/modules'
import { Box, IconButton, styled, Typography } from '@mui/material'
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react'
import RegisterButton from '@/components/elements/button/RegisterButton'

import ArrowLeft from '/public/images/home/ArrowLeft.svg'
import ArrowRight from '/public/images/home/ArrowRight.svg'
import { PrismicNextLink } from '@prismicio/next'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

const Title = styled(Box)(({ theme }) => ({
    fontSize: '48px',
    color: '#202020',
    fontWeight: 700,
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
        fontSize: '33px',
    },
}))

const Subtitle = styled(Box)(({ theme }) => ({
    fontSize: '32px',
    color: '#46892D',
    fontWeight: 700,
    marginTop: '22px',
    [theme.breakpoints.down('md')]: {
        fontSize: '21px',
        marginTop: '15px',
    },
}))

const Description = styled(Box)(({ theme }) => ({
    fontSize: '24px',
    color: '#000',
    marginTop: '34px',
    [theme.breakpoints.down('md')]: {
        fontSize: '18px',
        marginTop: '24px',
    },
}))

const AthayogSwiper = styled(Box)(() => ({
    '.swiper-yoga': {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
        '.swiper-pagination-bullet': {
            background: 'transparent',
            width: '16px',
            height: '16px',
            border: '1.546px solid #42740E',
            opacity: '1',
        },
        '.swiper-pagination-bullet-active': {
            height: '85px',
            borderRadius: '51px',
            border: '1.546px solid #42740E',

            background: '#42740E',
        },
        '.swiper-pagination': {
            right: '0px',
            textAlign: 'center',
        },

        '.swiper-button-next, .swiper-button-prev': {
            color: '#46892D',
            height: '68px',
            width: '68px',
        },
    },
}))

const StyledButton = styled(RegisterButton)(({ theme }) => ({
    marginTop: '20px',
    [theme.breakpoints.down('md')]: {
        margin: '20px auto 0 auto',
        fontSize: '18px',
        height: '50px',
        width: '200px',
    },
}))

const SwiperImageBox = styled(Box)(({ theme }) => ({
    position: 'relative',
    borderRadius: '270px',
    height: '500px',
    width: '436px',
    border: '4px solid #F8BCC0',
    overflow: 'hidden',
    [theme.breakpoints.down('md')]: {
        width: '300px',
        height: '356px',
    },
}))

/**
 * Props for `OurYogaStory`.
 */
export type OurYogaStoryProps = SliceComponentProps<Content.OurYogaStorySlice>

/**
 * Component for "OurYogaStory" Slices.
 */
const OurYogaStory = ({ slice }: OurYogaStoryProps): JSX.Element => {
    const swiperRef = useRef<SwiperRef>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0) // Track current slide index

    const handleSwiperInit = (swiper: { update: () => void }) => {
        swiper.update()
        setIsLoading(false) // Hide skeleton loader once Swiper is initialized
    }

    const images = slice.primary.content.map(
        (image: { content_image: any }) => image.content_image
    )

    const handleSlideChange = (swiper: any) => {
        setCurrentSlideIndex(swiper.activeIndex) // Update active index on slide change
    }
    return (
        <section
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            <ContentContainer>
                <Box>
                    <Title>
                        <PrismicRichText field={slice.primary.title} />
                    </Title>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                            gap: '50px',
                            marginTop: '50px',
                            [theme.breakpoints.down('lg')]: {
                                flexDirection: 'column-reverse',
                                marginTop: '20px',
                                gap: '20px',
                            },
                        }}
                    >
                        <Box sx={{ maxWidth: '100%', position: 'relative' }}>
                            <Description
                                sx={{
                                    color: '#000',
                                    marginTop: '34px',
                                    [theme.breakpoints.down('md')]: {
                                        marginTop: '0px',
                                    },
                                }}
                            >
                                <PrismicRichText
                                    field={
                                        slice.primary.content[currentSlideIndex]
                                            ?.content_description
                                    }
                                />
                            </Description>
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: '20px',
                                    marginTop: '27px',
                                    [theme.breakpoints.down('sm')]: {
                                        display: 'none',
                                    },
                                }}
                            >
                                <IconButton
                                    sx={{
                                        backgroundColor: '#d7f0cd',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                    onClick={() =>
                                        swiperRef?.current?.swiper.slidePrev()
                                    }
                                >
                                    <ArrowLeft />
                                </IconButton>
                                <IconButton
                                    sx={{
                                        backgroundColor: '#d7f0cd',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                    onClick={() =>
                                        swiperRef?.current?.swiper.slideNext()
                                    }
                                >
                                    <ArrowRight />
                                </IconButton>
                            </Box>
                        </Box>
                        <AthayogSwiper>
                            <Swiper
                                direction={'vertical'}
                                pagination={{
                                    clickable: true,
                                }}
                                modules={[Pagination, Navigation]}
                                navigation={{
                                    nextEl: '.swiper-button-next',
                                    prevEl: '.swiper-button-prev',
                                }}
                                loop={true}
                                onInit={handleSwiperInit}
                                onSlideChange={handleSlideChange} // Listen for slide changes
                                ref={swiperRef}
                                className="swiper-yoga"
                                style={
                                    isLoading
                                        ? { display: 'none' }
                                        : {
                                              height: '510px',
                                              marginLeft: '0',
                                              marginRight: '0px',
                                              paddingRight: '70px',
                                          }
                                }
                            >
                                {images.map(
                                    (
                                        images: { url: string | StaticImport },
                                        index: Key | null | undefined
                                    ) => (
                                        <SwiperSlide key={index}>
                                            <SwiperImageBox>
                                                <Image
                                                    src={images.url}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    style={{
                                                        objectFit: 'cover',
                                                    }}
                                                    alt="Carousel Sample"
                                                />
                                            </SwiperImageBox>
                                        </SwiperSlide>
                                    )
                                )}
                            </Swiper>
                        </AthayogSwiper>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <PrismicNextLink field={slice.primary.button_link}>
                        <StyledButton>{slice.primary.button_text}</StyledButton>
                    </PrismicNextLink>
                </Box>
            </ContentContainer>
        </section>
    )
}

export default OurYogaStory
