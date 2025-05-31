'use client'
import { Box, Button, Typography } from '@mui/material'
import { Content } from '@prismicio/client'
import { FC } from 'react'
import { SliceComponentProps } from '@prismicio/react'
import Image from 'next/image'
import RegisterButton from '@/components/elements/button/RegisterButton'

/**
 * Props for `Map`.
 */
export type MapProps = SliceComponentProps<Content.MapSlice>

/**
 * Component for "Map" Slices.
 */
const Map: FC<MapProps> = ({ slice }) => {
    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <Box sx={{
                padding: { xs: '20px', md: '100px' }
            }}>


                <Box sx={{ width: '100%', maxWidth: '100%', margin: '0 auto', display: { xs: 'none', md: 'block' } }}>
                    <Image
                        src={slice?.primary?.map?.url || ''}
                        alt="Map"
                        width={600}
                        height={500}
                        style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                    />
                </Box>
                <Box sx={{ width: '100%', maxWidth: '100%', margin: '0 auto', display: { xs: 'block', md: 'none' } }}>
                    <Typography
                        sx={{
                            color: "#007B48",
                            textAlign: "center",
                            marginBottom: '20px',
                            fontSize: "26px",
                            fontStyle: "normal",
                            fontWeight: 700,
                            lineHeight: "36px", // or 1.38 if you prefer unitless
                        }}
                    >
                        Kittur Rani Chenamma Stadium Map View
                    </Typography>

                    <Image
                        src={slice?.primary?.map_mobile?.url || ''}
                        alt="Map"
                        width={600}
                        height={500}
                        style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                    />
                </Box>
                <Button
                    href="#register-form"
                    sx={{
                        display: "flex",
                        width: "276.709px",
                        height: "53px",
                        padding: "12.326px 43.14px",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "6.163px",
                        margin: '0 auto',
                        mt: '20px',
                        fontSize: '22px',
                        borderRadius: "73.953px",
                        background: "#FF5B02",
                        color: "#fff", // Optional: ensures text is visible
                        fontWeight: 600, // Optional: to make the label bold
                        textTransform: "none", // Optional: prevents uppercase
                        "&:hover": {
                            background: "#e05002", // Optional: adds hover effect
                        },
                    }}
                >
                    Register Now
                </Button>
            </Box>
        </section>
    )
}

export default Map
