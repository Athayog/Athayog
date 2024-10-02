import type { Metadata } from 'next'
import Login from './Login'

export const metadata: Metadata = {
    title: 'Login | Athayog',
    description: 'Login to athayor or Signup',
}

const LoginPage = () => {
    return <Login />
}

export default LoginPage
