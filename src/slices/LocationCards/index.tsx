'use client';
import React from "react";
import { Box, Typography, Link } from "@mui/material";
import { SliceComponentProps } from "@prismicio/react";
import { Content } from "@prismicio/client";

export type LocationCardsProps = SliceComponentProps<Content.LocationCardsSlice>;

const LocationCards: React.FC<LocationCardsProps> = ({ slice }) => {
  const sectionTitle =
    slice.primary.section_title?.[0]?.text || "Two Studios, One Purpose";

  return (
    <Box
      component="section"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      sx={{
        backgroundColor: "#E3EFE1",
        p: { xs: 3, md: 6 },
        mt: 6,
        borderRadius: 3,
        fontFamily: "'Poppins', sans-serif",
        color: "#2A2A2A",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography
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
      </Typography>
      
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
          const title = location.location_title?.[0]?.text || "";
          const address = location.address || "";
          const mapLink = location.map_link;

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
                width: { xs: '100%', sm: '280px' },
                minHeight: '200px',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                }
              }}
            >
              {iconUrl && (
                <Box
                  component="img"
                  src={iconUrl}
                  alt={`${title} icon`}
                  sx={{ 
                    width: 50, 
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
                  textAlign: 'center'
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
                href={mapLink?.link_type}
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
                sx={{ 
                  fontWeight: "medium",
                  color: "#154734",
                  '&:hover': {
                    color: "#2A5F47"
                  }
                }}
              >
                {mapLink.text}
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
