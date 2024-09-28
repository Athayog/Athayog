"use client";
import "swiper/css";
import Image from "next/image";
import "swiper/css/navigation";
import "swiper/css/pagination";
import React, { Key, useRef, useState } from "react";
import ArrowLeft from "/public/images/home/ArrowLeft.svg";
import { Navigation, Pagination } from "swiper/modules";
import ArrowRight from "/public/images/home/ArrowRight.svg";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Box, IconButton, Skeleton, Typography, styled } from "@mui/material";
import {
  SectionContent,
  SectionPadding,
} from "@/components/_shared/SectionContainer";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { LayoutContainer } from "@/components/_shared/LayoutContainer";

// Styled components
const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",

  gap: "50px",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    justifyContent: "center",
    gap: "15px",
  },
}));

const TextBox = styled(Box)(({}) => ({
  maxWidth: "550px",
  position: "relative",
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "48px",
  color: "#202020",
  fontWeight: 700,
  [theme.breakpoints.down("md")]: {
    fontSize: "33px",
  },
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  fontSize: "32px",
  color: "#46892D",
  fontWeight: 700,
  marginTop: "22px",
  [theme.breakpoints.down("md")]: {
    fontSize: "21px",
    marginTop: "15px",
  },
}));

const Description = styled(Typography)(({ theme }) => ({
  fontSize: "24px",
  color: "#000",
  marginTop: "34px",
  [theme.breakpoints.down("md")]: {
    fontSize: "18px",
    marginTop: "24px",
  },
}));

const ButtonGroup = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "20px",
  marginTop: "27px",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const ButtonGroupBottom = styled(Box)(({ theme }) => ({
  gap: "20px",
  marginTop: "15px",
  display: "none",
  [theme.breakpoints.down("md")]: {
    display: "flex",
  },
}));

const StyledIconButton = styled(IconButton)(({}) => ({
  backgroundColor: "#d7f0cd",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const SwiperImageBox = styled(Box)(({ theme }) => ({
  position: "relative",
  borderRadius: "270px",
  height: "500px",
  width: "436px",
  border: "4px solid #F8BCC0",
  overflow: "hidden",
  [theme.breakpoints.down("md")]: {
    width: "300px",
    height: "356px",
  },
}));

const AthayogSwiper = styled(Box)(({ theme }) => ({
  ".swiper-why": {
    height: "510px",
    width: "100%",
    marginLeft: "0",
    marginRight: "0px",
    paddingRight: "70px",
    ".swiper-vertical": {
      width: "100%",
      flexDirection: "column",
    },
    [theme.breakpoints.down("md")]: {
      height: "366px",
      paddingRight: "0px",
    },
    ".swiper-pagination-bullet": {
      background: "transparent",
      width: "16px",
      height: "16px",
      border: "1.546px solid #42740E",
      opacity: "1",
    },
    ".swiper-pagination-bullet-active": {
      height: "85px",
      borderRadius: "51px",
      border: "1.546px solid #42740E",
      background: "#42740E",
    },
    ".swiper-pagination": {
      bottom: "10px",
      textAlign: "center",
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },
    ".swiper-button-next, .swiper-button-prev": {
      color: "#46892D",
      height: "68px",
      width: "68px",
    },
  },
}));

const SwiperSkeleton = () => (
  <Box sx={{ borderRadius: "270px", height: "500px", width: "436px" }}>
    <Skeleton
      variant="rectangular"
      width="100%"
      height="100%"
      sx={{ borderRadius: "270px", width: "436px" }}
    />
  </Box>
);

const WhyAthayog = ({
  title,
  content,
}: {
  title: string | null;
  content: any;
}) => {
  const swiperRef = useRef<SwiperRef>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0); // Track current slide index

  const handleSwiperInit = (swiper: { update: () => void }) => {
    swiper.update();
    setIsLoading(false); // Hide skeleton loader once Swiper is initialized
  };

  const images = content.map(
    (image: { slider_image: any }) => image.slider_image
  );

  // Handle slide change event
  const handleSlideChange = (swiper: any) => {
    setCurrentSlideIndex(swiper.activeIndex); // Update active index on slide change
  };

  return (
    <LayoutContainer>
      <SectionPadding>
        <SectionContent>
          <Container>
            <TextBox>
              <Title>{title}</Title>
              <Box>
                {/* Update title and description dynamically based on current slide index */}
                <Subtitle>{content[currentSlideIndex]?.content_title}</Subtitle>
                <Description>
                  {content[currentSlideIndex]?.content_description}
                </Description>
              </Box>

              <ButtonGroup>
                <StyledIconButton
                  onClick={() => swiperRef?.current?.swiper.slidePrev()}
                >
                  <ArrowBackIos />
                </StyledIconButton>
                <StyledIconButton
                  onClick={() => swiperRef?.current?.swiper.slideNext()}
                >
                  <ArrowForwardIos />
                </StyledIconButton>
              </ButtonGroup>
            </TextBox>
            {isLoading && <SwiperSkeleton />}
            <AthayogSwiper>
              <Swiper
                direction={"vertical"}
                pagination={{ clickable: true }}
                modules={[Pagination, Navigation]}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                autoplay={true}
                onInit={handleSwiperInit}
                onSlideChange={handleSlideChange} // Listen for slide changes
                ref={swiperRef}
                className="swiper-why"
                style={isLoading ? { display: "none" } : { display: "flex" }}
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
                          style={{ objectFit: "cover" }}
                          alt="Carousel Sample"
                        />
                      </SwiperImageBox>
                    </SwiperSlide>
                  )
                )}
              </Swiper>
            </AthayogSwiper>
            <ButtonGroupBottom>
              <StyledIconButton
                onClick={() => swiperRef?.current?.swiper.slidePrev()}
              >
                <ArrowLeft />
              </StyledIconButton>
              <StyledIconButton
                onClick={() => swiperRef?.current?.swiper.slideNext()}
              >
                <ArrowRight />
              </StyledIconButton>
            </ButtonGroupBottom>
          </Container>
        </SectionContent>
      </SectionPadding>
    </LayoutContainer>
  );
};

export default WhyAthayog;
