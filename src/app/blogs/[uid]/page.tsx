import Link from 'next/link'
import { Metadata } from 'next'
import { components } from '@/slices'
import { notFound } from 'next/navigation'
import { createClient } from '@/prismicio'
import * as prismic from '@prismicio/client'
import { SliceZone } from '@prismicio/react'
import { Box, Typography } from '@mui/material'
import { PrismicNextImage } from '@prismicio/next'
import Button from '@/components/elements/button/Index'
import { RichTextBlog } from '@/components/RichTextBlog'
import { ArrowForward, ArrowRight } from '@mui/icons-material'

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
    const posts = await client.getAllByType('blog_post', {
        orderings: [{ field: 'my.blog_post.publication_date', direction: 'asc' }],
    })

    const getNextPost = () => {
        if (posts.length === 1) return null
        // Find the index of the current post
        const currentIndex = posts.findIndex((post) => post.uid === params.uid)

        // Determine the next post
        const nextIndex = (currentIndex + 1) % posts.length // Loop to the first post if it's the last one
        return posts[nextIndex]
    }

    const nextPost = getNextPost()

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
                {nextPost && (
                    <Link href={`/blogs/${nextPost.uid}`} passHref={true}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                            <Button
                                endIcon={<ArrowForward />}
                                sx={{
                                    marginTop: '10px',
                                    boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.44)',
                                    padding: { xs: '12px 20px', md: '17px 23px' },
                                    borderRadius: '46px',
                                    backgroundColor: '#47820D',
                                    height: '56px',
                                    fontWeight: '600',
                                    color: 'white',
                                    fontSize: { xs: '15px', md: '24px' },
                                    svg: {
                                        height: { xs: '20px', md: '30px' },
                                        width: { xs: '20px', md: '30px' },
                                    },
                                    width: 'max-content',
                                }}
                            >
                                Next Blog
                            </Button>
                        </Box>
                    </Link>
                )}
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
