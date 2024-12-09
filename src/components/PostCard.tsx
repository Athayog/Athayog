import Link from 'next/link'
import { Content } from '@prismicio/client'
import { Box, Typography } from '@mui/material'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicLink, PrismicText } from '@prismicio/react'

export const PostCard = ({ post }: { post: Content.BlogPostDocument }): JSX.Element => {
    const { data } = post

    return (
        <Link href={`/blogs/${post.uid}`} style={{ textDecoration: 'none' }} passHref={true}>
            <Box
                sx={{
                    backgroundColor: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: 425,
                    height: '350px',
                    padding: '12px',
                    margin: 'auto',
                    borderRadius: 2,
                    overflow: 'hidden',
                }}
            >
                {/* Featured Image */}
                <Box sx={{ minHeight: '190px', borderRadius: 2, overflow: 'hidden' }}>
                    <PrismicNextImage
                        field={data.featured_image}
                        sizes="100vw"
                        style={{
                            width: '100%',
                            height: '190px',
                            objectFit: 'cover',
                        }}
                    />
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        padding: '20px 8px 10px 8px',
                        paddingBottom: '0px',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: '100%',
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: '700',
                            fontSize: '23px',
                        }}
                    >
                        <PrismicText field={data.title} />
                    </Typography>
                    <Typography
                        sx={{
                            color: '#97989F',
                            fontWeight: '500',
                            fontSize: '17px',
                        }}
                    >
                        {new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(data?.publication_date || ''))}
                    </Typography>
                </Box>
            </Box>
        </Link>
    )
}
