import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import useAuthStore from '@/store/useAuthStore'

const withAuth = (WrappedComponent: React.ComponentType) => {
    const AuthWrapper = (props: any) => {
        const { isAuthenticated, loading, setRedirectPath } = useAuthStore()
        const router = useRouter()
        const pathname = usePathname()
        console.log('isAuthenticated', isAuthenticated)
        useEffect(() => {
            if (!loading && !isAuthenticated) {
                router.push('/')
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [isAuthenticated, loading, router])

        if (loading) {
            return <div>Loading...</div>
        }

        return isAuthenticated ? <WrappedComponent {...props} /> : null
    }

    return AuthWrapper
}

export default withAuth
