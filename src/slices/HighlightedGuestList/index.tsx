"use client";

import { Box, Typography, Grid, List, ListItem, Container } from "@mui/material";
import Image from "next/image";
import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import SuryaLogo from '/public/images/Surya.png'
import Blur from '/public/images/blur.jpg'
import BackgroundImage from '/public/images/back_for_guest.jpg'

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
                    position: 'relative',
                    width: '100%',
                    height: '100%',  // adjust as needed
                    overflow: 'hidden',

                }}
            >
                {/* Blurred Background */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${BackgroundImage.src})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'right',
                        filter: 'blur(174px)',
                        zIndex: 0,
                        pointerEvents: 'none', // makes sure background doesn't block clicks
                    }}
                />

                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, padding: { xs: 4, md: 6 }, justifyContent: 'space-between', width: '100%', zIndex: 100, position: 'relative' }}>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{
                            fontWeight: "bold", color: "#316200",
                            marginBottom: '20px',
                            '&& p,h1,h2,h3,h4,h5': {
                                margin: '0px',
                                fontSize: {
                                    xs: '28px', md: '42px',

                                }
                            }
                        }
                        } >
                            <PrismicRichText field={section_title} />
                        </Box>

                        <Typography sx={{
                            fontWeight: "bold", mb: 1, fontSize: {
                                xs: '20px', md: '32px'
                            }
                        }}>Chief Guest:</Typography>

                        <Box
                            sx={{
                                mb: 2,
                                '&& p,h1,h2,h3': {
                                    display: 'inline',
                                    fontSize: {
                                        xs: '20px', md: '32px'
                                    }
                                },
                            }}
                        >
                            <PrismicRichText field={highlighted_guest} />
                            <PrismicRichText field={highlighted_guest_role} />
                        </Box>

                        <Typography sx={{
                            fontWeight: "bold", mb: 0, fontSize: {
                                xs: '20px', md: '32px'
                            }
                        }}>Special Invitees:</Typography>

                        <List>
                            {invitees.map((item, index) => (
                                <ListItem key={index}
                                    sx={{
                                        '&& p,h1,h2,h3,h4,h5,li,span': {
                                            fontWeight: '600',
                                            fontSize: {
                                                xs: '20px', md: '30px'
                                            }
                                        }
                                    }}>
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
                    {image?.url && (
                        <Box
                            sx={{
                                position: "relative",
                                width: "100%",
                                height: { xs: '400px', md: '610px' }, // ADD THIS LINE
                            }}
                        >
                            <Image
                                src={image.url}
                                alt={image.alt || "Chief Guest"}
                                fill
                                style={{
                                    objectFit: "contain",
                                    borderRadius: "0px",
                                }}
                            />

                            <Box
                                sx={{
                                    position: "absolute",
                                    bottom: 16,
                                    left: { xs: 25, md: 124 },
                                    zIndex: 2,
                                    width: { xs: 92, md: 144 },
                                    height: { xs: 92, md: 144 },
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
        </section >

    );
};

export default HighlightedGuestList;
