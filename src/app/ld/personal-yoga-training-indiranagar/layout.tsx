import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Personal Yoga Sessions Bangalore | Private One-on-One Trainer',
    description: 'Private one-on-one yoga sessions with an expert personal trainer in Bangalore. Studio or home sessions. Consultation before enrollment.',
    robots: {
        index: false,
        follow: false,
    },
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
