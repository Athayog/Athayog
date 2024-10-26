import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'User Account | Athayog',
    description: 'User Account',
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
