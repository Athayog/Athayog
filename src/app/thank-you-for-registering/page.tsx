import type { Metadata } from 'next'
import Thanks from '@/app/thank-you-for-registering/thanks'
import { Suspense } from 'react'


export const metadata: Metadata = {
    title: 'Thank You | Athayog',
    description: 'Thank you for your submission',
}

const LoginPage = () => {
    return <Suspense fallback={<div>Loading...</div>}><Thanks /> </Suspense>
}

export default LoginPage
