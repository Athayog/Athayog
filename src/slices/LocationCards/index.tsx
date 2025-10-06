'use client';
import React from "react";
import { Box, Typography, Link, styled, Button } from "@mui/material";
import { SliceComponentProps } from "@prismicio/react";
import { Content } from "@prismicio/client";

const Title = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'colorText',
})<{ colorText?: string }>(({ theme, colorText }) => ({
  fontSize: '48px',
  color: '#303030',
  fontWeight: '700',
  [theme.breakpoints.down('md')]: {
    fontSize: '26px',
  },
  span: {
    color: colorText || '#237306', // Default color if colorText isn't provided
  },
}))

export type LocationCardsProps = SliceComponentProps<Content.LocationCardsSlice>;

const LocationCards: React.FC<LocationCardsProps> = ({ slice }) => {

  const sectionTitle = (slice.primary.section_title as any)?.text || "One Studio, One Purpose";

  return (
    <Box
      component="section"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      sx={{
        background: "linear-gradient(to bottom, #E9FDDE, #daf8e1, #E9FDDE)",
        p: { xs: 3, md: 6 },
        borderRadius: 3,
        fontFamily: "'Poppins', sans-serif",
        color: "#2A2A2A",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Title
        variant="h4"
        sx={{
          color: "#154734",
          mb: 5,
          fontWeight: "bold",
          textAlign: "center",
          width: '100%'
        }}
      >
        {sectionTitle}
      </Title>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          justifyContent: 'center',
          alignItems: 'stretch',
          width: '100%',
          maxWidth: '800px',

        }}
      >
        {slice.primary.locations.map((location, index) => {
          const iconUrl = location.icon?.url;
          const title = (location.location_title?.[0] as any)?.text || "";
          const address = location.address || "";
          const mapLink = location.map_link as any;

          return (
            <Box
              key={index}
              sx={{
                backgroundColor: "#f3f9ef",
                borderRadius: 3,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                p: 3,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                width: { xs: '100%', sm: '350px' },
                minHeight: '300px',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
              }}
            >
              {iconUrl && (
                <Box
                  component="img"
                  src={iconUrl}
                  alt={`${title} icon`}
                  sx={{
                    width: 50,
                    color: 'green',
                    height: 50,
                    objectFit: 'contain'
                  }}
                />
              )}
              <Typography
                variant="h6"
                sx={{
                  color: "#154734",
                  fontWeight: 'bold',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  fontSize: { xs: '24px', md: '28px' }
                }}
              >
                {title}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  textAlign: 'center',
                  color: '#666',
                  flex: 1
                }}
              >
                {address}
              </Typography>
              <Link
                href={mapLink?.url}
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
                sx={{
                  fontWeight: "medium",
                  color: "#154734",
                  marginTop: '10px',
                  '&:hover': {
                    color: "#2A5F47"
                  }
                }}
              >
                <Button size='large' variant='outlined' sx={{ boxShadow: 'none' }}>
                  {mapLink.text}
                </Button>
              </Link>
            </Box>
          );
        })}
      </Box>

      <Typography
        variant="body1"
        sx={{
          mt: 6,
          fontStyle: "italic",
          textAlign: "center",
          color: "#2A2A2A",
          maxWidth: '600px'
        }}
      >
        {slice.primary.section_footer}
      </Typography>
    </Box>
  );
};

export default LocationCards;
