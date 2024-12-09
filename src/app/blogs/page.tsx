import { Metadata } from 'next'
import * as prismic from '@prismicio/client'
import { createClient } from '@/prismicio'
import { Card, CardContent, CardMedia, Typography, Box, Grid } from '@mui/material'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicText } from '@prismicio/react'
import { RichTextBlog } from '@/components/RichTextBlog'
import { PostCard } from '@/components/PostCard'

export async function generateMetadata(): Promise<Metadata> {
    const client = createClient()
    const blogs = await client.getByUID('page', 'blogs')

    return {
        title: prismic.asText(blogs.data.title),
        description: blogs.data.meta_description,
        openGraph: {
            title: blogs.data.meta_title || undefined,
            images: [
                {
                    url: blogs.data.meta_image.url || '',
                },
            ],
        },
    }
}

export default async function Index() {
    const client = createClient()
    const home = await client.getByUID('page', 'home')

    const posts = await client.getAllByType('blog_post', {
        orderings: [
            { field: 'my.blog_post.publication_date', direction: 'desc' },
            { field: 'document.first_publication_date', direction: 'desc' },
        ],
    })
    console.log('posrt', posts)
    return (
        <>
            {/* Map over each of the blog posts created and display a `PostCard` for it */}
            <section style={{ backgroundColor: '#e9fdde' }}>
                <Box sx={{ padding: { xs: '100px 20px', md: '150px 50px' } }}>
                    <Typography
                        sx={{
                            color: '#202020',
                            textAlign: 'center',
                            fontSize: { xs: '26px', md: '62px' },
                            fontStyle: 'normal',
                            fontWeight: 700,
                            lineHeight: { xs: '22px', md: '90px' },
                            '&& h1': {
                                fontSize: { xs: '26px', md: '62px' },
                                lineHeight: { xs: '22px', md: '90px' },
                                marginBottom: '10px',
                            },
                        }}
                    >
                        Blogs
                    </Typography>
                    <Typography
                        sx={{
                            textAlign: 'center',
                            fontSize: { xs: '18px', md: '26px' },
                            fontWeight: '400',
                            lineHeight: { xs: '26px', md: '30px' },
                            '&& p': {
                                margin: 0,
                            },
                        }}
                    >
                        Explore yoga&apos;s benefits with tips, poses and insights for holistic well-being.
                    </Typography>
                    <Grid container spacing={4} mt="40px">
                        {posts.map((post) => (
                            <Grid item xs={12} sm={6} md={4} key={post.id}>
                                <PostCard post={post} />
                            </Grid>
                        ))}
                        {posts.map((post) => (
                            <Grid item xs={12} sm={6} md={4} key={post.id}>
                                <PostCard post={post} />
                            </Grid>
                        ))}
                        {posts.map((post) => (
                            <Grid item xs={12} sm={6} md={4} key={post.id}>
                                <PostCard post={post} />
                            </Grid>
                        ))}
                        {posts.map((post) => (
                            <Grid item xs={12} sm={6} md={4} key={post.id}>
                                <PostCard post={post} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </section>
        </>
    )
}
