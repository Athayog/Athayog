import { PostCard } from '@/components/PostCard'
import { createClient } from '@/prismicio'
import { Box, Typography } from '@mui/material'
import * as prismic from '@prismicio/client'
import { Metadata } from 'next'
import { components } from '@/slices'
import { SliceZone } from '@prismicio/react'

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
    const blogs = await client.getByUID('page', 'blogs')
    const posts = await client.getAllByType('blog_post', {
        orderings: [
            { field: 'my.blog_post.publication_date', direction: 'desc' },
            { field: 'document.first_publication_date', direction: 'desc' },
        ],
    })

    return (
        <section style={{ backgroundColor: '#e9fdde' }}>
            <Box sx={{ padding: { xs: '100px 20px', md: '150px 50px' } }}>
                <SliceZone slices={blogs.data.slices} components={components} />
                <PostGrid posts={posts} />
            </Box>
        </section>
    )
}

export const PostGrid = ({ posts }: { posts: any[] }) => {
    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: posts.length < 3 ? 'repeat(auto-fill, minmax(300px, 1fr))' : 'repeat(auto-fit, minmax(300px, 1fr))',
                    md: posts.length < 3 ? 'repeat(auto-fill, minmax(427px, 1fr))' : 'repeat(auto-fit, minmax(427px, 1fr))',
                },
                gap: '20px',
                maxWidth: '1440px',
                margin: '40px auto',
                justifyItems: posts.length < 3 ? 'start' : 'stretch',
                padding: '0px',
            }}
        >
            {posts.map((post) => (
                <PostCard post={post} key={`post-${post.id}`} />
            ))}
        </Box>
    )
}
