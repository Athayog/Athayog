import React from "react";
import { ButtonProps } from "@mui/material/Button";
import theme from "@/styles/theme";
import { Button } from "@mui/material";
import { styled } from "@mui/system";

export interface RegisterButtonProps extends ButtonProps {
  children: React.ReactNode;
}

export const RegisterButtonStyled = styled(Button)(() => ({
  boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.44)",
  padding: "17.467px 23.289px",
  borderRadius: "46px",
  backgroundColor: theme.palette.primary.main,
  height: "56px",
  width: " 243px",
  color: "white",
  fontSize: "24px",
}));

const RegisterButton: React.FC<RegisterButtonProps> = ({
  children,
  ...props
}) => {
  return <RegisterButtonStyled {...props}>{children}</RegisterButtonStyled>;
};

export default RegisterButton;
