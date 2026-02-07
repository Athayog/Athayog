import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Residential Yoga Program in Bangalore | Guided Yogic Living',
    description: 'An immersive residential yoga program in Bangalore for clarity, discipline & inner balance. Not a retreat. Structured routine. Speak to an advisor.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
