'use client'
import { Content, ImageFieldImage } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { Box, styled, Typography } from '@mui/material'
import React, { useState } from 'react'
import { SwiperSlide } from 'swiper/react'
import HorizontalSwiper from '@/components/Swiper/HorizontalSwiper'
import RegisterButton from '@/components/elements/button/RegisterButton'
import { PrismicNextLink } from '@prismicio/next'
import ResponsiveImage from '@/components/_shared/ResponsiveImage'
import ContentContainer from '@/components/_shared/ContentContainer'

const Title = styled(Typography)(({ theme }) => ({
    fontSize: '48px',
    color: '#202020',
    fontWeight: 700,
    marginBottom: '80px',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
        fontSize: '24px',
        marginBottom: '24px',
    },
}))

const StyledButton = styled(RegisterButton)(({ theme }) => ({
    marginTop: '20px',
    backgroundColor: '#007668',
    [theme.breakpoints.down('md')]: {
        margin: '0 auto',
        fontSize: '18px',
        height: '50px',
        width: '173px',
    },
}))

const groupByAlbum = (album: any[]) => {
    return album.reduce(
        (acc, workshop) => {
            const { album_name } = workshop
            if (!acc[album_name]) {
                acc[album_name] = []
            }
            acc[album_name].push(workshop)
            return acc
        },
        {} as Record<string, typeof album>
    )
}

/**
 * Props for `EventHighlightsGallery`.
 */
export type EventHighlightsGalleryProps = SliceComponentProps<Content.EventHighlightsGallerySlice>

/**
 * Component for "EventHighlightsGallery" Slices.
 */
const EventHighlightsGallery = ({ slice }: EventHighlightsGalleryProps): JSX.Element => {
    const groupedData = groupByAlbum(slice.primary.albums)
    const albumNames = Object.keys(groupedData)
    const [currentAlbum, setCurrentAlbum] = useState(albumNames[0])

    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <ContentContainer>
                <Title>{slice.primary.section_title}</Title>

                <HorizontalSwiper slidesPerView={1} enablePagination={false} swiperWidth={{ xs: '80vw', md: '80vw', lg: '1000px' }} enableNavigation={true} disableNavOnMobile={true}>
                    {groupedData[currentAlbum]?.map(
                        (
                            workshop: {
                                image: ImageFieldImage | null | undefined
                            },
                            index: React.Key | null | undefined
                        ) => (
                            <SwiperSlide key={index}>
                                <Box
                                    sx={{
                                        borderRadius: '10px',
                                        border: '2.2px solid #94CE66',
                                        overflow: 'hidden',
                                        position: 'relative',
                                        height: {
                                            xs: '200px',
                                            md: '400px',
                                            lg: '500px',
                                        },
                                        width: '99%',
                                    }}
                                >
                                    <ResponsiveImage src={workshop?.image?.url ?? ''} fill alt={(workshop?.image as any)?.name ?? ''} style={{ objectFit: 'cover' }} />
                                </Box>
                            </SwiperSlide>
                        )
                    )}
                </HorizontalSwiper>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        marginTop: '40px',
                        gap: '20px',
                        justifyContent: 'center',
                    }}
                >
                    {albumNames.map((albumName, index) => (
                        <Box key={index}>
                            <Box
                                onClick={() => setCurrentAlbum(albumName)} // Set the clicked album
                                sx={{
                                    cursor: 'pointer', // Add pointer cursor for UX
                                    borderRadius: '10px',
                                    border: '2.2px solid #94CE66',
                                    overflow: 'hidden',
                                    position: 'relative',
                                    width: {
                                        xs: '115px',
                                        md: '115px',
                                        lg: '190px',
                                    },
                                    height: {
                                        xs: '76px',
                                        md: '76px',
                                        lg: '130px',
                                    },
                                }}
                            >
                                <ResponsiveImage
                                    src={groupedData[albumName][0]?.image.url} // First image in the album
                                    alt={`Slide ${index}`}
                                />
                            </Box>
                            <Typography
                                sx={{
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    fontSize: '16px',
                                    fontStyle: 'italic',
                                    marginTop: '10px',
                                }}
                            >
                                {albumName}
                            </Typography>
                        </Box>
                    ))}
                </Box>

                {/* <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: { xs: '20px', md: '50px' },
                    }}
                >
                    <PrismicNextLink field={slice.primary.button_link}>
                        <StyledButton>{slice.primary.button_text}</StyledButton>
                    </PrismicNextLink>
                </Box> */}
            </ContentContainer>
        </section>
    )
}

export default EventHighlightsGallery
