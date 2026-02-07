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
    const page = await client.getByUID('page', params.uid).catch(() => notFound())
    // const pageName = params.uid
    // Replace with new ads-landing-pages
    // const noIndexPages = new Set([])

    // let robots: Metadata['robots'] = { index: true, follow: true }

    // if (noIndexPages.has(pageName)) {
    //     robots = { index: false, follow: true }
    // }
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
        // robots,
    }
}

export default async function Page({ params }: { params: Params }) {
    const client = createClient()
    const page = await client.getByUID('page', params.uid).catch(() => notFound())

    const pageName = params.uid

    let schema: any = null

    if (pageName === 'weight-loss-program-indiranagar') {
        schema = {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Athayog Living - Weight Loss Program in Indiranagar, Bangalore',
            image: '',
            description: 'Join Athayog Living’s expert-led weight loss program in Indiranagar, Bangalore. Sustainable fat loss with yoga, nutrition & lifestyle coaching. Book now.',
            brand: {
                '@type': 'Brand',
                name: 'AthaYog Living',
            },
            offers: {
                '@type': 'AggregateOffer',
                url: 'https://athayogliving.com/',
                priceCurrency: 'INR',
                lowPrice: '500',
                highPrice: '50000',
                offerCount: '10',
            },
            aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '5',
                bestRating: '5',
                worstRating: '1',
                ratingCount: '5000',
            },
        }
    }
    if (pageName === 'group-classes-indiranagar') {
        schema = {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Athayog Living - Group Yoga Classes in Indiranagar, Bangalore',
            image: '',
            description: 'Join expert-led group yoga classes in Indiranagar, Bangalore. Small batches, personalized guidance & flexible timings. Book a trial class today.',
            brand: {
                '@type': 'Brand',
                name: 'AthaYog Living',
            },
            offers: {
                '@type': 'AggregateOffer',
                url: 'https://athayogliving.com/',
                priceCurrency: 'INR',
                lowPrice: '500',
                highPrice: '50000',
                offerCount: '10',
            },
            aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '5',
                bestRating: '5',
                worstRating: '1',
                ratingCount: '5000',
            },
        }
    }
    if (pageName === 'personal-yoga-training-indiranagar') {
        schema = {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Athayog Living - Personal Yoga Trainer in Indiranagar',
            image: '',
            description:
                'Become a globally certified yoga teacher in 30 days with AthaYog Living’s residential course. Accredited by Yoga Alliance USA + VYASA with accommodation, practical learning, mentorship, and career support.',
            brand: {
                '@type': 'Brand',
                name: 'AthaYog Living',
            },
            offers: {
                '@type': 'AggregateOffer',
                url: 'https://athayogliving.com/',
                priceCurrency: 'INR',
                lowPrice: '500',
                highPrice: '50000',
                offerCount: '10',
            },
            aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '5',
                bestRating: '5',
                worstRating: '1',
                ratingCount: '5000',
            },
        }
    }
    if (pageName === 'residential-yoga-teacher-training') {
        schema = {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Athayog Living - 30-Day Residential Yoga Teacher Training Bangalore, India',
            image: '',
            description:
                'Become a globally certified yoga teacher in 30 days with AthaYog Living’s residential course. Accredited by Yoga Alliance USA + VYASA with accommodation, practical learning, mentorship, and career support.',
            brand: {
                '@type': 'Brand',
                name: 'AthaYog Living',
            },
            offers: {
                '@type': 'AggregateOffer',
                url: 'https://athayogliving.com/',
                priceCurrency: 'INR',
                lowPrice: '500',
                highPrice: '50000',
                offerCount: '10',
            },
            aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '5',
                bestRating: '5',
                worstRating: '1',
                ratingCount: '5000',
            },
        }
    }
    if (pageName === 'yoga-teacher-training-ryt-200-non-residential') {
        schema = {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Athayog Living - Certified Yoga Teacher Training RYT 200',
            image: '',
            description:
                'Transform your passion into profession with our International RYT 200 Yoga Teacher Training at AthaYog Living. Learn asanas, pranayama, teaching methodology & personal branding. Enroll now.',
            brand: {
                '@type': 'Brand',
                name: 'AthaYog Living',
            },
            offers: {
                '@type': 'AggregateOffer',
                url: 'https://athayogliving.com/',
                priceCurrency: 'INR',
                lowPrice: '500',
                highPrice: '50000',
                offerCount: '10',
            },
            aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '5',
                bestRating: '5',
                worstRating: '1',
                ratingCount: '5000',
            },
        }
    }
    if (pageName === 'yoga-ttc-online-certification') {
        schema = {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Athayog Living - Yoga Teacher Training Online RYT-200',
            image: '',
            description:
                'Transform your passion into a profession with our 200-Hour Yoga Teacher Training Online. Globally accredited RYT-200 curriculum with practical asanas, pranayama, meditation, teaching methodology & career support.',
            brand: {
                '@type': 'Brand',
                name: 'AthaYog Living',
            },
            offers: {
                '@type': 'AggregateOffer',
                url: 'https://athayogliving.com/',
                priceCurrency: 'INR',
                lowPrice: '500',
                highPrice: '50000',
                offerCount: '10',
            },
            aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '5',
                bestRating: '5',
                worstRating: '1',
                ratingCount: '5000',
            },
        }
    }
    return (
        <>
            {schema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(schema),
                    }}
                />
            )}
            <SliceZone slices={page.data.slices} components={components} />
        </>
    )
}

export async function generateStaticParams() {
    const client = createClient()

    /**
     * Query all Documents from the API, except the homepage.
     */
    const pages = await client.getAllByType('page', {
        predicates: [prismic.filter.not('my.page.uid', 'home')],
    })

    /**
     * Define a path for every Document.
     */
    return pages.map((page) => {
        return { uid: page.uid }
    })
}
