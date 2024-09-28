import Link from "next/link";
import React, { useState } from "react";
import { Close } from "@mui/icons-material";
import { usePathname } from "next/navigation";
import { navItems } from "@/constants/navItems";
import NavMenuMobile from "/public/images/NavMenuMobile.svg";
import { Collapse, ListItem, ListItemText } from "@mui/material";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import {
  Drawer,
  Divider,
  DrawerContent,
  List,
  NavLinkButton,
  DrawerParent,
  IconButton,
  DrawerNavContainer,
  TrialButton,
} from "@/components/_header/styles/MobileDrawer";

export default function MobileDrawer() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const DrawerList = (
    <DrawerContent role="presentation">
      <DrawerNavContainer>
        <List active={false}>
          {navItems.map(({ label, path, type, children }, index) => {
            if (type === "nav") {
              return (
                <Link
                  href={path ? path : "/"}
                  passHref={true}
                  key={index}
                  onClick={handleDrawerOpen}
                >
                  <NavLinkButton pathname={pathname} path={path ? path : "/"}>
                    {label}
                  </NavLinkButton>
                  <Divider />
                </Link>
              );
            } else if (type === "menu" && children) {
              return (
                <React.Fragment key={index}>
                  <NavLinkButton
                    pathname={pathname}
                    path={path ? path : "/"}
                    onClick={() => setMenuOpen(!menuOpen)}
                  >
                    {label}
                    {menuOpen ? (
                      <ArrowDropDownRoundedIcon />
                    ) : (
                      <ArrowRightRoundedIcon />
                    )}
                  </NavLinkButton>
                  <Divider />
                  <Collapse in={menuOpen} timeout="auto" unmountOnExit>
                    <List active={true} disablePadding>
                      {children.map(
                        (
                          { label: childLabel, path: childPath, children },
                          childIndex
                        ) => {
                          if (children) {
                            return (
                              <React.Fragment key={childIndex}>
                                <ListItem
                                  onClick={() => setSubMenuOpen(!subMenuOpen)}
                                >
                                  {childLabel}{" "}
                                  {subMenuOpen ? (
                                    <ArrowDropDownRoundedIcon />
                                  ) : (
                                    <ArrowRightRoundedIcon />
                                  )}
                                </ListItem>
                                <Divider />
                                <Collapse
                                  in={subMenuOpen}
                                  timeout="auto"
                                  unmountOnExit
                                >
                                  <List active={true} disablePadding>
                                    {children.map(
                                      (
                                        {
                                          label: grandChildLabel,
                                          path: grandChildPath,
                                        },
                                        grandChildIndex
                                      ) => {
                                        return (
                                          <React.Fragment key={grandChildIndex}>
                                            <ListItem sx={{ ml: 4 }}>
                                              {" "}
                                              {/* TODO: Get Rid of SX */}
                                              <Link
                                                href={
                                                  grandChildPath
                                                    ? grandChildPath
                                                    : "/"
                                                }
                                                passHref={true}
                                              >
                                                <ListItemText
                                                  primary={grandChildLabel}
                                                />
                                              </Link>
                                            </ListItem>
                                            <Divider />
                                          </React.Fragment>
                                        );
                                      }
                                    )}
                                  </List>
                                </Collapse>
                              </React.Fragment>
                            );
                          }
                          return (
                            <React.Fragment key={childIndex}>
                              <ListItem sx={{ ml: 4 }}>
                                {" "}
                                {/* TODO: Get Rid of SX */}
                                <Link
                                  href={childPath ? childPath : "/"}
                                  passHref={true}
                                  onClick={handleDrawerOpen}
                                >
                                  <ListItemText primary={childLabel} />
                                </Link>
                              </ListItem>
                              <Divider />
                            </React.Fragment>
                          );
                        }
                      )}
                    </List>
                  </Collapse>
                </React.Fragment>
              );
            }
          })}
        </List>
        <IconButton onClick={handleDrawerClose}>
          <Close />
        </IconButton>
      </DrawerNavContainer>

      <TrialButton variant="text">
        {" "}
        Get a{"  "}
        <span>
          {"  "}
          Free Trial
        </span>
      </TrialButton>
    </DrawerContent>
  );

  return (
    <DrawerParent>
      <NavMenuMobile onClick={handleDrawerOpen} alt={"Menu"} />
      <Drawer variant="persistent" anchor="top" open={open}>
        {DrawerList}
      </Drawer>
    </DrawerParent>
  );
}
