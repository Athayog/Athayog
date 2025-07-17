import type { Metadata } from 'next'
import Thanks from '@/app/payment-success/thanks'

export const metadata: Metadata = {
    title: 'Payment Success | Athayog',
    description: 'Your payment was successful. Thank you for choosing Athayog for your wellness journey.',
}

const LoginPage = () => {
    return <Thanks />
}

export default LoginPage
