import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper } from 'swiper/react';
import React, { ReactNode, useRef } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { Box, SvgIconTypeMap, useMediaQuery, useTheme } from '@mui/material';

interface VerticalSwiperProps {
    children: ReactNode[]; // Array of JSX elements (the slides)
    spaceBetween?: number; // Space between slides
    slidesPerView?: number; // Number of slides to show at once
    enableNavigation?: boolean; // Enable/disable navigation buttons
    customPrevIcon?: OverridableComponent<SvgIconTypeMap<object, 'svg'>> & { muiName: string };
    customNextIcon?: OverridableComponent<SvgIconTypeMap<object, 'svg'>> & { muiName: string };
    enablePagination?: boolean; // Enable/disable pagination
    enableScrollbar?: boolean; // Enable/disable scrollbar
    swiperWidth?: string | { [breakpoint: string]: string | number }; // Width of the swiper
    swiperHeight?: string | { [breakpoint: string]: string | number };
    centerPage?: string; // Centering style for the swiper
    disableNavOnMobile?: boolean; // Disable navigation on mobile
}

interface NavigationIconProps {
    Icon: OverridableComponent<SvgIconTypeMap<object, 'svg'>> & { muiName: string };
    type: 'next' | 'prev'; // Use union type for type prop
}

const NavigationIcon: React.FC<NavigationIconProps> = ({ Icon, type }) => {
    const style = type === 'next' ? { marginRight: '0px' } : { marginLeft: '10px' };

    return <Icon style={style as React.CSSProperties} />; // Ensure style is a valid React.CSSProperties
};

const VerticalSwiper: React.FC<VerticalSwiperProps> = ({
    children,
    spaceBetween = 50,
    slidesPerView = 3,
    enableNavigation = true,
    customPrevIcon = ArrowBackIosIcon,
    customNextIcon = ArrowForwardIosIcon,
    enablePagination = true,
    enableScrollbar = false,
    swiperWidth = '100%',
    swiperHeight = '500px',
    centerPage = '0 auto',
    disableNavOnMobile = false,
}) => {
    const prevRef = useRef<HTMLDivElement>(null);
    const nextRef = useRef<HTMLDivElement>(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down(768));

    return (
        <Box
            sx={{
                width: swiperWidth,
                margin: centerPage,
                overflow: 'visible',
                position: 'relative',
                height: swiperHeight,
            }}
        >
            {enableNavigation && disableNavOnMobile && !isMobile && (
                <>
                    <div
                        ref={prevRef}
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
                        ref={nextRef}
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
                direction="vertical"
                spaceBetween={spaceBetween}
                slidesPerView={slidesPerView}
                navigation={enableNavigation && { prevEl: prevRef.current, nextEl: nextRef.current }}
                pagination={enablePagination ? { clickable: true } : false}
                scrollbar={enableScrollbar ? { draggable: true } : false}
            >
                {children}
            </Swiper>
        </Box>
    );
};

export default VerticalSwiper;
