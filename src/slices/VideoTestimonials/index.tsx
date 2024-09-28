"use client";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Image from "next/image";
import { useState } from "react";
import ArrowLeft from "/public/images/home/ArrowLeft.svg";
import ArrowRight from "/public/images/home/ArrowRight.svg";
import { YouTubeEmbed } from "@next/third-parties/google";
import { Box, IconButton, styled, Typography } from "@mui/material";
import {
  SectionContent,
  SectionPadding,
} from "@/components/_shared/SectionContainer";
import {
  LayoutContainer,
  LayoutContent,
} from "@/components/_shared/LayoutContainer";

const Wrapper = styled(Box)(({}) => ({
  height: "auto",
}));

const TitleBox = styled(Box)(({}) => ({
  textAlign: "center",
}));

const Title = styled(Typography)(({ theme }) => ({
  color: "#303030",
  fontWeight: "700",
  [theme.breakpoints.down("md")]: {
    fontSize: "29px",
  },
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  color: "#46892D",
  fontWeight: "700",
  marginTop: "22px",
  [theme.breakpoints.down("md")]: {
    fontSize: "29px",
    marginTop: "15px",
  },
}));

const VideoContainer = styled(Box)(({ theme }) => ({
  width: "836.202px",
  height: "400.612px",
  margin: "100px auto 0 auto",
  transform: "rotate(-4.967deg)",
  flexShrink: 0,
  borderRadius: "410px / 200px",
  border: "3.53px solid #A5EFA7",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const VideoParent = styled(Box)(() => ({
  transform: "rotate(+4.967deg)",
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  position: "relative",
}));

const StyledImage = styled(Box)(({ theme }) => ({
  position: "relative",
  borderRadius: "270px",
  height: "118px",
  width: "118px",
  border: "4px solid #F8BCC0",
  cursor: "pointer",
  overflow: "hidden",
  [theme.breakpoints.down("md")]: {
    height: "90px",
    width: "90px",
  },
}));

const EmbeddYoutube = styled(Box)(({}) => ({
  position: "relative",
  borderRadius: "22.2px",
  height: "520px",
  width: "321px",
  border: "4px solid #F8BCC0",
  overflow: "hidden",
}));

const EmbeddYoutubeMobile = styled(Box)(({ theme }) => ({
  position: "relative",
  borderRadius: "22.2px",
  height: "520px",
  width: "321px",
  border: "4px solid #F8BCC0",
  overflow: "hidden",
  display: "none",
  margin: "50px auto 0 auto",

  [theme.breakpoints.down("md")]: {
    display: "block",
  },
}));

const StyledIconButton = styled(IconButton)(({}) => ({
  backgroundColor: "#d7f0cd",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const ButtonGroup = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  marginTop: "100px",
  [theme.breakpoints.down("md")]: {
    marginTop: "20px",
  },
}));
/**
 * Props for `VideoTestimonials`.
 */
export type VideoTestimonialsProps =
  SliceComponentProps<Content.VideoTestimonialsSlice>;

/**
 * Component for "VideoTestimonials" Slices.
 */
const VideoTestimonials = ({ slice }: VideoTestimonialsProps): JSX.Element => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(3);

  const videos = slice.primary.video_links;
  const handleThumbnailClick = (index: number) => {
    setCurrentVideoIndex(index);
  };

  const handlePrevClick = () => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : videos.length - 1
    );
  };

  const handleNextClick = () => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex < videos.length - 1 ? prevIndex + 1 : 0
    );
  };

  if (!videos) return <></>;
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <LayoutContainer>
        <LayoutContent>
          <SectionPadding>
            <SectionContent>
              <Wrapper>
                <TitleBox>
                  <Title variant="h2">{slice.primary.title}</Title>
                  <Subtitle variant="h2">{slice.primary.subtitle}</Subtitle>
                </TitleBox>

                <VideoContainer>
                  <VideoParent>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                      }}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          left: "80px",
                          top: "0px",
                        }}
                      >
                        <StyledImage>
                          <Image
                            src={`https://img.youtube.com/vi/${videos[0]?.youtube_embed_id}/maxresdefault.jpg`}
                            onClick={() => handleThumbnailClick(0)}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{ objectFit: "cover" }}
                            alt="Video"
                          />
                        </StyledImage>
                      </Box>
                      <Box
                        sx={{
                          position: "absolute",
                          left: "-50px",
                          top: "150px",
                        }}
                      >
                        <StyledImage>
                          <Image
                            src={`https://img.youtube.com/vi/${videos[1]?.youtube_embed_id}/maxresdefault.jpg`}
                            onClick={() => handleThumbnailClick(1)}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{ objectFit: "cover" }}
                            alt="Video"
                          />
                        </StyledImage>
                      </Box>
                      <Box
                        sx={{
                          position: "absolute",
                          left: "100px",
                          top: "300px",
                        }}
                      >
                        <StyledImage>
                          <Image
                            src={`https://img.youtube.com/vi/${videos[2]?.youtube_embed_id}/maxresdefault.jpg`}
                            onClick={() => handleThumbnailClick(2)}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{ objectFit: "cover" }}
                            alt="Video"
                          />
                        </StyledImage>
                      </Box>
                    </Box>
                    <Box
                      sx={{ position: "absolute", left: "280px", top: "-50px" }}
                    >
                      <EmbeddYoutube>
                        <YouTubeEmbed
                          style="height: 520px;"
                          videoid={
                            videos[currentVideoIndex]?.youtube_embed_id ?? ""
                          }
                          params="controls=0"
                        />
                      </EmbeddYoutube>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                      }}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          right: "50px",
                          top: "-20px",
                        }}
                      >
                        <StyledImage>
                          <Image
                            src={`https://img.youtube.com/vi/${videos[3]?.youtube_embed_id}/maxresdefault.jpg`}
                            onClick={() => handleThumbnailClick(3)}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{ objectFit: "cover" }}
                            alt="Video"
                          />
                        </StyledImage>
                      </Box>
                      <Box
                        sx={{
                          position: "absolute",
                          right: "-60px",
                          top: "120px",
                        }}
                      >
                        <StyledImage>
                          <Image
                            src={`https://img.youtube.com/vi/${videos[4]?.youtube_embed_id}/maxresdefault.jpg`}
                            onClick={() => handleThumbnailClick(4)}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{ objectFit: "cover" }}
                            alt="Video"
                          />
                        </StyledImage>
                      </Box>
                      <Box
                        sx={{
                          position: "absolute",
                          right: "60px",
                          top: "250px",
                        }}
                      >
                        <StyledImage>
                          <Image
                            alt="Video"
                            src={`https://img.youtube.com/vi/${videos[5]?.youtube_embed_id}/maxresdefault.jpg`}
                            onClick={() => handleThumbnailClick(5)}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{ objectFit: "cover" }}
                          />
                        </StyledImage>
                      </Box>
                    </Box>
                  </VideoParent>
                </VideoContainer>

                <EmbeddYoutubeMobile>
                  <YouTubeEmbed
                    style="height: 520px;"
                    videoid={videos[currentVideoIndex]?.youtube_embed_id ?? ""}
                    params="controls=0"
                  />
                </EmbeddYoutubeMobile>

                <ButtonGroup>
                  <StyledIconButton onClick={handlePrevClick}>
                    <ArrowLeft />
                  </StyledIconButton>
                  <StyledIconButton onClick={handleNextClick}>
                    <ArrowRight />
                  </StyledIconButton>
                </ButtonGroup>
              </Wrapper>
            </SectionContent>
          </SectionPadding>
        </LayoutContent>
      </LayoutContainer>
    </section>
  );
};

export default VideoTestimonials;
