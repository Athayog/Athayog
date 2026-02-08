import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Non-Residential Yoga Program in Bangalore | Structured Practice',
    description: 'Join a structured non-residential yoga program in Bangalore for long-term, consistent practice. Morning & evening batches. No stay required.',
    robots: {
        index: false,
        follow: false,
    },
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
