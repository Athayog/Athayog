import { FC } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { SliceComponentProps } from '@prismicio/react'
import { PrismicRichText, PrismicImage } from '@prismicio/react'
import { Content } from '@prismicio/client'

export type ArambhaContentProps = SliceComponentProps<Content.ArambhaContentSlice>

const ArambhaContent: FC<ArambhaContentProps> = ({ slice }) => {
    return (
        <Box
            component="section"
            sx={{ py: 8, px: 4, position: 'relative', backgroundColor: '#f9f9f9' }}
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            <Box>
                <Grid container spacing={4} alignItems="stretch">
                    {/* Left Line Art - bottom aligned */}
                    {slice.primary.line_art_left?.url && (
                        <Grid
                            item
                            xs={12}
                            md={2}
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                alignItems: 'flex-end',
                                justifyContent: 'center'
                            }}
                        >
                            <PrismicImage field={slice.primary.line_art_left} style={{ maxWidth: '100%' }} />
                        </Grid>
                    )}

                    {/* Main Content */}
                    <Grid item xs={12} md={8}>
                        {slice.primary.content?.map((block, index) => (
                            <Box key={index} sx={{ mb: 6, textAlign: 'center' }}>
                                {block.title && (
                                    <Typography
                                        sx={{
                                            color: 'green',
                                            fontWeight: 'bold',
                                            mb: 2,
                                            fontSize: { xs: '28px', md: '42px' }
                                        }}
                                    >
                                        {block.title}
                                    </Typography>
                                )}
                                {block.description && (
                                    <Box
                                        sx={{
                                            color: '#333',
                                            fontSize: '1.1rem',
                                            lineHeight: 1.8,
                                            '&& p,h2,h3,h4,h5,h6': {
                                                fontSize: { xs: '16px', md: '28px' }
                                            }
                                        }}
                                    >
                                        <PrismicRichText field={block.description} />
                                    </Box>
                                )}
                            </Box>
                        ))}
                    </Grid>

                    {/* Right Line Art - top aligned */}
                    {slice.primary.line_art_right?.url && (
                        <Grid
                            item
                            xs={12}
                            md={2}
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                alignItems: 'flex-start',
                                justifyContent: 'center'
                            }}
                        >
                            <PrismicImage field={slice.primary.line_art_right} style={{ maxWidth: '100%' }} />
                        </Grid>
                    )}
                </Grid>
            </Box>
        </Box>
    )
}

export default ArambhaContent
