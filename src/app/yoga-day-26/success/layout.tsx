import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Registration Successful | Yoga Arambha 2026',
    description: 'Your registration for Yoga Arambha 2026 is confirmed. Download your entry pass and view event details.',
    openGraph: {
        title: 'Registration Successful | Yoga Arambha 2026',
        description: 'Your registration for Yoga Arambha 2026 is confirmed. Download your entry pass and view event details.',
    },
}

export default function SuccessLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
