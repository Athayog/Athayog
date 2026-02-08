import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Group Yoga Classes Near Indiranagar | Small Batch Sessions',
    description: 'Looking for yoga classes near Indiranagar? Join structured group sessions with expert guidance, morning & evening batches. Trial available.',
    robots: {
        index: false,
        follow: false,
    },
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
