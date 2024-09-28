"use client";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import { Paper, Typography } from "@mui/material";
import {
  SectionContent,
  SectionPadding,
} from "@/components/_shared/SectionContainer";
import Image from "next/image";
import { LayoutContainer, LayoutContent } from "../_shared/LayoutContainer";
import { Key } from "react";

const StatBox = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  backgroundColor: "transparent",
  alignItems: "center",
  textAlign: "center",
  justifyContent: "center",
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: "none",

  width: "200px",
  [theme.breakpoints.down("md")]: {
    backgroundColor: "#eff3e4",
    borderRadius: "7.978px ",
    width: "120px",
  },
  svg: {
    width: "45px",
    height: "auto",
    [theme.breakpoints.down("md")]: {
      width: "35px",
    },
  },
}));

const StatCount = styled(Typography)(({ theme }) => ({
  fontSize: "60px",
  color: "#416c27",
  margin: theme.spacing(1, 0),
  [theme.breakpoints.down("md")]: {
    fontSize: "46px",
    margin: 0,
  },
}));

const StatName = styled(Typography)(({ theme }) => ({
  fontSize: "26px",
  color: "#404040",
  [theme.breakpoints.down("md")]: {
    fontSize: "17px",
  },
}));

// Component
export default function Stats({ statsData }: any) {
  return (
    <LayoutContainer>
      <LayoutContent>
        <SectionPadding>
          <SectionContent>
            <Grid
              container
              spacing={4}
              gap={{ xs: "20px", md: "30px", lg: "80px" }}
              justifyContent="center"
              component="div"
            >
              {statsData.map((stat: any, index: Key | null | undefined) => {
                const Icon = stat.icon.url;
                return (
                  <Grid key={index} component="div">
                    <StatBox>
                      <Image
                        src={Icon}
                        width={stat.icon.dimensions.width}
                        height={stat.icon.dimensions.height}
                        alt={stat.icon.alt}
                      />
                      <StatCount>{stat.count}+</StatCount>
                      <StatName>{stat.label}</StatName>
                    </StatBox>
                  </Grid>
                );
              })}
            </Grid>
          </SectionContent>
        </SectionPadding>
      </LayoutContent>
    </LayoutContainer>
  );
}
