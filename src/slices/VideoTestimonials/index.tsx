'use client'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import Image from 'next/image'
import { useState } from 'react'
import ArrowLeft from '/public/images/home/ArrowLeft.svg'
import ArrowRight from '/public/images/home/ArrowRight.svg'
import { YouTubeEmbed } from '@next/third-parties/google'
import { Box, IconButton, styled, Typography } from '@mui/material'
import { SectionContent, SectionPadding } from '@/components/_shared/SectionContainer'
import { LayoutContainer, LayoutContent } from '@/components/_shared/LayoutContainer'
import VideoImage from '/public/images/home/Video.jpeg'
import { backgroundColorExtract } from '@/utils/color'
import { PrismicNextImage } from '@prismicio/next'

const Wrapper = styled(Box)(({}) => ({
    height: 'auto',
}))

const TitleBox = styled(Box)(({}) => ({
    textAlign: 'center',
}))

const Title = styled(Typography)(({ theme }) => ({
    color: '#303030',
    fontWeight: '700',
    [theme.breakpoints.down('md')]: {
        fontSize: '29px',
    },
}))

const Subtitle = styled(Typography)(({ theme }) => ({
    color: '#46892D',
    fontWeight: '700',
    marginTop: '22px',
    [theme.breakpoints.down('md')]: {
        fontSize: '29px',
        marginTop: '15px',
    },
}))

const VideoContainer = styled(Box)(({ theme }) => ({
    width: '836.202px',
    height: '400.612px',
    margin: '100px auto 0 auto',
    transform: 'rotate(-4.967deg)',
    flexShrink: 0,
    borderRadius: '410px / 200px',
    border: '3.53px solid #A5EFA7',
    [theme.breakpoints.down('md')]: {
        display: 'none',
    },
}))

const VideoParent = styled(Box)(() => ({
    transform: 'rotate(+4.967deg)',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative',
}))

const StyledImage = styled(Box)(({ theme }) => ({
    position: 'relative',
    borderRadius: '270px',
    height: '118px',
    width: '118px',
    border: '4px solid #F8BCC0',
    cursor: 'pointer',
    overflow: 'hidden',
    [theme.breakpoints.down('md')]: {
        height: '90px',
        width: '90px',
    },
}))

const EmbeddYoutube = styled(Box)(({}) => ({
    position: 'relative',
    borderRadius: '22.2px',
    height: '520px',
    width: '321px',
    border: '4px solid #F8BCC0',
    overflow: 'hidden',
}))

const EmbeddYoutubeMobile = styled(Box)(({ theme }) => ({
    position: 'relative',
    borderRadius: '22.2px',
    height: '520px',
    mwxWidth: '321px',
    border: '4px solid #F8BCC0',
    overflow: 'hidden',
    display: 'none',
    margin: '50px auto 0 auto',
    [theme.breakpoints.down('md')]: {
        display: 'block',
    },
}))

const StyledIconButton = styled(IconButton)(({}) => ({
    backgroundColor: '#d7f0cd',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}))

const ButtonGroup = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '100px',
    [theme.breakpoints.down('md')]: {
        marginTop: '20px',
    },
}))
/**
 * Props for `VideoTestimonials`.
 */
export type VideoTestimonialsProps = SliceComponentProps<Content.VideoTestimonialsSlice>

/**
 * Component for "VideoTestimonials" Slices.
 */
const VideoTestimonials = ({ slice }: VideoTestimonialsProps): JSX.Element => {
    const [currentVideoIndex, setCurrentVideoIndex] = useState(3)
    const [videoCollection, setVideoCollection] = useState([...slice.primary.video_links])
    const backgroundGradient = backgroundColorExtract(slice.primary.background_color.map((item) => item.color))
    const handleThumbnailClick = (index: number) => {
        setCurrentVideoIndex(index)
    }

    // Rotate the array on "Prev" click
    const handlePrevClick = () => {
        // setVideoCollection((prevCollection) => {
        //     const lastItem = prevCollection[prevCollection.length - 1] // Get the last item
        //     const updatedCollection = [lastItem, ...prevCollection.slice(0, -1)] // Move the last item to the front
        //     return updatedCollection
        // })
        setCurrentVideoIndex((prevIndex) => {
            // Make sure to correctly cycle the index
            const newIndex = prevIndex === 0 ? videoCollection.length - 1 : prevIndex - 1
            return newIndex
        })
    }

    // Rotate the array on "Next" click
    const handleNextClick = () => {
        // setVideoCollection((prevCollection) => {
        //     const firstItem = prevCollection[0] // Get the first item
        //     const updatedCollection = [...prevCollection.slice(1), firstItem] // Move the first item to the end
        //     return updatedCollection
        // })
        setCurrentVideoIndex((prevIndex) => {
            // Make sure to correctly cycle the index
            const newIndex = prevIndex === videoCollection.length - 1 ? 0 : prevIndex + 1
            return newIndex
        })
    }

    if (!videoCollection) return <></>
    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <Box
                sx={{
                    background: backgroundGradient,
                    height: '100%',
                    padding: { xs: '30px 20px', md: '60px 50px' },
                }}
            >
                <LayoutContent>
                    <Box sx={{ position: 'relative' }}>
                        <SectionPadding>
                            <Box sx={{ position: 'absolute', left: '0px', bottom: '0px', display: { xs: 'none', md: 'block' } }}>
                                <PrismicNextImage field={slice.primary.vectorleft} />
                            </Box>
                            <Box sx={{ position: 'absolute', right: '0px', bottom: '0px', display: { xs: 'none', md: 'block' } }}>
                                <PrismicNextImage field={slice.primary.vectorright} />
                            </Box>
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
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: '20px',
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        position: 'absolute',
                                                        left: '80px',
                                                        top: '0px',
                                                    }}
                                                >
                                                    <StyledImage>
                                                        <Image
                                                            src={`https://img.youtube.com/vi/${videoCollection[0]?.youtube_embed_id}/maxresdefault.jpg`}
                                                            onClick={() => handleThumbnailClick(0)}
                                                            fill
                                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                            style={{
                                                                objectFit: 'cover',
                                                            }}
                                                            alt="Video"
                                                        />
                                                    </StyledImage>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        position: 'absolute',
                                                        left: '-50px',
                                                        top: '150px',
                                                    }}
                                                >
                                                    <StyledImage>
                                                        <Image
                                                            src={`https://img.youtube.com/vi/${videoCollection[1]?.youtube_embed_id}/maxresdefault.jpg`}
                                                            onClick={() => handleThumbnailClick(1)}
                                                            fill
                                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                            style={{
                                                                objectFit: 'cover',
                                                            }}
                                                            alt="Video"
                                                        />
                                                    </StyledImage>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        position: 'absolute',
                                                        left: '100px',
                                                        top: '300px',
                                                    }}
                                                >
                                                    <StyledImage>
                                                        <Image
                                                            src={`https://img.youtube.com/vi/${videoCollection[2]?.youtube_embed_id}/maxresdefault.jpg`}
                                                            onClick={() => handleThumbnailClick(2)}
                                                            fill
                                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                            style={{
                                                                objectFit: 'cover',
                                                            }}
                                                            alt="Video"
                                                        />
                                                    </StyledImage>
                                                </Box>
                                            </Box>
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    left: '280px',
                                                    top: '-50px',
                                                }}
                                            >
                                                <EmbeddYoutube>
                                                    <YouTubeEmbed style="height: 520px;" videoid={videoCollection[currentVideoIndex]?.youtube_embed_id ?? ''} params="controls=0" />
                                                </EmbeddYoutube>
                                            </Box>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: '20px',
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        position: 'absolute',
                                                        right: '50px',
                                                        top: '-20px',
                                                    }}
                                                >
                                                    <StyledImage>
                                                        <Image
                                                            src={`https://img.youtube.com/vi/${videoCollection[3]?.youtube_embed_id}/maxresdefault.jpg`}
                                                            onClick={() => handleThumbnailClick(3)}
                                                            fill
                                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                            style={{
                                                                objectFit: 'cover',
                                                            }}
                                                            alt="Video"
                                                        />
                                                    </StyledImage>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        position: 'absolute',
                                                        right: '-60px',
                                                        top: '120px',
                                                    }}
                                                >
                                                    <StyledImage>
                                                        <Image
                                                            src={`https://img.youtube.com/vi/${videoCollection[4]?.youtube_embed_id}/maxresdefault.jpg`}
                                                            onClick={() => handleThumbnailClick(4)}
                                                            fill
                                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                            style={{
                                                                objectFit: 'cover',
                                                            }}
                                                            alt="Video"
                                                        />
                                                    </StyledImage>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        position: 'absolute',
                                                        right: '60px',
                                                        top: '250px',
                                                    }}
                                                >
                                                    <StyledImage>
                                                        <Image
                                                            alt="Video"
                                                            src={`https://img.youtube.com/vi/${videoCollection[5]?.youtube_embed_id}/maxresdefault.jpg`}
                                                            onClick={() => handleThumbnailClick(5)}
                                                            fill
                                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                            style={{
                                                                objectFit: 'cover',
                                                            }}
                                                        />
                                                    </StyledImage>
                                                </Box>
                                            </Box>
                                        </VideoParent>
                                    </VideoContainer>

                                    <EmbeddYoutubeMobile>
                                        <YouTubeEmbed style="height: 520px;" videoid={videoCollection[currentVideoIndex]?.youtube_embed_id ?? ''} params="controls=0" />
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
                    </Box>
                </LayoutContent>
            </Box>
        </section>
    )
}

export default VideoTestimonials
