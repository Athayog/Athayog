import { Metadata } from 'next'

import { SliceZone } from '@prismicio/react'
import * as prismic from '@prismicio/client'

import { createClient } from '@/prismicio'
import { components } from '@/slices'

// This component renders your homepage.
//
// Use Next's generateMetadata function to render page metadata.
//
// Use the SliceZone to render the content of the page.

export async function generateMetadata(): Promise<Metadata> {
    const client = createClient()
    const home = await client.getByUID('page', 'home')

    return {
        title: prismic.asText(home.data.title),
        description: home.data.meta_description,
        openGraph: {
            title: home.data.meta_title ?? undefined,
            images: [{ url: home.data.meta_image.url ?? '' }],
        },
    }
}

export default async function Index() {
    // The client queries content from the Prismic API
    const client = createClient()
    const home = await client.getByUID('page', 'home')
    const schema = {
        '@context': 'https://schema.org',
        '@type': ['LocalBusiness', 'EducationalOrganization'],
        '@id': 'https://athayogliving.com/#organization',
        name: 'AthaYog Living - Yoga Academy',
        alternateName: 'AthaYog Living',
        url: 'https://athayogliving.com/',
        logo: '',
        image: 'https://athayogliving.com/images/Logo.png',
        telephone: '086903 33111',
        priceRange: '₹5000-₹50000',
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '086903 33111',
            contactType: 'sales',
            areaServed: 'IN',
            availableLanguage: ['en', 'Kannada', 'Tamil', 'Telugu', 'Hindi', 'Malayalam'],
        },
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'No. 3293, 1st Floor, 12th Main Rd, HAL 2nd Stage, Doopanahalli, Indiranagar',
            addressLocality: 'Bengaluru',
            postalCode: '560008',
            addressCountry: 'IN',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: 12.9703844,
            longitude: 77.6441167,
        },
        openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            opens: '05:00',
            closes: '21:00',
        },
        sameAs: ['https://www.facebook.com/athayogliving/', 'https://www.instagram.com/athayogliving/', 'https://in.linkedin.com/company/athayog-living', 'https://www.youtube.com/@athayogliving'],
    }

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

            <SliceZone slices={home.data.slices} components={components} />
        </>
    )
}
