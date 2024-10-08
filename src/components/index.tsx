"use client";
import React from "react";
import { Box, Typography, styled } from "@mui/material";
import RegisterButton from "@/components/elements/button/RegisterButton";
import {
  SectionContent,
  SectionPadding,
} from "@/components/_shared/SectionContainer";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { LayoutContainer } from "@/components/_shared/LayoutContainer";

// Styled Components
const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    flexDirection: "row-reverse",
  },
}));

const ImageWrapper = styled(Box)(({ theme }) => ({
  width: "300px",
  [theme.breakpoints.down("md")]: {
    width: "156px",
    display: "none",
  },
}));

const ImageWrapperMobile = styled(Box)(({ theme }) => ({
  width: "156px",
  display: "none",
  [theme.breakpoints.down("md")]: {
    width: "156px",
    display: "block",
    margin: "0 auto",
  },
}));

const ContentBox = styled(Box)(({}) => ({
  maxWidth: "800px",
  display: "flex",
  gap: "20px",
  flexDirection: "column",
  alignItems: "end",
}));

const Title = styled(Typography)(({ theme }) => ({
  "& span": {
    color: "#016B5F",
  },
  fontSize: "48px",
  fontWeight: "700",
  [theme.breakpoints.down("md")]: {
    fontSize: "32px",
    textAlign: "left",
    display: "none",
  },
}));

const TitleMobile = styled(Typography)(({ theme }) => ({
  "& span": {
    color: "#016B5F",
  },
  display: "none",
  fontWeight: "700",
  [theme.breakpoints.down("md")]: {
    fontSize: "32px",
    textAlign: "left",
    display: "block",
    width: "100%",
  },
}));

const Description = styled(Typography)(({ theme }) => ({
  textAlign: "end",
  fontWeight: "400",
  fontSize: "24px",
  [theme.breakpoints.down("md")]: {
    fontSize: "18px",
    textAlign: "left",
  },
}));

const StyledButton = styled(RegisterButton)(({ theme }) => ({
  marginTop: "20px",
  backgroundColor: "#007668",
  [theme.breakpoints.down("md")]: {
    margin: "0 auto",
    fontSize: "18px",
    height: "50px",
    width: "173px",
  },
}));

const PersonalSessions: React.FC<{
  title?: string | null;
  titleColoured?: string | null;
  description?: string | null;
  buttonText?: string | null;
  buttonLink?: any;
  image?: any;
}> = ({ title, titleColoured, description, buttonText, buttonLink, image }) => {
  return (
    <LayoutContainer>
      <SectionPadding>
        <SectionContent>
          <Container>
            <ImageWrapper>
              <PrismicNextImage field={image} width={300} />
            </ImageWrapper>
            <ContentBox>
              <Title variant="h2">
                {title} <span>{titleColoured}</span>
              </Title>
              <TitleMobile variant="h2">
                {title} <br /> <span>{titleColoured}</span>
              </TitleMobile>
              <ImageWrapperMobile>
                <PrismicNextImage field={image} width={156} />
              </ImageWrapperMobile>
              <Description variant="body1">{description}</Description>
              <PrismicNextLink field={buttonLink}>
                <StyledButton>{buttonText}</StyledButton>
              </PrismicNextLink>
            </ContentBox>
          </Container>
        </SectionContent>
      </SectionPadding>
    </LayoutContainer>
  );
};

export default PersonalSessions;
