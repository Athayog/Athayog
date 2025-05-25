"use client";

import { Box, Typography, Grid, List, ListItem, Container } from "@mui/material";
import Image from "next/image";
import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import SuryaLogo from '/public/images/Surya.png'

/**
 * Props for `HighlightedGuestList`.
 */
export type HighlightedGuestListProps = SliceComponentProps<Content.HighlightedGuestListSlice>;

/**
 * Component for "HighlightedGuestList" Slices.
 */
const HighlightedGuestList: FC<HighlightedGuestListProps> = ({ slice }) => {
    const {
        section_title,
        highlighted_guest,
        highlighted_guest_role,
        invitees,
        image,
    } = slice.primary;

    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <Box
                sx={{
                    bgcolor: "#f5fdf6",
                    p: 6,
                }}
            >
                <Grid
                    container
                    spacing={4}
                    direction={{ xs: "column", md: "row" }}
                    justifyContent="center"
                    alignItems="center"
                >
                    {/* Left Section */}
                    <Grid item xs={12} md={7}>
                        <Box>
                            <Typography component="div" sx={{ fontWeight: "bold", color: "green", mb: 2 }}>
                                <PrismicRichText field={section_title} />
                            </Typography>

                            <Typography sx={{ fontWeight: "bold", mb: 1 }}>Chief Guest:</Typography>

                            <Box
                                sx={{
                                    mb: 2,
                                    '&& p,h1,h2,h3': {
                                        display: 'inline',
                                    },
                                }}
                            >
                                <PrismicRichText field={highlighted_guest} />
                                <PrismicRichText field={highlighted_guest_role} />
                            </Box>

                            <Typography sx={{ fontWeight: "bold", mb: 0 }}>Special Invitees:</Typography>

                            <List>
                                {invitees.map((item, index) => (
                                    <ListItem key={index} sx={{ pl: 0 }}>
                                        <PrismicRichText
                                            field={item.invitee_description}
                                            components={{
                                                paragraph: ({ children }) => (
                                                    <Typography variant="body1" component="span">
                                                        • {children}
                                                    </Typography>
                                                ),
                                            }}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Grid>

                    {/* Right Section */}
                    <Grid item xs={12} md={5} width="100%">
                        {image?.url && (
                            <Box
                                sx={{
                                    position: "relative",
                                    width: "100%",
                                    height: "100%",
                                    minHeight: "400px", // fallback height
                                }}
                            >
                                <Image
                                    src={image.url}
                                    alt={image.alt || "Chief Guest"}
                                    fill
                                    style={{
                                        objectFit: "cover",
                                        borderRadius: "0px",
                                    }}
                                />

                                <Box
                                    sx={{
                                        position: "absolute",
                                        bottom: 16,
                                        left: 16,
                                        zIndex: 2,
                                        width: 80,
                                        height: 80,
                                    }}
                                >
                                    <Image
                                        src={SuryaLogo}
                                        alt="Logo"
                                        fill
                                        style={{ objectFit: "contain" }}
                                    />
                                </Box>
                            </Box>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </section>

    );
};

export default HighlightedGuestList;
