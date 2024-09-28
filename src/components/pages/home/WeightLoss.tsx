"use client";
import {
  SectionContent,
  SectionPadding,
} from "@/components/_shared/SectionContainer";
import RegisterButton from "@/components/elements/button/RegisterButton";
import { Box, Typography, styled } from "@mui/material";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import React from "react";
import {
  LayoutContainer,
  LayoutContent,
} from "@/components/_shared/LayoutContainer";

// Styled Components
const Container = styled(Box)(({}) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}));

const ContentBox = styled(Box)(({}) => ({
  maxWidth: "800px",
  display: "flex",
  gap: "32px",
  flexDirection: "column",
  alignItems: "start",
}));

const Title = styled(Typography)(({ theme }) => ({
  "& span": {
    color: "#D06700",
  },
  fontWeight: "700",
  [theme.breakpoints.down("md")]: {
    fontSize: "32px",
    textAlign: "left",
    width: "100%",
  },
}));

const Description = styled(Typography)(({ theme }) => ({
  textAlign: "start",
  fontSize: "24px",
  [theme.breakpoints.down("md")]: {
    fontSize: "18px",
    fontWeight: "400",
    textAlign: "left",
  },
}));

const StyledButton = styled(RegisterButton)(({ theme }) => ({
  marginTop: "20px",
  backgroundColor: "#DB982F",
  [theme.breakpoints.down("md")]: {
    margin: "0 auto",
    fontSize: "18px",
    height: "50px",
    width: "173px",
  },
}));

const ImageWrapper = styled(Box)(({ theme }) => ({
  width: "300px",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const ImageWrapperMobile = styled(Box)(({ theme }) => ({
  display: "none",
  width: "300px",
  margin: "0 auto",
  [theme.breakpoints.down("md")]: {
    display: "block",
  },
}));

const WeightLoss: React.FC<{
  title?: string | null;
  titleColoured?: string | null;
  description?: string | null;
  buttonText?: string | null;
  buttonLink?: any;
  image?: any;
}> = ({ title, titleColoured, description, buttonText, buttonLink, image }) => {
  return (
    <LayoutContainer>
      <LayoutContent>
        <SectionPadding>
          <SectionContent>
            <Container>
              <ContentBox>
                <Title variant="h2">
                  {title}
                  <br /> <span>{titleColoured}</span>
                </Title>
                <ImageWrapperMobile>
                  <PrismicNextImage field={image} width={300} />
                </ImageWrapperMobile>
                <Description variant="body1">{description}</Description>
                <PrismicNextLink field={buttonLink}>
                  <StyledButton>{buttonText}</StyledButton>
                </PrismicNextLink>
              </ContentBox>
              <ImageWrapper>
                <PrismicNextImage field={image} width={300} />
              </ImageWrapper>
            </Container>
          </SectionContent>
        </SectionPadding>
      </LayoutContent>
    </LayoutContainer>
  );
};

export default WeightLoss;
