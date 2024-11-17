import 'swiper/css'
import 'swiper/css/scrollbar'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Swiper, SwiperRef } from 'swiper/react'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { Box, SvgIconTypeMap, useMediaQuery, useTheme } from '@mui/material'

interface HorizontalSwiperProps {
    children: ReactNode[] // Array of JSX elements (the slides)
    spaceBetween?: number // Space between slides
    slidesPerView?: number // Number of slides to show at once
    enableNavigation?: boolean // Enable/disable navigation buttons
    customPrevIcon?: OverridableComponent<SvgIconTypeMap<object, 'svg'>> & {
        muiName: string
    }
    customNextIcon?: OverridableComponent<SvgIconTypeMap<object, 'svg'>> & {
        muiName: string
    }
    enablePagination?: boolean // Enable/disable pagination
    enableScrollbar?: boolean // Enable/disable scrollbar
    swiperWidth?: string | { [breakpoint: string]: string | number } // Width of the swiper
    centerPage?: string // Centering style for the swiper
    disableNavOnMobile?: boolean // Disable navigation on mobile
    resetSlide: () => void
}

interface NavigationIconProps {
    Icon: OverridableComponent<SvgIconTypeMap<object, 'svg'>> & {
        muiName: string
    }
    type: 'next' | 'prev' // Use union type for type prop
}

const NavigationIcon: React.FC<NavigationIconProps> = ({ Icon, type }) => {
    const style = type === 'next' ? { marginRight: '0px' } : { marginLeft: '10px' }

    return <Icon style={style as React.CSSProperties} /> // Ensure style is a valid React.CSSProperties
}

const HorizontalSwiper: React.FC<HorizontalSwiperProps> = ({
    children,
    spaceBetween = 50,
    slidesPerView = 1,
    enableNavigation = true,
    customPrevIcon = ArrowBackIosIcon,
    customNextIcon = ArrowForwardIosIcon,
    enablePagination = true,
    enableScrollbar = false,
    swiperWidth = '100%',
    centerPage = '0 auto',
    disableNavOnMobile = false,
    resetSlide,
}) => {
    const swiperRef = useRef<SwiperRef>(null)
    const [isLoading, setIsLoading] = useState(true)
    const prevRef = useRef<HTMLDivElement>(null)
    const nextRef = useRef<HTMLDivElement>(null)
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down(768))

    const handleSwiperInit = (swiper: { update: () => void }) => {
        swiper.update()
        setIsLoading(false) // Hide skeleton loader once Swiper is initialized
    }

    useEffect(() => {
        if (swiperRef?.current?.swiper) {
            swiperRef?.current?.swiper.slideTo(0)
        }
    }, [swiperRef, resetSlide])

    return (
        <Box
            sx={{
                width: swiperWidth,
                margin: centerPage,
                overflow: 'visible',
                position: 'relative',
            }}
        >
            {enableNavigation && disableNavOnMobile && !isMobile && (
                <>
                    <div
                        onClick={() => swiperRef?.current?.swiper.slidePrev()}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '-10%',
                            transform: 'translateY(-50%)',
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
                        <NavigationIcon Icon={customPrevIcon} type="prev" />
                    </div>
                    <div
                        onClick={() => swiperRef?.current?.swiper.slideNext()}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            right: '-10%',
                            backgroundColor: '#fff',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '50%',
                            color: '#42740E',
                            transform: 'translateY(-50%)',
                            cursor: 'pointer',
                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                            height: '52px',
                            width: '52px',
                        }}
                    >
                        <NavigationIcon Icon={customNextIcon} type="next" />
                    </div>
                </>
            )}

            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={spaceBetween}
                slidesPerView={slidesPerView}
                onInit={handleSwiperInit}
                ref={swiperRef}
                navigation={
                    enableNavigation && {
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    }
                }
                pagination={enablePagination ? { clickable: true } : false}
                scrollbar={enableScrollbar ? { draggable: true } : false}
            >
                {children}
            </Swiper>
        </Box>
    )
}

export default HorizontalSwiper
