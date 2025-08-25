// Dot.tsx
import React from "react";
import { Box } from "@mui/material";

interface DotProps {
  color?: string;
  size?: number;
}

export const Dot: React.FC<DotProps> = ({ color = "red", size = 15 }) => (
  <Box
    sx={{
      width: size,
      height: size,
      borderRadius: "50%",
      backgroundColor: color,
      position: "absolute",
      bottom: 8,
      right: 8,
    }}
  />
);
