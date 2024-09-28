import React from "react";
import Link from "next/link";
import theme from "@/styles/theme";
import { MenuItem } from "@mui/material";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
import { Menu } from "@/components/_header/styles/RenderMenuItems";

interface MenuItemProps {
  label: string;
  path?: string;
  type?: string;
  children?: MenuItemProps[];
}

export const RenderMenuItems = (
  items: MenuItemProps[],
  handleClose: () => void,
  handleSubMenuClick: (event: React.MouseEvent<HTMLElement>) => void,
  subMenuAnchorEl: HTMLElement | null
) => {
  return items.map(({ label, path, type, children }, index) => {
    if (type === "nav") {
      return (
        <Link
          href={path || "#"}
          passHref
          key={index}
          style={{ textDecoration: "none" }}
        >
          <MenuItem
            sx={{ color: "white", textDecoration: "none", fontSize: "18px" }}
            onClick={handleClose}
          >
            {label}
          </MenuItem>
        </Link>
      );
    } else if (type === "menu" && children) {
      return [
        <MenuItem
          onClick={handleSubMenuClick}
          aria-haspopup="true"
          aria-controls={`submenu-${index}`}
          key={`submenu-item-${index}`}
          sx={{
            color: "white",
            fontSize: "18px",
            "& .Mui-selected": {
              color: theme.palette.primary.main,
            },
          }}
        >
          {label} <ArrowRightRoundedIcon />{" "}
        </MenuItem>,
        <Menu
          id={`submenu-${index}`}
          anchorEl={subMenuAnchorEl}
          open={Boolean(subMenuAnchorEl)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "left",
          }}
          onClose={handleClose}
          sx={{}}
          MenuListProps={{
            "aria-labelledby": `submenu-button-${index}`,
          }}
          key={`submenu-menu-${index}`}
        >
          {RenderMenuItems(
            children,
            handleClose,
            handleSubMenuClick,
            subMenuAnchorEl
          )}
        </Menu>,
      ];
    }
  });
};
