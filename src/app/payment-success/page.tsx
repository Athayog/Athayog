import type { Metadata } from 'next'
import Thanks from '@/app/payment-success/thanks'
import { Suspense } from 'react'

export const metadata: Metadata = {
    title: 'Payment Success | Athayog',
    description: 'Your payment was successful. Thank you for choosing Athayog for your wellness journey.',
}

const LoginPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Thanks />
        </Suspense>
    )
}

export default LoginPage
