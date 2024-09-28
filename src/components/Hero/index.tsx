"use client";
import { Box, styled, Typography, Button } from "@mui/material";
import Link from "next/link";

export const HeroContainer = styled(Box)(() => ({
  height: "100vh",
  position: "relative",
  overflow: "hidden",
  padding: "25px",
}));

export const videoStyles = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  zIndex: -1,
};

export const Gradient = styled(Box)(() => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background:
    "linear-gradient(180deg, #101010 1.49%, rgba(33, 10, 10, 0) 69.5%, rgba(107, 138, 76, 0.8) 100%)",
  pointerEvents: "none",
}));

export const ContentBox = styled(Box)(() => ({
  position: "relative",
  display: "flex",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  zIndex: 1,
  color: "white",
  maxWidth: "800px",
  margin: "0 auto",
}));

export const HeadingTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "700",
  fontSize: "35px",
  textAlign: "center",
  [theme.breakpoints.up("lg")]: {
    fontSize: "48px",
    lineHeight: "56px",
  },
}));

export const SubTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "400",
  fontSize: "22px",
  lineHeight: "29px",
  textAlign: "center",
  marginTop: "17px",
  [theme.breakpoints.up("lg")]: {
    fontSize: "28px",
    lineHeight: "56px",
  },
}));

export const ActionButton = styled(Button)(() => ({
  marginTop: "60px",
  boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.44)",
  padding: "17.467px 23.289px",
  borderRadius: "46.578px",
  height: "56px",
  width: " 288.064px",
  fontSize: "20px",
}));

const Hero = ({
  title,
  subtitle,
  actionButtonText,
  actionButtonLink,
  videoUrl,
}: {
  title: string | null;
  subtitle: string | null;
  actionButtonText: string | null;
  actionButtonLink: any;
  videoUrl: string;
}) => {
  return (
    <HeroContainer>
      <video
        autoPlay
        loop
        muted
        playsInline
        style={videoStyles as React.CSSProperties}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Gradient />

      <ContentBox>
        <HeadingTitle variant="h1">{title}</HeadingTitle>
        <SubTitle>{subtitle}</SubTitle>
        <Link href={actionButtonLink} passHref>
          <ActionButton variant="contained">{actionButtonText}</ActionButton>
        </Link>
      </ContentBox>
    </HeroContainer>
  );
};

export default Hero;
