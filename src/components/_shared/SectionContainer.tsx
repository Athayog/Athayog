"use client";
import theme from "@/styles/theme";
import { Box, styled } from "@mui/material";

export const SectionPadding = styled(Box)(() => ({
  padding: "50px 100px",
  [theme.breakpoints.down("lg")]: {
    padding: "50px 80px",
  },
  [theme.breakpoints.down("md")]: {
    padding: "0px 20px",
  },
}));

export const SectionContent = styled(Box)(() => ({
  maxWidth: "1440px",
  margin: "0 auto",
}));
