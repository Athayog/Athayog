// lib/auth.ts
import { signInWithPopup, signInWithPhoneNumber } from 'firebase/auth'
import { auth, googleProvider } from '@/lib/firebase'

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider)
        const user = result.user
        return user
    } catch (error) {
        console.error('Error signing in with Google:', error)
        throw error
    }
}

export const signOut = async () => {
    try {
        await auth.signOut()
    } catch (error) {
        console.error('Error signing out:', error)
    }
}

export const sendOtp = async (phoneNumber: string) => {
    try {
        const appVerifier = window.recaptchaVerifier // Ensure you've set this up in your code
        const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        window.confirmationResult = confirmationResult // Save for later verification
        console.log('OTP sent to:', phoneNumber)
    } catch (error) {
        console.error('Error sending OTP:', error)

        throw error
    }
}
