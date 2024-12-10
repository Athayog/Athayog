import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import * as prismic from '@prismicio/client'
import { SliceZone } from '@prismicio/react'
import { createClient } from '@/prismicio'
import { components } from '@/slices'
import { PrismicNextImage } from '@prismicio/next'
import { RichTextBlog } from '@/components/RichTextBlog'
import { Box, Typography } from '@mui/material'

type Params = { uid: string }

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const client = createClient()
    const page = await client.getByUID('blog_post', params.uid).catch(() => notFound())

    return {
        title: prismic.asText(page.data.title),
        description: page.data.meta_description,
        openGraph: {
            title: page.data.meta_title || undefined,
            images: [
                {
                    url: page.data.meta_image.url || '',
                },
            ],
        },
    }
}

export default async function Page({ params }: { params: Params }) {
    const client = createClient()

    // Fetch the current blog post page being displayed by the UID of the page
    const page = await client.getByUID('blog_post', params.uid).catch(() => notFound())

    /**
     * Fetch all of the blog posts in Prismic (max 2), excluding the current one, and ordered by publication date.
     *
     * We use this data to display our "recommended posts" section at the end of the blog post
     */
    const posts = await client.getAllByType('blog_post', {
        predicates: [prismic.filter.not('my.blog_post.uid', params.uid)],
        orderings: [
            { field: 'my.blog_post.publication_date', direction: 'desc' },
            { field: 'document.first_publication_date', direction: 'desc' },
        ],
        limit: 2,
    })

    const { slices, title, publication_date, description, featured_image } = page.data

    return (
        <div style={{ backgroundColor: '#e9fdde' }}>
            <Box sx={{ maxWidth: '1110px', padding: { xs: '120px 26px', md: '200px 26px' }, margin: '0 auto' }}>
                <RichTextBlog field={title} />
                <Typography sx={{ color: '#505050', fontSize: { xs: '14px', md: '28px' }, fontWeight: '600', margin: { xs: '15px 0px 20px 0px', md: '22px 0px 40px 0px' } }}>
                    {new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(publication_date || ''))}
                </Typography>
                <Box
                    sx={{
                        position: 'relative',
                        borderRadius: '5px',
                        overflow: 'hidden',
                        img: {
                            height: '100%',
                            width: '100%',
                            borderRadius: '5px',
                            overflow: 'hidden',
                        },
                    }}
                >
                    <PrismicNextImage field={featured_image} />
                </Box>
                <Box
                    sx={{
                        marginTop: { xs: '10px', md: '50px' },
                        fontSize: { xs: '14px', md: '28px' },
                        fontWeight: '500',
                        lineHeight: { xs: '22px', md: '38px' },
                        color: '#202020',
                        p: {
                            fontSize: { xs: '14px', md: '28px' },
                            fontWeight: '500',
                            lineHeight: { xs: '22px', md: '38px' },
                            color: '#202020',
                        },
                    }}
                >
                    <RichTextBlog field={description} />
                </Box>
            </Box>
            <SliceZone slices={slices} components={components} />
        </div>
    )
}

export async function generateStaticParams() {
    const client = createClient()

    /**
     * Query all Documents from the API, except the homepage.
     */
    const pages = await client.getAllByType('blog_post')

    /**
     * Define a path for every Document.
     */
    return pages.map((page) => {
        return { uid: page.uid }
    })
}
