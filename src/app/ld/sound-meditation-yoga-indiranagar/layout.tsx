import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Sound Meditation in Indiranagar | Deep Relaxation Session @ ₹799',
    description:
        'Unwind with guided Sound Meditation in Indiranagar. Reduce stress, calm the mind & improve sleep in a serene studio setting. ₹799 per session or ₹2,799 monthly. Limited seats—book now.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
