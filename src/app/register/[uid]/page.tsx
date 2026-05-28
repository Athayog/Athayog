import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { SliceZone } from '@prismicio/react'
import * as prismic from '@prismicio/client'

import { createClient } from '@/prismicio'
import { components } from '@/slices'

type Params = { uid: string }

/**
 * This page renders a Prismic Document dynamically based on the URL.
 */

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const client = createClient()
    const page = await client.getByUID('registration_page', params.uid).catch(() => notFound())

    return {
        title: page.data.meta_title || prismic.asText(page.data.title),
        description: page.data.meta_description,
        alternates: {
            canonical: `https://athayogliving.com/register/${params.uid}`,
        },
        openGraph: {
            title: page.data.meta_title || undefined,
            description: page.data.meta_description || undefined,
            url: `https://athayogliving.com/register/${params.uid}`,
            images: page.data.meta_image.url
                ? [{ url: page.data.meta_image.url, width: 1200, height: 630 }]
                : [],
        },
        twitter: {
            card: 'summary_large_image',
            title: page.data.meta_title || undefined,
            description: page.data.meta_description || undefined,
        },
    }
}

export default async function Page({ params }: { params: Params }) {
    const client = createClient()
    const page = await client.getByUID('registration_page', params.uid).catch(() => notFound())

    return <SliceZone slices={page.data.slices} components={components} />
}

export async function generateStaticParams() {
    const client = createClient()

    /**
     * Query all Documents from the API, except the homepage.
     */
    const pages = await client.getAllByType('registration_page', {
        predicates: [prismic.filter.not('my.page.uid', 'home')],
    })

    /**
     * Define a path for every Document.
     */
    return pages.map((page) => {
        return { uid: page.uid }
    })
}
