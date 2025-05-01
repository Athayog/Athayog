import type { Metadata } from 'next'
import Thanks from '@/app/thank-you/thanks'


export const metadata: Metadata = {
    title: 'Thank You | Athayog',
    description: 'Thank you for your submission',
}

const LoginPage = () => {
    return <Thanks />
}

export default LoginPage
