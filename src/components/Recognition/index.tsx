"use client";
import React from "react";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import { Box, Typography, Stack } from "@mui/material";
import {
  SectionContent,
  SectionPadding,
} from "@/components/_shared/SectionContainer";
import { RecognitionSliceDefaultPrimaryLogosItem } from "../../../prismicio-types";
import { LayoutContainer, LayoutContent } from "../_shared/LayoutContainer";

// Styled components using MUI's styled
const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",

  gap: "25px",
  alignItems: "center",
  width: "100%",
  [theme.breakpoints.down("md")]: {
    justifyContent: "center",
    flexDirection: "column",
  },
}));

const Description = styled(Typography)(({ theme }) => ({
  maxWidth: "650px",
  fontSize: "24px",
  [theme.breakpoints.down("md")]: {
    fontSize: "17px",
    fontWeight: "600",
  },
}));

const ImageStack = styled(Stack)(({}) => ({
  flexDirection: "row",
  gap: "50px",
}));

const StyledImage = styled(Image)(({ theme }) => ({
  width: "auto",
  height: "80px",
  [theme.breakpoints.down("md")]: {
    height: "60px",
  },
}));

export default function Recognition({
  description,
  logos,
}: {
  description: string | null;
  logos: RecognitionSliceDefaultPrimaryLogosItem[] | [];
}) {
  return (
    <LayoutContainer>
      <LayoutContent>
        <SectionPadding>
          <SectionContent>
            <Container>
              <Description>{description}</Description>
              <ImageStack>
                {logos.map(({ logo }, index) => (
                  <StyledImage
                    key={index}
                    src={logo.url ?? ""}
                    alt={logo.alt ?? ""}
                    width={logo?.dimensions?.width}
                    height={logo?.dimensions?.height}
                  />
                ))}
              </ImageStack>
            </Container>
          </SectionContent>
        </SectionPadding>
      </LayoutContent>
    </LayoutContainer>
  );
}
