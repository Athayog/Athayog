import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Aerial Yoga Classes in Indiranagar | Book Session @ ₹599',
    description:
        'Experience guided Aerial Yoga in Indiranagar with limited 10-member batches. Improve strength, flexibility & stress relief. Single session ₹599 or monthly pass ₹1,999. Secure your slot now via payment link.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
