import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Yoga Arambha 2026 | International Day of Yoga | Atha Yog Living',
    description:
        'Join Yoga Arambha 2026 — a free mass yoga event celebrating International Day of Yoga on June 21, 2026 at Indiranagar Club, Bangalore. Open to all ages and levels.',
    keywords: [
        'Yoga Arambha 2026',
        'International Day of Yoga 2026',
        'Free yoga event Bangalore',
        'Atha Yog Living',
        'mass yoga Bangalore',
        'yoga event June 21',
        'Indiranagar Club yoga',
        'yoga for wellness wisdom world peace',
    ],
    openGraph: {
        title: 'Yoga Arambha 2026 — Free Yoga Event | June 21, Bangalore',
        description:
            'Celebrate International Day of Yoga 2026 with a free mass yoga session at Indiranagar Club, Bangalore. Presided by Shri P.C. Mohan, MP. Open to everyone.',
        url: 'https://athayogliving.com/yoga-arambha-26',
        siteName: 'Atha Yog Living',
        type: 'website',
        locale: 'en_IN',
        images: [
            {
                url: 'https://athayogliving.com/og-yoga-arambha-2026.jpg',
                width: 1200,
                height: 630,
                alt: 'Yoga Arambha 2026 — International Day of Yoga at Indiranagar Club, Bangalore',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Yoga Arambha 2026 — Free Yoga Event | June 21, Bangalore',
        description:
            'Join us for a free mass yoga session on International Day of Yoga 2026. Indiranagar Club, Bangalore. 6:00 AM – 8:35 AM.',
        images: ['https://athayogliving.com/og-yoga-arambha-2026.jpg'],
    },
    alternates: {
        canonical: 'https://athayogliving.com/yoga-arambha-26',
    },
    robots: {
        index: true,
        follow: true,
    },
}

export default function YogaArambhaLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
