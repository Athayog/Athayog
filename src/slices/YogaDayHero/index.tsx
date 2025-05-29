import { FC } from 'react'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { Box, Grid } from '@mui/material'
import { asLink } from '@prismicio/helpers'

export type YogaDayHeroProps = SliceComponentProps<Content.YogaDayHeroSlice>

const YogaDayHero: FC<YogaDayHeroProps> = ({ slice }) => {
    const leftUrl = asLink(slice.primary.left_youtube)
    const middleUrl = asLink(slice.primary.middel_youtube)
    const rightUrl = asLink(slice.primary.right_youtube)

    const urls = [leftUrl, middleUrl, rightUrl]
    return (
        <section
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
            style={{ width: '100%' }}
        >
            <Grid container spacing={0} mt={0}>
                {urls.map((url, i) => {
                    // Show only the middle video (index 1) on mobile, show all on sm+
                    const display = {
                        xs: i === 1 ? 'block' : 'none', // Only middle video on xs
                        sm: 'block',                    // All videos on sm and up
                    }

                    return (
                        <Grid item xs={12} sm={4} key={i} sx={{ display }}>
                            {url && (
                                <Box
                                    sx={{
                                        position: 'relative',
                                        width: '100%',
                                        paddingTop: '177.78%', // 9:16 aspect ratio
                                        overflow: 'hidden',

                                    }}
                                >
                                    <video
                                        src={url}
                                        autoPlay

                                        loop
                                        playsInline
                                        preload="auto"
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            border: 'none',
                                            pointerEvents: 'none',
                                        }}
                                    />
                                </Box>
                            )}
                        </Grid>
                    )
                })}
            </Grid>
        </section>
    )
}

export default YogaDayHero
