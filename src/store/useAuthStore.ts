import { create } from 'zustand'
import { User } from 'firebase/auth'
import { auth, db } from '@/lib/firebase'
import { signInWithGoogle, sendOtp as sendOtpToUser } from '@/lib/auth'
import { addDoc, doc, getDoc, setDoc } from 'firebase/firestore'

interface AuthState {
    user: User | null
    loading: boolean
    error: string | null
    isAuthenticated: boolean
    setUser: (user: User | null) => void
    setLoading: (loading: boolean) => void
    setError: (error: string | null) => void
    initializeAuth: () => void
    handleSignIn: () => Promise<void>
    handleLogout: () => Promise<void>
    signInWithOtp: (phoneNumber: string, otp: string) => Promise<void>
    sendOtp: (phoneNumber: string) => Promise<void>
    redirectPath: string | null
    setRedirectPath: (path: string | null) => void
    setAuthenticated: (authenticated: boolean) => void
}

const useAuthStore = create<AuthState>((set) => ({
    user: null,
    loading: true,
    error: null,
    isAuthenticated: false,
    setUser: (user) => set({ user, loading: false }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    redirectPath: null,
    setRedirectPath: (path) => set({ redirectPath: path }),
    setAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),

    // Initialize authentication listener
    initializeAuth: () => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            set({ user, loading: false, isAuthenticated: !!user })
        })
        return unsubscribe // Returns the unsubscribe function
    },

    // Handle Google sign-in logic
    handleSignIn: async () => {
        set({ loading: true, error: null })
        try {
            const userCredential = await signInWithGoogle()
            const user = userCredential

            const userDocRef = doc(db, 'users', user.uid)
            const userDoc = await getDoc(userDocRef)
            if (!userDoc.exists()) {
                await setDoc(userDocRef, {
                    uid: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    createdAt: new Date(),
                })
            }
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
            set({ loading: false, isAuthenticated: false })
        }
    },

    // Sign in with OTP
    signInWithOtp: async (phoneNumber: string, otp: string) => {
        set({ loading: true, error: null })
        try {
            const confirmationResult = window.confirmationResult
            const userCredential = await confirmationResult.confirm(otp)
            const user = userCredential.user
            const userDocRef = doc(db, 'users', user.uid)
            const userDoc = await getDoc(userDocRef)

            if (!userDoc.exists()) {
                await setDoc(userDocRef, {
                    uid: user.uid,
                    phoneNumber: user.phoneNumber,
                    createdAt: new Date(),
                })
            }
            set({ user, isAuthenticated: true })
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
