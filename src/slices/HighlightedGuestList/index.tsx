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
            <Box sx={{ bgcolor: "#f5fdf6", p: 6, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justfyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ maxWidth: '800px' }}>
                    <Grid container spacing={0} alignItems="stretch">
                        {/* Left Section */}
                        <Grid item xs={12} md={6} sx={{ pr: { md: 4, xs: 0 }, display: "flex", alignItems: "center" }}>
                            <Box>
                                <Typography sx={{ fontWeight: "bold", color: "green", mb: 2 }}>
                                    <PrismicRichText field={section_title} />
                                </Typography>

                                <Typography sx={{ fontWeight: "bold", mb: 1 }}>
                                    Chief Guest:
                                </Typography>
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

                                <Typography sx={{ fontWeight: "bold", mb: 0 }}>
                                    Special Invitees:
                                </Typography>
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


                    </Grid>
                </Box>
                {/* Right Section */}
                <Box sx={{ width: { xs: '100%', md: '600px' } }}>
                    {image?.url && (
                        <Box
                            sx={{
                                position: "relative",
                                width: "100%",
                                height: "100%",
                                minHeight: "400px", // fallback height
                            }}
                        >
                            {/* Background image */}
                            <Image
                                src={image.url}
                                alt={image.alt || "Chief Guest"}
                                fill
                                style={{
                                    objectFit: "cover",
                                    borderRadius: "0px",
                                }}
                            />

                            {/* Logo positioned at bottom left */}
                            <Box
                                sx={{
                                    position: "absolute",
                                    bottom: 16, // spacing from bottom
                                    left: 16, // spacing from left
                                    zIndex: 2, // ensure it's above the background
                                    width: 80, // adjust logo size as needed
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
                </Box>

            </Box>
        </section>
    );
};

export default HighlightedGuestList;
