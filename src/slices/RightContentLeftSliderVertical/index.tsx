'use client'
import { Content } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'
import 'swiper/css'
import React, { useState } from 'react'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Box, Skeleton, Typography, styled } from '@mui/material'
import { Navigation, Pagination } from 'swiper/modules'
import RegisterButton from '@/components/elements/button/RegisterButton'
import ContentContainer from '@/components/_shared/ContentContainer'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'

// Styled Components
const SwiperContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    borderRadius: '270px',
    height: '500px',
    width: '436px',
    border: '4px solid #F8BCC0',
    overflow: 'hidden',
    margin: '0 auto',
    [theme.breakpoints.down('md')]: {
        width: '300px',
        height: '356px',
    },
}))

const Container = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '50px',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '15px',
    },
}))

const ContentBox = styled(Box)(({ theme }) => ({
    maxWidth: '800px',
    display: 'flex',
    gap: '34px',
    flexDirection: 'column',
    alignItems: 'end',
    [theme.breakpoints.down('md')]: {
        alignItems: 'center',
    },
}))

const Title = styled(Typography)(({ theme }) => ({
    color: '#1E6F00',
    width: '100%',
    textAlign: 'end',
    fontWeight: 700,
    [theme.breakpoints.down('md')]: {
        fontSize: '32px',
        textAlign: 'center',
        width: '100%',
    },
}))

const Subtitle = styled(Typography)(({ theme }) => ({
    textAlign: 'end',
    maxWidth: '474px',
    fontSize: '34px',
    fontWeight: 700,
    [theme.breakpoints.down('md')]: {
        fontSize: '24px',
        textAlign: 'center',
        width: '100%',
    },
    p: {
        margin: 0,
    },
}))

const Description = styled(Box)(({ theme }) => ({
    textAlign: 'end',
    maxWidth: '600px',
    fontSize: '24px',
    [theme.breakpoints.down('md')]: {
        fontSize: '18px',
        fontWeight: '400',
        textAlign: 'center',
    },
    p: {
        margin: 0,
    },
}))

const AthayogSwiper = styled(Box)(({ theme }) => ({
    width: '100%',
    '.swiper-yoga': {
        height: '510px',
        marginLeft: '0',
        marginRight: '0px',
        paddingLeft: '45px',
        paddingRight: '70px',
        width: '100%',
        margin: '0 auto', // Center horizontally
        [theme.breakpoints.down('md')]: {
            height: '366px',
            paddingLeft: '0px',
            paddingRight: '0px',
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
            left: '0px',
            textAlign: 'center',
            [theme.breakpoints.down('md')]: {
                display: 'none',
            },
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
        margin: '0 auto',
        fontSize: '18px',
        height: '50px',
        width: '173px',
    },
}))

const SwiperSkeleton = () => (
    <Box sx={{ borderRadius: '270px', height: '400px', width: '100%', maxWidth: '436px' }}>
        <Skeleton variant="rectangular" width="100%" height="100%" sx={{ borderRadius: '270px', width: '436px' }} />
    </Box>
)

/**
 * Props for `RightContentLeftSliderVertical`.
 */
export type RightContentLeftSliderVerticalProps = SliceComponentProps<Content.RightContentLeftSliderVerticalSlice>

/**
 * Component for "RightContentLeftSliderVertical" Slices.
 */
const RightContentLeftSliderVertical = ({ slice }: RightContentLeftSliderVerticalProps): JSX.Element => {
    const [isLoading, setIsLoading] = useState(true)

    const handleSwiperInit = (swiper: { update: () => void }) => {
        swiper.update()
        setIsLoading(false) // Hide skeleton loader once Swiper is initialized
    }
    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <ContentContainer>
                <Container>
                    {isLoading && <SwiperSkeleton />}
                    <AthayogSwiper>
                        <Swiper
                            direction={'horizontal'}
                            breakpoints={{
                                1024: {
                                    direction: 'vertical',
                                },
                            }}
                            autoplay
                            pagination={{ clickable: true }}
                            modules={[Pagination, Navigation]}
                            navigation={{
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
                            }}
                            onInit={handleSwiperInit}
                            className="swiper-yoga"
                            style={isLoading ? { display: 'none' } : { display: 'flex' }}
                        >
                            {slice.primary.slider_images.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <SwiperContainer>
                                        <PrismicNextImage field={item.image} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{ objectFit: 'cover' }} />
                                    </SwiperContainer>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </AthayogSwiper>
                    <ContentBox>
                        <Title variant="h2">{slice.primary.title}</Title>
                        <Subtitle variant="h3">
                            <PrismicRichText field={slice.primary.subtitle} />
                        </Subtitle>
                        <Description>
                            <PrismicRichText field={slice.primary.description} />
                        </Description>
                        <PrismicNextLink field={slice.primary.button_link}>
                            <StyledButton>{slice.primary.button_text}</StyledButton>
                        </PrismicNextLink>
                    </ContentBox>
                </Container>
            </ContentContainer>
        </section>
    )
}

export default RightContentLeftSliderVertical
