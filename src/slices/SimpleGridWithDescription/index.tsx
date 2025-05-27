'use client'
import { FC, useRef, useState } from 'react'
import { PrismicRichText } from '@prismicio/react'
import { SliceComponentProps } from '@prismicio/react'
import { Content } from '@prismicio/client'
import Image from 'next/image'
import { Box, Grid, IconButton, Typography } from '@mui/material'
import { asLink } from '@prismicio/helpers'
import { PauseCircleOutline, PlayArrowOutlined } from '@mui/icons-material'

export type SimpleGridWithDescriptionProps = SliceComponentProps<Content.SimpleGridWithDescriptionSlice>

const SimpleGridWithDescription: FC<SimpleGridWithDescriptionProps> = ({ slice }) => {
    const { title, subtitle, subdescription, grid, first_video, second_youtube, third_youtube } = slice.primary
    const videoLinks = [
        asLink(first_video),
        asLink(second_youtube),
        asLink(third_youtube)
    ].filter(Boolean)


    return (
        <Box component="section" sx={{ px: 3, py: 5, maxWidth: 1120, mx: 'auto' }}>
            {/* Title */}
            <Typography variant="h3" align="center" color="success.main" fontWeight="bold" sx={{
                fontSize: { xs: '26px', md: '42px' }
            }}>
                {title}
            </Typography>

            {/* Grid 4 columns */}
            <Grid container spacing={4} sx={{ mt: 5 }}>
                {grid.map((item, idx) => (
                    <Grid key={idx} item xs={12} sm={6} md={6}>
                        <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
                            {item.images?.url && (
                                <Box
                                    sx={{
                                        width: '100%',
                                        height: 200,
                                        position: 'relative',
                                        borderRadius: 3,
                                        overflow: 'hidden',


                                    }}
                                >
                                    <Image
                                        src={item.images.url}
                                        alt={item.images.alt || ''}
                                        layout="fill"
                                        objectFit="cover"
                                        priority={idx < 4} // optional priority for first 4 images
                                    />
                                </Box>
                            )}
                            <Typography variant="h6" mt={2} fontWeight="700" sx={{
                                fontSize: { xs: '23px', md: '36px' }
                            }}>
                                {item.title}
                            </Typography>
                            <Box mt={1} color="text.secondary" sx={{
                                '&& p,h1,h2,h3,h4,h5': {
                                    fontSize: { xs: '23px', md: '28px' },
                                    margin: '0px'

                                }
                            }}>
                                <PrismicRichText field={item.description} />
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>

            {/* Subtitle and Subdescription */}
            {(subtitle || subdescription) && (
                <Box mt={8} mx="auto" textAlign="center">
                    {subtitle && (
                        <Typography variant="h6" color="text.primary" fontWeight='700' mb={2} sx={{
                            fontSize: { xs: '26px', md: '42px' }
                        }}>
                            {subtitle}
                        </Typography>
                    )}

                    {subdescription && (
                        <>

                            <Box color="text.secondary" sx={{
                                '&& p,h1,h2,h3,h4,h5': {
                                    fontSize: { xs: '17px', md: '28px' },
                                    margin: '0px'

                                }
                            }}>
                                <PrismicRichText field={subdescription} />
                            </Box>
                        </>
                    )}
                </Box>
            )}

            <Grid container spacing={3} sx={{ mt: 6 }}>
                {videoLinks.map((url, idx) => {
                    const videoRef = useRef<HTMLVideoElement | null>(null)
                    const [isPlaying, setIsPlaying] = useState(false)

                    const handlePlay = () => {
                        if (videoRef.current) {
                            if (videoRef.current.paused) {
                                videoRef.current.play()
                                setIsPlaying(true)
                            } else {
                                videoRef.current.pause()
                                setIsPlaying(false)
                            }
                        }
                    }

                    return (
                        <Grid key={idx} item xs={12} md={4}>
                            <Box sx={{ position: 'relative', width: '100%', height: 500 }}>
                                <Box
                                    component="video"
                                    ref={videoRef}
                                    width="100%"
                                    height="100%"
                                    sx={{
                                        objectFit: 'cover',
                                        display: 'block',
                                        borderRadius: 0,
                                    }}
                                    controls={true}
                                >
                                    <source src={url || ''} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </Box>

                                {!isPlaying && (
                                    <IconButton
                                        onClick={handlePlay}
                                        sx={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                            color: 'white',
                                            width: 64,
                                            height: 64,
                                            '&:hover': {
                                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                            },
                                        }}
                                    >
                                        {isPlaying ? <PauseCircleOutline sx={{ fontSize: 40 }} /> : <PlayArrowOutlined sx={{ fontSize: 40 }} />}

                                    </IconButton>
                                )}
                            </Box>
                        </Grid>
                    )
                })}
            </Grid>


        </Box>
    )
}

export default SimpleGridWithDescription
