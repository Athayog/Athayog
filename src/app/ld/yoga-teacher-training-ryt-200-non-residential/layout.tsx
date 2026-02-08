import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Online Yoga Teacher Training Course | Live TTC Certification',
    description: 'Live online yoga teacher training for serious practitioners. Structured curriculum, guided sessions & certification. Apply if you’re ready to teach yoga.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
