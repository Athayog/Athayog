import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Delete Request | Athayog',
    description: 'Delete Athayog Account',
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
