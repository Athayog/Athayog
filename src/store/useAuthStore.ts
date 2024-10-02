import { create } from 'zustand'
import { User } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { signInWithGoogle, sendOtp as sendOtpToUser } from '@/lib/auth'

interface AuthState {
    user: User | null
    loading: boolean
    error: string | null
    setUser: (user: User | null) => void
    setLoading: (loading: boolean) => void
    setError: (error: string | null) => void
    initializeAuth: () => void
    handleSignIn: () => Promise<void>
    handleLogout: () => Promise<void>
    signInWithOtp: (phoneNumber: string, otp: string) => Promise<void>
    sendOtp: (phoneNumber: string) => Promise<void>
}

const useAuthStore = create<AuthState>((set) => ({
    user: null,
    loading: true,
    error: null,
    setUser: (user) => set({ user, loading: false }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),

    // Initialize authentication listener
    initializeAuth: () => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            set({ user, loading: false })
        })
        return unsubscribe // Returns the unsubscribe function
    },

    // Handle Google sign-in logic
    handleSignIn: async () => {
        set({ loading: true, error: null })
        try {
            const user = await signInWithGoogle()
            set({ user })
        } catch (err) {
            set({ error: 'Failed to sign in' })
            throw err
        } finally {
            set({ loading: false })
        }
    },

    handleLogout: async () => {
        set({ loading: true, error: null })
        try {
            await auth.signOut()
            set({ user: null })
        } catch (err) {
            set({ error: 'Failed to log out' })
        } finally {
            set({ loading: false })
        }
    },

    // Sign in with OTP
    signInWithOtp: async (phoneNumber: string, otp: string) => {
        set({ loading: true, error: null })
        try {
            const confirmationResult = window.confirmationResult
            const userCredential = await confirmationResult.confirm(otp)
            const user = userCredential.user
            set({ user })
        } catch (error) {
            console.error('Error signing in with OTP:', error)
            set({ error: (error as Error).message })
            throw error
        } finally {
            set({ loading: false })
        }
    },

    // Send OTP to the user's phone
    sendOtp: async (phoneNumber: string) => {
        set({ loading: true, error: null })
        try {
            await sendOtpToUser(phoneNumber)
        } catch (error) {
            console.error('Error sending OTP:', error)
            set({ error: (error as Error).message })
            throw error
        } finally {
            set({ loading: false })
        }
    },
}))

export default useAuthStore
