import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { backgroundColorExtract } from '@/utils/color'
import { Box, Typography } from '@mui/material'
import { YouTubeEmbed } from '@next/third-parties/google'

export type ThreeVideoLayoutProps = SliceComponentProps<Content.ThreeVideoLayoutSlice>

const ThreeVideoLayout = ({ slice }: ThreeVideoLayoutProps): JSX.Element => {
    const backgroundGradient = backgroundColorExtract(slice.primary.background_color.map((item) => item.color))
    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <Box
                sx={{
                    background: backgroundGradient,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: { xs: '20px 10px', md: '60px 130px' },
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center',
                        maxWidth: '1400px',
                        margin: '0 auto',
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: { xs: '24px', md: '52px' },
                            fontWeight: '700',
                            textAlign: 'center',
                            color: '#000',
                        }}
                    >
                        {slice.primary.title}
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            overflowX: 'auto', // Enable horizontal scrolling
                            scrollSnapType: 'x mandatory', // Enable horizontal snapping
                            gap: { xs: 2, md: 5 }, // Add spacing between video elements
                            padding: { xs: '10px', md: '20px' }, // Padding around the scroll container
                            '&::-webkit-scrollbar': {
                                display: 'none', // Hide scrollbar for cleaner look
                            },
                            scrollbarWidth: 'none', // For Firefox
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                overflowX: 'auto', // Enable horizontal scrolling
                                scrollSnapType: 'x mandatory', // Horizontal snapping for smoother scroll experience
                                gap: { xs: 2, md: 5 }, // Adjust spacing between videos
                                padding: { xs: '10px', md: '20px' }, // Padding around the scroll container
                                '&::-webkit-scrollbar': {
                                    display: 'none', // Hide scrollbar for cleaner look
                                },
                                scrollbarWidth: 'none', // For Firefox
                            }}
                        >
                            {slice.primary.videos.map((item, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        scrollSnapAlign: 'start', // Ensure each item snaps to the start
                                        flex: { xs: '0 0 300px', md: '0 0 384px' }, // Each video takes up a third of the container width
                                        maxWidth: { xs: '300px', md: '384px' }, // Limit the width of each video to a third of the container
                                        borderRadius: '22.2px',

                                        overflow: 'hidden',
                                        position: 'relative',
                                        '&& div[data-ntpc="YouTubeEmbed"]': {
                                            borderRadius: '22.2px',
                                        },
                                        'lite-youtube': { maxWidth: 'none', borderRadius: '22.2px' },
                                    }}
                                >
                                    <YouTubeEmbed style="height: 100%; width: 100%;" videoid={item.youtube_embed_id ?? ''} params="controls=0" />
                                    <Typography sx={{ textAlign: 'center', marginTop: { xs: '16px', md: '32px' }, fontSize: { xs: '15px', md: '32px' }, color: '#000' }}>{item.label}</Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </section>
    )
}

export default ThreeVideoLayout
